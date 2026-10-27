import React, { useState } from 'react';
import { MobileFrame } from './components/layout/MobileFrame';
import { LoginView } from './views/LoginView';
import { MainMenuView } from './views/MainMenuView';
import { QuizView } from './views/QuizView';
import { ResultView } from './views/ResultView';
import { ExploreView } from './views/ExploreView';
import { MapView } from './views/MapView';
import { ProfileView } from './views/ProfileView';
import { ScreenType, UserProfile } from './types';
import { getStoredUser, saveUser } from './services/authService';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [user, setUser] = useState<UserProfile>(getStoredUser());
  const [quizScore, setQuizScore] = useState<number>(10);
  const [totalQuizScore, setTotalQuizScore] = useState<number>(10);

  const handleLoginSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    saveUser(authenticatedUser);
    setCurrentScreen('menu');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const handleCompleteQuiz = (score: number, total: number) => {
    setQuizScore(score);
    setTotalQuizScore(total);

    // Update user stats
    const updatedUser: UserProfile = {
      ...user,
      points: user.points + score,
      quizzesCompleted: user.quizzesCompleted + 1,
      badges: user.badges.map(b => {
        if (b.id === 'perfect-score' && score === total) {
          return { ...b, unlocked: true, unlockedAt: 'Hoje' };
        }
        if (b.id === 'first-quiz') {
          return { ...b, unlocked: true, unlockedAt: 'Hoje' };
        }
        return b;
      })
    };

    setUser(updatedUser);
    saveUser(updatedUser);
    setCurrentScreen('result');
  };

  return (
    <MobileFrame>
      {currentScreen === 'login' && (
        <LoginView onLoginSuccess={handleLoginSuccess} />
      )}

      {currentScreen === 'menu' && (
        <MainMenuView
          user={user}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}

      {currentScreen === 'quiz' && (
        <QuizView
          onBackToMenu={() => setCurrentScreen('menu')}
          onCompleteQuiz={handleCompleteQuiz}
        />
      )}

      {currentScreen === 'result' && (
        <ResultView
          score={quizScore}
          totalScore={totalQuizScore}
          onBackToMenu={() => setCurrentScreen('menu')}
        />
      )}

      {currentScreen === 'explore' && (
        <ExploreView
          onBackToMenu={() => setCurrentScreen('menu')}
          onGoToQuiz={() => setCurrentScreen('quiz')}
          onGoToMap={() => setCurrentScreen('map')}
        />
      )}

      {currentScreen === 'map' && (
        <MapView
          onBackToMenu={() => setCurrentScreen('menu')}
          onGoToQuiz={() => setCurrentScreen('quiz')}
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileView
          user={user}
          onBackToMenu={() => setCurrentScreen('menu')}
          onLogout={handleLogout}
        />
      )}
    </MobileFrame>
  );
};

export default App;
