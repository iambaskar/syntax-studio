import React, { useState } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'

const VARIANTS = [
  { id: 'pill', label: 'Pill Badges' },
  { id: 'status', label: 'Status Dots' },
  { id: 'notification', label: 'Notification' },
  { id: 'tags', label: 'Tag Cloud' },
]

const CONTROLS = [
  { key: 'bg', label: 'Preview BG', type: 'color' },
  { key: 'primary', label: 'Primary Color', type: 'color' },
  { key: 'color', label: 'Badge Text', type: 'color' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 50, unit: 'px' },
  { key: 'fontSize', label: 'Font Size', type: 'range', min: 9, max: 16, unit: 'px' },
  { key: 'paddingX', label: 'Padding X', type: 'range', min: 4, max: 20, unit: 'px' },
  { key: 'paddingY', label: 'Padding Y', type: 'range', min: 2, max: 12, unit: 'px' },
  { key: 'outline', label: 'Outline Style', type: 'toggle' },
]

const DEFAULT = { bg: '#0f0f12', primary: '#7c6fff', color: '#ffffff', radius: '20', fontSize: '11', paddingX: '10', paddingY: '4', outline: false }

const generateCode = (variant, v) => {
  const badgeBase = v.outline
    ? `background: transparent; border: 1.5px solid ${v.primary}; color: ${v.primary};`
    : `background: ${v.primary}; color: ${v.color}; border: none;`
  const codes = {
    pill: `.badge {
  display: inline-flex; align-items: center;
  padding: ${v.paddingY}px ${v.paddingX}px;
  font-size: ${v.fontSize}px; font-weight: 600;
  border-radius: ${v.radius}px;
  ${badgeBase}
}
.badge-success { background: #16a34a22; color: #4ade80; border: 1px solid #16a34a44; }
.badge-warning { background: #d9770622; color: #fbbf24; border: 1px solid #d9770644; }
.badge-danger  { background: #dc262622; color: #f87171; border: 1px solid #dc262644; }`,
    status: `.status {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: ${v.fontSize}px; font-weight: 500;
}
.status-dot {
  width: ${parseInt(v.fontSize) - 2}px;
  height: ${parseInt(v.fontSize) - 2}px;
  border-radius: 50%;
}
.status-dot.online  { background: #4ade80; box-shadow: 0 0 6px #4ade8088; }
.status-dot.away    { background: #fbbf24; }
.status-dot.busy    { background: #f87171; }
.status-dot.offline { background: #555; }`,
    notification: `.notif-wrap { position: relative; display: inline-block; }
.notif-badge {
  position: absolute; top: -6px; right: -6px;
  min-width: ${parseInt(v.fontSize) + 8}px; height: ${parseInt(v.fontSize) + 8}px;
  background: ${v.primary}; color: ${v.color};
  border-radius: 50%; font-size: ${v.fontSize}px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #0f0f12;
}`,
    tags: `.tag {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: ${v.paddingY}px ${v.paddingX}px;
  font-size: ${v.fontSize}px; font-weight: 500;
  border-radius: ${v.radius}px;
  background: ${v.primary}18; color: ${v.primary};
  border: 1px solid ${v.primary}33; cursor: pointer;
  transition: background 0.15s;
}
.tag:hover { background: ${v.primary}30; }
.tag-remove { opacity: 0.6; font-size: 0.9em; }`,
  }
  return codes[variant]
}

const BADGE_COLORS = [
  ['New', '#7c6fff'], ['Popular', '#f59e0b'], ['Sale', '#ef4444'],
  ['Beta', '#3b82f6'], ['Pro', '#8b5cf6'], ['Free', '#10b981'],
]

