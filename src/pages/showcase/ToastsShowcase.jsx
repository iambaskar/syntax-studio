import React, { useState, useCallback } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'
import '../../styles/showcase/ToastsShowcase.css'

const VARIANTS = [
  { id: 'types', label: 'Toast Types' },
  { id: 'positions', label: 'Positions' },
  { id: 'actions', label: 'With Actions' },
]

const CONTROLS = [
  { key: 'bg', label: 'Preview BG', type: 'color' },
  { key: 'toastBg', label: 'Toast BG', type: 'color' },
  { key: 'accent', label: 'Accent', type: 'color' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 20, unit: 'px' },
  { key: 'duration', label: 'Duration (ms)', type: 'range', min: 1000, max: 5000, step: 500, unit: 'ms' },
]

const DEFAULT = { bg: '#0f0f12', toastBg: '#1c1c1f', accent: '#7c6fff', radius: '10', duration: '3000' }

const TOAST_TYPES = [
  { type: 'success', icon: '✓', color: '#4ade80', label: 'Success', msg: 'Changes saved successfully.' },
  { type: 'error', icon: '✕', color: '#f87171', label: 'Error', msg: 'Something went wrong.' },
  { type: 'warning', icon: '⚠', color: '#fbbf24', label: 'Warning', msg: 'Disk space running low.' },
  { type: 'info', icon: 'ℹ', color: '#60a5fa', label: 'Info', msg: 'New version available.' },
]

const POSITIONS = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']

const generateJSX = (variant) => {
  const codes = {
    types: `// useToast hook
const useToast = (duration = 3000) => {
  const [toasts, setToasts] = useState([])
  const add = (msg, type = 'info', icon, color) => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type, icon, color }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration)
  }
  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id))
  return { toasts, add, dismiss }
}

// Usage
const { toasts, add, dismiss } = useToast(3000)
add('Saved!', 'success', '✓', '#4ade80')
add('Error occurred', 'error', '✕', '#f87171')`,
    positions: `const ToastContainer = ({ toasts, position = 'top-right', onDismiss }) => (
  <div className={\`toast-container \${position}\`}>
    {toasts.map(t => (
      <div key={t.id} className="toast" style={{ borderLeft: \`3px solid \${t.color}\` }}>
        <span className="toast-icon" style={{ color: t.color }}>{t.icon}</span>
        <span className="toast-msg">{t.msg}</span>
        <button className="toast-close" onClick={() => onDismiss(t.id)}>✕</button>
      </div>
    ))}
  </div>
)`,
    actions: `const ActionToast = ({ msg, actionLabel, onAction, onDismiss, color }) => (
  <div className="toast" style={{ borderLeft: \`3px solid \${color}\` }}>
    <span className="toast-msg">{msg}</span>
    <button className="toast-action" onClick={onAction}>{actionLabel}</button>
    <button className="toast-close" onClick={onDismiss}>✕</button>
  </div>
)`,
  }
  return codes[variant]
}

const generateCSS = (variant, v) => `/* Toast container */
.toast-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  pointer-events: none;
}
/* Position variants */
.toast-container.top-right    { top: 0; right: 0; align-items: flex-end; }
.toast-container.top-left     { top: 0; left: 0; align-items: flex-start; }
.toast-container.top-center   { top: 0; left: 50%; transform: translateX(-50%); align-items: center; }
.toast-container.bottom-right { bottom: 0; right: 0; align-items: flex-end; }
.toast-container.bottom-left  { bottom: 0; left: 0; align-items: flex-start; }
.toast-container.bottom-center{ bottom: 0; left: 50%; transform: translateX(-50%); align-items: center; }

.toast {
  background: ${v.toastBg};
  border: 1px solid #2a2a2e;
  border-radius: ${v.radius}px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 260px;
  max-width: 360px;
  pointer-events: all;
  animation: toast-in 0.2s ease;
}

@keyframes toast-in {
  from { transform: translateY(-8px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

.toast-icon {
  width: 20px; height: 20px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 700; flex-shrink: 0;
}
.toast-msg { flex: 1; font-size: 0.82rem; color: #e0e0e0; }
.toast-close { background: none; border: none; color: #555; cursor: pointer; font-size: 0.85rem; padding: 0; }`

