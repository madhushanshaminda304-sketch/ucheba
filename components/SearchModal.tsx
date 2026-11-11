'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { INSTITUTIONS, COLLEGES, SPECIALITIES, PROFESSIONS, SCHOOLS, COURSES } from '@/lib/data';
import { 
  Search, 
  X, 
  GraduationCap, 
  School, 
  BookOpen, 
  Briefcase, 
  Sparkles, 
  ArrowRight,
  Layers,
  Award,
  Laptop
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (e.key === 'Enter' && isOpen && query.trim()) {
        e.preventDefault();
        onClose();
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, query, router]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedInstitutions = q ? INSTITUTIONS.filter(i => 
    i.name.toLowerCase().includes(q) || i.abbreviation.toLowerCase().includes(q) || i.city.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedSchools = q ? SCHOOLS.filter(s =>
    s.name.toLowerCase().includes(q) || s.shortName.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const matchedCourses = q ? COURSES.filter(c =>
    c.title.toLowerCase().includes(q) || c.provider.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const matchedSpecialities = q ? SPECIALITIES.filter(s => 
    s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const matchedProfessions = q ? PROFESSIONS.filter(p => 
    p.title.toLowerCase().includes(q) || p.keySkills.some(sk => sk.toLowerCase().includes(q))
  ).slice(0, 2) : [];

  const matchedColleges = q ? COLLEGES.filter(c => 
    c.name.toLowerCase().includes(q) || c.abbreviation.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const hasResults = 
    matchedInstitutions.length > 0 || 
    matchedSchools.length > 0 ||
    matchedCourses.length > 0 ||
    matchedSpecialities.length > 0 || 
    matchedProfessions.length > 0 || 
    matchedColleges.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[80vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Поиск вуза, школы, специальности, профессии, курса..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 font-medium placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-md bg-slate-200/60 text-slate-600 text-xs font-semibold hover:bg-slate-300 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-5">
          {!q ? (
            /* Popular Quick Links */
            <div className="space-y-3 py-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Быстрые разделы
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                <Link
                  href="/vuz?tag=it"
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-brand-600" />
                  <span>IT-вузы России</span>
                </Link>
                <Link
                  href="/school"
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Школы и лицеи</span>
                </Link>
                <Link
                  href="/courses"
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center gap-2"
                >
                  <Laptop className="w-4 h-4 text-emerald-600" />
                  <span>Курсы и IT-профессии</span>
                </Link>
                <Link
                  href="/speciality"
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Специальности ОКСО</span>
                </Link>
                <Link
                  href="/proftest"
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Тест на профориентацию</span>
                </Link>
                <Link
                  href="/training"
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  <span>Тренажёр заданий ЕГЭ</span>
                </Link>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              Ничего не найдено по запросу «{query}». Попробуйте другое слово или перейдите на страницу поиска.
            </div>
          ) : (
            <>
              {/* Universities Results */}
              {matchedInstitutions.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                    Вузы ({matchedInstitutions.length})
                  </div>
                  <div className="space-y-1">
                    {matchedInstitutions.map(inst => (
                      <Link
                        key={inst.id}
                        href={`/vuz/${inst.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-lg ${inst.logoBg} text-white font-black text-xs flex items-center justify-center shrink-0`}>
                            {inst.logoLetter}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors block">
                              {inst.name}
                            </span>
                            <span className="text-xs text-slate-400">{inst.city} • балл от {inst.minBudgetScore}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Schools Results */}
              {matchedSchools.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                    Школы и лицеи ({matchedSchools.length})
                  </div>
                  <div className="space-y-1">
                    {matchedSchools.map(school => (
                      <Link
                        key={school.id}
                        href={`/school/${school.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                            №{school.rankingRank}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors block">
                              {school.shortName}
                            </span>
                            <span className="text-xs text-slate-400">{school.city} • ср. балл ЕГЭ {school.averageEgeScore}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Results */}
              {matchedCourses.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                    Курсы и ДПО ({matchedCourses.length})
                  </div>
                  <div className="space-y-1">
                    {matchedCourses.map(course => (
                      <Link
                        key={course.id}
                        href="/courses"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
                            <Laptop className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors block">
                              {course.title}
                            </span>
                            <span className="text-xs text-slate-400">{course.provider} • {course.pricePerMonthInstallment.toLocaleString('ru-RU')} ₽/мес</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Specialties Results */}
              {matchedSpecialities.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                    Специальности ({matchedSpecialities.length})
                  </div>
                  <div className="space-y-1">
                    {matchedSpecialities.map(spec => (
                      <Link
                        key={spec.id}
                        href="/speciality"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                            {spec.code}
                          </span>
                          <span className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">
                            {spec.name}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Professions Results */}
              {matchedProfessions.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                    Профессии ({matchedProfessions.length})
                  </div>
                  <div className="space-y-1">
                    {matchedProfessions.map(prof => (
                      <Link
                        key={prof.id}
                        href={`/prof/${prof.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors block">
                              {prof.title}
                            </span>
                            <span className="text-xs text-slate-400">зарплата от {(prof.salaryMiddle / 1000).toFixed(0)} тыс. ₽</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Colleges Results */}
              {matchedColleges.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                    Колледжи ({matchedColleges.length})
                  </div>
                  <div className="space-y-1">
                    {matchedColleges.map(col => (
                      <Link
                        key={col.id}
                        href={`/colleges/${col.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                            <School className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">
                            {col.name}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Link to Full Search Page */}
        {query.trim() && (
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <Link
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={onClose}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center justify-center gap-1.5"
            >
              <span>Показать все результаты для «{query}» на странице поиска</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
