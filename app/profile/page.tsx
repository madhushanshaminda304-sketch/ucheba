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
  BookOpen,
  Info,
  XCircle,
  HelpCircle
} from 'lucide-react';

export default function ProfilePage() {
  const { 
    user, 
    logout, 
    setIsAuthModalOpen, 
    favorites, 
    savedFavorites, 
    toggleFavorite, 
    isFavorite,
    userScores, 
    updateUserScore,
    storageRecoveryNotice,
    dismissRecoveryNotice
  } = useApp();

  const [activeTab, setActiveTab] = useState<'scores' | 'targets' | 'favorites' | 'events'>('scores');

  // Distinguish missing (null) from zero (0)
  const mathScore = userScores.math;
  const rusScore = userScores.russian;
  const infScore = userScores.informatics;
  const socScore = userScores.social;
  const physScore = userScores.physics;

  const hasTechTrio = mathScore !== null && rusScore !== null && (infScore !== null || physScore !== null);
  const totalTechScore = hasTechTrio 
    ? (mathScore! + rusScore! + Math.max(infScore ?? 0, physScore ?? 0))
    : null;

  const hasHumanTrio = mathScore !== null && rusScore !== null && socScore !== null;
  const totalHumanScore = hasHumanTrio 
    ? (mathScore! + rusScore! + socScore!)
    : null;

  const enteredScoresCount = Object.values(userScores).filter(v => v !== null && v !== undefined).length;

  // Filter favorite institutions and programs using typed entity checks
  const favoriteInstitutions = INSTITUTIONS.filter(inst => isFavorite(inst.id, 'institution'));
  const favoritePrograms = PROGRAMS.filter(prog => isFavorite(prog.id, 'program'));

  const handleScoreChange = (subject: string, rawVal: string) => {
    if (rawVal.trim() === '') {
      updateUserScore(subject, null);
      return;
    }
    const num = parseInt(rawVal, 10);
    if (!isNaN(num)) {
      updateUserScore(subject, Math.min(100, Math.max(0, num)));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Recovery Notice if local data was migrated/repaired */}
        {storageRecoveryNotice && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{storageRecoveryNotice}</span>
            </div>
            <button
              onClick={dismissRecoveryNotice}
              className="px-3 py-1 rounded-lg bg-amber-200/60 hover:bg-amber-200 font-bold text-amber-900 transition-colors"
            >
              Понятно
            </button>
          </div>
        )}

        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-brand-800 via-brand-700 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-black text-amber-300 shadow-inner">
                {user.avatar || 'Г'}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {user.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
                    Гостевой профиль
                  </span>
                </div>
                <p className="text-white/80 text-xs sm:text-sm mt-1">
                  Данные сохраняются локально на этом устройстве • Подготовка к приёму 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors border border-white/15"
              >
                <User className="w-4 h-4" />
                <span>Настройки профиля</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
              <span className="text-xs text-white/70 block">Сумма ЕГЭ (IT/Технич.)</span>
              <span className="text-2xl font-black text-amber-300">
                {totalTechScore !== null ? (
                  <>{totalTechScore} <span className="text-xs font-normal text-white/60">/ 300</span></>
                ) : (
                  <span className="text-sm font-semibold text-white/70">Не все баллы</span>
                )}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
              <span className="text-xs text-white/70 block">Сумма ЕГЭ (Гуманит.)</span>
              <span className="text-2xl font-black text-white">
                {totalHumanScore !== null ? (
                  <>{totalHumanScore} <span className="text-xs font-normal text-white/60">/ 300</span></>
                ) : (
                  <span className="text-sm font-semibold text-white/70">Не все баллы</span>
                )}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
              <span className="text-xs text-white/70 block">В избранном</span>
              <span className="text-2xl font-black text-white">{savedFavorites.length} <span className="text-xs font-normal text-white/60">объектов</span></span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
              <span className="text-xs text-white/70 block">Статус данных</span>
              <span className="text-lg font-bold text-white">
                {enteredScoresCount >= 3 ? 'Готово к оценке' : `${enteredScoresCount}/3 мин. предм.`}
              </span>
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
            <span>Мои баллы ЕГЭ ({enteredScoresCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('targets')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'targets' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Сопоставление с порогами 2024</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'favorites' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Избранное ({savedFavorites.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'events' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Мероприятия</span>
          </button>
        </div>

        {/* Tab 1: Scores Inputs */}
        {activeTab === 'scores' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Фактические или прогнозируемые баллы ЕГЭ</h2>
              <p className="text-sm text-slate-500 mt-1">
                Укажите ваши баллы. Если экзамен ещё не сдан, оставьте поле пустым. Значение 0 означает фактически полученный нулевой результат.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { key: 'russian', label: 'Русский язык', icon: BookOpen, color: 'text-rose-600' },
                { key: 'math', label: 'Профильная математика', icon: TrendingUp, color: 'text-blue-600' },
                { key: 'informatics', label: 'Информатика и ИКТ', icon: Sparkles, color: 'text-amber-600' },
                { key: 'social', label: 'Обществознание', icon: Award, color: 'text-emerald-600' },
                { key: 'physics', label: 'Физика', icon: Sliders, color: 'text-indigo-600' },
                { key: 'chemistry', label: 'Химия', icon: Sparkles, color: 'text-teal-600' },
                { key: 'biology', label: 'Биология', icon: BookOpen, color: 'text-green-600' },
                { key: 'history', label: 'История', icon: Award, color: 'text-orange-600' },
                { key: 'english', label: 'Английский язык', icon: BookOpen, color: 'text-sky-600' },
              ].map(sub => {
                const currentVal = userScores[sub.key];
                const isSet = currentVal !== null && currentVal !== undefined;

                return (
                  <div key={sub.key} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <sub.icon className={`w-4 h-4 ${sub.color}`} />
                        {sub.label}
                      </span>
                      {isSet && (
                        <button
                          onClick={() => updateUserScore(sub.key, null)}
                          className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
                          title="Очистить балл"
                        >
                          Сбросить
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={isSet ? currentVal : 0}
                        onChange={(e) => updateUserScore(sub.key, parseInt(e.target.value, 10))}
                        className={`w-full accent-brand-600 ${!isSet ? 'opacity-30' : ''}`}
                      />
                      <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="—"
                        value={isSet ? currentVal : ''}
                        onChange={(e) => handleScoreChange(sub.key, e.target.value)}
                        className="w-16 px-2.5 py-1.5 rounded-xl border border-slate-300 text-center font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-500 text-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong>Информация о баллах:</strong> Все значения сохраняются локально. Конкурсные баллы 2026 года формируются ежегодно на основе поданных заявлений и могут отличаться от результатов прошлых лет.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Admission Historical Comparisons */}
        {activeTab === 'targets' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Сопоставление с проходными баллами 2024 года</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Источник данных: официальные приказы о зачислении 2024 г. Данные носят ориентировочный характер и не являются гарантией приёма.
                </p>
              </div>

              {!hasTechTrio ? (
                <div className="p-8 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-3">
                  <HelpCircle className="w-10 h-10 text-amber-600 mx-auto" />
                  <h3 className="text-base font-bold text-amber-950">Недостаточно информации для сопоставления</h3>
                  <p className="text-xs sm:text-sm text-amber-800 max-w-xl mx-auto">
                    Для расчёта сопоставления по техническому профилю необходимо указать минимум 3 предмета: <strong>Русский язык</strong>, <strong>Профильную математику</strong> и <strong>Информатику</strong> или <strong>Физику</strong>.
                  </p>
                  <button
                    onClick={() => setActiveTab('scores')}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    Перейти к вводу баллов
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Calculation summary disclaimer */}
                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      Ваша расчётная сумма по профилю IT/Инженерия: <strong>{totalTechScore} б.</strong> (Математика: {mathScore}, Русский: {rusScore}, Профиль: {Math.max(infScore ?? 0, physScore ?? 0)}).
                      <span className="block mt-0.5 text-blue-700">Ниже приведено ориентировочное сопоставление с минимальными баллами зачисления на бюджет в 2024 году.</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Zone 1: Above 2024 threshold */}
                    <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Выше проходного 2024 г.</span>
                      </div>
                      <p className="text-xs text-emerald-700">
                        Текущий результат превышает минимальный порог зачисления 2024 года.
                      </p>
                      <div className="space-y-2 pt-2">
                        {INSTITUTIONS.filter(inst => inst.minBudgetScore !== null && totalTechScore! >= inst.minBudgetScore + 10).slice(0, 3).map(inst => (
                          <div key={inst.id} className="p-3 rounded-xl bg-white border border-emerald-100 shadow-sm">
                            <div className="font-bold text-xs text-slate-900">{inst.abbreviation} — {inst.name}</div>
                            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                              <span>Порог 2024: {inst.minBudgetScore}</span>
                              <span className="text-emerald-600 font-bold">+{totalTechScore! - (inst.minBudgetScore ?? 0)} б.</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Zone 2: Around 2024 threshold */}
                    <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                      <div className="flex items-center gap-2 text-amber-800 font-black text-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        <span>В диапазоне проходного 2024</span>
                      </div>
                      <p className="text-xs text-amber-700">
                        Результат находится в пределах ±10 баллов от порога прошлого года.
                      </p>
                      <div className="space-y-2 pt-2">
                        {INSTITUTIONS.filter(inst => inst.minBudgetScore !== null && Math.abs(totalTechScore! - inst.minBudgetScore) <= 10).slice(0, 3).map(inst => (
                          <div key={inst.id} className="p-3 rounded-xl bg-white border border-amber-100 shadow-sm">
                            <div className="font-bold text-xs text-slate-900">{inst.abbreviation} — {inst.name}</div>
                            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                              <span>Порог 2024: {inst.minBudgetScore}</span>
                              <span className="text-amber-600 font-bold">В диапазоне</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Zone 3: Below 2024 threshold */}
                    <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-slate-800 font-black text-sm">
                        <TrendingUp className="w-5 h-5 text-slate-600" />
                        <span>Ниже порога 2024 г.</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Требуются дополнительные баллы за индивидуальные достижения или участие в олимпиадах.
                      </p>
                      <div className="space-y-2 pt-2">
                        {INSTITUTIONS.filter(inst => inst.minBudgetScore !== null && totalTechScore! < inst.minBudgetScore - 10).slice(0, 3).map(inst => (
                          <div key={inst.id} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <div className="font-bold text-xs text-slate-900">{inst.abbreviation} — {inst.name}</div>
                            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                              <span>Порог 2024: {inst.minBudgetScore}</span>
                              <span className="text-slate-500 font-bold">Разница: {totalTechScore! - (inst.minBudgetScore ?? 0)} б.</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab 3: Favorites (Institutions & Programs) */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            {savedFavorites.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">Список избранного пока пуст</h3>
                <p className="text-sm text-slate-500 mt-1 mb-5">
                  Добавляйте интересные вузы, программы и колледжи, чтобы сравнивать их параметры на этом устройстве.
                </p>
                <div className="flex justify-center gap-3">
                  <Link href="/vuz" className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs transition-colors">
                    Каталог вузов
                  </Link>
                  <Link href="/colleges" className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors">
                    Каталог колледжей
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Сохранённые объекты ({savedFavorites.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedFavorites.map(fav => (
                    <div key={fav.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                            {fav.type === 'program' ? 'Программа' : fav.type === 'college' ? 'Колледж' : 'Вуз'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {fav.title || fav.id}
                        </h4>
                        {fav.subtitle && (
                          <p className="text-xs text-slate-500">{fav.subtitle}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={fav.type === 'program' ? `/program/${fav.id}` : fav.type === 'college' ? `/colleges/${fav.id}` : `/vuz/${fav.id}`}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-brand-600 transition-colors"
                          title="Перейти"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => toggleFavorite({ type: fav.type, id: fav.id, title: fav.title, subtitle: fav.subtitle }, fav.title)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Events placeholder */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
            <Calendar className="w-10 h-10 text-brand-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Дни открытых дверей и вебинары</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Ознакомьтесь с актуальным расписанием предстоящих открытых дверей в ведущих вузах РФ в едином календаре.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition-colors"
            >
              <span>Открыть календарь мероприятий</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
