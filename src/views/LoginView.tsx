import React, { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { UserProfile } from '../types';
import { X, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Modal "Criar Conta" state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regErrors, setRegErrors] = useState<{ [key: string]: string }>({});

  const validateLoginForm = (): boolean => {
    const errs: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errs.email = 'O campo de e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Informe um endereço de e-mail válido (ex: aventureiro@educatour.app).';
    }

    if (!password) {
      errs.password = 'A senha é obrigatória.';
    } else if (password.length < 4) {
      errs.password = 'A senha deve conter no mínimo 4 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsLoading(true);
    setErrors({});

    // Simulate authentication processing
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        name: email.split('@')[0] || 'Aventureiro(a)',
        email: email.trim(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        points: 0,
        quizzesCompleted: 0,
        placesVisited: 1,
        badges: [
          {
            id: 'first-login',
            title: 'Boas-vindas',
            description: 'Iniciou a jornada no EducaTour',
            icon: '🧭',
            unlocked: true,
            unlockedAt: 'Hoje'
          }
        ]
      };
      onLoginSuccess(user);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!regName.trim()) errs.name = 'Informe seu nome de aventureiro(a).';
    if (!regEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
      errs.email = 'Informe um e-mail válido.';
    }
    if (regPassword.length < 4) errs.password = 'A senha deve ter pelo menos 4 caracteres.';
    if (regPassword !== regConfirmPassword) errs.confirm = 'As senhas digitadas não coincidem.';

    if (Object.keys(errs).length > 0) {
      setRegErrors(errs);
      return;
    }

    setIsLoading(true);
    setIsRegisterOpen(false);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: regName.trim(),
        email: regEmail.trim(),
        points: 0,
        quizzesCompleted: 0,
        placesVisited: 0,
        badges: []
      });
    }, 600);
  };

  // Quick fill demo credentials
  const fillDemo = () => {
    setEmail('aventureiro@educatour.app');
    setPassword('123456');
    setErrors({});
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-8 sm:px-10 max-w-md mx-auto w-full">
      {/* Top Branding Section */}
      <div className="flex flex-col items-center pt-2 pb-4">
        <Logo size="lg" showSubtitle={true} />
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="w-full space-y-4 my-auto">
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
          aria-label="E-mail"
        />

        <Input
          placeholder="Senha"
          isPassword={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
          aria-label="Senha"
        />

        {errors.general && (
          <div className="p-3 rounded-xl bg-red-800/60 text-red-100 text-sm border border-red-500/40 text-center">
            {errors.general}
          </div>
        )}

        {/* Action Buttons as in Figure 1 */}
        <div className="pt-2 space-y-3">
          {/* Primary Action Button (Yellow #FFC400) */}
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            ENTRAR
          </Button>

          {/* Secondary Action Button (Green #20A765) */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsRegisterOpen(true)}
            disabled={isLoading}
          >
            CRIAR CONTA
          </Button>
        </div>

        {/* Demo Fast Fill Pill */}
        <div className="text-center pt-3">
          <button
            type="button"
            onClick={fillDemo}
            className="inline-flex items-center space-x-1.5 text-xs text-educa-yellow/90 hover:text-educa-yellow underline underline-offset-4 cursor-pointer transition-colors"
          >
            <Sparkles size={13} />
            <span>Preencher credenciais de demonstração</span>
          </button>
        </div>
      </form>

      {/* Footer Info */}
      <div className="text-center text-xs text-white/50 pt-4">
        <span>EducaTour © 2026 • Entrega 04</span>
      </div>

      {/* Modal Criar Conta */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-educa-deepBlue border-2 border-white/20 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsRegisterOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1"
              aria-label="Fechar"
            >
              <X size={22} />
            </button>

            <h3 className="text-2xl font-black text-educa-yellow text-center mb-1">
              Novo Aventureiro
            </h3>
            <p className="text-xs text-center text-white/80 mb-5">
              Crie sua conta para colecionar pontos e desbravar a cidade!
            </p>

            <form onSubmit={handleRegister} className="space-y-3.5">
              <Input
                placeholder="Seu Nome Completo"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                error={regErrors.name}
              />
              <Input
                placeholder="Seu Melhor E-mail"
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                error={regErrors.email}
              />
              <Input
                placeholder="Crie uma Senha"
                isPassword={true}
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                error={regErrors.password}
              />
              <Input
                placeholder="Confirme a Senha"
                isPassword={true}
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                error={regErrors.confirm}
              />

              <div className="pt-2">
                <Button type="submit" variant="secondary">
                  FINALIZAR CADASTRO
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
