import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface AudioButtonProps {
  textToSpeak: string;
  label?: string;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  textToSpeak,
  label = "Ouvir",
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = speechService.subscribe((speaking) => {
      setIsPlaying(speaking);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleClick = () => {
    speechService.toggle(textToSpeak);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        w-full py-3.5 px-6 rounded-2xl
        bg-educa-yellow hover:bg-educa-yellowHover text-[#222222] font-extrabold
        active:scale-[0.98] shadow-game border-b-4 border-[#d4a200]
        transition-all duration-150 flex items-center justify-center space-x-2.5
        select-none cursor-pointer text-lg uppercase tracking-wide
        ${isPlaying ? 'ring-4 ring-white animate-pulse' : ''}
        ${className}
      `}
      title={isPlaying ? "Parar leitura em voz alta" : "Ouvir pergunta e alternativas em voz alta"}
      aria-label={label}
    >
      {isPlaying ? (
        <>
          <VolumeX size={22} className="animate-bounce" />
          <span>Parar Áudio</span>
        </>
      ) : (
        <>
          <Volume2 size={22} />
          <span>{label}</span>
          <span className="text-xl" role="img" aria-label="Som">🔊</span>
        </>
      )}
    </button>
  );
};
