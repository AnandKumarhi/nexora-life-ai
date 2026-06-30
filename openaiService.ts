import React from 'react';
import BottomNav from './BottomNav';

interface AppShellProps {
  children: React.ReactNode;
  /** Set true on chat page where input must stick to bottom */
  noPadding?: boolean;
}

const AppShell: React.FC<AppShellProps> = ({ children, noPadding }) => (
  <div style={{
    maxWidth: 430, margin: '0 auto', minHeight: '100vh',
    background: '#0B0B0F', position: 'relative', display: 'flex', flexDirection: 'column',
  }}>
    <main style={{
      flex: 1,
      overflowY: noPadding ? 'hidden' : 'auto',
      paddingBottom: noPadding ? 0 : 90,
    }}>
      {children}
    </main>
    <BottomNav />
  </div>
);

export default AppShell;
