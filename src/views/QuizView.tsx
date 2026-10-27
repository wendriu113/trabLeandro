import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { AudioButton } from '../components/quiz/AudioButton';
import { Button } from '../components/common/Button';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { speechService } from '../services/speechService';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface QuizViewProps {
  onBackToMenu: () => void;
  onCompleteQuiz: (finalScore: number, totalScore: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onBackToMenu, onCompleteQuiz }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = QUIZ_QUESTIONS[currentIdx] || QUIZ_QUESTIONS[0];
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Stop speech when changing question or leaving view
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, [currentIdx]);

  // Build audio text for the "Ouvir" button
  const buildAudioContent = (): string => {
    const header = `Pergunta ${currentIdx + 1} de ${totalQuestions}. Sobre ${currentQ.localName}. ${currentQ.question}`;
    const optionsText = currentQ.options
      .map((opt, i) => `Alternativa ${i + 1}: ${opt}.`)
      .join(' ');
    return `${header} ${optionsText}`;
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    speechService.stop();
    setSelectedIdx(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + currentQ.points);
    }
  };

  const handleNext = () => {
    speechService.stop();
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      // Completed all questions
      const finalCalculatedScore = (selectedIdx === currentQ.correctIndex) ? score : score;
      onCompleteQuiz(finalCalculatedScore, totalQuestions * 2);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-educa-deepBlue">
      {/* Top Bar as seen in Figure 3: Back arrow, "Local" */}
      <Header
        title="Local"
        onBack={onBackToMenu}
      />

      {/* Quiz Body */}
      <div className="flex-1 flex flex-col justify-between px-5 py-6 sm:px-8 max-w-md mx-auto w-full">
        {/* Top: Progress and Question */}
        <div>
          {/* Progress Indicator: "Pergunta 1/5" (Yellow #FFC400) */}
          <div className="text-center mb-3">
            <h1 className="text-2xl sm:text-3xl font-black text-educa-yellow tracking-wide">
              Pergunta {currentIdx + 1}/{totalQuestions}
            </h1>
          </div>

          {/* Question Text Box */}
          <div className="bg-[#1F4C64]/80 border border-white/10 rounded-2xl p-4 sm:p-5 mb-5 shadow-sm text-center">
            <p className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQ.question}
            </p>
          </div>

          {/* 5 Response Option Cards as shown in Figure 3 */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, i) => (
              <QuestionCard
                key={i}
                optionText={opt}
                index={i}
                isSelected={selectedIdx === i}
                isAnswered={isAnswered}
                isCorrect={i === currentQ.correctIndex}
                isUserSelection={selectedIdx === i}
                onClick={() => handleSelectOption(i)}
              />
            ))}
          </div>

          {/* Educational Feedback Message after response */}
          {isAnswered && (
            <div className={`mt-4 p-3.5 rounded-2xl border text-sm animate-in fade-in slide-in-from-top-2 duration-200 ${
              selectedIdx === currentQ.correctIndex
                ? 'bg-educa-green/20 border-educa-green text-green-100'
                : 'bg-amber-900/30 border-amber-500/50 text-amber-100'
            }`}>
              <div className="flex items-start space-x-2">
                <HelpCircle size={18} className="shrink-0 mt-0.5 text-educa-yellow" />
                <div>
                  <p className="font-bold text-educa-yellow mb-0.5">
                    {selectedIdx === currentQ.correctIndex ? '🎉 Resposta Correta! (+2 pontos)' : '💡 Informação Cultural:'}
                  </p>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Area: Audio button or Next Question button */}
        <div className="pt-6 pb-2 space-y-3">
          {isAnswered ? (
            <Button
              variant="green"
              onClick={handleNext}
              icon={<ArrowRight size={22} />}
              className="animate-bounce-subtle"
            >
              {currentIdx + 1 < totalQuestions ? 'Próxima Pergunta' : 'Ver Resultado Final'}
            </Button>
          ) : (
            /* Yellow "Ouvir 🔊" Button as shown in Figure 3 */
            <AudioButton
              textToSpeak={buildAudioContent()}
              label="Ouvir"
            />
          )}
        </div>
      </div>
    </div>
  );
};
