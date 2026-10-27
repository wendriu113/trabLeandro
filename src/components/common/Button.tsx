import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow' | 'green';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  // Styles based on PDF design specifications
  let variantStyles = '';

  if (variant === 'primary' || variant === 'yellow') {
    // Amarelo #FFC400, texto escuro/bold
    variantStyles = 'bg-educa-yellow hover:bg-educa-yellowHover text-[#222222] font-bold active:scale-[0.98] shadow-game border-b-4 border-[#d4a200]';
  } else if (variant === 'secondary' || variant === 'green') {
    // Verde #20A765, texto branco
    variantStyles = 'bg-educa-green hover:bg-educa-greenHover text-white font-bold active:scale-[0.98] shadow-game border-b-4 border-[#177c4b]';
  } else if (variant === 'outline') {
    variantStyles = 'bg-transparent border-2 border-white/80 hover:bg-white/10 text-white font-semibold';
  }

  const sizeStyles = size === 'lg' ? 'py-3.5 px-6 text-lg min-h-[56px]' : 'py-2.5 px-4 text-base min-h-[46px]';
  const widthStyles = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      className={`
        relative inline-flex items-center justify-center rounded-2xl
        transition-all duration-150 select-none cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 disabled:border-b-0
        ${variantStyles}
        ${sizeStyles}
        ${widthStyles}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span className="text-base tracking-wide uppercase font-bold">Processando...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-3 w-full">
          {icon && <span className="flex-shrink-0 text-xl">{icon}</span>}
          <span className="tracking-wide uppercase font-extrabold">{children}</span>
        </div>
      )}
    </button>
  );
};
