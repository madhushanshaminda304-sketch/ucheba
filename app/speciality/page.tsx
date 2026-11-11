'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SPECIALITIES, EDUCATIONAL_DOMAINS } from '@/lib/data';
import { 
  Search, 
  GraduationCap, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Filter
} from 'lucide-react';

export default function SpecialitiesPage() {
  const [search, setSearch] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [degreeFilter, setDegreeFilter] = useState<'all' | 'bachelor' | 'specialist'>('all');

  const filteredSpecialities = useMemo(() => {
    return SPECIALITIES.filter(spec => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = spec.name.toLowerCase().includes(q);
        const matchesCode = spec.code.toLowerCase().includes(q);
        const matchesDesc = spec.description.toLowerCase().includes(q);
        const matchesProfs = spec.relatedProfessions.some(p => p.toLowerCase().includes(q));
        if (!matchesName && !matchesCode && !matchesDesc && !matchesProfs) return false;
      }
      if (selectedField !== 'all' && spec.fieldId !== selectedField) return false;
      if (degreeFilter !== 'all' && spec.degreeLevel !== degreeFilter) return false;
      return true;
    });
  }, [search, selectedField, degreeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Специальности высшего образования</span>
      </nav>

      {/* Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>Классификатор направлений подготовки РФ (ОКСО)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Каталог специальностей бакалавриата и специалитета
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Сравните проходные баллы, количество бюджетных мест по всей России, обязательные экзамены ЕГЭ и список профессий, которые можно освоить по каждому направлению.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Поиск по коду (09.03.04) или названию (Программная инженерия, Лечебное дело)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={degreeFilter}
              onChange={(e) => setDegreeFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              <option value="all">Все уровни квалификации</option>
              <option value="bachelor">Бакалавриат (4 года)</option>
              <option value="specialist">Специалитет (5–6 лет)</option>
            </select>
          </div>
        </div>

        {/* Domain Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedField('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              selectedField === 'all'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Все направления
          </button>
          {EDUCATIONAL_DOMAINS.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedField(d.slug)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                selectedField === d.slug
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Specialities List */}
      <div className="space-y-4">
        {filteredSpecialities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            Специальности не найдены. Попробуйте изменить фильтры.
          </div>
        ) : (
          filteredSpecialities.map(spec => (
            <div
              key={spec.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-800">
                      {spec.code}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-brand-50 text-brand-700">
                      {spec.degreeLevel === 'bachelor' ? 'Бакалавриат (4 года)' : 'Специалитет (5–6 лет)'}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {spec.fieldName}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {spec.name}
                  </h2>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400 block font-medium">Средний проходной балл</span>
                  <span className="text-lg font-black text-slate-900">от {spec.minBudgetScore} баллов</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {spec.description}
              </p>

              {/* Stats & Requirements Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Бюджетных мест в РФ:</span>
                  <span className="font-bold text-slate-800">{spec.budgetPlacesTotal.toLocaleString()} мест</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Обучают вузов:</span>
                  <span className="font-bold text-slate-800">{spec.universitiesCount} университетов</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Необходимые экзамены ЕГЭ:</span>
                  <span className="font-bold text-brand-700 truncate block">
                    {spec.examsRequired.join(' • ')}
                  </span>
                </div>
              </div>

              {/* Related Careers */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 font-semibold">Профессии:</span>
                  {spec.relatedProfessions.map((prof, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {prof}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/vuz?q=${encodeURIComponent(spec.name)}`}
                  className="inline-flex items-center gap-1 font-bold text-brand-600 hover:text-brand-800"
                >
                  <span>Вузы с этой специальностью</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
