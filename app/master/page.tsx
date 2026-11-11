'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MASTER_PROGRAMS } from '@/lib/data';
import { 
  GraduationCap, 
  Search, 
  Building, 
  MapPin, 
  Award, 
  Briefcase, 
  ChevronRight, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function MasterProgramsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredPrograms = MASTER_PROGRAMS.filter(prog => {
    if (selectedCity !== 'all' && !prog.city.includes(selectedCity)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prog.title.toLowerCase().includes(q);
      const matchUniv = prog.universityName.toLowerCase().includes(q) || prog.universityAbbr.toLowerCase().includes(q);
      const matchSkills = prog.keySkills.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchUniv && !matchSkills) return false;
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
            <span className="text-slate-800 font-semibold">Магистратура ведущих вузов России</span>
          </div>

          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-brand-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold border border-white/10">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Второй уровень высшего образования</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Магистратура: программы, бюджетные места и гранты
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Каталог академических и индустриальных программ магистратуры НИУ ВШЭ, МГУ, МФТИ, МГТУ им. Баумана и ИТМО. Партнёрские кафедры Яндекса, Сбера и Росатома, портфолио и вступительные испытания.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по направлению, вузу или навыкам (Machine Learning, FinTech, Robotics)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="w-full md:w-56">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Все города</option>
              <option value="Москва">Москва</option>
              <option value="Санкт-Петербург">Санкт-Петербург</option>
            </select>
          </div>
        </div>

        {/* Master Programs List */}
        <div className="space-y-4">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 group"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold">
                      {prog.universityAbbr}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {prog.city}
                    </span>
                    <span className="text-xs text-slate-400">• {prog.fieldCode}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-500">{prog.universityName}</p>
                </div>

                {/* Places & Tuition */}
                <div className="flex items-center gap-6 shrink-0 pt-2 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <span className="text-xs text-slate-500 block">Бюджетных мест</span>
                    <span className="text-xl font-black text-emerald-600">{prog.budgetPlaces}</span>
                  </div>
                  <div className="text-left lg:text-right">
                    <span className="text-xs text-slate-500 block">Платно в год</span>
                    <span className="text-lg font-bold text-slate-900">{prog.tuitionPerYear.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {prog.description}
              </p>

              {/* Skills and Partners */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-slate-500 mr-1">Партнёры:</span>
                  {prog.partnerCompanies.map((comp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {comp}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs">
                  <span>Экзамен: {prog.examFormat}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
