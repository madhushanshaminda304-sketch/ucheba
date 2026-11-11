'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Video, 
  MessageSquare,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function EgeCoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [trialBooked, setTrialBooked] = useState(false);
  const [trialName, setTrialName] = useState('');
  const [trialPhone, setTrialPhone] = useState('');

  const subjects = [
    { id: 'math', name: 'Профильная математика', avgScore: 82.4, teacher: 'Алексей Воронов (МГУ, эксперт ЕГЭ)' },
    { id: 'russian', name: 'Русский язык', avgScore: 88.6, teacher: 'Ольга Соколова (кандидат филол. наук)' },
    { id: 'inf', name: 'Информатика и ИКТ', avgScore: 86.2, teacher: 'Дмитрий Смирнов (ВШЭ, разработчик Яндекса)' },
    { id: 'soc', name: 'Обществознание', avgScore: 84.1, teacher: 'Елена Кузнецова (МГИМО)' },
    { id: 'phys', name: 'Физика', avgScore: 81.5, teacher: 'Михаил Захаров (МФТИ)' },
    { id: 'chem', name: 'Химия', avgScore: 83.9, teacher: 'Анна Павлова (Сеченовский Университет)' },
  ];

  const currentSub = subjects.find(s => s.id === selectedSubject) || subjects[0];

  const courseFormats = [
    {
      title: 'Онлайн-вебинары',
      price: '4 490 ₽/мес.',
      duration: '8 занятий в месяц',
      icon: Video,
      features: [
        'Живые онлайн-уроки 2 раза в неделю по 90 минут',
        'Индивидуальная проверка домашних заданий экспертом за 2 часа',
        'Записи всех уроков в HD качестве с таймкодами',
        'Ежемесячный пробный ЕГЭ с оценкой по критериям ФИПИ'
      ]
    },
    {
      title: 'Мини-группы до 8 человек',
      price: '8 990 ₽/мес.',
      popular: true,
      duration: '8 занятий в месяц',
      icon: Users,
      features: [
        'Всё из формата «Вебинары»',
        'Группа до 8 учеников одного уровня подготовки',
        'Включение микрофона и видеокамеры каждого ученика',
        'Личный созвон с преподавателем 1 раз в месяц'
      ]
    },
    {
      title: 'Индивидуально с репетитором',
      price: '16 900 ₽/мес.',
      duration: 'Индивидуальный график',
      icon: GraduationCap,
      features: [
        'Персональная программа под ваш целевой вуз',
        'Действующий старший эксперт предметной комиссии',
        'Гибкое расписание в удобное время',
        'Прямая связь родителей с преподавателем'
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-24">
      
      {/* 1. HERO */}
      <section className="relative bg-gradient-to-br from-blue-950 via-brand-900 to-indigo-950 text-white pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs text-brand-200/80 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-white font-bold">Подготовка к ЕГЭ и ОГЭ</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Набор на учебный год 2026/2027</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Подготовка к ЕГЭ с гарантией результата от 80+ баллов
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Онлайн-курсы от преподавателей МГУ, ВШЭ и МФТИ. Подготовим к экзаменам на высокие баллы и поможем поступить на бюджет в топовый университет.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white/10 border border-white/15">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Гарантия поступления на бюджет по договору</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white/10 border border-white/15">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Средний балл наших выпускников — 84.6</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SUBJECTS TABS & DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Предметы</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Выберите предмет для подготовки</h2>
        </div>

        {/* Subjects Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {subjects.map(sub => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                selectedSubject === sub.id
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Current Subject Spotlight */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Курс подготовки:
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">{currentSub.name}</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Ведущий преподаватель: <strong>{currentSub.teacher}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Средний результат на ЕГЭ</span>
              <span className="text-3xl font-black text-brand-700">{currentSub.avgScore} баллов</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORMATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Форматы обучения</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Тарифы онлайн-школы</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseFormats.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative transition-all ${
                  f.popular 
                    ? 'bg-gradient-to-b from-brand-900 to-slate-900 text-white shadow-xl ring-2 ring-brand-500' 
                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                {f.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-500 text-white text-[11px] font-bold uppercase tracking-wider shadow">
                    Хит продаж
                  </span>
                )}

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">{f.title}</h3>
                    <div className="text-2xl font-black tracking-tight mt-1">{f.price}</div>
                    <span className={`text-xs block mt-0.5 ${f.popular ? 'text-slate-300' : 'text-slate-400'}`}>
                      {f.duration}
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-100/20 text-xs">
                    {f.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 leading-snug">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${f.popular ? 'text-brand-400' : 'text-brand-600'}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('trial-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                      f.popular
                        ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    Попробовать бесплатно
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. TRIAL LESSON FORM */}
      <section id="trial-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg text-slate-900 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Запишитесь на бесплатный вводный урок</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Определим ваш текущий уровень, разберём 3 сложных задания и составим индивидуальный план подготовки до июня 2026.
            </p>
          </div>

          {trialBooked ? (
            <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-2 text-emerald-900">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base">Вы успешно записаны на пробный урок!</h4>
              <p className="text-xs">Куратор отправит ссылку на онлайн-класс в WhatsApp/Telegram за 1 час до начала.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (trialName && trialPhone) setTrialBooked(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Имя ученика</label>
                  <input
                    type="text"
                    required
                    placeholder="Александр"
                    value={trialName}
                    onChange={(e) => setTrialName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Телефон для связи</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={trialPhone}
                    onChange={(e) => setTrialPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                Получить бесплатный урок
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
