import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TABS = [
  { path: '/home',    label: 'Home',     emoji: '🏠' },
  { path: '/coach',   label: 'AI Coach', emoji: '🤖' },
  { path: '/tasks',   label: 'Tasks',    emoji: '✅' },
  { path: '/goals',   label: 'Goals',    emoji: '🎯' },
  { path: '/habits',  label: 'Habits',   emoji: '🌱' },
  { path: '/profile', label: 'Profile',  emoji: '👤' },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: 'rgba(19,19,26,0.96)',
      backdropFilter: 'blur(24px)',
      borderTop: '1px solid #2A2A38',
      display: 'flex',
      padding: '8px 0 20px',
      zIndex: 100,
    }}>
      {TABS.map((tab) => {
        const active = pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer',
              color: active ? '#3B82F6' : '#8B8B9E',
              transition: 'all 0.2s ease', fontFamily: 'Inter, sans-serif',
              padding: '4px 0',
            }}
          >
            <div style={{
              padding: '5px 10px', borderRadius: 11,
              background: active ? 'rgba(59,130,246,0.14)' : 'transparent',
              transform: active ? 'translateY(-2px)' : 'none',
              transition: 'all 0.2s ease',
              fontSize: 18,
              position: 'relative',
            }}>
              {tab.emoji}
              {tab.path === '/coach' && (
                <div style={{ position: 'absolute', top: 3, right: 4, width: 6, height: 6, borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s infinite' }} />
              )}
            </div>
            <span style={{ fontSize: 9, fontWeight: active ? 600 : 400 }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
