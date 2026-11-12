'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/AppContext';
import { 
  X, 
  Laptop, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  Scale, 
  Sparkles, 
  RotateCcw,
  Info,
  Lock
} from 'lucide-react';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    user, 
    updateDisplayName, 
    resetWorkspace,
    savedFavorites,
    savedCompared,
    userScores,
    showToast
  } = useApp();

  const [nameInput, setNameInput] = useState(user.name || 'Гость');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user.name) {
      setNameInput(user.name);
    }
  }, [user.name]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsAuthModalOpen(false);
    };
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed) {
      updateDisplayName(trimmed);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setIsAuthModalOpen(false);
      }, 700);
    }
  };

  const handleReset = () => {
    if (confirm('Сбросить сохранённые на этом устройстве списки избранного, сравнения и баллы ЕГЭ?')) {
      resetWorkspace();
      setNameInput('Гость');
      setIsAuthModalOpen(false);
    }
  };

  const enteredScoresCount = Object.values(userScores).filter(v => v !== null && v !== undefined).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 px-6 pt-7 pb-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-sm mb-3">
            <Laptop className="w-3.5 h-3.5" />
            <span>Локальный профиль устройства</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Рабочее пространство абитуриента
          </h3>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            Прогресс выбора программ, баллы и списки сохраняются на этом компьютере.
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Honest Explanation Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
            <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-semibold mb-0.5">Принцип приватности и хранения данных</strong>
              В экспериментальном режиме все ваши закладки, списки сравнения и предварительные баллы хранятся исключительно в памяти браузера (<code className="font-mono text-slate-800 bg-slate-200/60 px-1 py-0.5 rounded">localStorage</code>). Пароли не требуются и не запрашиваются.
            </div>
          </div>

          {/* User Display Name Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider mb-1.5">
                Имя в профиле
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Например: Алексей или Абитуриент 2026"
                maxLength={40}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Используется для персонализации отчётов и сводок поступления
              </span>
            </div>

            {/* Quick Status Badges */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                <Heart className="w-4 h-4 text-rose-500 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block">{savedFavorites.length}</span>
                <span className="text-[10px] text-slate-400">в избранном</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                <Scale className="w-4 h-4 text-brand-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block">{savedCompared.length}</span>
                <span className="text-[10px] text-slate-400">в сравнении</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                <Sparkles className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block">{enteredScoresCount}</span>
                <span className="text-[10px] text-slate-400">баллов ЕГЭ</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Сбросить данные</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-600/20 transition-all inline-flex items-center gap-1.5"
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Сохранено!</span>
                  </>
                ) : (
                  <span>Сохранить имя</span>
                )}
              </button>
            </div>
          </form>

          {/* Architecture readiness disclaimer */}
          <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Готовность к единой авторизации:</strong> модуль спроектирован с возможностью прямого подключения провайдеров ЕСИА (Госуслуги) и VK ID после завершения этапа интеграции с федеральными сервисами.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
