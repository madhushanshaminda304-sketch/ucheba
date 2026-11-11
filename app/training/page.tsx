'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TRAINING_QUESTIONS } from '@/lib/data';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  Award, 
  HelpCircle, 
  ArrowRight,
  Flame,
  Clock,
  Sparkles
} from 'lucide-react';

export default function TrainingExamPage() {
  const [selectedSubject, setSelectedSubject] = useState<'russian' | 'math' | 'informatics' | 'social'>('russian');
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});
  const [checkedQuestions, setCheckedQuestions] = useState<{ [qId: string]: boolean }>({});

  const subjectTitles = {
    russian: 'Русский язык',
    math: 'Профильная математика',
    informatics: 'Информатика и ИКТ',
    social: 'Обществознание',
  };

  const subjectQuestions = TRAINING_QUESTIONS.filter(q => q.subject === selectedSubject);

  const handleSelectOption = (qId: string, option: string) => {
    setUserAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleCheckAnswer = (qId: string) => {
    setCheckedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const handleResetSubject = () => {
    setUserAnswers({});
    setCheckedQuestions({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Тренажёр заданий ЕГЭ</span>
      </nav>

      {/* Hero Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>Бесплатный онлайн-тренажёр заданий ФИПИ 2026</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Тренажёр заданий ЕГЭ по предметам
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Тренируйтесь в решении типовых заданий первой и второй части ЕГЭ с мгновенной автоматической проверкой ответов и подробными авторскими разборами решений.
        </p>
      </div>

      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(Object.keys(subjectTitles) as Array<keyof typeof subjectTitles>).map(sub => (
          <button
            key={sub}
            onClick={() => {
              setSelectedSubject(sub);
              setUserAnswers({});
              setCheckedQuestions({});
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedSubject === sub
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {subjectTitles[sub]}
          </button>
        ))}
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {subjectQuestions.map((q, idx) => {
          const selectedAnswer = userAnswers[q.id];
          const isChecked = checkedQuestions[q.id];
          const isCorrect = selectedAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-brand-50 text-brand-700 font-black text-xs flex items-center justify-center">
                    №{q.taskNumber}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {q.taskTitle}
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {q.maxScore} первичный балл
                </span>
              </div>

              {/* Question Text */}
              <div className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed whitespace-pre-line">
                {q.questionText}
              </div>

              {/* Options */}
              {q.options && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Выберите ответ:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedAnswer === opt;
                      let optionStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

                      if (isChecked) {
                        if (opt === q.correctAnswer) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isOptionSelected) {
                          optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                        }
                      } else if (isOptionSelected) {
                        optionStyle = 'border-brand-500 bg-brand-50 text-brand-900 font-bold ring-2 ring-brand-500/20';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isChecked}
                          onClick={() => handleSelectOption(q.id, opt)}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {isChecked && opt === q.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isChecked && isOptionSelected && opt !== q.correctAnswer && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action: Check Button */}
              {!isChecked ? (
                <div className="pt-2">
                  <button
                    disabled={!selectedAnswer}
                    onClick={() => handleCheckAnswer(q.id)}
                    className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-brand-500/20"
                  >
                    Проверить ответ
                  </button>
                </div>
              ) : (
                /* Explanation Feedback */
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 animate-in fade-in ${
                  isCorrect ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Верно! Вы получили {q.maxScore} балл.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Неверно. Правильный ответ: <strong>{q.correctAnswer}</strong></span>
                      </>
                    )}
                  </div>
                  <div className="text-xs pt-1 border-t border-slate-200/50">
                    <strong>Объяснение решения:</strong> {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA for university programs */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base sm:text-lg">Готовы рассчитать баллы для поступления?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Используйте наш калькулятор ЕГЭ, чтобы узнать шансы пройти на бюджет в вузы России.
          </p>
        </div>
        <Link
          href="/"
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shrink-0 text-center"
        >
          Калькулятор на главной
        </Link>
      </div>

    </div>
  );
}
