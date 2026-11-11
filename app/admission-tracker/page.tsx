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
  FileCheck
} from 'lucide-react';

interface PriorityItem {
  id: string;
  institutionId: string;
  programId: string;
  priority: number;
}

export default function AdmissionTrackerPage() {
  const { showToast } = useApp();
  const [userScore, setUserScore] = useState<number>(285);
  const [achievementsScore, setAchievementsScore] = useState<number>(5);

  const [priorities, setPriorities] = useState<PriorityItem[]>([
    { id: 'item-1', institutionId: '1', programId: 'p1', priority: 1 },
    { id: 'item-2', institutionId: '2', programId: 'p4', priority: 2 },
    { id: 'item-3', institutionId: '6', programId: 'p8', priority: 3 },
  ]);

  const totalUserScore = userScore + achievementsScore;

  const handleAddPriority = () => {
    if (priorities.length >= 5) {
      showToast('По законам РФ можно подать заявление максимум в 5 вузов.', 'info');
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

  // Find enrolled priority
  const evaluatedPriorities = priorities.map(item => {
    const inst = INSTITUTIONS.find(i => i.id === item.institutionId);
    const prog = PROGRAMS.find(p => p.id === item.programId);
    const requiredScore = prog ? prog.minScoreBudget : inst ? inst.minBudgetScore : 270;
    const diff = totalUserScore - requiredScore;

    let status: 'high' | 'medium' | 'low' = 'low';
    let statusLabel = 'Низкие шансы';
    if (diff >= 0) {
      status = 'high';
      statusLabel = 'Высокая вероятность';
    } else if (diff >= -10) {
      status = 'medium';
      statusLabel = 'Конкурсная зона';
    }

    return {
      ...item,
      inst,
      prog,
      requiredScore,
      diff,
      status,
      statusLabel,
    };
  });

  const enrolledPriority = evaluatedPriorities.find(p => p.status === 'high');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Трекер поступления</span>
      </nav>

      {/* Hero Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Система расстановки приоритетов 2026</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Кабинет абитуриента: симулятор зачисления по 5 вузам
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Смоделируйте подачу заявлений через Госуслуги, настройте приоритеты от 1 до 5 и узнайте, на какую именно программу вы будете автоматически зачислены с вашими баллами ЕГЭ.
        </p>
      </div>

      {/* Scores Input Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Ваши вступительные баллы:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="text-xs text-slate-500 block mb-1 font-medium">Сумма баллов ЕГЭ:</label>
            <input
              type="number"
              min={100}
              max={300}
              value={userScore}
              onChange={(e) => setUserScore(Number(e.target.value) || 0)}
              className="w-full text-xl font-black bg-white border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="text-xs text-slate-500 block mb-1 font-medium">Индивидуальные достижения:</label>
            <input
              type="number"
              min={0}
              max={10}
              value={achievementsScore}
              onChange={(e) => setAchievementsScore(Number(e.target.value) || 0)}
              className="w-full text-xl font-black bg-white border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="p-3 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col justify-center">
            <span className="text-xs text-brand-700 font-semibold block">Итоговый конкурсный балл:</span>
            <span className="text-2xl font-black text-brand-700">{totalUserScore} баллов</span>
          </div>
        </div>
      </div>

      {/* Forecast Result Banner */}
      {enrolledPriority ? (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-black text-lg text-emerald-800">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>Прогноз: вы проходите на бюджет по приоритету №{enrolledPriority.priority}!</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-800">
            Ваш балл ({totalUserScore}) превышает проходной балл программы «{enrolledPriority.prog?.name || 'Выбранная программа'}» в {enrolledPriority.inst?.name}. Система зачислит вас именно сюда.
          </p>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-base text-amber-800">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Внимание: по текущим приоритетам шансы на бюджет не гарантированы</span>
          </div>
          <p className="text-xs text-amber-800">
            Рекомендуем добавить в 4 или 5 приоритет надежный страховочный вуз с меньшим проходным баллом.
          </p>
        </div>
      )}

      {/* Priorities List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Список выбранных вузов ({priorities.length} из 5)
          </h2>
          {priorities.length < 5 && (
            <button
              onClick={handleAddPriority}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-sm"
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
              className={`p-5 rounded-3xl border bg-white shadow-sm space-y-3 transition-all ${
                enrolledPriority?.id === item.id 
                  ? 'border-emerald-400 ring-2 ring-emerald-400/20' 
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                    enrolledPriority?.id === item.id 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    №{item.priority}
                  </span>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {item.inst?.name}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {item.prog?.name} ({item.prog?.code})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.status === 'high' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : item.status === 'medium'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {item.statusLabel}
                  </span>

                  {priorities.length > 1 && (
                    <button
                      onClick={() => handleRemovePriority(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress comparison line */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Проходной балл прошлого года: <strong>{item.requiredScore}</strong></span>
                <span>Разница с вашим баллом: <strong className={item.diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                  {item.diff >= 0 ? `+${item.diff}` : item.diff} баллов
                </strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
