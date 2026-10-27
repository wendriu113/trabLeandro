export type ScreenType = 'login' | 'menu' | 'quiz' | 'result' | 'explore' | 'map' | 'profile';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  points: number;
  quizzesCompleted: number;
  placesVisited: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface QuizQuestion {
  id: number;
  localName: string;
  question: string;
  options: string[]; // Exact 5 options as per PDF requirement
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface TouristPlace {
  id: string;
  name: string;
  category: 'Cultura' | 'Natureza' | 'História' | 'Arquitetura';
  image: string;
  description: string;
  longDescription: string;
  curiosity: string;
  address: string;
  coordinates: [number, number]; // [lat, lng]
  quizId?: number;
}

export interface UserAnswer {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
}
