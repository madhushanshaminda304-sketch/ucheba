import { INSTITUTIONS, COLLEGES, SCHOOLS } from './institutions';
import { PROGRAMS, MASTER_PROGRAMS, MBA_PROGRAMS, ABROAD_PROGRAMS, COURSES } from './programs';
import { PROFESSIONS, SPECIALITIES } from './careers';
import { OPEN_DAY_EVENTS, OLYMPIADS, RANKINGS } from './events';
import { Institution, Program, College, School, Profession, Speciality, MasterProgram, MbaProgram, AbroadProgram, Course, OpenDayEvent } from '../types';

/**
 * Stable lookup helpers using explicit IDs rather than string matching.
 */

export function getInstitutionById(id: string): Institution | undefined {
  return INSTITUTIONS.find(inst => inst.id === id);
}

export function getInstitutionBySlug(slug: string): Institution | undefined {
  return INSTITUTIONS.find(inst => inst.slug === slug);
}

export function getProgramById(id: string): Program | undefined {
  return PROGRAMS.find(prog => prog.id === id);
}

export function getProgramsByInstitutionId(institutionId: string): Program[] {
  return PROGRAMS.filter(prog => prog.institutionId === institutionId);
}

export function getProgramsByCareerId(careerIdOrSlug: string): Program[] {
  // Check both profession id ('prof1') and slug ('software-engineer')
  const prof = PROFESSIONS.find(p => p.id === careerIdOrSlug || p.slug === careerIdOrSlug);
  if (!prof) return [];
  // Use explicit relatedPrograms IDs
  return PROGRAMS.filter(prog => 
    prof.relatedPrograms.includes(prog.id) || 
    prog.careers.includes(prof.id) || 
    prog.careers.includes(prof.slug)
  );
}

export function getProgramsByFieldId(fieldId: string): Program[] {
  return PROGRAMS.filter(prog => prog.fieldId === fieldId);
}

export function getProfessionById(id: string): Profession | undefined {
  return PROFESSIONS.find(p => p.id === id);
}

export function getProfessionBySlug(slug: string): Profession | undefined {
  return PROFESSIONS.find(p => p.slug === slug);
}

export function getProfessionByIdOrSlug(idOrSlug: string): Profession | undefined {
  return PROFESSIONS.find(p => p.id === idOrSlug || p.slug === idOrSlug);
}

export function getCollegeById(id: string): College | undefined {
  return COLLEGES.find(c => c.id === id);
}

export function getSchoolById(id: string): School | undefined {
  return SCHOOLS.find(s => s.id === id);
}

export function getSpecialityByCode(code: string): Speciality | undefined {
  return SPECIALITIES.find(s => s.code === code);
}

export function getSpecialityBySlug(slug: string): Speciality | undefined {
  return SPECIALITIES.find(s => s.slug === slug);
}

export function getMasterProgramById(id: string): MasterProgram | undefined {
  return MASTER_PROGRAMS.find(m => m.id === id);
}

export function getMbaProgramById(id: string): MbaProgram | undefined {
  return MBA_PROGRAMS.find(m => m.id === id);
}

export function getAbroadProgramById(id: string): AbroadProgram | undefined {
  return ABROAD_PROGRAMS.find(a => a.id === id);
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find(c => c.id === id);
}

export function getEventsByInstitutionId(institutionId: string): OpenDayEvent[] {
  return OPEN_DAY_EVENTS.filter(e => e.institutionId === institutionId);
}
