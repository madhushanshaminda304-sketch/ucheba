'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { PROGRAMS, INSTITUTIONS, PROFESSIONS } from '@/lib/data';
import { useApp } from '@/lib/AppContext';
import { 
  GraduationCap, 
  MapPin, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Scale, 
  Heart, 
  Award,
  Layers,
  Briefcase,
  ExternalLink,
  Info,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function ProgramDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { toggleFavorite, isFavorite, toggleCompare, isCompared } = useApp();

  const program = PROGRAMS.find(p => p.id === id);
  if (!program) {
    notFound();
  }

  const inst = INSTITUTIONS.find(i => i.id === program.institutionId);

  // Check saved states with typed entity references
  const isFav = isFavorite(program.id, 'program');
  const isComp = isCompared(program.id, 'program');

  const handleToggleFavorite = () => {
    toggleFavorite({
      type: 'program',
      id: program.id,
      title: program.name,
      subtitle: `${program.institutionAbbreviation} • ${program.code}`
    }, program.name);
  };

  const handleToggleCompare = () => {
    toggleCompare({
      type: 'program',
      id: program.id,
      title: program.name,
      subtitle: `${program.institutionAbbreviation} • ${program.code}`
    }, program.name);
  };

  // Resolve careers to full objects where possible
  const relatedCareers = program.careers.map(cId => {
    const prof = PROFESSIONS.find(p => p.id === cId || p.slug === cId);
    return {
      id: cId,
      title: prof ? prof.title : cId,
      slug: prof ? prof.slug : null
    };
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <Link href="/vuz" className="hover:text-brand-600 transition-colors">Вузы</Link>
        <span>/</span>
        <Link href={`/vuz/${program.institutionId}`} className="hover:text-brand-600 transition-colors truncate max-w-[150px]">
          {program.institutionAbbreviation}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-sm">{program.name}</span>
      </nav>

      {/* Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
              {program.code}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700">
              {program.degreeLevel === 'bachelor' ? 'Бакалавриат' : program.degreeLevel === 'specialist' ? 'Специалитет' : 'Магистратура'}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
              {program.durationYears} года • {program.studyMode === 'full-time' ? 'Очная форма' : 'Заочная форма'}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              Приём 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleCompare}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                isComp ? 'bg-brand-50 border-brand-300 text-brand-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Сравнить программу"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                isFav ? 'bg-rose-50 border-rose-300 text-rose-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Сохранить программу в избранное"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {program.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 font-semibold">
            <span>{program.institutionName}</span>
            <span>•</span>
            <span className="text-slate-500">{program.city}</span>
            {program.campusAddress && (
              <>
                <span>•</span>
                <span className="text-xs text-slate-400 font-normal">{program.campusAddress}</span>
              </>
            )}
          </div>
        </div>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          {program.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Порог 2024 (бюджет)</span>
            <span className="text-xl font-black text-slate-900">
              {program.minScoreBudget !== null ? `${program.minScoreBudget} б.` : 'Не указан'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Приказ о зачислении 2024</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Стоимость обучения</span>
            <span className="text-xl font-black text-slate-900">
              {program.cost?.amount !== null && program.cost?.amount !== undefined
                ? `${(program.cost.amount / 1000).toFixed(0)} тыс. ${program.cost.currency === 'RUB' ? '₽' : program.cost.currency}/${program.cost.period === 'year' ? 'год' : program.cost.period === 'semester' ? 'сем.' : program.cost.period === 'month' ? 'мес.' : 'курс'}`
                : program.tuitionPerYear !== null
                  ? `${(program.tuitionPerYear / 1000).toFixed(0)} тыс. ₽/год`
                  : 'Уточняется'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {program.studyMode === 'full-time' ? 'Очная форма' : program.studyMode === 'part-time' ? 'Очно-заочная' : 'Заочная'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Бюджетных мест</span>
            <span className="text-xl font-black text-slate-900">
              {program.budgetPlaces !== null ? `${program.budgetPlaces} мест` : 'По запросу'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">План приёма</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Платных мест</span>
            <span className="text-xl font-black text-slate-900">
              {program.paidPlaces !== null ? `${program.paidPlaces} мест` : 'По запросу'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">План приёма</span>
          </div>
        </div>

        {/* Exams Required */}
        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 space-y-1.5">
          <span className="text-xs font-bold text-brand-800 uppercase tracking-wider block">
            Вступительные испытания (ЕГЭ / ДВИ):
          </span>
          <div className="flex flex-wrap gap-2">
            {program.subjectsRequired.map((sub, idx) => (
              <span key={idx} className="px-3 py-1 rounded-xl bg-white border border-brand-200 text-xs font-bold text-brand-900 shadow-sm">
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Application Link & Evidence Metadata */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
              program.evidence?.verificationStatus === 'verified'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-800'
            }`}>
              {program.evidence?.verificationStatus === 'verified'
                ? 'Проверено'
                : program.evidence?.verificationStatus === 'historical'
                  ? 'Исторические данные'
                  : program.evidence?.verificationStatus === 'demo'
                    ? 'Демо-данные'
                    : 'Не проверено'}
            </span>
            {program.evidence?.academicYear && (
              <span>Учебный год: {program.evidence.academicYear}</span>
            )}
            {program.evidence?.lastCheckedDate && (
              <span>• Проверено: {program.evidence.lastCheckedDate}</span>
            )}
            {program.evidence?.sourceName && (
              <span>• Источник: {program.evidence.sourceName}</span>
            )}
          </div>
          {program.applicationUrl && (
            <a
              href={program.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-brand-600 hover:text-brand-700 transition-colors"
            >
              <span>Сайт приёмной комиссии</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Curriculum Breakdown - Displayed ONLY when program-specific curriculum exists */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Учебный план</div>
            <h2 className="text-2xl font-black text-slate-900">Дисциплины и модули программы</h2>
          </div>
          {program.curriculum && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              program.curriculumStatus === 'official' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}>
              {program.curriculumStatus === 'official' ? 'Официальный учебный план' : 'Примерный / иллюстративный план'}
            </span>
          )}
        </div>

        {program.curriculum && program.curriculum.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {program.curriculum.map(sem => (
              <div key={sem.number} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-brand-600 block">{sem.title}</span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {sem.subjects.map((sub, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <Info className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Рабочий учебный план программы утверждается учёным советом факультета</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Детальное посеместровое расписание дисциплин, практик и курсовых проектов для направления «{program.name}» публикуется на официальном портале факультета перед началом учебного года.
            </p>
            {inst && (
              <a
                href={program.applicationUrl || inst.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <span>Уточнить учебный план на сайте {inst.abbreviation}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Career Trajectory */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Трудоустройство</div>
          <h2 className="text-2xl font-black text-slate-900">Профессии и траектории выпускников</h2>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {relatedCareers.map((c, idx) => (
            c.slug ? (
              <Link
                key={idx}
                href={`/prof/${c.slug}`}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors border border-transparent hover:border-brand-200"
              >
                <Briefcase className="w-3.5 h-3.5 text-brand-600" />
                <span>{c.title}</span>
              </Link>
            ) : (
              <span key={idx} className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>{c.title}</span>
              </span>
            )
          ))}
        </div>
      </div>

      {/* University Card Callout */}
      {inst && (
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400">Учебное заведение:</span>
            <h3 className="font-bold text-lg">{inst.name}</h3>
            <span className="text-xs text-slate-400">{inst.city}, {inst.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={inst.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5"
            >
              <span>Сайт вуза</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href={`/vuz/${inst.id}`}
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shrink-0 text-center transition-all shadow-md"
            >
              Все программы вуза
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
