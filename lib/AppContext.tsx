'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CITIES } from './data';
import { WorkspaceV2, SavedEntityRef, SavedEntityType } from './types';
import { 
  loadWorkspaceFromStorage, 
  saveWorkspaceToStorage, 
  createDefaultWorkspace 
} from './storage';

export interface UserProfile {
  name: string;
  phone?: string;
  email?: string;
  isLoggedIn: boolean;
  isGuest: boolean;
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
  
  // Workspace & Persistence
  workspace: WorkspaceV2;
  storageRecoveryNotice: string | null;
  dismissRecoveryNotice: () => void;
  
  // Typed Favorites & Backward-compatible helpers
  favorites: string[]; // array of IDs for backward compatibility
  savedFavorites: SavedEntityRef[]; // rich typed references
  toggleFavorite: (
    target: string | { type: SavedEntityType; id: string; title?: string; subtitle?: string }, 
    name?: string
  ) => void;
  isFavorite: (id: string, type?: SavedEntityType) => boolean;
  
  // Typed Compare & Backward-compatible helpers
  compared: string[]; // array of IDs for backward compatibility
  savedCompared: SavedEntityRef[]; // rich typed references
  toggleCompare: (
    target: string | { type: SavedEntityType; id: string; title?: string; subtitle?: string }, 
    name?: string
  ) => void;
  isCompared: (id: string, type?: SavedEntityType) => boolean;
  clearCompared: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // User Profile (Explicit Local Guest Workspace)
  user: UserProfile;
  updateDisplayName: (name: string) => void;
  login: (userData: { name: string; phone?: string; email?: string }) => void;
  logout: () => void;
  resetWorkspace: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  
  // Validated Student Scores (distinguishing null from 0)
  userScores: Record<string, number | null>;
  setUserScores: (scores: Record<string, number | null>) => void;
  updateUserScore: (subject: string, score: number | null) => void;
  achievementsScore: number | null;
  setAchievementsScore: (score: number | null) => void;
  
  // Toast notifications
  toast: ToastItem | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState<string>('all');
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastItem | null>(null);

  // Workspace V2 State
  const [workspace, setWorkspace] = useState<WorkspaceV2>(createDefaultWorkspace());
  const [storageRecoveryNotice, setStorageRecoveryNotice] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCity = localStorage.getItem('ucheba_city');
      if (savedCity) setSelectedCityState(savedCity);

