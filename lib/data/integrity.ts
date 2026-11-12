import { CITIES } from './reference';
import { INSTITUTIONS, COLLEGES, SCHOOLS } from './institutions';
import { PROGRAMS, MASTER_PROGRAMS, MBA_PROGRAMS, ABROAD_PROGRAMS, COURSES } from './programs';
import { PROFESSIONS, SPECIALITIES } from './careers';
import { OPEN_DAY_EVENTS, OLYMPIADS, RANKINGS } from './events';

export interface IntegrityReport {
  valid: boolean;
  timestamp: string;
  counts: {
    institutions: number;
    programs: number;
    colleges: number;
    schools: number;
    professions: number;
    specialities: number;
    events: number;
    olympiads: number;
    rankings: number;
    courses: number;
    masterPrograms: number;
    mbaPrograms: number;
    abroadPrograms: number;
  };
  errors: string[];
  warnings: string[];
}

export function runDataIntegrityAudit(): IntegrityReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  const counts = {
    institutions: INSTITUTIONS.length,
    programs: PROGRAMS.length,
    colleges: COLLEGES.length,
    schools: SCHOOLS.length,
    professions: PROFESSIONS.length,
    specialities: SPECIALITIES.length,
    events: OPEN_DAY_EVENTS.length,
    olympiads: OLYMPIADS.length,
    rankings: RANKINGS.length,
    courses: COURSES.length,
    masterPrograms: MASTER_PROGRAMS.length,
    mbaPrograms: MBA_PROGRAMS.length,
    abroadPrograms: ABROAD_PROGRAMS.length,
  };

  // 1. Check duplicate IDs within each collection
  function checkDuplicateIds(items: { id: string | number }[], collectionName: string) {
    const seen = new Set<string>();
    for (const item of items) {
      const strId = String(item.id);
      if (seen.has(strId)) {
        errors.push(`Duplicate ID detected in ${collectionName}: "${strId}"`);
      }
      seen.add(strId);
    }
  }

  checkDuplicateIds(INSTITUTIONS, 'INSTITUTIONS');
  checkDuplicateIds(PROGRAMS, 'PROGRAMS');
  checkDuplicateIds(COLLEGES, 'COLLEGES');
  checkDuplicateIds(SCHOOLS, 'SCHOOLS');
  checkDuplicateIds(PROFESSIONS, 'PROFESSIONS');
  checkDuplicateIds(SPECIALITIES, 'SPECIALITIES');
  checkDuplicateIds(OPEN_DAY_EVENTS, 'OPEN_DAY_EVENTS');
  checkDuplicateIds(OLYMPIADS, 'OLYMPIADS');
  checkDuplicateIds(COURSES, 'COURSES');
  checkDuplicateIds(MASTER_PROGRAMS, 'MASTER_PROGRAMS');
  checkDuplicateIds(MBA_PROGRAMS, 'MBA_PROGRAMS');
  checkDuplicateIds(ABROAD_PROGRAMS, 'ABROAD_PROGRAMS');

  // 2. Check broken references: Program -> Institution
  const instIdSet = new Set(INSTITUTIONS.map(i => i.id));
  for (const prog of PROGRAMS) {
    if (!instIdSet.has(prog.institutionId)) {
      errors.push(`Broken reference: Program "${prog.id}" references non-existent institutionId "${prog.institutionId}"`);
    }
    // Check cost period and negative amounts
    if (prog.tuitionPerYear !== null && prog.tuitionPerYear !== undefined && prog.tuitionPerYear < 0) {
      errors.push(`Invalid cost: Program "${prog.id}" has negative tuitionPerYear "${prog.tuitionPerYear}"`);
    }
    if (prog.cost) {
      if (prog.cost.amount !== null && prog.cost.amount !== undefined && prog.cost.amount < 0) {
        errors.push(`Invalid cost: Program "${prog.id}" cost amount is negative "${prog.cost.amount}"`);
      }
      const validPeriods = ['year', 'semester', 'month', 'full_course'];
      if (!validPeriods.includes(prog.cost.period)) {
        errors.push(`Invalid cost period: Program "${prog.id}" has unknown period "${prog.cost.period}"`);
      }
    }
  }

  // 3. Check broken references: Events -> Institution
  for (const ev of OPEN_DAY_EVENTS) {
    if (!instIdSet.has(ev.institutionId)) {
      errors.push(`Broken reference: Event "${ev.id}" references non-existent institutionId "${ev.institutionId}"`);
    }
  }

  // 4. Check broken references: Rankings -> Institution
  for (const rank of RANKINGS) {
    if (!instIdSet.has(rank.institutionId)) {
      errors.push(`Broken reference: Ranking rank ${rank.rank} references non-existent institutionId "${rank.institutionId}"`);
    }
  }

  // 5. Check broken references: Professions -> Programs
  const progIdSet = new Set(PROGRAMS.map(p => p.id));
  for (const prof of PROFESSIONS) {
    for (const progId of prof.relatedPrograms) {
      // Check if it's an explicit program ID
      if (progId.startsWith('p') && !progIdSet.has(progId)) {
        warnings.push(`Warning: Profession "${prof.id}" references unverified programId "${progId}"`);
      }
    }
  }

  // 6. Check Master Programs -> University
  for (const mp of MASTER_PROGRAMS) {
    if (!instIdSet.has(mp.universityId)) {
      warnings.push(`Master program "${mp.id}" references universityId "${mp.universityId}" not in main INSTITUTIONS list`);
    }
  }

  return {
    valid: errors.length === 0,
    timestamp: new Date().toISOString(),
    counts,
    errors,
    warnings,
  };
}
