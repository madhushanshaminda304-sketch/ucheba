'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CAREER_QUESTIONS, ARCHETYPE_RESULTS, INSTITUTIONS, PROFESSIONS } from '@/lib/data';
import { 
  Compass, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Briefcase, 
  GraduationCap,
  TrendingUp
} from 'lucide-react';

export default function CareerTestPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalQuestions = CAREER_QUESTIONS.length;

  const handleSelectOption = (archetype: string) => {
    const updated = [...answers, archetype];
    setAnswers(updated);

    if (currentStep + 1 < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculate dominant archetype
  const dominantArchetype = React.useMemo(() => {
    if (!isCompleted || answers.length === 0) return 'it';
    const counts: { [key: string]: number } = { it: 0, business: 0, humanitarian: 0, creative: 0, medical: 0 };
    answers.forEach(a => {
      counts[a] = (counts[a] || 0) + 1;
    });
    let maxArch = 'it';
    let maxCount = -1;
    for (const arch in counts) {
      if (counts[arch] > maxCount) {
        maxCount = counts[arch];
        maxArch = arch;
      }
    }
    return maxArch as keyof typeof ARCHETYPE_RESULTS;
  }, [answers, isCompleted]);

  const resultData = ARCHETYPE_RESULTS[dominantArchetype] || ARCHETYPE_RESULTS.it;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Тест на профориентацию</span>
      </nav>

      {!isCompleted ? (
        /* QUIZ PROGRESSION SCREEN */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in duration-300">
          
          {/* Top Progress bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-brand-600 flex items-center gap-1.5 uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                Вопрос {currentStep + 1} из {totalQuestions}
              </span>
              <span className="text-slate-400">
                {Math.round(((currentStep) / totalQuestions) * 100)}% пройдено
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">
              {CAREER_QUESTIONS[currentStep].question}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Выберите один вариант ответа, который наиболее точно отражает ваши предпочтения:
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {CAREER_QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.archetype)}
                className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200/90 hover:border-brand-500 hover:bg-brand-50/40 text-slate-800 hover:text-brand-900 font-medium text-sm sm:text-base transition-all flex items-center justify-between gap-4 group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center text-xs font-bold text-slate-600 transition-colors shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{option.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))}
          </div>

        </div>
      ) : (
        /* RESULTS SCREEN */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Main Result Card */}
          <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-blue-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 border border-slate-800">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span>Результат вашего теста</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ваше ведущее призвание:</span>
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {resultData.title}
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {resultData.description}
            </p>

            <div className="pt-2">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Пройти тест заново</span>
              </button>
            </div>
          </div>

          {/* Recommended Professions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Рекомендации</div>
              <h2 className="text-xl font-bold text-slate-900">Подходящие профессии для вас</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {resultData.suggestedProfessions.map((profName, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{profName}</h3>
                  <Link href="/prof" className="text-xs font-semibold text-brand-600 hover:underline inline-flex items-center gap-1">
                    <span>Подробнее</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Universities */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Где учиться</div>
              <h2 className="text-xl font-bold text-slate-900">Ведущие университеты по вашему профилю</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resultData.topInstitutions.map((instName, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-800 text-white flex items-center justify-center font-black text-xs">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{instName}</h4>
                      <span className="text-xs text-slate-400">Бюджетные места и высокий рейтинг</span>
                    </div>
                  </div>
                  <Link href="/vuz" className="text-xs font-bold text-brand-600 hover:text-brand-800">
                    Перейти
                  </Link>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 text-center">
              <Link
                href="/vuz"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Смотреть все вузы по специальности</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
