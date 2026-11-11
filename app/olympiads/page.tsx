'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { OLYMPIADS } from '@/lib/data';
import { 
  Award, 
  Search, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function OlympiadsPage() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const subjectsList = ['Все предметы', 'Математика', 'Информатика', 'Физика', 'Химия', 'Обществознание', 'Экономика', 'Дизайн'];

  const filteredOlympiads = useMemo(() => {
    return OLYMPIADS.filter(olymp => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = olymp.name.toLowerCase().includes(q);
        const matchesOrg = olymp.organizer.toLowerCase().includes(q);
        const matchesSubs = olymp.subjects.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesOrg && !matchesSubs) return false;
      }
      if (levelFilter !== 'all' && olymp.level !== levelFilter) return false;
      if (subjectFilter !== 'Все предметы' && !olymp.subjects.some(s => s.toLowerCase().includes(subjectFilter.toLowerCase()))) return false;
      return true;
    });
  }, [search, levelFilter, subjectFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Олимпиады для школьников</span>
      </nav>

      {/* Hero Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/60">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Поступление без вступительных испытаний (БВИ)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Перечень олимпиад школьников 2026: РСОШ и ВсОШ
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Победа или призовое место в олимпиадах из перечня Министерства науки и высшего образования РФ дают право на зачисление в вузы без экзаменов или 100 баллов за профильный ЕГЭ.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Поиск по названию («Ломоносов», «Высшая проба», «Физтех») или вузу-организатору..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              <option value="all">Все уровни олимпиад</option>
              <option value="ВсОШ">Всероссийская олимпиада (ВсОШ)</option>
              <option value="1 уровень">1 уровень РСОШ (Максимальные льготы)</option>
              <option value="2 уровень">2 уровень РСОШ</option>
            </select>
          </div>
        </div>

        {/* Subjects bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {subjectsList.map(sub => (
            <button
              key={sub}
              onClick={() => setSubjectFilter(sub)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                subjectFilter === sub
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Olympiads List */}
      <div className="space-y-4">
        {filteredOlympiads.map(olymp => (
          <div
            key={olymp.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 hover:shadow-card-hover transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-md ${
                    olymp.level === 'ВсОШ' 
                      ? 'bg-purple-50 text-purple-800 border border-purple-200' 
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {olymp.level}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Организатор: {olymp.organizer}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                    {olymp.targetGrades}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                  {olymp.name}
                </h2>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-xs text-slate-400 block font-medium">Сроки проведения</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{olymp.deadline}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {olymp.description}
            </p>

            {/* Special Benefit Badge */}
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-950 font-medium">
              <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Предоставляемые льготы:</strong> {olymp.benefit}
              </div>
            </div>

            {/* Subjects and CTA */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Предметы:</span>
                {olymp.subjects.map((sub, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium">
                    {sub}
                  </span>
                ))}
              </div>

              <a
                href={olymp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <span>Официальный сайт олимпиады</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
