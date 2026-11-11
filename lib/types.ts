export type DegreeLevel = 'bachelor' | 'specialist' | 'master' | 'college';
export type StudyMode = 'full-time' | 'part-time' | 'remote';

export interface Institution {
  id: string;
  name: string;
  abbreviation: string;
  slug: string;
  type: 'vuz' | 'college';
  isState: boolean;
  city: string;
  address: string;
  metro?: string;
  foundYear: number;
  license: string;
  accreditation: string;
  logoBg: string;
  logoLetter: string;
  ratingRaex?: number;
  ratingScore: number;
  reviewsCount: number;
  description: string;
  tags: string[];
  hasHostel: boolean;
  isMilitaryChair: boolean;
  minBudgetScore: number;
  minPaidScore: number;
  budgetPlacesCount: number;
  paidPlacesCount: number;
  tuitionFeeFrom: number;
  tuitionFeeTo: number;
  website: string;
  phone: string;
  email: string;
  advantages: string[];
  programsCount: number;
  campusDescription?: string;
  dormitoryInfo?: string;
  admissionRules?: string;
  dormitoryAddress?: string;
}

export interface Program {
  id: string;
  institutionId: string;
  institutionName: string;
  institutionAbbreviation: string;
  city: string;
  name: string;
  code: string;
  degreeLevel: DegreeLevel;
  fieldId: string;
  fieldName: string;
  studyMode: StudyMode;
  durationYears: number;
  budgetPlaces: number;
  paidPlaces: number;
  minScoreBudget: number;
  minScorePaid: number;
  tuitionPerYear: number;
  subjectsRequired: string[];
  description: string;
  careers: string[];
}

export interface College {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  address: string;
  metro?: string;
  foundYear: number;
  isState: boolean;
  hasHostel: boolean;
  averageGpaBudget: number;
  averageGpaPaid: number;
  budgetPlaces: number;
  tuitionPerYear: number;
  specialties: string[];
  description: string;
  website: string;
  phone: string;
  ratingScore: number;
  reviewsCount: number;
}

export interface Profession {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  salaryJunior: number;
  salaryMiddle: number;
  salarySenior: number;
  demandLevel: 'Высокая' | 'Очень высокая' | 'Стабильная';
  keySkills: string[];
  relatedPrograms: string[];
  educationLevels: string[];
}

export interface Speciality {
  id: string;
  code: string;
  name: string;
  slug: string;
  degreeLevel: DegreeLevel;
  fieldId: string;
  fieldName: string;
  durationYears: number;
  minBudgetScore: number;
  budgetPlacesTotal: number;
  universitiesCount: number;
  description: string;
  examsRequired: string[];
  relatedProfessions: string[];
}

export interface Olympiad {
  id: string;
  name: string;
  organizer: string;
  level: 'ВсОШ' | '1 уровень' | '2 уровень' | '3 уровень';
  subjects: string[];
  benefit: string;
  targetGrades: string;
  website: string;
  deadline: string;
  description: string;
}

export interface TrainingQuestion {
  id: string;
  subject: 'russian' | 'math' | 'informatics' | 'social';
  taskNumber: number;
  taskTitle: string;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  maxScore: number;
}

export interface RankingItem {
  rank: number;
  institutionId: string;
  institutionName: string;
  abbreviation: string;
  city: string;
  scoreTotal: number;
  qualityScore: number;
  demandScore: number;
  scienceScore: number;
  minBudgetScore: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  readTimeMinutes: number;
  date: string;
  author: string;
  tags: string[];
}

export interface OpenDayEvent {
  id: string;
  institutionId: string;
  institutionName: string;
  city: string;
  title: string;
  date: string;
  time: string;
  format: 'онлайн' | 'очно';
  location: string;
  registrationUrl: string;
  description?: string;
  targetAudience?: string;
}

export interface CareerQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    archetype: 'it' | 'business' | 'humanitarian' | 'creative' | 'medical';
  }[];
}

export interface CityOption {
  id: string;
  name: string;
  countVuz: number;
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  type: 'lyceum' | 'gymnasium' | 'state' | 'private';
  city: string;
  district?: string;
  address: string;
  metro?: string;
  rankingRank: number;
  ratingDepartment: string;
  profileClasses: string[];
  averageEgeScore: number;
  olympiadWinnersCount: number;
  isTuitionFree: boolean;
  tuitionPerMonth?: number;
  foundYear: number;
  studentCount: number;
  phone: string;
  website: string;
  email: string;
  description: string;
  admissionExamInfo: string;
  clubs: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  provider: string;
  category: 'it' | 'design' | 'marketing' | 'analytics' | 'languages' | 'management';
  durationMonths: number;
  format: 'online' | 'blended' | 'offline';
  hasJobGuarantee: boolean;
  diplomaType: string;
  rating: number;
  reviewsCount: number;
  priceTotal: number;
  pricePerMonthInstallment: number;
  level: 'С нуля' | 'Для продолжающих' | 'Продвинутый';
  tags: string[];
  skillsAcquired: string[];
  description: string;
}

export interface MasterProgram {
  id: string;
  title: string;
  universityName: string;
  universityAbbr: string;
  universityId: string;
  city: string;
  fieldCode: string;
  budgetPlaces: number;
  paidPlaces: number;
  tuitionPerYear: number;
  durationYears: number;
  examFormat: string;
  partnerCompanies: string[];
  description: string;
  keySkills: string[];
}

export interface MbaProgram {
  id: string;
  title: string;
  schoolName: string;
  accreditation: string[];
  durationMonths: number;
  format: string;
  experienceRequiredYears: number;
  tuitionTotal: number;
  city: string;
  description: string;
  targetAudience: string;
}

export interface AbroadProgram {
  id: string;
  country: string;
  city: string;
  institution: string;
  degree: string;
  language: string;
  tuitionAnnualUsd: number;
  hasScholarship: boolean;
  scholarshipDetails: string;
  admissionDeadline: string;
  description: string;
  subjects: string[];
}

export interface SubjectPrep {
  slug: string;
  title: string;
  tagline: string;
  examType: 'ЕГЭ' | 'ОГЭ';
  primaryScoreMax: number;
  examDurationMinutes: number;
  averageScoreRussia: number;
  ourStudentsAverageScore: number;
  structure: {
    part1Count: number;
    part2Count: number;
    passingScore: number;
    highScoreThreshold: number;
  };
  pitfalls: {
    title: string;
    description: string;
  }[];
  curriculum: {
    moduleNumber: number;
    title: string;
    topicsCount: number;
    hours: number;
  }[];
  leadTeacher: {
    name: string;
    role: string;
    experienceYears: number;
    graduatesCount: number;
    hundredScorersCount: number;
    bio: string;
  };
  tariffs: {
    name: string;
    priceMonth: number;
    features: string[];
    isPopular?: boolean;
  }[];
}

