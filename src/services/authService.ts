import { UserProfile, Badge } from '../types';

const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-quiz',
    title: 'Primeiro Desafio',
    description: 'Iniciou a expedição cultural por Bagé - RS',
    icon: '🎯',
    unlocked: true,
    unlockedAt: 'Hoje'
  },
  {
    id: 'art-master',
    title: 'Mestre da Gravura',
    description: 'Dominou os conhecimentos sobre o Grupo de Bagé e as artes gráficas',
    icon: '🎨',
    unlocked: true,
    unlockedAt: 'Hoje'
  },
  {
    id: 'city-explorer',
    title: 'Rainha da Fronteira',
    description: 'Explorou todos os patrimônios históricos e fortes de Bagé',
    icon: '🧭',
    unlocked: false
  },
  {
    id: 'perfect-score',
    title: 'Nota Máxima no Pampa',
    description: 'Alcançou 10 de 10 pontos no desafio de Bagé',
    icon: '⭐',
    unlocked: false
  }
];

const STORAGE_KEY = 'educatour_user';

export const getStoredUser = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Erro ao ler usuário do localStorage", e);
  }

  return {
    name: "Aventureiro(a)",
    email: "aventureiro@educatour.app",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    points: 10,
    quizzesCompleted: 1,
    placesVisited: 3,
    badges: INITIAL_BADGES
  };
};

export const saveUser = (user: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Erro ao salvar usuário no localStorage", e);
  }
};
