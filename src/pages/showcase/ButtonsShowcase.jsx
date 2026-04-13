import React, { useState } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'
import '../../styles/showcase/ButtonsShowcase.css'

const VARIANTS = [
  { id: 'solid', label: 'Solid' },
  { id: 'outline', label: 'Outline' },
  { id: 'ghost', label: 'Ghost' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'icon', label: 'Icon Buttons' },
  { id: 'states', label: 'States' },
]

const CONTROLS = [
  { key: 'primary', label: 'Primary Color', type: 'color' },
  { key: 'color', label: 'Text Color', type: 'color' },
  { key: 'gradEnd', label: 'Gradient End', type: 'color' },
  { key: 'pageBg', label: 'Preview BG', type: 'color' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 50, unit: 'px' },
  { key: 'fontSize', label: 'Font Size', type: 'range', min: 12, max: 20, unit: 'px' },
  { key: 'paddingX', label: 'Padding X', type: 'range', min: 8, max: 48, unit: 'px' },
  { key: 'paddingY', label: 'Padding Y', type: 'range', min: 6, max: 24, unit: 'px' },
  { key: 'weight', label: 'Font Weight', type: 'select', options: ['400', '500', '600', '700', '800'] },
  { key: 'uppercase', label: 'Uppercase', type: 'toggle' },
]

const DEFAULT = { primary: '#7c6fff', color: '#ffffff', gradEnd: '#e879f9', pageBg: '#0f0f12', radius: '10', fontSize: '14', paddingX: '20', paddingY: '10', weight: '600', uppercase: false }

const generateCode = (variant, v) => {
  const base = `padding: ${v.paddingY}px ${v.paddingX}px; font-size: ${v.fontSize}px; border-radius: ${v.radius}px; font-weight: ${v.weight}; cursor: pointer; font-family: inherit; transition: all 0.2s;${v.uppercase ? ' text-transform: uppercase; letter-spacing: 0.06em;' : ''}`
  const codes = {
    solid: `.btn { ${base}\n  background: ${v.primary}; color: ${v.color}; border: none; }\n.btn:hover { filter: brightness(1.12); transform: translateY(-2px); box-shadow: 0 6px 20px ${v.primary}55; }`,
    outline: `.btn { ${base}\n  background: transparent; color: ${v.primary}; border: 2px solid ${v.primary}; }\n.btn:hover { background: ${v.primary}; color: ${v.color}; }`,
    ghost: `.btn { ${base}\n  background: transparent; color: ${v.primary}; border: none; }\n.btn:hover { background: ${v.primary}18; }`,
    gradient: `.btn {\n  ${base}\n  background: linear-gradient(135deg, ${v.primary}, ${v.gradEnd});\n  color: ${v.color}; border: none;\n}\n.btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 8px 24px ${v.primary}44; }`,
    icon: `.btn-icon {\n  display: inline-flex; align-items: center; gap: 0.5rem;\n  ${base}\n  background: ${v.primary}; color: ${v.color}; border: none;\n}\n.btn-icon-only {\n  width: ${parseInt(v.paddingY) * 2 + parseInt(v.fontSize) + 8}px;\n  height: ${parseInt(v.paddingY) * 2 + parseInt(v.fontSize) + 8}px;\n  display: inline-flex; align-items: center; justify-content: center;\n  background: ${v.primary}; color: ${v.color}; border: none;\n  border-radius: ${v.radius}px; cursor: pointer;\n}`,
    states: `.btn { ${base}\n  background: ${v.primary}; color: ${v.color}; border: none; }\n.btn.loading { opacity: 0.7; cursor: not-allowed; }\n.btn.success { background: #16a34a; }\n.btn.error { background: #dc2626; }\n.btn-spinner { width: 1em; height: 1em; border: 2px solid ${v.color}44; border-top-color: ${v.color}; border-radius: 50%; animation: spin 0.6s linear infinite; display: inline-block; }\n@keyframes spin { to { transform: rotate(360deg); } }`,
  }
  return codes[variant]
}

