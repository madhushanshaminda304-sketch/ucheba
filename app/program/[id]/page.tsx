'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { PROGRAMS, INSTITUTIONS } from '@/lib/data';
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
  Briefcase
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

  const semesters = [
    { number: 1, title: '1 курс, 1 семестр', subjects: ['Математический анализ I', 'Линейная алгебра и геометрия', 'Основы программирования (C++)', 'Иностранный язык'] },
    { number: 2, title: '1 курс, 2 семестр', subjects: ['Математический анализ II', 'Дискретная математика', 'Алгоритмы и структуры данных', 'Архитектура ЭВМ и ассемблер'] },
    { number: 3, title: '2 курс, 3 семестр', subjects: ['Теория вероятностей и мат. статистика', 'Объектно-ориентированное программирование (Java/C#)', 'Операционные системы', 'Базы данных (SQL)'] },
    { number: 4, title: '2 курс, 4 семестр', subjects: ['Компьютерные сети', 'Веб-разработка (Frontend/Backend)', 'Тестирование ПО', 'Практика в IT-компании'] },
    { number: 5, title: '3 курс, 5 семестр', subjects: ['Машинное обучение и анализ данных', 'Распределенные и облачные системы', 'Архитектура микросервисов', 'Проектный практикум'] },
    { number: 6, title: '3 курс, 6 семестр', subjects: ['Безопасность программных систем', 'DevOps и CI/CD пайплайны', 'Мобильная разработка', 'Курсовой проект'] },
    { number: 7, title: '4 курс, 7 семестр', subjects: ['Глубокое обучение и нейросети', 'Управление программными проектами (Agile/Scrum)', 'Научно-исследовательский семинар'] },
    { number: 8, title: '4 курс, 8 семестр', subjects: ['Преддипломная производственная практика', 'Подготовка выпускной квалификационной работы (ВКР)', 'Защита диплома'] },
  ];

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
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
              {program.code}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700">
              {program.degreeLevel === 'bachelor' ? 'Бакалавриат' : program.degreeLevel === 'specialist' ? 'Специалитет' : 'Магистратура'}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
              {program.durationYears} года • Очная форма
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(program.institutionId)}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                isCompared(program.institutionId) ? 'bg-brand-50 border-brand-300 text-brand-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Сравнить вуз"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavorite(program.institutionId)}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                isFavorite(program.institutionId) ? 'bg-rose-50 border-rose-300 text-rose-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Сохранить"
            >
              <Heart className={`w-4 h-4 ${isFavorite(program.institutionId) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {program.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-slate-600 font-semibold">
            <span>{program.institutionName}</span>
            <span>•</span>
            <span className="text-slate-400">{program.city}</span>
          </div>
        </div>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          {program.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Проходной балл (бюджет)</span>
            <span className="text-xl font-black text-slate-900">{program.minScoreBudget} баллов</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Стоимость обучения</span>
            <span className="text-xl font-black text-slate-900">{(program.tuitionPerYear / 1000).toFixed(0)} тыс. ₽/год</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Бюджетных мест</span>
            <span className="text-xl font-black text-slate-900">{program.budgetPlaces} мест</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Платных мест</span>
            <span className="text-xl font-black text-slate-900">{program.paidPlaces} мест</span>
          </div>
        </div>

        {/* Exams Required */}
        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 space-y-1.5">
          <span className="text-xs font-bold text-brand-800 uppercase tracking-wider block">
            Вступительные испытания (ЕГЭ):
          </span>
          <div className="flex flex-wrap gap-2">
            {program.subjectsRequired.map((sub, idx) => (
              <span key={idx} className="px-3 py-1 rounded-xl bg-white border border-brand-200 text-xs font-bold text-brand-900 shadow-sm">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Curriculum breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Учебный план</div>
          <h2 className="text-2xl font-black text-slate-900">Чему вы будете учиться: ключевые дисциплины</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Посеместровый план базовых и профильных предметов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {semesters.map(sem => (
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
      </div>

      {/* Career Trajectory */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Трудоустройство</div>
          <h2 className="text-2xl font-black text-slate-900">Кем работают выпускники программы</h2>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {program.careers.map((c, idx) => (
            <span key={idx} className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-brand-600" />
              <span>{c}</span>
            </span>
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
          <Link
            href={`/vuz/${inst.id}`}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shrink-0 text-center transition-all shadow-md"
          >
            Все программы вуза
          </Link>
        </div>
      )}

    </div>
  );
}
