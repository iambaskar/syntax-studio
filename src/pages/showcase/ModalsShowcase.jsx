import React, { useState } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'
import '../../styles/showcase/ModalsShowcase.css'

const VARIANTS = [
  { id: 'confirmation', label: 'Confirmation' },
  { id: 'drawer', label: 'Drawer' },
  { id: 'bottomsheet', label: 'Bottom Sheet' },
]

const CONTROLS = [
  { key: 'bg', label: 'Preview BG', type: 'color' },
  { key: 'overlayColor', label: 'Overlay', type: 'color' },
  { key: 'modalBg', label: 'Modal BG', type: 'color' },
  { key: 'accent', label: 'Accent', type: 'color' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 28, unit: 'px' },
  { key: 'width', label: 'Modal Width', type: 'range', min: 280, max: 560, unit: 'px' },
]

const DEFAULT = { bg: '#0f0f12', overlayColor: '#000000', modalBg: '#1c1c1f', accent: '#7c6fff', radius: '14', width: '400' }

const generateJSX = (variant) => {
  const codes = {
    confirmation: `const ConfirmModal = ({ open, onClose, onConfirm, title, desc }) => {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}`,
    drawer: `const Drawer = ({ open, onClose, children }) => (
  <>
    {open && <div className="drawer-overlay" onClick={onClose} />}
    <div className={\`drawer \${open ? 'open' : ''}\`}>
      <button onClick={onClose}>✕</button>
      {children}
    </div>
  </>
)`,
    bottomsheet: `const BottomSheet = ({ open, onClose, children }) => (
  <>
    {open && <div className="sheet-overlay" onClick={onClose} />}
    {open && (
      <div className="bottom-sheet">
        <div className="sheet-handle" />
        {children}
      </div>
    )}
  </>
)`,
  }
  return codes[variant]
}

const generateCSS = (variant, v) => {
  const codes = {
    confirmation: `.modal-overlay {
  position: fixed; inset: 0;
  background: ${v.overlayColor}99;
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.15s ease;
}
.modal {
  background: ${v.modalBg};
  border: 1px solid #2a2a2e;
  border-radius: ${v.radius}px;
  padding: 2rem;
  width: min(${v.width}px, 90vw);
  animation: scaleIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }`,
    drawer: `.drawer-overlay {
  position: fixed; inset: 0;
  background: ${v.overlayColor}99; z-index: 1000;
  animation: fadeIn 0.15s ease;
}
.drawer {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: min(${v.width}px, 90vw);
  background: ${v.modalBg};
  border-left: 1px solid #2a2a2e;
  padding: 2rem;
  animation: slideInRight 0.25s ease;
}
@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`,
    bottomsheet: `.sheet-overlay {
  position: fixed; inset: 0;
  background: ${v.overlayColor}99; z-index: 1000;
  animation: fadeIn 0.15s ease;
}
.bottom-sheet {
  position: fixed; left: 0; right: 0; bottom: 0;
  background: ${v.modalBg};
  border-radius: ${v.radius}px ${v.radius}px 0 0;
  border-top: 1px solid #2a2a2e;
  padding: 1.5rem 2rem 2rem;
  animation: slideUp 0.25s ease;
}
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`,
  }
  return codes[variant]
}

export const ModalsShowcase = () => {
  const [active, setActive] = useState('confirmation')
  const [values, setValues] = useState(DEFAULT)
  const [open, setOpen] = useState(false)
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => { setValues(DEFAULT); setOpen(false) }

  const r = values.radius + 'px'
  const w = parseInt(values.width)

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Modals & Dialogs</h1>
          <p>Confirmation dialogs, drawers, and bottom sheets with animations.</p>
        </div>
      </div>
      <div className="showcase-variant-tabs">
        {VARIANTS.map(v => (
          <button key={v.id} className={`variant-tab ${active === v.id ? 'active' : ''}`}
            onClick={() => { setActive(v.id); setOpen(false) }}>{v.label}</button>
        ))}
      </div>
      <div className="showcase-body">
        <div className="showcase-preview" style={{ background: values.bg, flexDirection: 'column', gap: '1rem' }}>

          {/* Trigger button */}
          <button className="modal-trigger-btn" style={{ background: values.accent, borderRadius: r }}
            onClick={() => setOpen(true)}>
            Open {active === 'confirmation' ? 'Modal' : active === 'drawer' ? 'Drawer' : 'Bottom Sheet'}
          </button>

          {/* Inline preview container */}
          <div className="modal-preview-frame" style={{ borderRadius: r }}>
            {active === 'confirmation' && (
              <div className="modal-preview-hint">↑ Click to preview confirmation dialog</div>
            )}
            {active === 'drawer' && (
              <div className="modal-preview-hint">↑ Click to preview side drawer</div>
            )}
            {active === 'bottomsheet' && (
              <div className="modal-preview-hint">↑ Click to preview bottom sheet</div>
            )}
          </div>

          {/* Overlays rendered inside preview */}
          {open && active === 'confirmation' && (
            <div className="modal-overlay-demo" onClick={() => setOpen(false)}>
              <div className="modal-demo" style={{ background: values.modalBg, borderRadius: r, width: Math.min(w, 360) }}
                onClick={e => e.stopPropagation()}>
                <div className="modal-demo-icon" style={{ color: values.accent }}>⚠</div>
                <h3 className="modal-demo-title">Delete item?</h3>
                <p className="modal-demo-desc">This action cannot be undone. The item will be permanently removed.</p>
                <div className="modal-demo-actions">
                  <button className="modal-btn-cancel" style={{ borderRadius: r }} onClick={() => setOpen(false)}>Cancel</button>
                  <button className="modal-btn-confirm" style={{ background: values.accent, borderRadius: r }} onClick={() => setOpen(false)}>Delete</button>
                </div>
              </div>
            </div>
          )}

          {open && active === 'drawer' && (
            <div className="modal-overlay-demo" onClick={() => setOpen(false)}>
              <div className="drawer-demo" style={{ background: values.modalBg, width: Math.min(w, 280) }}
                onClick={e => e.stopPropagation()}>
                <div className="drawer-demo-header">
                  <span style={{ color: values.accent, fontWeight: 700 }}>Settings</span>
                  <button className="modal-close-x" onClick={() => setOpen(false)}>✕</button>
                </div>
                {['Profile', 'Notifications', 'Privacy', 'Appearance', 'Help'].map(item => (
                  <div key={item} className="drawer-demo-item">{item}</div>
                ))}
              </div>
            </div>
          )}

          {open && active === 'bottomsheet' && (
            <div className="modal-overlay-demo" onClick={() => setOpen(false)}>
              <div className="sheet-demo" style={{ background: values.modalBg, borderRadius: `${r} ${r} 0 0` }}
                onClick={e => e.stopPropagation()}>
                <div className="sheet-handle" />
                <h3 className="modal-demo-title" style={{ marginBottom: '1rem' }}>Share</h3>
                <div className="sheet-demo-options">
                  {[['📋', 'Copy link'], ['✉', 'Email'], ['💬', 'Message'], ['🔗', 'Embed']].map(([icon, lbl]) => (
                    <button key={lbl} className="sheet-option" style={{ borderRadius: r }}>
                      <span>{icon}</span><span>{lbl}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCSS(active, values)} jsxCode={generateJSX(active)} />
      </div>
    </div>
  )
}
