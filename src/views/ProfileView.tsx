import React from 'react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/common/Button';
import { UserProfile } from '../types';
import { Trophy, Volume2, LogOut, CheckCircle, Lock } from 'lucide-react';
import { speechService } from '../services/speechService';

interface ProfileViewProps {
  user: UserProfile;
  onBackToMenu: () => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onBackToMenu,
  onLogout,
}) => {
  const handleTestAudio = () => {
    speechService.speak(
      `Olá, ${user.name}! O leitor em voz alta do EducaTour está configurado em português do Brasil para a expedição por Bagé, a Rainha da Fronteira. Você já acumulou ${user.points} pontos em sua jornada cultural!`
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-educa-deepBlue">
      {/* Top Bar */}
      <Header
        title="Perfil do Aventureiro"
        onBack={onBackToMenu}
      />

      {/* Main Profile Body */}
      <div className="flex-1 flex flex-col px-5 py-6 sm:px-8 max-w-md mx-auto w-full overflow-y-auto">
        {/* User Card */}
        <div className="bg-[#1F4C64]/90 border border-white/15 rounded-3xl p-6 text-center shadow-game mb-6">
          <div className="relative inline-block mb-3">
            <div className="w-24 h-24 rounded-full border-4 border-educa-yellow overflow-hidden mx-auto shadow-md bg-educa-midBlue flex items-center justify-center">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 bg-educa-green text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-educa-deepBlue">
              NÍVEL 1
            </span>
          </div>

          <h2 className="text-2xl font-black text-white">{user.name}</h2>
          <p className="text-xs text-educa-lightGray/80">{user.email}</p>

          {/* Stat Badges Row */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-white/10">
            <div className="bg-educa-midBlue/60 rounded-2xl p-2.5">
              <span className="block text-xl font-black text-educa-yellow">{user.points}</span>
              <span className="text-[11px] font-medium text-white/80">Pontos</span>
            </div>
            <div className="bg-educa-midBlue/60 rounded-2xl p-2.5">
              <span className="block text-xl font-black text-white">{user.quizzesCompleted}</span>
              <span className="text-[11px] font-medium text-white/80">Quizzes</span>
            </div>
            <div className="bg-educa-midBlue/60 rounded-2xl p-2.5">
              <span className="block text-xl font-black text-educa-green">{user.placesVisited}</span>
              <span className="text-[11px] font-medium text-white/80">Locais</span>
            </div>
          </div>
        </div>

        {/* Section: Badges / Gamification (PDF Section 6: Pontos e Medalhas) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-extrabold text-educa-yellow flex items-center">
              <Trophy size={18} className="mr-1.5" />
              Medalhas e Conquistas
            </h3>
            <span className="text-xs text-white/60">
              {user.badges.filter(b => b.unlocked).length}/{user.badges.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {user.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between space-x-3 transition-all ${
                  badge.unlocked
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-black/20 border-white/5 text-white/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    badge.unlocked ? 'bg-educa-yellow/20 border border-educa-yellow/40' : 'bg-gray-800'
                  }`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${badge.unlocked ? 'text-white' : 'text-white/60'}`}>
                      {badge.title}
                    </h4>
                    <p className="text-xs text-white/70 line-clamp-1">
                      {badge.description}
                    </p>
                  </div>
                </div>

                {badge.unlocked ? (
                  <CheckCircle size={18} className="text-educa-green shrink-0" />
                ) : (
                  <Lock size={16} className="text-white/30 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility & Audio Test */}
        <div className="bg-[#1F4C64]/60 border border-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-educa-yellow uppercase tracking-wider flex items-center">
              <Volume2 size={16} className="mr-1.5" />
              Leitor em Voz Alta (pt-BR)
            </h4>
            <span className="text-[10px] bg-educa-green/30 text-green-300 font-bold px-2 py-0.5 rounded-full border border-educa-green/40">
              Voz Ativa
            </span>
          </div>
          <p className="text-xs text-white/80 mb-3">
            O recurso "Ouvir" nas telas utiliza a Web Speech API com síntese nativa em português do Brasil (pt-BR) para narrar perguntas e resultados.
          </p>
          <button
            onClick={handleTestAudio}
            className="w-full py-2.5 px-4 rounded-xl bg-educa-yellow hover:bg-educa-yellowHover text-educa-darkBlue text-xs font-black uppercase tracking-wider shadow cursor-pointer transition-colors"
          >
            🔊 Testar Voz (pt-BR)
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button
            variant="green"
            onClick={onBackToMenu}
          >
            Voltar ao Menu
          </Button>

          <button
            onClick={onLogout}
            className="w-full py-3 rounded-2xl border border-red-400/40 hover:bg-red-950/30 text-red-200 text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Encerrar Sessão (Sair)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