export const BadgesShowcase = () => {
  const [active, setActive] = useState('pill')
  const [values, setValues] = useState(DEFAULT)
  const [tags, setTags] = useState(['React', 'CSS', 'TypeScript', 'Tailwind', 'Vite', 'Animation'])
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  const badgeStyle = (bg, color) => ({
    display: 'inline-flex', alignItems: 'center',
    padding: `${values.paddingY}px ${values.paddingX}px`,
    fontSize: `${values.fontSize}px`, fontWeight: 600,
    borderRadius: `${values.radius}px`,
    background: values.outline ? 'transparent' : bg,
    color: values.outline ? bg : color,
    border: values.outline ? `1.5px solid ${bg}` : 'none',
  })

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Badges & Tags</h1>
          <p>Pills, status indicators, notification badges, and tag clouds.</p>
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
        <div className="showcase-preview" style={{ background: values.bg, flexWrap: 'wrap', gap: '1rem' }}>
          {active === 'pill' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {BADGE_COLORS.map(([lbl, bg]) => (
                  <span key={lbl} style={badgeStyle(bg, '#fff')}>{lbl}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[['✓ Success', '#16a34a22', '#4ade80', '#16a34a44'], ['⚠ Warning', '#d9770622', '#fbbf24', '#d9770644'], ['✕ Error', '#dc262622', '#f87171', '#dc262644'], ['ℹ Info', '#3b82f622', '#60a5fa', '#3b82f644']].map(([lbl, bg, color, border]) => (
                  <span key={lbl} style={{ display: 'inline-flex', alignItems: 'center', padding: `${values.paddingY}px ${values.paddingX}px`, fontSize: `${values.fontSize}px`, fontWeight: 600, borderRadius: `${values.radius}px`, background: bg, color, border: `1px solid ${border}` }}>{lbl}</span>
                ))}
              </div>
            </div>
          )}
          {active === 'status' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[['Online', '#4ade80', '0 0 6px #4ade8088'], ['Away', '#fbbf24', 'none'], ['Busy', '#f87171', 'none'], ['Offline', '#555', 'none']].map(([lbl, dotColor, shadow]) => (
                <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: `${values.fontSize}px`, fontWeight: 500, color: '#ccc' }}>
                  <div style={{ width: parseInt(values.fontSize) - 2, height: parseInt(values.fontSize) - 2, borderRadius: '50%', background: dotColor, boxShadow: shadow, flexShrink: 0 }} />
                  {lbl}
                </div>
              ))}
            </div>
          )}
          {active === 'notification' && (
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {[['🔔', 3], ['✉', 12], ['⚙', 0], ['♡', 99]].map(([icon, count]) => (
                <div key={icon} style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{ width: 44, height: 44, background: '#1e1e22', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', cursor: 'pointer' }}>{icon}</div>
                  {count > 0 && (
                    <div style={{ position: 'absolute', top: -6, right: -6, minWidth: parseInt(values.fontSize) + 8, height: parseInt(values.fontSize) + 8, background: values.primary, color: values.color, borderRadius: '50%', fontSize: `${values.fontSize}px`, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${values.bg}`, padding: '0 3px' }}>
                      {count > 99 ? '99+' : count}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {active === 'tags' && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 400 }}>
              {tags.map(tag => (
                <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: `${values.paddingY}px ${values.paddingX}px`, fontSize: `${values.fontSize}px`, fontWeight: 500, borderRadius: `${values.radius}px`, background: `${values.primary}18`, color: values.primary, border: `1px solid ${values.primary}33`, cursor: 'pointer' }}>
                  {tag}
                  <span onClick={() => setTags(t => t.filter(x => x !== tag))} style={{ opacity: 0.6, fontSize: '0.9em', cursor: 'pointer' }}>×</span>
                </span>
              ))}
              {tags.length === 0 && <span style={{ color: '#555', fontSize: '0.85rem' }}>All tags removed. Refresh to reset.</span>}
            </div>
          )}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCode(active, values)}
          jsxCode={`export const Badge = ({ label, variant = 'default' }) => (\n  <span className={\`badge badge-\${variant}\`}>\n    {label}\n  </span>\n)\n\n// Usage:\n// <Badge label="New" variant="success" />\n// <Badge label="Sale" variant="danger" />`} />
      </div>
    </div>
  )
}