export const ButtonsShowcase = () => {
  const [active, setActive] = useState('solid')
  const [values, setValues] = useState(DEFAULT)
  const [loading, setLoading] = useState(false)
  const [loadState, setLoadState] = useState('idle')
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  const base = {
    padding: `${values.paddingY}px ${values.paddingX}px`,
    fontSize: `${values.fontSize}px`,
    borderRadius: `${values.radius}px`,
    fontWeight: values.weight,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
    textTransform: values.uppercase ? 'uppercase' : 'none',
    letterSpacing: values.uppercase ? '0.06em' : 'normal',
  }

  const handleLoad = () => {
    setLoadState('loading')
    setTimeout(() => setLoadState('success'), 1800)
    setTimeout(() => setLoadState('idle'), 3500)
  }

  const stateColors = { idle: values.primary, loading: values.primary, success: '#16a34a', error: '#dc2626' }
  const stateLabels = { idle: 'Click Me', loading: 'Loading...', success: '✓ Success', error: '✕ Error' }

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Buttons Showcase</h1>
          <p>6 button styles — tune every visual property live.</p>
        </div>
      </div>
      <div className="showcase-variant-tabs">
        {VARIANTS.map(v => (
          <button key={v.id} className={`variant-tab ${active === v.id ? 'active' : ''}`} onClick={() => setActive(v.id)}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="showcase-body">
        <div className="showcase-preview" style={{ background: values.pageBg, gap: '1rem', flexWrap: 'wrap' }}>
          {active === 'solid' && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {[['Primary', values.primary], ['Success', '#16a34a'], ['Danger', '#dc2626'], ['Warning', '#d97706']].map(([lbl, bg]) => (
                <button key={lbl} className="btn-demo-solid" style={{ ...base, background: bg, color: values.color, border: 'none' }}>{lbl}</button>
              ))}
            </div>
          )}
          {active === 'outline' && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {[['Primary', values.primary], ['Success', '#16a34a'], ['Danger', '#dc2626']].map(([lbl, c]) => (
                <button key={lbl} className="btn-demo-outline" style={{ ...base, background: 'transparent', color: c, border: `2px solid ${c}`, '--hover-bg': c, '--hover-color': values.color }}>{lbl}</button>
              ))}
            </div>
          )}
          {active === 'ghost' && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {[['Default', values.primary], ['Muted', '#888'], ['Accent', '#e879f9']].map(([lbl, c]) => (
                <button key={lbl} className="btn-demo-ghost" style={{ ...base, background: 'transparent', color: c, border: 'none', '--ghost-bg': `${c}18` }}>{lbl}</button>
              ))}
            </div>
          )}
          {active === 'gradient' && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {[
                [values.primary, values.gradEnd, 'Custom'],
                ['#3b82f6', '#8b5cf6', 'Ocean'],
                ['#f59e0b', '#ef4444', 'Sunset'],
                ['#10b981', '#3b82f6', 'Aurora'],
              ].map(([from, to, lbl]) => (
                <button key={lbl} className="btn-demo-gradient" style={{ ...base, background: `linear-gradient(135deg, ${from}, ${to})`, color: values.color, border: 'none' }}>{lbl}</button>
              ))}
            </div>
          )}
          {active === 'icon' && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {[['↗ Open', values.primary], ['♡ Like', '#e53e3e'], ['⬇ Download', '#16a34a'], ['⎘ Copy', '#d97706']].map(([lbl, bg]) => (
                <button key={lbl} style={{ ...base, background: bg, color: values.color, border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>{lbl}</button>
              ))}
              <div style={{ width: '100%', display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                {['↗', '♡', '⬇', '⎘'].map(icon => (
                  <button key={icon} style={{ ...base, padding: `${values.paddingY}px`, background: values.primary, color: values.color, border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1' }}>{icon}</button>
                ))}
              </div>
            </div>
          )}
          {active === 'states' && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={handleLoad} style={{ ...base, background: stateColors[loadState], color: values.color, border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', opacity: loadState === 'loading' ? 0.75 : 1 }}>
                {loadState === 'loading' && <span className="btn-spinner" />}
                {stateLabels[loadState]}
              </button>
              <button style={{ ...base, background: '#16a34a', color: '#fff', border: 'none' }}>✓ Saved</button>
              <button style={{ ...base, background: '#dc2626', color: '#fff', border: 'none' }}>✕ Failed</button>
              <button style={{ ...base, background: '#555', color: '#888', border: 'none', cursor: 'not-allowed' }} disabled>Disabled</button>
            </div>
          )}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCode(active, values)}
          jsxCode={`export const ${active.charAt(0).toUpperCase() + active.slice(1)}Btn = ({ children, onClick }) => (\n  <button className="btn" onClick={onClick}>\n    {children}\n  </button>\n)\n\n// Usage:\n// <${active.charAt(0).toUpperCase() + active.slice(1)}Btn onClick={() => {}}>Click Me</${active.charAt(0).toUpperCase() + active.slice(1)}Btn>`} />
      </div>
    </div>
  )
}
