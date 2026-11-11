'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { INSTITUTIONS, PROGRAMS } from '@/lib/data';
import { 
  User, 
  GraduationCap, 
  Award, 
  Sliders, 
  Heart, 
  Trash2, 
  ExternalLink, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  LogOut,
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, setIsAuthModalOpen, favorites, toggleFavorite, userScores, updateUserScore } = useApp();

  const [activeTab, setActiveTab] = useState<'scores' | 'targets' | 'favorites' | 'events'>('scores');

  // Calculate sum of best 3 selected scores (e.g., Math + Russian + Informatics or Social)
  const mathScore = userScores.math || 0;
  const rusScore = userScores.russian || 0;
  const infScore = userScores.informatics || 0;
  const socScore = userScores.social || 0;
  const physScore = userScores.physics || 0;

  const totalTechScore = mathScore + rusScore + Math.max(infScore, physScore);
  const totalHumanScore = mathScore + rusScore + socScore;

  // Filter favorite institutions
  const favoriteInstitutions = INSTITUTIONS.filter(inst => favorites.includes(inst.id));

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-brand-800 via-brand-700 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-black text-amber-300 shadow-inner">
                {user?.avatar || 'АБ'}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {user?.name || 'Личный кабинет абитуриента'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-900">
                    Приём 2026
                  </span>
                </div>
                <p className="text-white/80 text-sm mt-1">
                  {user?.phone ? `Телефон: ${user.phone}` : user?.email ? `Email: ${user.email}` : 'Планирование траектории поступления в вузы и колледжи РФ'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {user ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors border border-white/15"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Выйти</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold shadow-lg transition-transform hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  <span>Войти в аккаунт</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
              <span className="text-xs text-white/70 block">Сумма ЕГЭ (IT/Инженерия)</span>
              <span className="text-2xl font-black text-amber-300">{totalTechScore} <span className="text-xs font-normal text-white/60">/ 300</span></span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
              <span className="text-xs text-white/70 block">Сумма ЕГЭ (Гуманитарный)</span>
              <span className="text-2xl font-black text-white">{totalHumanScore} <span className="text-xs font-normal text-white/60">/ 300</span></span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
              <span className="text-xs text-white/70 block">В избранном</span>
              <span className="text-2xl font-black text-white">{favorites.length} <span className="text-xs font-normal text-white/60">вузов</span></span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
              <span className="text-xs text-white/70 block">Шанс на бюджет</span>
              <span className="text-2xl font-black text-emerald-300">Высокий</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('scores')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'scores' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Мои баллы ЕГЭ</span>
          </button>
          <button
            onClick={() => setActiveTab('targets')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'targets' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Шансы поступления (Автокалькулятор)</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'favorites' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Избранное ({favorites.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'events' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Мои мероприятия и вебинары</span>
          </button>
        </div>

        {/* Tab 1: Scores Inputs */}
        {activeTab === 'scores' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Калькулятор и фиксация баллов ЕГЭ</h2>
              <p className="text-sm text-slate-500 mt-1">
                Укажите ваши реальные или прогнозируемые баллы. Система мгновенно пересчитает шансы на зачисление на бюджет во все вузы РФ.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { key: 'russian', label: 'Русский язык', icon: BookOpen, color: 'text-rose-600' },
                { key: 'math', label: 'Профильная математика', icon: TrendingUp, color: 'text-blue-600' },
                { key: 'informatics', label: 'Информатика и ИКТ', icon: Sparkles, color: 'text-amber-600' },
                { key: 'social', label: 'Обществознание', icon: Award, color: 'text-emerald-600' },
                { key: 'physics', label: 'Физика', icon: Sliders, color: 'text-indigo-600' },
              ].map(sub => (
                <div key={sub.key} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <sub.icon className={`w-4 h-4 ${sub.color}`} />
                      {sub.label}
                    </span>
                    <span className="text-xs font-bold text-slate-400">макс 100</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={userScores[sub.key] || 0}
                      onChange={(e) => updateUserScore(sub.key, parseInt(e.target.value) || 0)}
                      className="w-full accent-brand-600"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={userScores[sub.key] || 0}
                      onChange={(e) => updateUserScore(sub.key, Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="w-16 px-2.5 py-1.5 rounded-xl border border-slate-300 text-center font-bold text-slate-900 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong>Совет навигатора:</strong> Индивидуальные достижения (золотая медаль, значок ГТО, победы в перечневых олимпиадах РСОШ) могут добавить до +10 дополнительных баллов к вашей сумме!
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Admission Chances */}
        {activeTab === 'targets' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Автоматический расчёт шансов на бюджет</h2>
              <p className="text-sm text-slate-500 mt-1">
                Сопоставление вашей суммы ({totalTechScore} баллов) с официальными проходными баллами прошлого года
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                
                {/* Green zone */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Зелёная зона (Шанс 90%+)</span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Ваш балл выше проходного прошлого года с надежным запасом.
                  </p>
                  <div className="space-y-2 pt-2">
                    {INSTITUTIONS.filter(inst => totalTechScore >= inst.minBudgetScore + 10).slice(0, 3).map(inst => (
                      <div key={inst.id} className="p-3 rounded-xl bg-white border border-emerald-100 shadow-sm">
                        <div className="font-bold text-xs text-slate-900">{inst.abbreviation} — {inst.name}</div>
                        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                          <span>Проходной: {inst.minBudgetScore}</span>
                          <span className="text-emerald-600 font-bold">+{totalTechScore - inst.minBudgetScore} баллов</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yellow zone */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 font-black text-sm">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span>Жёлтая зона (Шанс 50-85%)</span>
                  </div>
                  <p className="text-xs text-amber-700">
                    На грани проходного балла. Рекомендуется подавать с высоким приоритетом.
                  </p>
                  <div className="space-y-2 pt-2">
                    {INSTITUTIONS.filter(inst => Math.abs(totalTechScore - inst.minBudgetScore) <= 10).slice(0, 3).map(inst => (
                      <div key={inst.id} className="p-3 rounded-xl bg-white border border-amber-100 shadow-sm">
                        <div className="font-bold text-xs text-slate-900">{inst.abbreviation} — {inst.name}</div>
                        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                          <span>Проходной: {inst.minBudgetScore}</span>
                          <span className="text-amber-600 font-bold">В диапазоне</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Red zone */}
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-black text-sm">
                    <TrendingUp className="w-5 h-5 text-rose-600" />
                    <span>Амбициозная зона (Шанс до 40%)</span>
                  </div>
                  <p className="text-xs text-rose-700">
                    Топовые факультеты с максимальным конкурсом. Рассмотрите олимпиады и целевую квоту.
                  </p>
                  <div className="space-y-2 pt-2">
                    {INSTITUTIONS.filter(inst => totalTechScore < inst.minBudgetScore - 5).slice(0, 3).map(inst => (
                      <div key={inst.id} className="p-3 rounded-xl bg-white border border-rose-100 shadow-sm">
                        <div className="font-bold text-xs text-slate-900">{inst.abbreviation} — {inst.name}</div>
                        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                          <span>Проходной: {inst.minBudgetScore}</span>
                          <span className="text-rose-600 font-bold">Не хватает {inst.minBudgetScore - totalTechScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Favorites */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            {favoriteInstitutions.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">Список избранного пока пуст</h3>
                <p className="text-sm text-slate-500 mt-1 mb-5">
                  Добавляйте интересные вузы, колледжи и школы, чтобы отслеживать дедлайны и сравнивать программы.
                </p>
                <Link
                  href="/vuz"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-colors"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Перейти в каталог вузов</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteInstitutions.map(inst => (
                  <div key={inst.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                          {inst.abbreviation}
                        </span>
                        <span className="text-xs text-slate-500">{inst.city}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{inst.name}</h4>
                      <div className="text-xs text-slate-500">
                        Бюджет от: <span className="font-bold text-brand-600">{inst.minBudgetScore} баллов</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/vuz/${inst.id}`}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Подробнее"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => toggleFavorite(inst.id)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Удалить из избранного"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Events */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Запланированные дни открытых дверей</h2>
            <p className="text-sm text-slate-500">
              Вы зарегистрированы на 2 предстоящих онлайн-мероприятия
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">НИУ ВШЭ • Онлайн</span>
                  <h4 className="font-bold text-sm text-slate-900 mt-0.5">День открытых дверей Факультета компьютерных наук</h4>
                  <p className="text-xs text-slate-500 mt-1">15 декабря 2026 в 12:00 МСК • Презентация программ ПМИ и ПИ</p>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Зарегистрирован
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">МГТУ им. Баумана • Очно</span>
                  <h4 className="font-bold text-sm text-slate-900 mt-0.5">Инженерный фестиваль и экскурсия по лабораториям робототехники</h4>
                  <p className="text-xs text-slate-500 mt-1">21 декабря 2026 в 11:00 • 2-я Бауманская ул., д. 5</p>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Зарегистрирован
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
