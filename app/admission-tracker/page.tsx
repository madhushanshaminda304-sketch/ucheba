'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { INSTITUTIONS, PROGRAMS } from '@/lib/data';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  Trash2, 
  Sparkles, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  FileCheck,
  Info,
  HelpCircle
} from 'lucide-react';

interface PriorityItem {
  id: string;
  institutionId: string;
  programId: string;
  priority: number;
}

export default function AdmissionTrackerPage() {
  const { userScores, achievementsScore, setAchievementsScore, showToast } = useApp();

  // Calculate sum of entered scores
  const mathScore = userScores.math;
  const rusScore = userScores.russian;
  const infScore = userScores.informatics;
  const physScore = userScores.physics;
  const socScore = userScores.social;

  // Check if student has entered basic exam scores
  const hasMinScores = mathScore !== null && rusScore !== null;
  const bestThirdScore = Math.max(infScore ?? 0, physScore ?? 0, socScore ?? 0);
  const baseScoresSum = hasMinScores && (infScore !== null || physScore !== null || socScore !== null)
    ? (mathScore! + rusScore! + bestThirdScore)
    : null;

  const totalUserScore = baseScoresSum !== null 
    ? baseScoresSum + (achievementsScore ?? 0)
    : null;

  const [priorities, setPriorities] = useState<PriorityItem[]>([
    { id: 'item-1', institutionId: '1', programId: 'p1', priority: 1 },
    { id: 'item-2', institutionId: '2', programId: 'p4', priority: 2 },
    { id: 'item-3', institutionId: '6', programId: 'p8', priority: 3 },
  ]);

  const handleAddPriority = () => {
    if (priorities.length >= 5) {
      showToast('По правилам приёма РФ можно подать заявление максимум в 5 вузов.', 'info');
      return;
    }
    const newId = `item-${Date.now()}`;
    setPriorities(prev => [
      ...prev,
      { id: newId, institutionId: '4', programId: 'p7', priority: prev.length + 1 }
    ]);
  };

  const handleRemovePriority = (id: string) => {
    setPriorities(prev => {
      const filtered = prev.filter(p => p.id !== id);
      return filtered.map((p, idx) => ({ ...p, priority: idx + 1 }));
    });
  };

  const handleUpdateItem = (id: string, instId: string, progId: string) => {
    setPriorities(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, institutionId: instId, programId: progId };
      }
      return p;
    }));
  };

  // Evaluate each priority against historical 2024 data
  const evaluatedPriorities = priorities.map(item => {
    const inst = INSTITUTIONS.find(i => i.id === item.institutionId);
    const prog = PROGRAMS.find(p => p.id === item.programId);
    const threshold2024 = prog?.minScoreBudget ?? inst?.minBudgetScore ?? null;

    if (totalUserScore === null || threshold2024 === null) {
      return {
        ...item,
        inst,
        prog,
        threshold2024,
        diff: null,
        status: 'insufficient_data' as const,
        statusLabel: 'Недостаточно информации',
        explanation: 'Не все баллы ЕГЭ указаны в профиле для точного сопоставления'
      };
    }

    const diff = totalUserScore - threshold2024;
    if (diff >= 10) {
      return {
        ...item,
        inst,
        prog,
        threshold2024,
        diff,
        status: 'above' as const,
        statusLabel: `Выше порога 2024 г. (+${diff} б.)`,
        explanation: 'Балл выше прошлогоднего порога. Обратите внимание: конкурс 2026 года может измениться.'
      };
    } else if (diff >= -10) {
      return {
        ...item,
        inst,
        prog,
        threshold2024,
        diff,
        status: 'range' as const,
        statusLabel: `В диапазоне порога 2024 г. (${diff >= 0 ? '+' : ''}${diff} б.)`,
        explanation: 'Балл близок к границе прошлогоднего зачисления. Требуется внимательный мониторинг списков.'
      };
    } else {
      return {
        ...item,
        inst,
        prog,
        threshold2024,
        diff,
        status: 'below' as const,
        statusLabel: `Ниже порога 2024 г. (${diff} б.)`,
        explanation: 'Балл ниже порога 2024 года. Рекомендуется предусмотреть альтернативные направления.'
      };
    }
  });

  const firstAbovePriority = evaluatedPriorities.find(p => p.status === 'above');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Симулятор расстановки приоритетов</span>
      </nav>

      {/* Hero Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Моделирование приоритетов 2026</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Симулятор расстановки приоритетов по 5 вузам
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Смоделируйте подачу заявлений в 5 университетов РФ и сопоставьте ваши баллы с официальной статистикой приказов о зачислении 2024 года.
        </p>
      </div>

      {/* Scores Input Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Вступительные баллы (из единого профиля):
          </h2>
          <Link href="/profile" className="text-xs font-bold text-brand-600 hover:text-brand-700">
            Редактировать в профиле →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-500 block mb-1 font-medium">Сумма ЕГЭ (3 предмета):</span>
            <span className="text-xl font-black text-slate-900 block">
              {baseScoresSum !== null ? `${baseScoresSum} б.` : 'Не указаны'}
            </span>
            <span className="text-[11px] text-slate-400">
              {hasMinScores ? `Рус: ${rusScore}, Мат: ${mathScore}` : 'Заполните баллы в профиле'}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="text-xs text-slate-500 block mb-1 font-medium">Индивидуальные достижения:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={10}
                placeholder="0"
                value={achievementsScore ?? ''}
                onChange={(e) => {
                  const val = e.target.value.trim() === '' ? null : Math.min(10, Math.max(0, parseInt(e.target.value, 10) || 0));
                  setAchievementsScore(val);
                }}
                className="w-full text-lg font-black bg-white border border-slate-200 rounded-xl px-3 py-1 focus:outline-none focus:border-brand-500"
              />
              <span className="text-xs text-slate-400 shrink-0">макс. 10</span>
            </div>
          </div>

          <div className="p-3 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col justify-center">
            <span className="text-xs text-brand-700 font-semibold block">Итоговый конкурсный балл:</span>
            <span className="text-2xl font-black text-brand-700">
              {totalUserScore !== null ? `${totalUserScore} баллов` : 'Данные не полны'}
            </span>
          </div>
        </div>
      </div>

      {/* Historical Forecast Banner */}
      {totalUserScore === null ? (
        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-base text-amber-800">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Недостаточно данных для исторического сопоставления</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-800">
            Укажите ваши баллы ЕГЭ в <Link href="/profile" className="underline font-bold">личном профиле</Link>, чтобы симулятор рассчитал разницу с проходными баллами 2024 года.
          </p>
        </div>
      ) : firstAbovePriority ? (
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-slate-900 space-y-2">
          <div className="flex items-center gap-2 font-black text-base text-slate-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Исторический ориентир: балл выше порога 2024 г. по приоритету №{firstAbovePriority.priority}</span>
          </div>
          <p className="text-xs text-slate-600">
            Ваш балл ({totalUserScore}) выше проходного порога 2024 г. ({firstAbovePriority.threshold2024} б.) для программы «{firstAbovePriority.prog?.name}» в {firstAbovePriority.inst?.name}.  
            <strong className="block text-slate-700 mt-1">Важно:</strong> Это статистическое сравнение с прошлым годом. Конкурс 2026 года формируется заново и зависит от числа поданных заявлений.
          </p>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-slate-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-base text-slate-800">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Текущий балл находится в конкурсной зоне или ниже порогов 2024 г.</span>
          </div>
          <p className="text-xs text-slate-600">
            Рекомендуем включить в список приоритетов программы с меньшим историческим порогом в качестве запасного варианта.
          </p>
        </div>
      )}

      {/* Priorities List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Выбранные приоритеты ({priorities.length} из 5 разрешённых):
          </h3>
          {priorities.length < 5 && (
            <button
              onClick={handleAddPriority}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить вуз</span>
            </button>
          )}
        </div>

        <div className="space-y-3">
          {evaluatedPriorities.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center">
                    {item.priority}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Приоритет №{item.priority}</span>
                    <h4 className="text-base font-bold text-slate-900">{item.inst?.name || 'Вуз не выбран'}</h4>
                  </div>
                </div>

                <button
                  onClick={() => handleRemovePriority(item.id)}
                  disabled={priorities.length <= 1}
                  className="p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                  title="Удалить из приоритетов"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Selection Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Учебное заведение:
                  </label>
                  <select
                    value={item.institutionId}
                    onChange={(e) => {
                      const newInstId = e.target.value;
                      const defaultProg = PROGRAMS.find(p => p.institutionId === newInstId);
                      handleUpdateItem(item.id, newInstId, defaultProg ? defaultProg.id : '');
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500"
                  >
                    {INSTITUTIONS.map(inst => (
                      <option key={inst.id} value={inst.id}>
                        {inst.abbreviation} — {inst.name} ({inst.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Направление подготовки:
                  </label>
                  <select
                    value={item.programId}
                    onChange={(e) => handleUpdateItem(item.id, item.institutionId, e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500"
                  >
                    {PROGRAMS.filter(p => p.institutionId === item.institutionId).map(prog => (
                      <option key={prog.id} value={prog.id}>
                        {prog.code} {prog.name} (Порог 2024: {prog.minScoreBudget ?? '—'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Comparison Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Порог 2024 г. (приказ о зачислении):</span>
                  <span className="font-bold text-slate-800">
                    {item.threshold2024 !== null ? `${item.threshold2024} б.` : 'Не указан'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    item.status === 'above' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    item.status === 'range' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    item.status === 'below' ? 'bg-slate-100 text-slate-700 border border-slate-200' :
                    'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                    {item.statusLabel}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Official Rules Context Footer */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-500">
        <h4 className="font-bold text-slate-800">Справка по правилам приёма 2026 года:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Подача заявлений осуществляется через портал Госуслуг («Поступление в вуз онлайн») или сайт вуза.</li>
          <li>Вы можете подать заявление максимум в 5 высших учебных заведений.</li>
          <li>Зачисление осуществляется на наивысший приоритет, по которому вы проходите по конкурсу баллов на момент окончания приёма оригиналов документов.</li>
        </ul>
      </div>

    </div>
  );
}
