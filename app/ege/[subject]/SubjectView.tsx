'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SubjectPrep } from '@/lib/types';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Star,
  Users,
  ShieldCheck
} from 'lucide-react';

interface Props {
  data: SubjectPrep;
  subject: string;
}

export default function SubjectView({ data, subject }: Props) {
  const [enrolledMsg, setEnrolledMsg] = useState('');

  const allSubjects = [
    { slug: 'mathematics', title: 'Математика' },
    { slug: 'russian', title: 'Русский язык' },
    { slug: 'informatics', title: 'Информатика' },
    { slug: 'physics', title: 'Физика' },
    { slug: 'social', title: 'Обществознание' },
    { slug: 'chemistry', title: 'Химия' },
    { slug: 'biology', title: 'Биология' },
    { slug: 'history', title: 'История' },
    { slug: 'english', title: 'Английский' },
    { slug: 'literature', title: 'Литература' },
  ];

  const handleEnroll = (label: string) => {
    setEnrolledMsg(`Вы успешно записались: ${label}! Координатор свяжется с вами в Telegram.`);
    setTimeout(() => setEnrolledMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/ege" className="hover:text-slate-800 transition-colors">Подготовка к ЕГЭ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">{data.title}</span>
        </div>

        {/* Success Alert */}
        {enrolledMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{enrolledMsg}</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Официальная спецификация КИМ ФИПИ 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {data.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {data.tagline}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                <span className="text-xs text-white/70 block">Ср. балл выпускников</span>
                <span className="text-2xl font-black text-amber-300">{data.ourStudentsAverageScore}</span>
                <span className="text-[10px] text-white/60 block">по РФ: {data.averageScoreRussia}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                <span className="text-xs text-white/70 block">Длительность</span>
                <span className="text-xl font-bold text-white">{Math.floor(data.examDurationMinutes / 60)} ч {data.examDurationMinutes % 60} мин</span>
                <span className="text-[10px] text-white/60 block">{data.examDurationMinutes} минут</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                <span className="text-xs text-white/70 block">Первичный максимум</span>
                <span className="text-2xl font-black text-emerald-300">{data.primaryScoreMax}</span>
                <span className="text-[10px] text-white/60 block">100 тестовых баллов</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                <span className="text-xs text-white/70 block">Заданий в КИМ</span>
                <span className="text-xl font-bold text-white">{data.structure.part1Count + data.structure.part2Count}</span>
                <span className="text-[10px] text-white/60 block">Часть 1 ({data.structure.part1Count}) + Часть 2 ({data.structure.part2Count})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Quick Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {allSubjects.map((sub) => {
            const isActive = sub.slug === subject;
            return (
              <Link
                key={sub.slug}
                href={`/ege/${sub.slug}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {sub.title}
              </Link>
            );
          })}
        </div>

        {/* 2 Cols: Pitfalls & Teacher */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2 cols: Pitfalls & Curriculum */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Top Pitfalls */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-slate-900">
                  Топ-3 ловушки и типичные ошибки по статистике ФИПИ
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Именно на этих нюансах выпускники теряют критические баллы при поступлении на бюджет.
              </p>

              <div className="space-y-3 pt-2">
                {data.pitfalls.map((pit, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-amber-950 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-black shrink-0">
                        {idx + 1}
                      </span>
                      <span>{pit.title}</span>
                    </h4>
                    <p className="text-xs text-amber-900 leading-relaxed pl-7">
                      {pit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Modules */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  Учебный план курса подготовки
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Пошаговое освоение кодификатора ФИПИ от базовых прототипов до уровня 90+ и олимпиадных методов.
              </p>

              <div className="space-y-3 pt-2">
                {data.curriculum.map((mod) => (
                  <div
                    key={mod.moduleNumber}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 font-black text-xs flex items-center justify-center shrink-0">
                        {mod.moduleNumber}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{mod.title}</h4>
                        <span className="text-xs text-slate-500">{mod.topicsCount} тем занятий</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 px-3 py-1 rounded-lg bg-white border border-slate-200 shrink-0">
                      {mod.hours} ак. часов
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: Teacher Profile & Fast Action */}
          <div className="space-y-6">
            
            {/* Teacher Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Ведущий преподаватель
              </span>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-md">
                  {data.leadTeacher.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{data.leadTeacher.name}</h3>
                  <p className="text-xs text-brand-600 font-semibold">{data.leadTeacher.role}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {data.leadTeacher.bio}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-center">
                <div className="p-3 rounded-xl bg-slate-50">
                  <span className="text-xs text-slate-400 block">Опыт работы</span>
                  <span className="text-base font-bold text-slate-900">{data.leadTeacher.experienceYears} лет</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <span className="text-xs text-slate-400 block">Стобалльников</span>
                  <span className="text-base font-black text-amber-600">{data.leadTeacher.hundredScorersCount}</span>
                </div>
              </div>
            </div>

            {/* Trial Lesson CTA */}
            <div className="bg-gradient-to-br from-brand-700 to-indigo-900 rounded-3xl p-6 text-white shadow-lg space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Бесплатный пробный урок</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Пройдите входное тестирование, разберите формат КИМ 2026 и получите индивидуальный план подготовки на 80+ баллов.
              </p>
              <button
                onClick={() => handleEnroll(`Пробный урок по предмету ${data.title}`)}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                Записаться на пробный урок
              </button>
            </div>

          </div>

        </div>

        {/* Tariffs Grid */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Тарифы подготовки к {data.title}</h2>
            <p className="text-xs text-slate-500">
              Выберите подходящий формат занятий: вебинары с автопроверкой или индивидуальный наставник-стобалльник.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.tariffs.map((tariff, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6 flex flex-col justify-between ${
                  tariff.isPopular ? 'border-2 border-brand-500 shadow-lg relative bg-gradient-to-b from-brand-50/40 to-white' : 'border-slate-200'
                }`}
              >
                {tariff.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    Рекомендуемый выбор
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">{tariff.name}</h3>
                  <div className="text-3xl font-black text-slate-900">
                    {tariff.priceMonth.toLocaleString('ru-RU')} ₽ <span className="text-xs font-normal text-slate-400">/ мес</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                    {tariff.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleEnroll(`Тариф «${tariff.name}» (${data.title})`)}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                    tariff.isPopular
                      ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20'
                      : 'border-2 border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  Выбрать тариф
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
