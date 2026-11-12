'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  INSTITUTIONS, 
  COLLEGES, 
  SPECIALITIES, 
  PROFESSIONS, 
  ARTICLES, 
  SCHOOLS, 
  COURSES, 
  MASTER_PROGRAMS 
} from '@/lib/data';
import { 
  Search, 
  GraduationCap, 
  School as SchoolIcon, 
  BookOpen, 
  Briefcase, 
  Laptop, 
  FileText, 
  ChevronRight, 
  MapPin, 
  Award,
  Sparkles
} from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const q = query.trim().toLowerCase();

  // Search results calculation
  const vuzResults = INSTITUTIONS.filter(v => 
    !q || v.name.toLowerCase().includes(q) || v.abbreviation.toLowerCase().includes(q) || v.city.toLowerCase().includes(q)
  );

  const collegeResults = COLLEGES.filter(c =>
    !q || c.name.toLowerCase().includes(q) || c.abbreviation.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
  );

  const schoolResults = SCHOOLS.filter(s =>
    !q || s.name.toLowerCase().includes(q) || s.shortName.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
  );

  const specialityResults = SPECIALITIES.filter(s =>
    !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
  );

  const professionResults = PROFESSIONS.filter(p =>
    !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.keySkills.some(k => k.toLowerCase().includes(q))
  );

  const courseResults = COURSES.filter(c =>
    !q || c.title.toLowerCase().includes(q) || c.provider.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q))
  );

  const articleResults = ARTICLES.filter(a =>
    !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
  );

  const totalResultsCount = 
    vuzResults.length + 
    collegeResults.length + 
    schoolResults.length + 
    specialityResults.length + 
    professionResults.length + 
    courseResults.length + 
    articleResults.length;

  const tabs = [
    { id: 'all', label: 'Все результаты', count: totalResultsCount },
    { id: 'vuz', label: 'Вузы', count: vuzResults.length, icon: GraduationCap },
    { id: 'college', label: 'Колледжи', count: collegeResults.length, icon: SchoolIcon },
    { id: 'school', label: 'Школы', count: schoolResults.length, icon: Award },
    { id: 'speciality', label: 'Специальности', count: specialityResults.length, icon: BookOpen },
    { id: 'prof', label: 'Профессии', count: professionResults.length, icon: Briefcase },
    { id: 'course', label: 'Курсы', count: courseResults.length, icon: Laptop },
    { id: 'article', label: 'Статьи', count: articleResults.length, icon: FileText },
  ];

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Поиск по порталу</span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Поиск по образовательному каталогу
          </h1>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Введите название вуза, школы, специальности, профессии или курса..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-base focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-inner"
            />
          </div>

          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>
              По запросу «<strong className="text-slate-900">{query || 'Все категории'}</strong>» найдено {totalResultsCount} совпадений
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results Content */}
      <div className="space-y-8">
        
        {/* VUZ section */}
        {(activeTab === 'all' || activeTab === 'vuz') && vuzResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-600" />
                <span>Университеты ({vuzResults.length})</span>
              </h2>
              {activeTab === 'all' && (
                <button onClick={() => setActiveTab('vuz')} className="text-xs text-brand-600 font-semibold hover:underline">
                  Смотреть все вузы →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(activeTab === 'all' ? vuzResults.slice(0, 4) : vuzResults).map(vuz => (
                <Link
                  key={vuz.id}
                  href={`/vuz/${vuz.id}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all space-y-2 block group"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 text-xs font-bold">
                      {vuz.abbreviation}
                    </span>
                    <span className="text-xs text-slate-500">{vuz.city}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                    {vuz.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Бюджет от: <strong className="text-brand-600">{vuz.minBudgetScore !== null ? `${vuz.minBudgetScore} б.` : 'Уточняется'}</strong></span>
                    <span>{vuz.programsCount} программ</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Colleges section */}
        {(activeTab === 'all' || activeTab === 'college') && collegeResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <SchoolIcon className="w-5 h-5 text-amber-600" />
                <span>Колледжи и техникумы ({collegeResults.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(activeTab === 'all' ? collegeResults.slice(0, 4) : collegeResults).map(col => (
                <Link
                  key={col.id}
                  href={`/colleges/${col.id}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all space-y-2 block group"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-xs font-bold">
                      {col.abbreviation}
                    </span>
                    <span className="text-xs text-slate-500">{col.city}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                    {col.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Ср. балл аттестата: <strong className="text-slate-900">{col.averageGpaBudget}</strong></span>
                    <span>{col.specialties.length} специальностей</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Schools section */}
        {(activeTab === 'all' || activeTab === 'school') && schoolResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Школы и лицеи ({schoolResults.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(activeTab === 'all' ? schoolResults.slice(0, 4) : schoolResults).map(school => (
                <Link
                  key={school.id}
                  href={`/school/${school.id}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-2 block group"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-xs font-bold">
                      № {school.rankingRank} в рейтинге
                    </span>
                    <span className="text-xs text-slate-500">{school.city}, {school.metro}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                    {school.shortName}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Ср. балл ЕГЭ: <strong className="text-blue-600">{school.averageEgeScore}</strong></span>
                    <span>{school.olympiadWinnersCount} олимпиадников</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Specialties section */}
        {(activeTab === 'all' || activeTab === 'speciality') && specialityResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Специальности ОКСО ({specialityResults.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(activeTab === 'all' ? specialityResults.slice(0, 4) : specialityResults).map(spec => (
                <Link
                  key={spec.id}
                  href="/speciality"
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between gap-4 group"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-600 block">{spec.code}</span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{spec.name}</span>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">{spec.universitiesCount} вузов</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Professions section */}
        {(activeTab === 'all' || activeTab === 'prof') && professionResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <span>Профессии ({professionResults.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(activeTab === 'all' ? professionResults.slice(0, 4) : professionResults).map(prof => (
                <Link
                  key={prof.id}
                  href={`/prof/${prof.slug}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition-all flex items-center justify-between gap-4 group"
                >
                  <div>
                    <span className="text-xs font-bold text-purple-600 block">{prof.category}</span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{prof.title}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 shrink-0">
                    до {prof.salarySenior.toLocaleString('ru-RU')} ₽
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Courses section */}
        {(activeTab === 'all' || activeTab === 'course') && courseResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-emerald-600" />
              <span>Курсы и ДПО ({courseResults.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(activeTab === 'all' ? courseResults.slice(0, 4) : courseResults).map(course => (
                <Link
                  key={course.id}
                  href="/courses"
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between gap-4 group"
                >
                  <div>
                    <span className="text-xs font-bold text-emerald-600 block">{course.provider}</span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{course.title}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 shrink-0">
                    {course.pricePerMonthInstallment.toLocaleString('ru-RU')} ₽/мес
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles section */}
        {(activeTab === 'all' || activeTab === 'article') && articleResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-rose-600" />
              <span>Статьи журнала ({articleResults.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(activeTab === 'all' ? articleResults.slice(0, 4) : articleResults).map(art => (
                <Link
                  key={art.id}
                  href={`/journal/${art.slug}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-rose-300 transition-all flex items-center justify-between gap-4 group"
                >
                  <div>
                    <span className="text-xs font-bold text-rose-600 block">{art.category}</span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{art.title}</span>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{art.readTimeMinutes} мин</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="p-12 text-center text-slate-500">Загрузка поисковой выдачи...</div>}>
          <SearchResultsContent />
        </Suspense>
      </div>
    </div>
  );
}
