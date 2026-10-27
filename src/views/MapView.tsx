import React from 'react';
import { Header } from '../components/layout/Header';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { TouristPlace } from '../types';
import { Navigation, Compass } from 'lucide-react';

interface MapViewProps {
  onBackToMenu: () => void;
  onGoToQuiz: () => void;
}

export const MapView: React.FC<MapViewProps> = ({ onBackToMenu, onGoToQuiz }) => {
  const handleSelectPlaceForQuiz = (_place: TouristPlace) => {
    onGoToQuiz();
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-educa-deepBlue h-full relative overflow-hidden">
      {/* Top Bar */}
      <Header
        title="Mapa de Descoberta"
        onBack={onBackToMenu}
      />

      {/* Interactive Map Area */}
      <div className="flex-1 relative w-full h-full min-h-[400px]">
        <InteractiveMap onSelectPlaceForQuiz={handleSelectPlaceForQuiz} />

        {/* Floating Top Controls / Status */}
        <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center pointer-events-none">
          <div className="bg-educa-deepBlue/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg text-xs font-semibold text-white flex items-center space-x-2 pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-educa-green animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-educa-green absolute" />
            <span className="pl-2">GPS: Bagé - RS (Rainha da Fronteira)</span>
          </div>

          <div className="bg-educa-deepBlue/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg text-xs font-bold text-educa-yellow flex items-center space-x-1 pointer-events-auto">
            <Compass size={14} />
            <span>6 Locais</span>
          </div>
        </div>

        {/* Floating Bottom Advice Card */}
        <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
          <div className="bg-educa-deepBlue/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-educa-yellow/20 flex items-center justify-center text-educa-yellow shrink-0">
                <Navigation size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-educa-yellow uppercase tracking-wider">
                  Guia de Exploração
                </p>
                <p className="text-xs text-white/80 leading-tight">
                  Toque nos pinos amarelos para abrir detalhes e quizzes!
                </p>
              </div>
            </div>

            <button
              onClick={onGoToQuiz}
              className="px-3.5 py-2 rounded-xl bg-educa-green hover:bg-educa-greenHover text-white text-xs font-extrabold uppercase tracking-wider shadow shrink-0 active:scale-95 transition-all cursor-pointer"
            >
              Quiz Rápido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
