'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import SearchModal from '@/components/SearchModal';
import AuthModal from '@/components/AuthModal';
import { 
  GraduationCap, 
  MapPin, 
  Search, 
  Heart, 
  Scale, 
  Menu, 
  X, 
  BookOpen, 
  Compass, 
  Briefcase, 
  Sparkles,
  School,
  Laptop,
  Award,
  Globe,
  User,
  Users
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { selectedCityName, setIsCityModalOpen, favorites, compared, user, setIsAuthModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const navLinks = [
    { href: '/vuz', label: 'Вузы', icon: GraduationCap },
    { href: '/colleges', label: 'Колледжи', icon: School },
    { href: '/school', label: 'Школы', icon: Award, badge: 'NEW' },
    { href: '/speciality', label: 'Специальности', icon: BookOpen },
    { href: '/prof', label: 'Профессии', icon: Briefcase },
    { href: '/courses', label: 'Курсы и ДПО', icon: Laptop },
    { href: '/master', label: 'Магистратура', icon: GraduationCap },
    { href: '/for-teachers', label: 'Репетиторам', icon: Users, badge: 'PRO' },
    { href: '/proftest', label: 'Профориентация', icon: Compass, badge: 'Тест' },
    { href: '/training', label: 'Тренажёр', icon: Sparkles, badge: 'ЕГЭ' },
    { href: '/abroad', label: 'За рубежом', icon: Globe },
    { href: '/journal', label: 'Журнал', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top tier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & City */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                  Учёба<span className="text-brand-500">.ру</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                  Навигатор образования
                </span>
              </div>
            </Link>

            {/* City Selector */}
            <button
              onClick={() => setIsCityModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-xs font-semibold transition-all border border-slate-200/60"
              title="Изменить город"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              <span>{selectedCityName}</span>
            </button>
          </div>

          {/* Quick Search Trigger */}
          <div className="hidden lg:flex flex-1 max-w-md">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-slate-400 text-sm transition-all"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Поиск вуза, специальности, школы, курса...</span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200/70 text-slate-500">
                ⌘K
              </span>
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Link */}
            <Link
              href="/compare"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Сравнение вузов"
            >
              <Scale className="w-5 h-5" />
              {compared.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {compared.length}
                </span>
              )}
            </Link>

            {/* Favorites Link */}
            <Link
              href="/favorites"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Избранное"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Account / Login */}
            {user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                title="Личный кабинет абитуриента"
              >
                <div className="w-7 h-7 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                  {user.avatar || 'АБ'}
                </div>
                <span className="hidden xl:inline text-xs font-bold max-w-[110px] truncate">{user.name}</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Войти</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Открыть главное меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Primary Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-0.5 py-1.5 border-t border-slate-100 overflow-x-auto">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative whitespace-nowrap ${
                  isActive
                    ? 'text-brand-700 bg-brand-50/80 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 text-[9px] font-black uppercase rounded ${
                    item.badge === 'NEW' ? 'bg-blue-100 text-blue-700' : item.badge === 'PRO' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 shadow-2xl p-4 space-y-3 z-40 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2">
          {/* Mobile City Picker */}
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setIsCityModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-between p-3 rounded-xl bg-slate-50 text-slate-700 text-sm font-semibold"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Город: {selectedCityName}</span>
              </span>
              <span className="text-xs text-brand-600">Изменить</span>
            </button>

            {user ? (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-brand-50 text-brand-700 font-bold text-xs"
              >
                Кабинет
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-xl bg-brand-600 text-white font-bold text-xs"
              >
                Войти
              </button>
            )}
          </div>

          {/* Mobile Search Button */}
          <div>
            <button
              onClick={() => {
                setIsSearchModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 text-slate-500 text-sm"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Поиск по каталогу</span>
              </span>
              <span className="text-xs font-bold text-slate-400">⌘K</span>
            </button>
          </div>

          {/* Mobile City Selector */}
          <button
            onClick={() => {
              setIsCityModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Регион: <strong className="text-slate-900">{selectedCityName}</strong></span>
            </div>
            <span className="text-[11px] text-brand-600 font-bold">Изменить</span>
          </button>

          {/* Mobile Nav Links */}
          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Global Modals */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
      <AuthModal />
    </header>
  );
}
