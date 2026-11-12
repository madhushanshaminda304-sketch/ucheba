'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { MBA_PROGRAMS } from '@/lib/data';
import { 
  Briefcase, 
  Award, 
  Search, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Users,
  TrendingUp
} from 'lucide-react';

export default function MbaPage() {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = MBA_PROGRAMS.filter(prog => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prog.title.toLowerCase().includes(q);
      const matchSchool = prog.schoolName.toLowerCase().includes(q);
      if (!matchTitle && !matchSchool) return false;
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
            <span className="text-slate-800 font-semibold">Бизнес-образование и программы MBA</span>
          </div>

          <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
                <Award className="w-3.5 h-3.5" />
                <span>Международные аккредитации AMBA, EQUIS, AACSB</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                MBA и Executive MBA в ведущих бизнес-школах
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Программы для владельцев бизнеса, топ-менеджеров и директоров по развитию. Стратегическое лидерство, цифровая трансформация и элитное сообщество выпускников.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по названию программы или бизнес-школе (Сколково, МГУ, РАНХиГС)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Programs List */}
        <div className="space-y-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                    {prog.schoolName}
                  </span>
                  <div className="flex items-center gap-1">
                    {prog.accreditation.map((acc, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {prog.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {prog.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {prog.durationMonths} месяцев • {prog.format}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Опыт управления от {prog.experienceRequiredYears} лет
                  </span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                <div className="text-left lg:text-right">
                  <span className="text-xs text-slate-500 block">Полная стоимость</span>
                  <span className="text-2xl font-black text-slate-900">{prog.tuitionTotal.toLocaleString('ru-RU')} ₽</span>
                </div>

                <button
                  onClick={() => showToast(`Демо-режим: запрос по программе «${prog.title}» зафиксирован локально. Контакты бизнес-школы: mba@ucheba.ru`, 'info')}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all"
                >
                  Запросить учебный план
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
