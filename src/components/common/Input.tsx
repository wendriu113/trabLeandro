import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  className = '',
  type = 'text',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full text-left space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-white/90 pl-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={actualType}
          className={`
            w-full px-5 py-4 rounded-2xl
            bg-[#2F6F91]/80 hover:bg-[#2F6F91] focus:bg-[#357B9F]
            text-white placeholder-white/70 text-base
            border-2 transition-all duration-200 outline-none
            ${error ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-educa-yellow'}
            ${isPassword ? 'pr-12' : ''}
            shadow-inner
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
            title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center space-x-1.5 text-xs text-red-200 bg-red-900/40 py-1.5 px-3 rounded-lg border border-red-500/30">
          <span className="font-bold">⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
