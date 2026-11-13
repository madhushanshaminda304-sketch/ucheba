import { ARTICLES, EDUCATIONAL_DOMAINS } from './reference';
import { INSTITUTIONS, COLLEGES, SCHOOLS } from './institutions';
import { PROGRAMS, MASTER_PROGRAMS, MBA_PROGRAMS, ABROAD_PROGRAMS, COURSES } from './programs';
import { PROFESSIONS, SPECIALITIES } from './careers';
import { OPEN_DAY_EVENTS, OLYMPIADS, RANKINGS } from './events';
import type { EvidenceMetadata } from '../types';

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

export interface IntegrityDataset {
  institutions?: typeof INSTITUTIONS;
  programs?: typeof PROGRAMS;
  colleges?: typeof COLLEGES;
  schools?: typeof SCHOOLS;
  professions?: typeof PROFESSIONS;
  specialities?: typeof SPECIALITIES;
  events?: typeof OPEN_DAY_EVENTS;
  olympiads?: typeof OLYMPIADS;
  rankings?: typeof RANKINGS;
  courses?: typeof COURSES;
  masterPrograms?: typeof MASTER_PROGRAMS;
  mbaPrograms?: typeof MBA_PROGRAMS;
  abroadPrograms?: typeof ABROAD_PROGRAMS;
  articles?: typeof ARTICLES;
  domains?: typeof EDUCATIONAL_DOMAINS;
}

const VALID_COST_PERIODS = ['year', 'semester', 'month', 'full_course'] as const;
const VALID_CURRENCIES = ['RUB', 'USD', 'EUR'] as const;

