import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { PageLoader } from './components/ui';
import SplashPage from './pages/SplashPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CoachPage from './pages/CoachPage';
import TasksPage from './pages/TasksPage';
import GoalsPage from './pages/GoalsPage';
import HabitsPage from './pages/HabitsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/globals.css';

// Route guard — redirects unauthenticated users to /auth
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user ? element : <Navigate to="/auth" replace />;
};

// Redirect logged-in users away from /auth
const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user ? <Navigate to="/home" replace /> : element;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<SplashPage />} />
    <Route path="/auth" element={<PublicRoute element={<AuthPage />} />} />
    <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
    <Route path="/coach" element={<ProtectedRoute element={<CoachPage />} />} />
    <Route path="/tasks" element={<ProtectedRoute element={<TasksPage />} />} />
    <Route path="/goals" element={<ProtectedRoute element={<GoalsPage />} />} />
    <Route path="/habits" element={<ProtectedRoute element={<HabitsPage />} />} />
    <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
