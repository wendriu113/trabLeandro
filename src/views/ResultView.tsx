import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { AudioButton } from '../components/quiz/AudioButton';
import { Button } from '../components/common/Button';
import confetti from 'canvas-confetti';
import { Trophy, Award, Star } from 'lucide-react';

interface ResultViewProps {
  score: number;
  totalScore: number;
  onBackToMenu: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  score,
  totalScore = 10,
  onBackToMenu,
}) => {
  // Trigger celebration confetti on high performance
  useEffect(() => {
    try {
      if (score >= totalScore * 0.6) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFC400', '#20A765', '#4FB3D9', '#FFFFFF'],
        });
      }
    } catch (e) {
      // Confetti fallback
    }
  }, [score, totalScore]);

  // Text for the "Ouvir" button as specified in PDF section 5.4
  const spokenText = `Resultado do Desafio em Bagé. Parabéns! Você fez ${score} de ${totalScore} pontos. Obrigado por explorar e aprender sobre a Rainha da Fronteira com o EducaTour!`;

  return (
    <div className="flex-1 flex flex-col justify-between bg-educa-deepBlue">
      {/* Top Bar as seen in Figure 4: Back arrow, "Local" */}
      <Header
        title="Local"
        onBack={onBackToMenu}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-8 sm:px-10 max-w-md mx-auto w-full text-center">
        {/* Title in Yellow #FFC400 as in Figure 4 */}
        <h1 className="text-3xl sm:text-4xl font-black text-educa-yellow tracking-tight mb-8">
          Resultado
        </h1>

        {/* Trophy / Emblem */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full bg-educa-midBlue/70 border-4 border-educa-yellow flex items-center justify-center shadow-game mx-auto animate-bounce-subtle">
            {score === totalScore ? (
              <Trophy size={56} className="text-educa-yellow" />
            ) : score >= totalScore * 0.6 ? (
              <Award size={56} className="text-educa-yellow" />
            ) : (
              <Star size={56} className="text-educa-yellow" />
            )}
          </div>
        </div>

        {/* Exact phrase from Figure 4: "Você fez 10 de 10 pontos!" */}
        <div className="mb-10">
          <p className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Você fez {score} de {totalScore} pontos!
          </p>
          <p className="text-sm text-educa-lightGray/80 mt-2">
            {score === totalScore
              ? 'Desempenho perfeito! Você é um verdadeiro mestre da cultura local.'
              : score >= 6
              ? 'Muito bem! Você tem ótimo conhecimento sobre os pontos turísticos.'
              : 'Bom começo de jornada! Continue explorando para subir de nível.'}
          </p>
        </div>

        {/* Action Buttons as in Figure 4 */}
        <div className="w-full space-y-4">
          {/* Button 1: Yellow "Ouvir 🔊" */}
          <AudioButton
            textToSpeak={spokenText}
            label="Ouvir"
          />

          {/* Button 2: Green "Voltar ao Menu" */}
          <Button
            variant="green"
            onClick={onBackToMenu}
          >
            Voltar ao Menu
          </Button>
        </div>
      </div>

      {/* Bottom spacer for balance */}
      <div className="p-4" />
    </div>
  );
};
