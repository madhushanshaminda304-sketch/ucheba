'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/AppContext';
import { X, Phone, Mail, Lock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  
  // Form fields
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [isSmsSent, setIsSmsSent] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 10) {
      setError('Введите корректный номер телефона РФ');
      return;
    }
    setError('');
    setIsSmsSent(true);
    setSmsCode('4829'); // Pre-fill mock code for seamless UX
  };

  const handleVerifySms = (e: React.FormEvent) => {
    e.preventDefault();
    if (smsCode !== '4829' && smsCode.length !== 4) {
      setError('Неверный проверочный код из SMS');
      return;
    }
    setError('');
    const userName = name.trim() || 'Абитуриент';
    login({ name: userName, phone: phone });
    setSuccessMsg('Вы успешно вошли в личный кабинет!');
    setTimeout(() => {
      setSuccessMsg('');
      setIsAuthModalOpen(false);
      setIsSmsSent(false);
    }, 900);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Введите корректный адрес электронной почты');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }
    setError('');
    const fallbackName = name.trim() || email.split('@')[0];
    login({ name: fallbackName, email: email });
    setSuccessMsg(authMode === 'login' ? 'Успешный вход!' : 'Регистрация прошла успешно!');
    setTimeout(() => {
      setSuccessMsg('');
      setIsAuthModalOpen(false);
    }, 900);
  };

  const handleSocialAuth = (provider: string) => {
    login({ name: `${provider} Пользователь` });
    setSuccessMsg(`Вход через ${provider} выполнен!`);
    setTimeout(() => {
      setSuccessMsg('');
      setIsAuthModalOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header background pattern */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 px-6 pt-7 pb-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Единый аккаунт абитуриента</span>
          </div>
          
          <h2 className="text-2xl font-black tracking-tight">
            {authMode === 'login' ? 'Вход на Учёба.ру' : 'Регистрация абитуриента'}
          </h2>
          <p className="text-white/80 text-xs mt-1">
            Сохраняйте списки вузов, отслеживайте шансы на поступление и результаты ЕГЭ
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-100 bg-slate-50/70">
          <button
            onClick={() => { setAuthMode('login'); setError(''); }}
            className={`flex-1 py-3 text-sm font-bold transition-colors text-center border-b-2 ${
              authMode === 'login' 
                ? 'border-brand-600 text-brand-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Войти
          </button>
          <button
            onClick={() => { setAuthMode('register'); setError(''); }}
            className={`flex-1 py-3 text-sm font-bold transition-colors text-center border-b-2 ${
              authMode === 'register' 
                ? 'border-brand-600 text-brand-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Создать аккаунт
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Success alert */}
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error alert */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Phone vs Email Toggle */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => { setAuthMethod('phone'); setIsSmsSent(false); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'phone' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>По телефону</span>
            </button>
            <button
              type="button"
              onClick={() => { setAuthMethod('email'); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'email' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>По Email</span>
            </button>
          </div>

          {/* Phone Form */}
          {authMethod === 'phone' && (
            <div>
              {!isSmsSent ? (
                <form onSubmit={handleSendSms} className="space-y-4">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-1.5">
                        Ваше имя и фамилия
                      </label>
                      <input
                        type="text"
                        placeholder="Например, Анна Смирнова"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-1.5">
                      Номер телефона
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                        +7
                      </span>
                      <input
                        type="tel"
                        placeholder=" (999) 000-00-00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Получить код по SMS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifySms} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600 tracking-wider">
                        Код из SMS
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsSmsSent(false)}
                        className="text-xs text-brand-600 hover:underline"
                      >
                        Изменить номер
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="4829"
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center tracking-widest text-lg font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
                      autoFocus
                      required
                    />
                    <p className="text-[11px] text-slate-500 mt-1.5 text-center">
                      Тестовый код подтверждения введен автоматически (4829)
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all"
                  >
                    Подтвердить и войти
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Email Form */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-1.5">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Например, Михаил"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-1.5">
                  Электронная почта
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="student@example.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-1.5">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Минимум 6 символов"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all"
              >
                {authMode === 'login' ? 'Войти в аккаунт' : 'Зарегистрироваться'}
              </button>
            </form>
          )}

          {/* Social login divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
              или через сервис
            </span>
          </div>

          {/* Social login options */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleSocialAuth('VK ID')}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#0077FF] text-white flex items-center justify-center font-black text-xs group-hover:scale-105 transition-transform">
                VK
              </div>
              <span className="text-[11px] font-semibold text-slate-600 mt-1">VK ID</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialAuth('Госуслуги')}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#0C58A2] text-white flex items-center justify-center font-black text-[10px] group-hover:scale-105 transition-transform">
                ГУ
              </div>
              <span className="text-[11px] font-semibold text-slate-600 mt-1">Госуслуги</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialAuth('Яндекс')}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:border-red-400 hover:bg-red-50/50 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FC3F1D] text-white flex items-center justify-center font-black text-xs group-hover:scale-105 transition-transform">
                Я
              </div>
              <span className="text-[11px] font-semibold text-slate-600 mt-1">Яндекс ID</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center leading-normal">
            Авторизуясь, вы соглашаетесь с условиями{' '}
            <a href="/agreement" className="text-brand-600 underline" target="_blank" rel="noreferrer">
              Пользовательского соглашения
            </a>{' '}
            и обработки персональных данных (152-ФЗ).
          </p>
        </div>
      </div>
    </div>
  );
}
