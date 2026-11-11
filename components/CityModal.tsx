'use client';

import React from 'react';
import { useApp } from '@/lib/AppContext';
import { CITIES } from '@/lib/data';
import { MapPin, X, Check } from 'lucide-react';

export default function CityModal() {
  const { selectedCity, setSelectedCity, isCityModalOpen, setIsCityModalOpen } = useApp();

  if (!isCityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="city-modal-title"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 id="city-modal-title" className="text-lg font-bold text-slate-800">Выберите ваш город</h2>
              <p className="text-xs text-slate-500">Показываем вузы, колледжи и дни открытых дверей</p>
            </div>
          </div>
          <button
            onClick={() => setIsCityModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Закрыть окно выбора города"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-1">
          {CITIES.map(city => {
            const isSelected = selectedCity === city.id;
            return (
              <button
                key={city.id}
                onClick={() => {
                  setSelectedCity(city.id);
                  setIsCityModalOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm">{city.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {city.countVuz} вузов
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-brand-600" />}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={() => setIsCityModalOpen(false)}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Подтвердить выбор
          </button>
        </div>
      </div>
    </div>
  );
}
