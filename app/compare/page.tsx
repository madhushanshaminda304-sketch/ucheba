'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { INSTITUTIONS } from '@/lib/data';
import { 
  Scale, 
  X, 
  Plus, 
  Award, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export default function ComparePage() {
  const { compared, toggleCompare, clearCompared } = useApp();
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const selectedInstitutions = compared
    .map(id => INSTITUTIONS.find(i => i.id === id))
    .filter(Boolean);

  if (selectedInstitutions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
          <Scale className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Сравнение университетов пусто
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Добавьте до 4 учебных заведений из каталога вузов, чтобы сравнить проходные баллы, стоимость, общежития и рейтинги бок о бок.
          </p>
        </div>
        <Link
          href="/vuz"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/20 transition-all"
        >
          <span>Перейти в каталог вузов</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const parameters = [
    {
      title: 'Рейтинг вузов (RAEX)',
      key: 'ratingRaex',
      render: (inst: any) => (
        <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs">
          #{inst.ratingRaex} место
        </span>
      ),
    },
    {
      title: 'Город и локация',
      key: 'city',
      render: (inst: any) => (
        <span className="text-slate-800 font-medium text-xs">
          г. {inst.city} {inst.metro && `(м. ${inst.metro.split('/')[0]})`}
        </span>
      ),
    },
    {
      title: 'Проходной балл на бюджет (2024 г.)',
      key: 'minBudgetScore',
      render: (inst: any) => (
        <span className="font-black text-brand-700 text-sm">
          {inst.minBudgetScore !== null ? `от ${inst.minBudgetScore} б.` : 'Не указан'}
        </span>
      ),
    },
    {
      title: 'Стоимость обучения в год',
      key: 'tuitionFeeFrom',
      render: (inst: any) => (
        <span className="font-bold text-slate-900 text-xs sm:text-sm">
          {inst.tuitionFeeFrom !== null ? `от ${(inst.tuitionFeeFrom / 1000).toFixed(0)} 000 ₽/год` : 'Уточняется'}
        </span>
      ),
    },
    {
      title: 'Количество бюджетных мест',
      key: 'budgetPlacesCount',
      render: (inst: any) => (
        <span className="font-bold text-slate-800 text-xs">
          {inst.budgetPlacesCount !== null ? `${inst.budgetPlacesCount} мест` : 'По запросу'}
        </span>
      ),
    },
    {
      title: 'Общежитие',
      key: 'hasHostel',
      render: (inst: any) => inst.hasHostel ? (
        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs">
          <CheckCircle2 className="w-4 h-4" /> Предоставляется
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-slate-400 font-semibold text-xs">
          <XCircle className="w-4 h-4" /> Нет
        </span>
      ),
    },
    {
      title: 'Военная кафедра (ВУЦ)',
      key: 'isMilitaryChair',
      render: (inst: any) => inst.isMilitaryChair ? (
        <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-xs">
          <CheckCircle2 className="w-4 h-4" /> Есть ВУЦ
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-slate-400 font-semibold text-xs">
          <XCircle className="w-4 h-4" /> Нет
        </span>
      ),
    },
    {
      title: 'Программ бакалавриата/магистратуры',
      key: 'programsCount',
      render: (inst: any) => (
        <span className="font-bold text-slate-800 text-xs">
          {inst.programsCount} направлений
        </span>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Сравнение вузов</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Сравнение учебных заведений ({selectedInstitutions.length} из 4)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Наглядная таблица ключевых характеристик для осознанного выбора
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setHighlightDifferences(!highlightDifferences)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              highlightDifferences 
                ? 'bg-amber-50 border-amber-300 text-amber-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {highlightDifferences ? '✓ Различия подсвечены' : 'Подсветить различия'}
          </button>

          <button
            onClick={clearCompared}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Очистить все
          </button>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="p-4 sm:p-6 w-1/4 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-400">
                Параметры
              </th>
              {selectedInstitutions.map(inst => (
                <th key={inst!.id} className="p-4 sm:p-6 w-1/4 align-top border-l border-slate-100">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className={`w-12 h-12 rounded-2xl ${inst!.logoBg} text-white font-black text-xs flex items-center justify-center tracking-wider shadow-md`}>
                      {inst!.logoLetter}
                    </div>
                    <button
                      onClick={() => toggleCompare(inst!.id)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Удалить из сравнения"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {inst!.name}
                  </h3>
                  <Link
                    href={`/vuz/${inst!.id}`}
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 inline-flex items-center gap-1 mt-2"
                  >
                    <span>Страница вуза</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </th>
              ))}
              {selectedInstitutions.length < 4 && (
                <th className="p-4 sm:p-6 w-1/4 align-middle text-center border-l border-dashed border-slate-200 bg-slate-50/30">
                  <Link
                    href="/vuz"
                    className="inline-flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-dashed border-slate-300 hover:border-brand-500 hover:bg-brand-50/50 text-slate-500 hover:text-brand-600 transition-all"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="text-xs font-bold">Добавить вуз</span>
                  </Link>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {parameters.map((param, pIdx) => {
              // check if values differ
              const values = selectedInstitutions.map(inst => (inst as any)[param.key]);
              const isDifferent = new Set(values).size > 1;

              return (
                <tr
                  key={param.key}
                  className={`border-b border-slate-100 transition-colors ${
                    highlightDifferences && isDifferent ? 'bg-amber-50/50' : pIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                  }`}
                >
                  <td className="p-4 sm:p-5 text-xs font-bold text-slate-600 bg-slate-50/60">
                    {param.title}
                  </td>
                  {selectedInstitutions.map(inst => (
                    <td key={inst!.id} className="p-4 sm:p-5 text-xs border-l border-slate-100">
                      {param.render(inst)}
                    </td>
                  ))}
                  {selectedInstitutions.length < 4 && (
                    <td className="border-l border-dashed border-slate-200 bg-slate-50/20" />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
