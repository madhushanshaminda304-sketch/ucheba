'use client';

import React from 'react';
import { useApp } from '@/lib/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  return (
    <div 
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-4 fade-in duration-200 pointer-events-auto"
      role="status"
      aria-live="polite"
    >
      <div className={`p-4 rounded-2xl shadow-xl border flex items-center justify-between gap-3 backdrop-blur-md transition-all ${
        toast.type === 'success' 
          ? 'bg-slate-900/95 text-white border-slate-700/80' 
          : toast.type === 'error'
          ? 'bg-rose-950/95 text-rose-100 border-rose-800'
          : 'bg-indigo-950/95 text-white border-indigo-800'
      }`}>
        <div className="flex items-center gap-3">
          {toast.type === 'success' && (
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
          {toast.type === 'error' && (
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
          {toast.type === 'info' && (
            <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
          )}

          <span className="text-xs sm:text-sm font-semibold leading-snug">
            {toast.message}
          </span>
        </div>

        <button
          onClick={hideToast}
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors shrink-0"
          aria-label="Закрыть уведомление"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
