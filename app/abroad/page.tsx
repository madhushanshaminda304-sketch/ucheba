'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { ABROAD_PROGRAMS } from '@/lib/data';
import { 
  Globe, 
  Search, 
  Award, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function AbroadPage() {
  const { showToast } = useApp();
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [onlyScholarships, setOnlyScholarships] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = ABROAD_PROGRAMS.filter(prog => {
    if (selectedCountry !== 'all' && prog.country !== selectedCountry) return false;
    if (onlyScholarships && !prog.hasScholarship) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchInst = prog.institution.toLowerCase().includes(q);
      const matchCity = prog.city.toLowerCase().includes(q);
      const matchSubjects = prog.subjects.some(s => s.toLowerCase().includes(q));
      if (!matchInst && !matchCity && !matchSubjects) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-800 transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">Обучение за рубежом и международные стипендии</span>
          </div>

          <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/10">
                <Globe className="w-3.5 h-3.5" />
                <span>Международное образование 2026</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Университеты за рубежом, гранты и стипендии
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Бакалавриат и магистратура на английском языке в ведущих технологических и бизнес-университетах Китая, ОАЭ, Германии, Италии и Турции. Программы с полным покрытием стоимости обучения (Full Scholarship).
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по университету или специальности (Computer Science, Architecture, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">Все страны</option>
              <option value="Китай">Китай</option>
              <option value="ОАЭ">ОАЭ</option>
              <option value="Италия">Италия</option>
              <option value="Германия">Германия</option>
              <option value="Турция">Турция</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={onlyScholarships}
                onChange={(e) => setOnlyScholarships(e.target.checked)}
                className="rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Только со стипендиями и грантами</span>
            </label>
          </div>
        </div>

        {/* Programs List */}
        <div className="space-y-4">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 group"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-800">
                      🌍 {prog.country}, {prog.city}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      {prog.degree}
                    </span>
                    <span className="text-xs text-slate-500">Язык: {prog.language}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {prog.institution}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {prog.description}
                  </p>
                </div>

                <div className="text-left lg:text-right shrink-0 pt-2 lg:pt-0">
                  <span className="text-xs text-slate-500 block">Стоимость в год</span>
                  <span className="text-2xl font-black text-slate-900">
                    {prog.tuitionAnnualUsd === 0 ? '0 $ (Грант)' : `$ ${prog.tuitionAnnualUsd.toLocaleString('en-US')}`}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center lg:justify-end gap-1">
                    <Calendar className="w-3 h-3" />
                    Дедлайн: {prog.admissionDeadline}
                  </div>
                </div>
              </div>

              {/* Scholarship Highlight Banner */}
              {prog.hasScholarship && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Доступная стипендия:</strong> {prog.scholarshipDetails}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-medium">Направления:</span>
                  {prog.subjects.map((sub, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {sub}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => showToast(`Заявка на консультацию по поступлению в ${prog.institution} принята! Мы поможем подготовить пакет документов.`, 'success')}
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Оформить заявку на грант
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
