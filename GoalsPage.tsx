/* ─── Reset & Base ─────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #0B0B0F;
  --surface: #13131A;
  --card: #1A1A24;
  --border: #2A2A38;
  --blue: #3B82F6;
  --blue-dim: #1D4ED8;
  --blue-glow: rgba(59,130,246,0.18);
  --blue-glow-sm: rgba(59,130,246,0.08);
  --white: #FFFFFF;
  --muted: #8B8B9E;
  --muted-light: #B0B0C3;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --purple: #8B5CF6;
  --pink: #EC4899;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 28px;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
}

html, body {
  height: 100%;
  background-color: var(--bg);
  color: var(--white);
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior: none;
}

#root { height: 100%; }

::-webkit-scrollbar { width: 0; height: 0; }
* { scrollbar-width: none; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
@keyframes scaleIn {
  from { transform: scale(0.92); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.3); }
  50% { box-shadow: 0 0 48px rgba(59,130,246,0.65); }
}
@keyframes shimmer {
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
}

.fade-up { animation: fadeUp 0.45s var(--ease-out) both; }
.fade-in { animation: fadeIn 0.35s ease both; }
.scale-in { animation: scaleIn 0.3s var(--ease-out) both; }
.float-anim { animation: float 3s ease-in-out infinite; }
.spin-anim { animation: spin 1s linear infinite; }
.pulse-anim { animation: pulse 2s ease-in-out infinite; }

.gradient-text {
  background: linear-gradient(135deg, #FFFFFF, #94A3B8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.blue-gradient-text {
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

input[type="date"] { color-scheme: dark; }
