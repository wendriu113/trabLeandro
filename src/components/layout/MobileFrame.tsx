import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isMobileMode, setIsMobileMode] = useState<boolean>(true);

  return (
    <div className="min-h-screen w-full bg-[#163749] flex flex-col items-center justify-center sm:py-6 sm:px-4">
      {/* Floating View Switcher for Evaluators / Demo */}
      <aside aria-label="Controles de Visualização" className="fixed top-3 right-3 z-50 flex items-center bg-[#1B4459]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-xl space-x-1">
        <button
          onClick={() => setIsMobileMode(true)}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            isMobileMode
              ? 'bg-educa-yellow text-educa-darkBlue shadow'
              : 'text-white/70 hover:text-white'
          }`}
          title="Modo Celular (Conforme PDF)"
        >
          <Smartphone size={14} />
          <span>Celular</span>
        </button>
        <button
          onClick={() => setIsMobileMode(false)}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            !isMobileMode
              ? 'bg-educa-yellow text-educa-darkBlue shadow'
              : 'text-white/70 hover:text-white'
          }`}
          title="Modo Tela Inteira"
        >
          <Monitor size={14} />
          <span>Expandido</span>
        </button>
      </aside>

      {/* Main Container */}
      <div
        className={`
          w-full transition-all duration-300 relative overflow-hidden bg-educa-deepBlue flex flex-col
          ${
            isMobileMode
              ? 'max-w-[420px] h-[100dvh] sm:h-[840px] sm:rounded-[40px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] sm:border-[8px] sm:border-[#0f2430]'
              : 'max-w-4xl min-h-[100dvh] sm:min-h-[750px] sm:rounded-3xl sm:shadow-2xl sm:border border-white/10'
          }
        `}
      >
        {/* Mobile Camera Notch (only shown in framed mobile mode on larger screens) */}
        {isMobileMode && (
          <div className="hidden sm:flex justify-center items-center h-4 w-full bg-[#0f2430] absolute top-0 left-0 z-40 rounded-b-xl">
            <div className="w-16 h-2.5 bg-black/60 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full ml-auto mr-2" />
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};