      // Load or migrate workspace
      const { workspace: loadedWs, recoveryNotice } = loadWorkspaceFromStorage();
      setWorkspace(loadedWs);
      if (recoveryNotice) {
        setStorageRecoveryNotice(recoveryNotice);
      }
    } catch {
      // LocalStorage error resilience
    }
  }, []);

  const dismissRecoveryNotice = () => {
    setStorageRecoveryNotice(null);
  };

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

  const setSelectedCity = (cityId: string) => {
    setSelectedCityState(cityId);
    try {
      localStorage.setItem('ucheba_city', cityId);
    } catch {}
    const cityObj = CITIES.find(c => c.id === cityId);
    showToast(`Город изменён: ${cityObj ? cityObj.name : 'Вся Россия'}`, 'info');
  };

  // User Profile
  const user: UserProfile = {
    name: workspace.userProfile.displayName,
    isLoggedIn: true,
    isGuest: true,
    avatar: workspace.userProfile.avatar || workspace.userProfile.displayName.slice(0, 1).toUpperCase()
  };

  const updateDisplayName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setWorkspace(prev => {
      const updated: WorkspaceV2 = {
        ...prev,
        userProfile: {
          ...prev.userProfile,
          displayName: trimmed,
          avatar: trimmed.slice(0, 1).toUpperCase()
        }
      };
      saveWorkspaceToStorage(updated);
      return updated;
    });
    showToast(`Имя профиля обновлено: ${trimmed}`, 'success');
  };

  const login = (userData: { name: string; phone?: string; email?: string }) => {
    if (userData.name) {
      updateDisplayName(userData.name);
    }
  };

  const logout = () => {
    // Reset to clean guest workspace
    const fresh = createDefaultWorkspace();
    setWorkspace(fresh);
    saveWorkspaceToStorage(fresh);
    showToast('Гостевой профиль сброшен к начальному состоянию', 'info');
  };

  const resetWorkspace = () => {
    logout();
  };

  // Validated Score Updates (Code-level validation 0-100 or null)
  const updateUserScore = (subject: string, score: number | null) => {
    let validScore: number | null = null;
    if (score !== null && score !== undefined) {
      const num = Number(score);
      if (!isNaN(num)) {
        validScore = Math.max(0, Math.min(100, Math.round(num)));
      }
    }

    setWorkspace(prev => {
      const updated: WorkspaceV2 = {
        ...prev,
        examScores: {
          ...prev.examScores,
          [subject]: validScore
        }
      };
      saveWorkspaceToStorage(updated);
      return updated;
    });
  };

  const setUserScores = (scores: Record<string, number | null>) => {
    const validatedScores: Record<string, number | null> = {};
    for (const [subj, val] of Object.entries(scores)) {
      if (val === null || val === undefined) {
        validatedScores[subj] = null;
      } else {
        const num = Number(val);
        validatedScores[subj] = isNaN(num) ? null : Math.max(0, Math.min(100, Math.round(num)));
      }
    }

    setWorkspace(prev => {
      const updated: WorkspaceV2 = {
        ...prev,
        examScores: {
          ...prev.examScores,
          ...validatedScores
        }
      };
      saveWorkspaceToStorage(updated);
      return updated;
    });
  };

  const setAchievementsScore = (score: number | null) => {
    const valid = score === null ? null : Math.max(0, Math.min(10, Math.round(Number(score) || 0)));
    setWorkspace(prev => {
      const updated: WorkspaceV2 = {
        ...prev,
        achievementsScore: valid
      };
      saveWorkspaceToStorage(updated);
      return updated;
    });
  };

  // Typed Favorites Management
  const toggleFavorite = (
    target: string | { type: SavedEntityType; id: string; title?: string; subtitle?: string },
    name?: string
  ) => {
    const targetId = typeof target === 'string' ? target : target.id;
    const targetType: SavedEntityType = typeof target === 'string' 
      ? (target.startsWith('p') && !target.startsWith('prof') ? 'program' : 'institution')
      : target.type;

    setWorkspace(prev => {
      const existsIndex = prev.favorites.findIndex(f => f.id === targetId);
      let updatedFavs: SavedEntityRef[];
      let isAdding: boolean;

      if (existsIndex >= 0) {
        updatedFavs = prev.favorites.filter((_, idx) => idx !== existsIndex);
        isAdding = false;
      } else {
        const newRef: SavedEntityRef = {
          type: targetType,
          id: targetId,
          savedAt: new Date().toISOString(),
          title: typeof target === 'object' ? target.title : name,
          subtitle: typeof target === 'object' ? target.subtitle : undefined
        };
        updatedFavs = [...prev.favorites, newRef];
        isAdding = true;
      }

      const updatedWs: WorkspaceV2 = {
        ...prev,
        favorites: updatedFavs
      };
      saveWorkspaceToStorage(updatedWs);

      const label = typeof target === 'object' ? target.title || name : name;
      showToast(
        isAdding 
          ? (label ? `«${label}» добавлен в избранное` : 'Добавлено в избранное')
          : (label ? `«${label}» удален из избранного` : 'Удалено из избранного'),
        isAdding ? 'success' : 'info'
      );

      return updatedWs;
    });
  };

  const isFavorite = (id: string, type?: SavedEntityType): boolean => {
    if (type) {
      return workspace.favorites.some(f => f.id === id && f.type === type);
    }
    return workspace.favorites.some(f => f.id === id);
  };

  // Typed Compare Management
  const toggleCompare = (
    target: string | { type: SavedEntityType; id: string; title?: string; subtitle?: string },
    name?: string
  ) => {
    const targetId = typeof target === 'string' ? target : target.id;
    const targetType: SavedEntityType = typeof target === 'string' 
      ? (target.startsWith('p') && !target.startsWith('prof') ? 'program' : 'institution')
      : target.type;

    setWorkspace(prev => {
      const existsIndex = prev.compared.findIndex(c => c.id === targetId);
      let updatedComp: SavedEntityRef[];

      if (existsIndex >= 0) {
        updatedComp = prev.compared.filter((_, idx) => idx !== existsIndex);
        const updatedWs: WorkspaceV2 = { ...prev, compared: updatedComp };
        saveWorkspaceToStorage(updatedWs);
        showToast(name ? `«${name}» удален из сравнения` : 'Удалено из сравнения', 'info');
        return updatedWs;
      }

      if (prev.compared.length >= 4) {
        showToast('Можно сравнить максимум 4 объекта одновременно', 'error');
        return prev;
      }

      const newRef: SavedEntityRef = {
        type: targetType,
        id: targetId,
        savedAt: new Date().toISOString(),
        title: typeof target === 'object' ? target.title : name,
        subtitle: typeof target === 'object' ? target.subtitle : undefined
      };
      updatedComp = [...prev.compared, newRef];
      const updatedWs: WorkspaceV2 = { ...prev, compared: updatedComp };
      saveWorkspaceToStorage(updatedWs);
      showToast(name ? `«${name}» добавлен к сравнению` : 'Добавлено к сравнению', 'success');
      return updatedWs;
    });
  };

  const isCompared = (id: string, type?: SavedEntityType): boolean => {
    if (type) {
      return workspace.compared.some(c => c.id === id && c.type === type);
    }
    return workspace.compared.some(c => c.id === id);
  };

  const clearCompared = () => {
    setWorkspace(prev => {
      const updatedWs: WorkspaceV2 = { ...prev, compared: [] };
      saveWorkspaceToStorage(updatedWs);
      return updatedWs;
    });
    showToast('Список сравнения очищен', 'info');
  };

  const currentCityObj = CITIES.find(c => c.id === selectedCity);
  const selectedCityName = currentCityObj ? currentCityObj.name : 'Вся Россия';

  // Backward compatible ID arrays
  const favoriteIds = workspace.favorites.map(f => f.id);
  const comparedIds = workspace.compared.map(c => c.id);

  return (
    <AppContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        selectedCityName,
        isCityModalOpen,
        setIsCityModalOpen,
        
        workspace,
        storageRecoveryNotice,
        dismissRecoveryNotice,
        
        favorites: favoriteIds,
        savedFavorites: workspace.favorites,
        toggleFavorite,
        isFavorite,
        
        compared: comparedIds,
        savedCompared: workspace.compared,
        toggleCompare,
        isCompared,
        clearCompared,
        
        searchQuery,
        setSearchQuery,
        
        user,
        updateDisplayName,
        login,
        logout,
        resetWorkspace,
        isAuthModalOpen,
        setIsAuthModalOpen,
        
        userScores: workspace.examScores,
        setUserScores,
        updateUserScore,
        achievementsScore: workspace.achievementsScore,
        setAchievementsScore,
        
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