let toastId = 0

export const ToastsShowcase = () => {
  const [active, setActive] = useState('types')
  const [values, setValues] = useState(DEFAULT)
  const [toasts, setToasts] = useState([])
  const [position, setPosition] = useState('top-right')
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  const addToast = useCallback((type, msg, icon, color, withAction = false) => {
    const id = ++toastId
    setToasts(t => [...t, { id, type, msg, icon, color, withAction }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), parseInt(values.duration))
  }, [values.duration])

  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id))

  const r = values.radius + 'px'

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Toast Notifications</h1>
          <p>Success, error, warning, info toasts with position control.</p>
        </div>
      </div>
      <div className="showcase-variant-tabs">
        {VARIANTS.map(v => (
          <button key={v.id} className={`variant-tab ${active === v.id ? 'active' : ''}`}
            onClick={() => { setActive(v.id); setToasts([]) }}>{v.label}</button>
        ))}
      </div>
      <div className="showcase-body">
        <div className="showcase-preview" style={{ background: values.bg, flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>

          {/* Toast stack */}
          <div className={`ts-toast-stack ${position}`}>
            {toasts.map(t => (
              <div key={t.id} className="ts-toast" style={{ background: values.toastBg, borderRadius: r, borderLeft: `3px solid ${t.color}` }}>
                <div className="ts-toast-icon" style={{ background: t.color + '22', color: t.color }}>{t.icon}</div>
                <span className="ts-toast-msg">{t.msg}</span>
                {t.withAction && (
                  <button className="ts-toast-action" style={{ color: values.accent }} onClick={() => dismiss(t.id)}>Undo</button>
                )}
                <button className="ts-toast-close" onClick={() => dismiss(t.id)}>✕</button>
              </div>
            ))}
          </div>

          {active === 'types' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', maxWidth: 340 }}>
              {TOAST_TYPES.map(({ type, icon, color, label, msg }) => (
                <button key={type} className="ts-trigger-btn" style={{ borderRadius: r, borderLeft: `3px solid ${color}` }}
                  onClick={() => addToast(type, msg, icon, color)}>
                  <span style={{ color }}>{icon}</span> Show {label} Toast
                </button>
              ))}
            </div>
          )}

          {active === 'positions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                {POSITIONS.map(pos => (
                  <button key={pos} className={`ts-pos-btn ${position === pos ? 'active' : ''}`}
                    style={{ borderRadius: r, borderColor: position === pos ? values.accent : undefined, color: position === pos ? values.accent : undefined }}
                    onClick={() => setPosition(pos)}>
                    {pos.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <button className="ts-trigger-btn" style={{ borderRadius: r, borderLeft: `3px solid ${values.accent}` }}
                onClick={() => addToast('info', `Toast at ${position}`, 'ℹ', values.accent)}>
                Fire Toast → {position}
              </button>
            </div>
          )}

          {active === 'actions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', maxWidth: 340 }}>
              <button className="ts-trigger-btn" style={{ borderRadius: r, borderLeft: '3px solid #4ade80' }}
                onClick={() => addToast('success', 'File deleted.', '✓', '#4ade80', true)}>
                Delete with Undo
              </button>
              <button className="ts-trigger-btn" style={{ borderRadius: r, borderLeft: '3px solid #60a5fa' }}
                onClick={() => addToast('info', 'Update available.', 'ℹ', '#60a5fa', true)}>
                Update with Action
              </button>
              <button className="ts-trigger-btn" style={{ borderRadius: r, borderLeft: '3px solid #fbbf24' }}
                onClick={() => addToast('warning', 'Session expiring soon.', '⚠', '#fbbf24', true)}>
                Warning with Renew
              </button>
            </div>
          )}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCSS(active, values)} jsxCode={generateJSX(active)} />
      </div>
    </div>
  )
}
