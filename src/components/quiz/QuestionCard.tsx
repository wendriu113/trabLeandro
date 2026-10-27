import React from 'react';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';

interface QuestionCardProps {
  optionText: string;
  index: number;
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  isUserSelection: boolean;
  onClick: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  optionText,
  isSelected,
  isAnswered,
  isCorrect,
  isUserSelection,
  onClick,
}) => {
  // Determine card appearance according to PDF guidelines
  let cardStyles = 'bg-white hover:bg-[#F3F7FA] text-gray-800 shadow-sm border border-transparent';
  let iconElement = <Circle size={18} className="text-gray-400 shrink-0" />;

  if (isAnswered) {
    if (isCorrect) {
      cardStyles = 'bg-educa-green text-white font-bold border-2 border-white/60 shadow-game';
      iconElement = <CheckCircle2 size={22} className="text-white shrink-0" />;
    } else if (isUserSelection && !isCorrect) {
      cardStyles = 'bg-red-600 text-white font-bold border-2 border-white/60 shadow-game';
      iconElement = <XCircle size={22} className="text-white shrink-0" />;
    } else {
      cardStyles = 'bg-white/70 text-gray-400 opacity-60';
    }
  } else if (isSelected) {
    cardStyles = 'bg-white ring-4 ring-educa-yellow text-educa-darkBlue font-bold shadow-md';
    iconElement = <Circle size={18} className="text-educa-yellow fill-educa-yellow shrink-0" />;
  }

  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={`
        w-full p-4 rounded-2xl text-left transition-all duration-200
        flex items-center justify-between space-x-3
        active:scale-[0.99] cursor-pointer select-none
        min-h-[56px]
        ${cardStyles}
      `}
      aria-pressed={isSelected}
    >
      <span className="text-base sm:text-lg leading-snug font-medium break-words flex-1">
        {optionText}
      </span>
      {iconElement}
    </button>
  );
};
