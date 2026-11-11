'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CITIES } from './data';

export interface UserProfile {
  name: string;
  phone?: string;
  email?: string;
  isLoggedIn: boolean;
  avatar?: string;
}

export interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  selectedCity: string;
  setSelectedCity: (cityId: string) => void;
  selectedCityName: string;
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  favorites: string[];
  toggleFavorite: (id: string, name?: string) => void;
  isFavorite: (id: string) => boolean;
  compared: string[];
  toggleCompare: (id: string, name?: string) => void;
  isCompared: (id: string) => boolean;
  clearCompared: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  user: UserProfile | null;
  login: (userData: { name: string; phone?: string; email?: string }) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  userScores: Record<string, number>;
  setUserScores: (scores: Record<string, number>) => void;
  updateUserScore: (subject: string, score: number) => void;
  toast: ToastItem | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState<string>('all');
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compared, setCompared] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [userScores, setUserScoresState] = useState<Record<string, number>>({
    math: 78,
    russian: 85,
    informatics: 82,
    social: 74,
    physics: 70
  });
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCity = localStorage.getItem('ucheba_city');
      if (savedCity) setSelectedCityState(savedCity);

      const savedFavs = localStorage.getItem('ucheba_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedComp = localStorage.getItem('ucheba_compare');
      if (savedComp) setCompared(JSON.parse(savedComp));

      const savedUser = localStorage.getItem('ucheba_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedScores = localStorage.getItem('ucheba_scores');
      if (savedScores) setUserScoresState(JSON.parse(savedScores));
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const [toast, setToast] = useState<ToastItem | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const newToast = { id: Date.now(), message, type };
    setToast(newToast);
    setTimeout(() => {
      setToast(curr => (curr?.id === newToast.id ? null : curr));
    }, 3200);
  };

  const hideToast = () => {
    setToast(null);
  };

  const login = (userData: { name: string; phone?: string; email?: string }) => {
    const profile: UserProfile = {
      ...userData,
      isLoggedIn: true,
      avatar: userData.name.slice(0, 2).toUpperCase()
    };
    setUser(profile);
    try {
      localStorage.setItem('ucheba_user', JSON.stringify(profile));
    } catch {}
    showToast(`Добро пожаловать, ${userData.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('ucheba_user');
    } catch {}
    showToast('Вы вышли из личного кабинета', 'info');
  };

  const setUserScores = (scores: Record<string, number>) => {
    setUserScoresState(scores);
    try {
      localStorage.setItem('ucheba_scores', JSON.stringify(scores));
    } catch {}
  };

  const updateUserScore = (subject: string, score: number) => {
    setUserScoresState(prev => {
      const updated = { ...prev, [subject]: score };
      try {
        localStorage.setItem('ucheba_scores', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const setSelectedCity = (cityId: string) => {
    setSelectedCityState(cityId);
    try {
      localStorage.setItem('ucheba_city', cityId);
    } catch {}
    const cityObj = CITIES.find(c => c.id === cityId);
    showToast(`Город изменён: ${cityObj ? cityObj.name : 'Вся Россия'}`, 'info');
  };

  const toggleFavorite = (id: string, name?: string) => {
    setFavorites(prev => {
      const isAdding = !prev.includes(id);
      const updated = isAdding ? [...prev, id] : prev.filter(item => item !== id);
      try {
        localStorage.setItem('ucheba_favorites', JSON.stringify(updated));
      } catch {}
      showToast(
        isAdding 
          ? (name ? `«${name}» добавлен в избранное` : 'Добавлено в избранное')
          : (name ? `«${name}» удален из избранного` : 'Удалено из избранного'),
        'success'
      );
      return updated;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  const toggleCompare = (id: string, name?: string) => {
    setCompared(prev => {
      if (prev.includes(id)) {
        const updated = prev.filter(item => item !== id);
        try {
          localStorage.setItem('ucheba_compare', JSON.stringify(updated));
        } catch {}
        showToast(name ? `«${name}» удален из сравнения` : 'Удалено из сравнения', 'info');
        return updated;
      }
      if (prev.length >= 4) {
        showToast('Можно сравнить максимум 4 учебных заведения одновременно', 'error');
        return prev;
      }
      const updated = [...prev, id];
      try {
        localStorage.setItem('ucheba_compare', JSON.stringify(updated));
      } catch {}
      showToast(name ? `«${name}» добавлен к сравнению` : 'Добавлено к сравнению', 'success');
      return updated;
    });
  };

  const isCompared = (id: string) => {
    return compared.includes(id);
  };

  const clearCompared = () => {
    setCompared([]);
    try {
      localStorage.removeItem('ucheba_compare');
    } catch {}
    showToast('Список сравнения очищен', 'info');
  };

  const currentCityObj = CITIES.find(c => c.id === selectedCity);
  const selectedCityName = currentCityObj ? currentCityObj.name : 'Вся Россия';

  return (
    <AppContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        selectedCityName,
        isCityModalOpen,
        setIsCityModalOpen,
        favorites,
        toggleFavorite,
        isFavorite,
        compared,
        toggleCompare,
        isCompared,
        clearCompared,
        searchQuery,
        setSearchQuery,
        user,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        userScores,
        setUserScores,
        updateUserScore,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
