import assert from 'node:assert/strict';
import { runDataIntegrityAudit } from '../lib/data/integrity';
import { INSTITUTIONS, PROGRAMS, PROFESSIONS, ARTICLES } from '../lib/data';
import { loadWorkspaceFromStorage, validateWorkspace, createDefaultWorkspace } from '../lib/storage';

// 1. Live dataset must pass integrity audit with 0 errors
const liveReport = runDataIntegrityAudit();
assert.equal(liveReport.valid, true, `Live dataset failed integrity audit: ${liveReport.errors.join('; ')}`);
assert.equal(liveReport.errors.length, 0);

// 2. Negative tests for integrity audit (must NOT silently discard problems)
{
  const dupInst = [...INSTITUTIONS, INSTITUTIONS[0]];
  const r = runDataIntegrityAudit({ institutions: dupInst });
  assert.equal(r.valid, false);
  assert.ok(r.errors.some(e => e.includes('Duplicate ID detected in INSTITUTIONS')));
}

{
  const brokenProg = [{ ...PROGRAMS[0], institutionId: 'non-existent-inst', fieldId: 'bad-field', careers: ['bad-career'] }];
  const r = runDataIntegrityAudit({ programs: brokenProg });
  assert.equal(r.valid, false);
  assert.ok(r.errors.some(e => e.includes('non-existent institutionId')));
  assert.ok(r.errors.some(e => e.includes('non-existent fieldId')));
  assert.ok(r.errors.some(e => e.includes('non-existent career ID')));
}

{
  const badDateArticle = [{ ...ARTICLES[0], date: '2026-02-30' }];
  const r = runDataIntegrityAudit({ articles: badDateArticle });
  assert.equal(r.valid, false);
  assert.ok(r.errors.some(e => e.includes('Invalid date: Article')));
}

{
  const inconsistentCostProg = [{
    ...PROGRAMS[0],
    tuitionPerYear: 440000,
    cost: { amount: 220000, currency: 'RUB' as const, period: 'year' as const }
  }];
  const r = runDataIntegrityAudit({ programs: inconsistentCostProg });
  assert.equal(r.valid, false);
  assert.ok(r.errors.some(e => e.includes('Inconsistent cost period')));
}

{
  const unbackedVerifiedProg = [{
    ...PROGRAMS[0],
    evidence: { verificationStatus: 'verified' as const, lastCheckedDate: '2026-11-11' }
  }];
  const r = runDataIntegrityAudit({ programs: unbackedVerifiedProg });
  assert.equal(r.valid, false);
  assert.ok(r.errors.some(e => e.includes('Unbacked verified status')));
}

{
  const zeroUnknownProg = [{ ...PROGRAMS[0], minScoreBudget: 0 }];
  const r = runDataIntegrityAudit({ programs: zeroUnknownProg });
  assert.equal(r.valid, false);
  assert.ok(r.errors.some(e => e.includes('Zero used for unknown')));
}

// 3. Storage & Migration Tests with mocked localStorage
class MockStorage {
  private store = new Map<string, string>();
  getItem(key: string) { return this.store.get(key) ?? null; }
  setItem(key: string, val: string) { this.store.set(key, String(val)); }
  removeItem(key: string) { this.store.delete(key); }
  clear() { this.store.clear(); }
  keys() { return Array.from(this.store.keys()); }
}

const mockLs = new MockStorage();
(globalThis as any).window = { localStorage: mockLs };
(globalThis as any).localStorage = mockLs;

// 3a. Clean default workspace distinguishes null from 0
{
  mockLs.clear();
  const res = loadWorkspaceFromStorage();
  assert.equal(res.workspace.schemaVersion, 2);
  assert.equal(res.workspace.workspaceMode, 'guest');
  assert.equal(res.workspace.examScores.math, null);
  assert.equal(res.recoveryNotice, null);
}

// 3b. Legacy v1 migration preserves favorites, comparison, name, scores & creates backup
{
  mockLs.clear();
  mockLs.setItem('ucheba_favorites', JSON.stringify(['1', 'p1']));
  mockLs.setItem('ucheba_compare', JSON.stringify(['2', 'p4']));
  mockLs.setItem('ucheba_user', JSON.stringify({ name: 'Анна' }));
  mockLs.setItem('ucheba_scores', JSON.stringify({ math: 0, russian: 92 }));

  const res = loadWorkspaceFromStorage();
  assert.ok(res.recoveryNotice && res.recoveryNotice.includes('резервная копия'));
  assert.equal(res.workspace.userProfile.displayName, 'Анна');
  assert.equal(res.workspace.examScores.math, 0); // 0 preserved as 0, not null!
  assert.equal(res.workspace.examScores.russian, 92);
  assert.equal(res.workspace.examScores.physics, null); // unentered stays null!
  assert.equal(res.workspace.favorites.length, 2);
  assert.deepEqual(res.workspace.favorites.map(f => `${f.type}:${f.id}`), ['institution:1', 'program:p1']);
  assert.deepEqual(res.workspace.compared.map(c => `${c.type}:${c.id}`), ['institution:2', 'program:p4']);
  assert.ok(mockLs.keys().some(k => k.startsWith('ucheba_workspace_backup_v1_')));
}

// 3c. Corrupt v2 JSON triggers backup + graceful recovery + notice
{
  mockLs.clear();
  mockLs.setItem('ucheba_workspace_v2', '{corrupt-json');
  const res = loadWorkspaceFromStorage();
  assert.equal(res.workspace.schemaVersion, 2);
  assert.ok(res.recoveryNotice && res.recoveryNotice.includes('поврежденный'));
  assert.ok(mockLs.keys().some(k => k.startsWith('ucheba_workspace_backup_corrupt_')));
}

// 3d. Corrupt legacy JSON does NOT silently fail; backs up raw strings & recovers valid parts
{
  mockLs.clear();
  mockLs.setItem('ucheba_favorites', '{bad-json');
  mockLs.setItem('ucheba_compare', JSON.stringify(['p1']));
  const res = loadWorkspaceFromStorage();
  assert.ok(res.recoveryNotice && res.recoveryNotice.includes('повреждена'));
  assert.deepEqual(res.workspace.compared.map(c => `${c.type}:${c.id}`), ['program:p1']);
  assert.ok(mockLs.keys().some(k => k.startsWith('ucheba_workspace_backup_v1_')));
}

// 3e. Score validation clamps out-of-range and resets invalid types
{
  const ws = createDefaultWorkspace();
  const validated = validateWorkspace({
    ...ws,
    examScores: { math: 145, russian: -10, informatics: 'not-a-number', physics: 0 }
  });
  assert.equal(validated.workspace.examScores.math, 100);
  assert.equal(validated.workspace.examScores.russian, 0);
  assert.equal(validated.workspace.examScores.informatics, null);
  assert.equal(validated.workspace.examScores.physics, 0);
  assert.ok(validated.fixedIssues.length >= 1);
}

console.log('ALL INTEGRITY & STORAGE TESTS PASSED (11 suites)');
