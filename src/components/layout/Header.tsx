import React from 'react';
import { ArrowLeft, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  showProfile?: boolean;
  onProfileClick?: () => void;
  userPoints?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  showProfile = false,
  onProfileClick,
  userPoints,
}) => {
  return (
    <header className="relative flex items-center justify-between px-4 py-3 min-h-[58px] bg-educa-deepBlue/90 backdrop-blur-md border-b border-white/10 z-20">
      {/* Left: Back button or placeholder */}
      <div className="flex items-center space-x-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center justify-center p-2 rounded-xl text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
            title="Voltar"
            aria-label="Voltar"
          >
            <ArrowLeft size={24} className="stroke-[2.5]" />
          </button>
        ) : (
          <div className="w-8" />
        )}

        {title && (
          <h2 className="text-xl font-bold tracking-tight text-white">
            {title}
          </h2>
        )}
      </div>

      {/* Right: Points chip and/or Profile Button */}
      <div className="flex items-center space-x-2">
        {typeof userPoints === 'number' && (
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-educa-yellow text-educa-darkBlue text-xs font-black shadow-sm">
            <Sparkles size={14} className="text-[#a17000]" />
            <span>{userPoints} pts</span>
          </div>
        )}

        {showProfile && (
          <button
            onClick={onProfileClick}
            className="w-10 h-10 rounded-full bg-educa-midBlue hover:bg-white/20 border-2 border-white/30 flex items-center justify-center text-white transition-all active:scale-95 shadow-md cursor-pointer overflow-hidden"
            title="Abrir Perfil"
            aria-label="Perfil do Usuário"
          >
            <User size={22} className="stroke-[2]" />
          </button>
        )}
      </div>
    </header>
  );
};
