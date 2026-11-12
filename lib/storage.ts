import { WorkspaceV2, SavedEntityRef, SavedEntityType } from './types';
import { INSTITUTIONS, COLLEGES, PROGRAMS, PROFESSIONS } from './data';

const STORAGE_KEY_V2 = 'ucheba_workspace_v2';
const BACKUP_KEY_PREFIX = 'ucheba_workspace_backup_';

export interface StorageLoadResult {
  workspace: WorkspaceV2;
  recoveryNotice: string | null;
}

/**
 * Creates a clean default guest workspace with NO hardcoded fake scores.
 */
export function createDefaultWorkspace(): WorkspaceV2 {
  const now = new Date().toISOString();
  return {
    schemaVersion: 2,
    workspaceMode: 'guest',
    guestId: `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: now,
    updatedAt: now,
    userProfile: {
      displayName: 'Гость',
      isGuest: true,
      avatar: 'Г',
      createdAt: now,
      notes: 'Локальное рабочее пространство на этом устройстве'
    },
    examScores: {
      math: null,
      russian: null,
      informatics: null,
      social: null,
      physics: null,
      chemistry: null,
      biology: null,
      history: null,
      english: null,
      literature: null,
    },
    achievementsScore: null,
    favorites: [],
    compared: [],
    targetInstitutions: []
  };
}

/**
 * Infer entity type for legacy ID strings.
 */
function inferLegacyEntityType(id: string): SavedEntityType {
  if (PROGRAMS.some(p => p.id === id)) return 'program';
  if (COLLEGES.some(c => c.id === id)) return 'college';
  if (PROFESSIONS.some(p => p.id === id || p.slug === id)) return 'profession';
  return 'institution';
}

function getEntityTitle(type: SavedEntityType, id: string): { title?: string; subtitle?: string } {
  if (type === 'program') {
    const p = PROGRAMS.find(item => item.id === id);
    if (p) return { title: p.name, subtitle: `${p.institutionAbbreviation} • ${p.code}` };
  } else if (type === 'college') {
    const c = COLLEGES.find(item => item.id === id);
    if (c) return { title: c.name, subtitle: `${c.city} • СПО` };
  } else if (type === 'profession') {
    const pr = PROFESSIONS.find(item => item.id === id || item.slug === id);
    if (pr) return { title: pr.title, subtitle: pr.category };
  } else {
    const inst = INSTITUTIONS.find(item => item.id === id);
    if (inst) return { title: inst.name, subtitle: `${inst.city} • Вуз` };
  }
  return {};
}

/**
 * Validates and sanitizes a WorkspaceV2 object.
 */
export function validateWorkspace(data: any): { valid: boolean; workspace: WorkspaceV2; fixedIssues: string[] } {
  const fixedIssues: string[] = [];
  const defaultWs = createDefaultWorkspace();

  if (!data || typeof data !== 'object') {
    return { valid: false, workspace: defaultWs, fixedIssues: ['Invalid workspace object'] };
  }

  // Validate schema version
  const schemaVersion = data.schemaVersion === 2 ? 2 : 2;
  const guestId = typeof data.guestId === 'string' && data.guestId ? data.guestId : defaultWs.guestId;
  const createdAt = typeof data.createdAt === 'string' ? data.createdAt : defaultWs.createdAt;
  const updatedAt = new Date().toISOString();

  // Validate userProfile
  const userProfile = {
    displayName: (data.userProfile && typeof data.userProfile.displayName === 'string' && data.userProfile.displayName.trim()) 
      ? data.userProfile.displayName.trim() 
      : 'Гость',
    isGuest: true as const,
    avatar: (data.userProfile && typeof data.userProfile.avatar === 'string') 
      ? data.userProfile.avatar 
      : 'Г',
    createdAt: (data.userProfile && typeof data.userProfile.createdAt === 'string') 
      ? data.userProfile.createdAt 
      : createdAt,
    notes: 'Локальное рабочее пространство на этом устройстве'
  };

  // Validate examScores: numbers 0-100 or null
  const examScores: Record<string, number | null> = { ...defaultWs.examScores };
  if (data.examScores && typeof data.examScores === 'object') {
    for (const [subject, val] of Object.entries(data.examScores)) {
      if (val === null || val === undefined) {
        examScores[subject] = null;
      } else if (typeof val === 'number' && !isNaN(val)) {
        examScores[subject] = Math.max(0, Math.min(100, Math.round(val)));
      } else {
        examScores[subject] = null;
        fixedIssues.push(`Invalid score value for ${subject} reset to null`);
      }
    }
  }

  // Validate achievementsScore
  let achievementsScore: number | null = null;
  if (typeof data.achievementsScore === 'number' && !isNaN(data.achievementsScore)) {
    achievementsScore = Math.max(0, Math.min(10, Math.round(data.achievementsScore)));
  }

  // Validate favorites (SavedEntityRef[])
  const favorites: SavedEntityRef[] = [];
  if (Array.isArray(data.favorites)) {
    for (const item of data.favorites) {
      if (item && typeof item === 'object' && typeof item.id === 'string' && item.id) {
        const type: SavedEntityType = ['institution', 'program', 'college', 'profession'].includes(item.type) 
          ? item.type 
          : inferLegacyEntityType(item.id);
        const { title, subtitle } = getEntityTitle(type, item.id);
        favorites.push({
          type,
          id: item.id,
          savedAt: typeof item.savedAt === 'string' ? item.savedAt : new Date().toISOString(),
          title: item.title || title,
          subtitle: item.subtitle || subtitle,
        });
      } else if (typeof item === 'string' && item) {
        // legacy string format
        const type = inferLegacyEntityType(item);
        const { title, subtitle } = getEntityTitle(type, item);
        favorites.push({
          type,
          id: item,
          savedAt: new Date().toISOString(),
          title,
          subtitle,
        });
        fixedIssues.push(`Migrated legacy favorite string ID "${item}" to typed reference`);
      }
    }
  }

  // Validate compared (SavedEntityRef[])
  const compared: SavedEntityRef[] = [];
  if (Array.isArray(data.compared)) {
    for (const item of data.compared) {
      if (item && typeof item === 'object' && typeof item.id === 'string' && item.id) {
        const type: SavedEntityType = ['institution', 'program', 'college', 'profession'].includes(item.type) 
          ? item.type 
          : inferLegacyEntityType(item.id);
        const { title, subtitle } = getEntityTitle(type, item.id);
        compared.push({
          type,
          id: item.id,
          savedAt: typeof item.savedAt === 'string' ? item.savedAt : new Date().toISOString(),
          title: item.title || title,
          subtitle: item.subtitle || subtitle,
        });
      } else if (typeof item === 'string' && item) {
        const type = inferLegacyEntityType(item);
        const { title, subtitle } = getEntityTitle(type, item);
        compared.push({
          type,
          id: item,
          savedAt: new Date().toISOString(),
          title,
          subtitle,
        });
        fixedIssues.push(`Migrated legacy comparison string ID "${item}" to typed reference`);
      }
    }
  }

  // Validate targetInstitutions
  const targetInstitutions = Array.isArray(data.targetInstitutions) ? data.targetInstitutions : [];

  const sanitized: WorkspaceV2 = {
    schemaVersion,
    workspaceMode: 'guest',
    guestId,
    createdAt,
    updatedAt,
    userProfile,
    examScores,
    achievementsScore,
    favorites,
    compared,
    targetInstitutions
  };

  return { valid: true, workspace: sanitized, fixedIssues };
}

/**
 * Loads workspace with automatic migration from v1, corruption recovery, and backup creation.
 */
export function loadWorkspaceFromStorage(): StorageLoadResult {
  if (typeof window === 'undefined') {
    return { workspace: createDefaultWorkspace(), recoveryNotice: null };
  }

  try {
    const rawV2 = localStorage.getItem(STORAGE_KEY_V2);
    if (rawV2) {
      try {
        const parsed = JSON.parse(rawV2);
        const { workspace, fixedIssues } = validateWorkspace(parsed);
        const notice = fixedIssues.length > 0 
          ? `Локальное хранилище синхронизировано (${fixedIssues.length} записей скорректировано).` 
          : null;
        return { workspace, recoveryNotice: notice };
      } catch (parseError) {
        // Save corrupt backup before overwriting
        const backupKey = `${BACKUP_KEY_PREFIX}corrupt_${Date.now()}`;
        localStorage.setItem(backupKey, rawV2);
        const fresh = createDefaultWorkspace();
        saveWorkspaceToStorage(fresh);
        return {
          workspace: fresh,
          recoveryNotice: 'Обнаружен поврежденный формат локальных данных. Создан резервный архив и инициализирован чистый профиль.'
        };
      }
    }

    // Check for legacy v1 storage
    const legacyFavs = localStorage.getItem('ucheba_favorites');
    const legacyComp = localStorage.getItem('ucheba_compare');
    const legacyUser = localStorage.getItem('ucheba_user');
    const legacyScores = localStorage.getItem('ucheba_scores');

    if (legacyFavs || legacyComp || legacyUser || legacyScores) {
      // Create backup of legacy data before migration
      const backupData = {
        favorites: legacyFavs ? JSON.parse(legacyFavs) : null,
        compare: legacyComp ? JSON.parse(legacyComp) : null,
        user: legacyUser ? JSON.parse(legacyUser) : null,
        scores: legacyScores ? JSON.parse(legacyScores) : null,
        backedUpAt: new Date().toISOString()
      };
      localStorage.setItem(`${BACKUP_KEY_PREFIX}v1_${Date.now()}`, JSON.stringify(backupData));

      const fresh = createDefaultWorkspace();
      
      // Migrate user name if exists
      if (backupData.user && typeof backupData.user.name === 'string' && backupData.user.name.trim()) {
        fresh.userProfile.displayName = backupData.user.name.trim();
        fresh.userProfile.avatar = backupData.user.name.trim().slice(0, 1).toUpperCase();
      }

      // Migrate favorites
      if (Array.isArray(backupData.favorites)) {
        for (const id of backupData.favorites) {
          if (typeof id === 'string') {
            const type = inferLegacyEntityType(id);
            const { title, subtitle } = getEntityTitle(type, id);
            fresh.favorites.push({
              type,
              id,
              savedAt: new Date().toISOString(),
              title,
              subtitle
            });
          }
        }
      }

      // Migrate compared
      if (Array.isArray(backupData.compare)) {
        for (const id of backupData.compare) {
          if (typeof id === 'string') {
            const type = inferLegacyEntityType(id);
            const { title, subtitle } = getEntityTitle(type, id);
            fresh.compared.push({
              type,
              id,
              savedAt: new Date().toISOString(),
              title,
              subtitle
            });
          }
        }
      }

      // Save as V2
      saveWorkspaceToStorage(fresh);
      return {
        workspace: fresh,
        recoveryNotice: 'Данные профиля успешно перенесены в новый формат workspace v2. Создана резервная копия.'
      };
    }

    // New visitor: create default workspace
    const newWs = createDefaultWorkspace();
    saveWorkspaceToStorage(newWs);
    return { workspace: newWs, recoveryNotice: null };
  } catch (e) {
    // If anything fails with localStorage, return clean memory workspace
    return { workspace: createDefaultWorkspace(), recoveryNotice: null };
  }
}

/**
 * Persists workspace to localStorage.
 */
export function saveWorkspaceToStorage(workspace: WorkspaceV2): void {
  if (typeof window === 'undefined') return;
  try {
    const updated = {
      ...workspace,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(updated));
  } catch (e) {
    // quota exceeded or private mode
  }
}
