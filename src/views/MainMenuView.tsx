import React from 'react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/common/Button';
import { UserProfile } from '../types';
import { Map, Flag, Compass } from 'lucide-react';

interface MainMenuViewProps {
  user: UserProfile;
  onNavigate: (screen: 'login' | 'explore' | 'quiz' | 'map' | 'profile') => void;
}

export const MainMenuView: React.FC<MainMenuViewProps> = ({ user, onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col justify-between bg-educa-deepBlue">
      {/* Top Bar as seen in Figure 2: Back arrow, "Menu", Profile Icon */}
      <Header
        title="Menu"
        onBack={() => onNavigate('login')}
        showProfile={true}
        onProfileClick={() => onNavigate('profile')}
        userPoints={user.points}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 sm:px-10 max-w-md mx-auto w-full">
        {/* Playful Greeting (Yellow #FFC400) */}
        <div className="text-left mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-educa-yellow tracking-tight leading-tight">
            Olá, {user.name || 'Aventureiro(a)'}!
          </h1>
          <p className="text-xl sm:text-2xl text-white font-medium mt-1">
            Para onde vamos hoje?
          </p>
        </div>

        {/* 3 Main Action Buttons as in Figure 2 */}
        <div className="space-y-5">
          {/* 1. Explorar (Yellow #FFC400) with Map Icon */}
          <Button
            variant="yellow"
            onClick={() => onNavigate('explore')}
            icon={<Map className="stroke-[2.5]" size={26} />}
            className="!py-4 text-xl justify-start pl-8"
          >
            Explorar
          </Button>

          {/* 2. Ir para o desafio (Green #20A765) with Flag Icon */}
          <Button
            variant="green"
            onClick={() => onNavigate('quiz')}
            icon={<Flag className="stroke-[2.5]" size={26} />}
            className="!py-4 text-xl justify-start pl-8 animate-pulse-subtle"
          >
            Ir para o desafio
          </Button>

          {/* 3. Mapa (Yellow #FFC400) with Compass Icon */}
          <Button
            variant="yellow"
            onClick={() => onNavigate('map')}
            icon={<Compass className="stroke-[2.5]" size={26} />}
            className="!py-4 text-xl justify-start pl-8"
          >
            Mapa
          </Button>
        </div>
      </div>

      {/* Bottom Subtle Status Pill */}
      <div className="p-4 text-center">
        <button
          onClick={() => onNavigate('profile')}
          className="inline-flex items-center space-x-2 bg-educa-midBlue/60 hover:bg-educa-midBlue px-4 py-2 rounded-full text-xs text-white/90 border border-white/10 transition-colors cursor-pointer"
        >
          <span>🏆 {user.points} pontos acumulados</span>
          <span className="text-white/40">•</span>
          <span>{user.quizzesCompleted} desafio concluído</span>
        </button>
      </div>
    </div>
  );
};
