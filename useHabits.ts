import React from 'react';

// ─── Button ────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'icon';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading,
  children,
  style,
  ...props
}) => {
  const base: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, border: 'none', cursor: props.disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15,
    transition: 'all 0.2s ease', borderRadius: 14,
    opacity: props.disabled ? 0.5 : 1,
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'linear-gradient(135deg,#3B82F6,#2563EB)', color: '#fff', padding: '15px 24px', width: '100%', letterSpacing: '-0.2px', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' },
    ghost: { background: '#1A1A24', color: '#fff', border: '1px solid #2A2A38', padding: '15px 24px', width: '100%' },
    danger: { background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', padding: '14px 24px', width: '100%' },
    icon: { background: '#1A1A24', border: '1px solid #2A2A38', padding: 10, borderRadius: 12, width: 40, height: 40 },
  };

  return (
    <button style={{ ...base, ...variants[variant], ...style }} {...props}>
      {loading ? <span className="spin-anim" style={{ fontSize: 18 }}>⟳</span> : children}
    </button>
  );
};

// ─── Card ──────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, style, onClick, className }) => (
  <div
    className={className}
    onClick={onClick}
    style={{
      background: '#1A1A24',
      borderRadius: 20,
      border: '1px solid #2A2A38',
      padding: 20,
      cursor: onClick ? 'pointer' : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

// ─── Input ─────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 500, color: '#B0B0C3' }}>{label}</label>}
    <input
      style={{
        background: '#1A1A24', border: `1px solid ${error ? '#EF4444' : '#2A2A38'}`,
        borderRadius: 14, padding: '15px 18px', fontSize: 15, color: '#fff',
        fontFamily: 'Inter, sans-serif', outline: 'none', width: '100%',
        transition: 'border-color 0.2s', ...style,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.18)'; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = error ? '#EF4444' : '#2A2A38'; e.currentTarget.style.boxShadow = 'none'; }}
      {...props}
    />
    {error && <p style={{ fontSize: 12, color: '#EF4444' }}>{error}</p>}
  </div>
);

// ─── Select ────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, style, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 500, color: '#B0B0C3' }}>{label}</label>}
    <select
      style={{
        background: '#1A1A24', border: '1px solid #2A2A38', borderRadius: 14,
        padding: '15px 18px', fontSize: 15, color: '#fff',
        fontFamily: 'Inter, sans-serif', outline: 'none', width: '100%',
        WebkitAppearance: 'none', cursor: 'pointer', ...style,
      }}
      {...props}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} style={{ background: '#1A1A24' }}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

// ─── Textarea ─────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, style, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 500, color: '#B0B0C3' }}>{label}</label>}
    <textarea
      style={{
        background: '#1A1A24', border: '1px solid #2A2A38', borderRadius: 14,
        padding: '15px 18px', fontSize: 15, color: '#fff',
        fontFamily: 'Inter, sans-serif', outline: 'none', width: '100%',
        resize: 'none', lineHeight: 1.6, ...style,
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = '#3B82F6'; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = '#2A2A38'; }}
      {...props}
    />
  </div>
);

// ─── Badge ─────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = '#8B8B9E', bg = 'rgba(139,139,158,0.15)' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 3,
    padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600,
    color, background: bg, letterSpacing: 0.2,
  }}>
    {children}
  </span>
);

// ─── Modal Sheet ──────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fade-in"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)', zIndex: 200,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#13131A', borderRadius: '28px 28px 0 0',
          padding: 28, width: '100%', maxWidth: 430,
          border: '1px solid #2A2A38', borderBottom: 'none',
          animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.4 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 10, background: '#1A1A24',
              border: '1px solid #2A2A38', cursor: 'pointer', color: '#8B8B9E',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}
          >✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── Progress Circle ──────────────────────────────────────────────
interface ProgressCircleProps {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  pct, size = 90, stroke = 7, color = '#3B82F6', label, sublabel,
}) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#2A2A38" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div style={{ textAlign: 'center', position: 'relative' }}>
        {label && <div style={{ fontSize: size > 70 ? 18 : 14, fontWeight: 800, lineHeight: 1 }}>{label}</div>}
        {sublabel && <div style={{ fontSize: 10, color: '#8B8B9E', marginTop: 2 }}>{sublabel}</div>}
      </div>
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────
interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ emoji, title, subtitle, action }) => (
  <div style={{ textAlign: 'center', padding: '60px 24px' }}>
    <p style={{ fontSize: 52, marginBottom: 16 }}>{emoji}</p>
    <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</p>
    <p style={{ color: '#8B8B9E', fontSize: 14, marginBottom: action ? 28 : 0, lineHeight: 1.6 }}>{subtitle}</p>
    {action && (
      <button
        onClick={action.onClick}
        style={{
          background: 'linear-gradient(135deg,#3B82F6,#2563EB)', color: '#fff',
          border: 'none', borderRadius: 14, padding: '13px 28px',
          fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif',
        }}
      >
        {action.label}
      </button>
    )}
  </div>
);

// ─── Toggle Switch ────────────────────────────────────────────────
interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    style={{
      width: 46, height: 27, borderRadius: 14,
      background: checked ? '#3B82F6' : '#2A2A38',
      cursor: 'pointer', position: 'relative',
      transition: 'background 0.3s ease', flexShrink: 0,
    }}
  >
    <div style={{
      position: 'absolute', top: 3,
      left: checked ? 22 : 3,
      width: 21, height: 21, borderRadius: '50%', background: '#fff',
      transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
    }} />
  </div>
);

// ─── Loader ───────────────────────────────────────────────────────
export const PageLoader: React.FC = () => (
  <div style={{
    position: 'fixed', inset: 0, background: '#0B0B0F',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
  }}>
    <div style={{
      width: 72, height: 72, borderRadius: 22,
      background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 36, animation: 'float 2s ease-in-out infinite',
    }}>⚡</div>
    <div style={{ display: 'flex', gap: 7 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%', background: '#3B82F6',
          animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  </div>
);