export function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export function runDataIntegrityAudit(dataset: IntegrityDataset = {}): IntegrityReport {
  const institutions = dataset.institutions ?? INSTITUTIONS;
  const programs = dataset.programs ?? PROGRAMS;
  const colleges = dataset.colleges ?? COLLEGES;
  const schools = dataset.schools ?? SCHOOLS;
  const professions = dataset.professions ?? PROFESSIONS;
  const specialities = dataset.specialities ?? SPECIALITIES;
  const events = dataset.events ?? OPEN_DAY_EVENTS;
  const olympiads = dataset.olympiads ?? OLYMPIADS;
  const rankings = dataset.rankings ?? RANKINGS;
  const courses = dataset.courses ?? COURSES;
  const masterPrograms = dataset.masterPrograms ?? MASTER_PROGRAMS;
  const mbaPrograms = dataset.mbaPrograms ?? MBA_PROGRAMS;
  const abroadPrograms = dataset.abroadPrograms ?? ABROAD_PROGRAMS;
  const articles = dataset.articles ?? ARTICLES;
  const domains = dataset.domains ?? EDUCATIONAL_DOMAINS;

  const errors: string[] = [];
  const warnings: string[] = [];

  const counts = {
    institutions: institutions.length,
    programs: programs.length,
    colleges: colleges.length,
    schools: schools.length,
    professions: professions.length,
    specialities: specialities.length,
    events: events.length,
    olympiads: olympiads.length,
    rankings: rankings.length,
    courses: courses.length,
    masterPrograms: masterPrograms.length,
    mbaPrograms: mbaPrograms.length,
    abroadPrograms: abroadPrograms.length,
  };

  function validateEvidence(ev: EvidenceMetadata | null | undefined, context: string) {
    if (!ev) return;
    if (ev.lastCheckedDate && !isValidIsoDate(ev.lastCheckedDate)) {
      errors.push(`Invalid date: ${context} has invalid lastCheckedDate "${ev.lastCheckedDate}"`);
    }
    if (ev.verificationStatus === 'verified' && (!ev.sourceUrl || !ev.lastCheckedDate)) {
      errors.push(`Unbacked verified status: ${context} is marked "verified" without sourceUrl and lastCheckedDate`);
    }
  }

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

  checkDuplicateIds(institutions, 'INSTITUTIONS');
  checkDuplicateIds(programs, 'PROGRAMS');
  checkDuplicateIds(colleges, 'COLLEGES');
  checkDuplicateIds(schools, 'SCHOOLS');
  checkDuplicateIds(professions, 'PROFESSIONS');
  checkDuplicateIds(specialities, 'SPECIALITIES');
  checkDuplicateIds(events, 'OPEN_DAY_EVENTS');
  checkDuplicateIds(olympiads, 'OLYMPIADS');
  checkDuplicateIds(courses, 'COURSES');
  checkDuplicateIds(masterPrograms, 'MASTER_PROGRAMS');
  checkDuplicateIds(mbaPrograms, 'MBA_PROGRAMS');
  checkDuplicateIds(abroadPrograms, 'ABROAD_PROGRAMS');
  checkDuplicateIds(articles, 'ARTICLES');

  const instIdSet = new Set(institutions.map(i => i.id));
  const profIdSet = new Set(professions.map(p => p.id));
  const domainIdSet = new Set(domains.map(d => d.id));
  const progIdSet = new Set(programs.map(p => p.id));

  // Validate institutions evidence
  for (const inst of institutions) {
    validateEvidence(inst.evidence, `Institution "${inst.id}"`);
  }

  // 2. Check Programs: references, costs, thresholds, zero-for-unknown, evidence
  for (const prog of programs) {
    if (!instIdSet.has(prog.institutionId)) {
      errors.push(`Broken reference: Program "${prog.id}" references non-existent institutionId "${prog.institutionId}"`);
    }
    if (!domainIdSet.has(prog.fieldId)) {
      errors.push(`Broken reference: Program "${prog.id}" references non-existent fieldId "${prog.fieldId}"`);
    }
    for (const careerId of prog.careers) {
      if (!profIdSet.has(careerId)) {
        errors.push(`Broken reference: Program "${prog.id}" references non-existent career ID "${careerId}"`);
      }
    }

    if (prog.minScoreBudget === 0 || prog.minScorePaid === 0) {
      errors.push(`Zero used for unknown: Program "${prog.id}" uses 0 for score threshold instead of null`);
    }
    if (prog.tuitionPerYear !== null && prog.tuitionPerYear !== undefined && prog.tuitionPerYear < 0) {
      errors.push(`Invalid cost: Program "${prog.id}" has negative tuitionPerYear "${prog.tuitionPerYear}"`);
    }
    if (prog.cost) {
      if (prog.cost.amount !== null && prog.cost.amount !== undefined && prog.cost.amount < 0) {
        errors.push(`Invalid cost: Program "${prog.id}" cost amount is negative "${prog.cost.amount}"`);
      }
      if (!VALID_COST_PERIODS.includes(prog.cost.period)) {
        errors.push(`Invalid cost period: Program "${prog.id}" has unknown period "${prog.cost.period}"`);
      }
      if (!VALID_CURRENCIES.includes(prog.cost.currency)) {
        errors.push(`Invalid currency: Program "${prog.id}" has unknown currency "${prog.cost.currency}"`);
      }
      if (
        prog.cost.period === 'year' &&
        prog.cost.amount !== null &&
        prog.tuitionPerYear !== null &&
        prog.cost.amount !== prog.tuitionPerYear
      ) {
        errors.push(
          `Inconsistent cost period: Program "${prog.id}" has yearly cost ${prog.cost.amount} differing from tuitionPerYear ${prog.tuitionPerYear}`
        );
      }
      if (
        prog.cost.period !== 'year' &&
        prog.cost.amount !== null &&
        prog.tuitionPerYear !== null &&
        prog.cost.amount === prog.tuitionPerYear
      ) {
        errors.push(
          `Inconsistent cost period: Program "${prog.id}" has period "${prog.cost.period}" but amount ${prog.cost.amount} equals tuitionPerYear`
        );
      }
      validateEvidence(prog.cost.evidence, `Program "${prog.id}" cost`);
    }

    validateEvidence(prog.evidence, `Program "${prog.id}"`);
    validateEvidence(prog.budgetThreshold?.evidence, `Program "${prog.id}" budgetThreshold`);
    validateEvidence(prog.paidThreshold?.evidence, `Program "${prog.id}" paidThreshold`);
  }

  // 3. Check Events: references & dates
  for (const ev of events) {
    if (!instIdSet.has(ev.institutionId)) {
      errors.push(`Broken reference: Event "${ev.id}" references non-existent institutionId "${ev.institutionId}"`);
    }
    if (!ev.date || typeof ev.date !== 'string' || ev.date.trim().length < 3) {
      errors.push(`Invalid date: Event "${ev.id}" has invalid date "${ev.date}"`);
    }
  }

  // 4. Check Articles: dates
  for (const article of articles) {
    if (!isValidIsoDate(article.date)) {
      errors.push(`Invalid date: Article "${article.id}" has invalid date "${article.date}"`);
    }
  }

  // 5. Check Rankings -> Institution
  for (const rank of rankings) {
    if (!instIdSet.has(rank.institutionId)) {
      errors.push(`Broken reference: Ranking rank ${rank.rank} references non-existent institutionId "${rank.institutionId}"`);
    }
  }

  // 6. Check Professions -> Programs
  for (const prof of professions) {
    for (const progId of prof.relatedPrograms) {
      if (!progIdSet.has(progId)) {
        errors.push(`Broken reference: Profession "${prof.id}" references non-existent programId "${progId}"`);
      }
    }
  }

  // 7. Check Specialities -> Field
  for (const spec of specialities) {
    if (!domainIdSet.has(spec.fieldId)) {
      errors.push(`Broken reference: Speciality "${spec.id}" references non-existent fieldId "${spec.fieldId}"`);
    }
  }

  // 8. Check Master Programs -> University
  for (const mp of masterPrograms) {
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
