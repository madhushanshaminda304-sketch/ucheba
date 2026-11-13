'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { PROFESSIONS, getProgramsByCareerId } from '@/lib/data';
import { 
  Briefcase, 
  TrendingUp, 
  GraduationCap, 
  CheckCircle2, 
  DollarSign, 
  ArrowRight,
  BookOpen,
  MapPin,
  Award
} from 'lucide-react';

export default function ProfessionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const prof = PROFESSIONS.find(p => p.slug === slug);
  if (!prof) {
    notFound();
  }

  // Find educational programs matching this profession via explicit ID relationships
  const relatedPrograms = getProgramsByCareerId(prof.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <Link href="/prof" className="hover:text-brand-600 transition-colors">Профессии</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-sm">{prof.title}</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 rounded-md bg-brand-50 text-brand-700">
            {prof.category}
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            Спрос на рынке: {prof.demandLevel}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {prof.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {prof.fullDescription}
        </p>

        {/* Salary Analytics Grid */}
        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Уровень дохода специалистов в России (2026):
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Junior (до 1 года)</span>
              <span className="text-xl font-black text-slate-800 mt-1 block">
                от {(prof.salaryJunior / 1000).toFixed(0)} 000 ₽
              </span>
              <span className="text-[11px] text-slate-500">Стажёр / Младший специалист</span>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200">
              <span className="text-xs text-brand-700 block font-medium">Middle (1–3 года опыта)</span>
              <span className="text-2xl font-black text-brand-700 mt-1 block">
                от {(prof.salaryMiddle / 1000).toFixed(0)} 000 ₽
              </span>
              <span className="text-[11px] text-brand-600">Самостоятельный специалист</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Senior / Lead (от 4 лет)</span>
              <span className="text-xl font-black text-slate-800 mt-1 block">
                от {(prof.salarySenior / 1000).toFixed(0)} 000 ₽
              </span>
              <span className="text-[11px] text-slate-500">Архитектор / Руководитель группы</span>
            </div>
          </div>
        </div>

        {/* Skills Required */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Ключевые навыки и компетенции:</h2>
          <div className="flex flex-wrap gap-2">
            {prof.keySkills.map((skill, idx) => (
              <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Where to Study Section */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Образовательная траектория</div>
          <h2 className="text-2xl font-black text-slate-900">
            Где учиться на профессию «{prof.title.split('(')[0].trim()}»
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Программы бакалавриата и специалитета ведущих университетов России
          </p>
        </div>

        {relatedPrograms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
            Для данной профессии рекомендуем ознакомиться с общим каталогом программ по направлению {prof.category}.
          </div>
        ) : (
          <div className="space-y-4">
            {relatedPrograms.map(prog => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {prog.code}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                        {prog.degreeLevel === 'bachelor' ? 'Бакалавриат' : 'Специалитет'}
                      </span>
                      <span className="text-xs text-slate-400">
                        {prog.city}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      <Link href={`/vuz/${prog.institutionId}`} className="hover:text-brand-600 transition-colors">
                        {prog.name}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {prog.institutionName}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Балл на бюджет</span>
                    <span className="text-lg font-black text-slate-800">
                      {prog.minScoreBudget !== null ? `${prog.minScoreBudget} б.` : 'Не указан'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Экзамены: {prog.subjectsRequired.join(', ')}
                  </span>
                  <Link
                    href={`/vuz/${prog.institutionId}`}
                    className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <span>Смотреть вуз</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
