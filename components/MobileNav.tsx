'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { 
  Home, 
  GraduationCap, 
  Search, 
  Heart, 
  User 
} from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();
  const { favorites, user, setIsAuthModalOpen } = useApp();

  const items = [
    { href: '/', label: 'Главная', icon: Home },
    { href: '/vuz', label: 'Вузы', icon: GraduationCap },
    { href: '/search', label: 'Поиск', icon: Search },
    { href: '/favorites', label: 'Избранное', icon: Heart, count: favorites.length },
    { href: '/profile', label: 'Кабинет', icon: User, isAuth: true },
  ];

  return (
    <nav 
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-2 py-1 flex items-center justify-around"
      aria-label="Мобильная навигация"
    >
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;

        if (item.isAuth && !user) {
          return (
            <button
              key={item.label}
              onClick={() => setIsAuthModalOpen(true)}
              className="flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
            </button>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl relative transition-colors ${
              isActive 
                ? 'text-brand-600 font-bold' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.count !== undefined && item.count > 0 && (
                <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-[14px] rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
