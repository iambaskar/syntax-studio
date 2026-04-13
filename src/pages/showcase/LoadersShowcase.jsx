import React, { useState, useEffect } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'
import '../../styles/showcase/LoadersShowcase.css'

const VARIANTS = [
  { id: 'spinner', label: 'Spinners' },
  { id: 'skeleton', label: 'Skeleton' },
  { id: 'progress', label: 'Progress Bar' },
  { id: 'dots', label: 'Dots' },
  { id: 'pulse', label: 'Pulse' },
]

const CONTROLS = [
  { key: 'color', label: 'Loader Color', type: 'color' },
  { key: 'bg', label: 'Background', type: 'color' },
  { key: 'track', label: 'Track Color', type: 'color' },
  { key: 'size', label: 'Size', type: 'range', min: 20, max: 80, unit: 'px' },
  { key: 'speed', label: 'Speed', type: 'select', options: ['0.4s', '0.6s', '0.8s', '1s', '1.5s'] },
  { key: 'thickness', label: 'Thickness', type: 'range', min: 2, max: 8, unit: 'px' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 20, unit: 'px' },
]

const DEFAULT = { color: '#7c6fff', bg: '#161618', track: '#2a2a2e', size: '40', speed: '0.8s', thickness: '3', radius: '8' }

const generateCSS = (variant, v) => {
  const codes = {
    spinner: `@keyframes spin { to { transform: rotate(360deg); } }

.spinner {
  width: ${v.size}px;
  height: ${v.size}px;
  border: ${v.thickness}px solid ${v.track};
  border-top-color: ${v.color};
  border-radius: 50%;
  animation: spin ${v.speed} linear infinite;
}

.spinner-dual {
  width: ${v.size}px;
  height: ${v.size}px;
  border: ${v.thickness}px solid ${v.track};
  border-top-color: ${v.color};
  border-bottom-color: ${v.color};
  border-radius: 50%;
  animation: spin ${v.speed} linear infinite;
}`,
    skeleton: `.skeleton {
  background: linear-gradient(
    90deg,
    ${v.track} 25%,
    ${v.color}22 50%,
    ${v.track} 75%
  );
  background-size: 200% 100%;
  border-radius: ${v.radius}px;
  animation: shimmer ${v.speed} infinite;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}`,
    progress: `.progress-track {
  width: 100%;
  height: ${v.thickness * 2}px;
  background: ${v.track};
  border-radius: ${v.radius}px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: ${v.color};
  border-radius: ${v.radius}px;
  transition: width 0.3s ease;
}

.progress-indeterminate {
  height: ${v.thickness * 2}px;
  background: ${v.track};
  border-radius: ${v.radius}px;
  overflow: hidden;
  position: relative;
}

.progress-indeterminate::after {
  content: '';
  position: absolute;
  top: 0; left: -50%;
  width: 50%; height: 100%;
  background: ${v.color};
  border-radius: ${v.radius}px;
  animation: indeterminate ${v.speed} ease infinite;
}

@keyframes indeterminate {
  from { left: -50%; }
  to   { left: 100%; }
}`,
    dots: `@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
  40%           { transform: scale(1); opacity: 1; }
}

.dots {
  display: flex;
  align-items: center;
  gap: ${parseInt(v.size) / 4}px;
}

.dot {
  width: ${parseInt(v.size) / 3}px;
  height: ${parseInt(v.size) / 3}px;
  background: ${v.color};
  border-radius: 50%;
  animation: bounce ${v.speed} ease infinite;
}

.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }`,
    pulse: `@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.15); opacity: 0.6; }
}

@keyframes ripple {
  0%   { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.4); opacity: 0; }
}

.pulse-dot {
  width: ${v.size}px;
  height: ${v.size}px;
  background: ${v.color};
  border-radius: 50%;
  animation: pulse ${v.speed} ease infinite;
  position: relative;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: ${v.color};
  animation: ripple ${v.speed} ease infinite;
}`,
  }
  return codes[variant]
}

export const LoadersShowcase = () => {
  const [active, setActive] = useState('spinner')
  const [values, setValues] = useState(DEFAULT)
  const [progress, setProgress] = useState(65)
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  useEffect(() => {
    const t = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 1), 80)
    return () => clearInterval(t)
  }, [])

  const sz = parseInt(values.size)
  const th = parseInt(values.thickness)

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Loaders & Spinners</h1>
          <p>Skeleton screens, spinners, progress bars — copy CSS instantly.</p>
        </div>
      </div>
      <div className="showcase-variant-tabs">
        {VARIANTS.map(v => (
          <button key={v.id} className={`variant-tab ${active === v.id ? 'active' : ''}`} onClick={() => setActive(v.id)}>{v.label}</button>
        ))}
      </div>
      <div className="showcase-body">
        <div className="showcase-preview" style={{ background: values.bg, gap: '2rem', flexWrap: 'wrap' }}>

          {active === 'spinner' && (
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Basic */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: sz, height: sz, border: `${th}px solid ${values.track}`, borderTopColor: values.color, borderRadius: '50%', animation: `ss-spin ${values.speed} linear infinite`, margin: '0 auto 0.75rem' }} />
                <span style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'var(--mono)' }}>basic</span>
              </div>
              {/* Dual */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: sz, height: sz, border: `${th}px solid ${values.track}`, borderTopColor: values.color, borderBottomColor: values.color, borderRadius: '50%', animation: `ss-spin ${values.speed} linear infinite`, margin: '0 auto 0.75rem' }} />
                <span style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'var(--mono)' }}>dual</span>
              </div>
              {/* Grow */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: sz, height: sz, border: `${th}px solid transparent`, borderTopColor: values.color, borderRightColor: values.color, borderRadius: '50%', animation: `ss-spin ${values.speed} ease infinite`, margin: '0 auto 0.75rem' }} />
                <span style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'var(--mono)' }}>grow</span>
              </div>
              {/* Ring */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: sz, height: sz, position: 'relative', margin: '0 auto 0.75rem' }}>
                  <div style={{ position: 'absolute', inset: 0, border: `${th}px solid ${values.color}33`, borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', inset: 0, border: `${th}px solid transparent`, borderTopColor: values.color, borderRadius: '50%', animation: `ss-spin ${values.speed} linear infinite` }} />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'var(--mono)' }}>ring</span>
              </div>
            </div>
          )}

          {active === 'skeleton' && (
            <div style={{ width: '100%', maxWidth: 340 }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="ss-skeleton" style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, '--c': values.color, '--t': values.track, '--sp': values.speed }} />
                <div style={{ flex: 1 }}>
                  <div className="ss-skeleton" style={{ height: 12, borderRadius: values.radius + 'px', marginBottom: '0.5rem', '--c': values.color, '--t': values.track, '--sp': values.speed }} />
                  <div className="ss-skeleton" style={{ height: 10, borderRadius: values.radius + 'px', width: '60%', '--c': values.color, '--t': values.track, '--sp': values.speed }} />
                </div>
              </div>
              <div className="ss-skeleton" style={{ height: 140, borderRadius: values.radius + 'px', marginBottom: '0.75rem', '--c': values.color, '--t': values.track, '--sp': values.speed }} />
              {[100, 85, 70].map((w, i) => (
                <div key={i} className="ss-skeleton" style={{ height: 10, borderRadius: values.radius + 'px', width: `${w}%`, marginBottom: '0.5rem', '--c': values.color, '--t': values.track, '--sp': values.speed }} />
              ))}
            </div>
          )}

          {active === 'progress' && (
            <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[['Determinate', progress], ['Low', 25], ['Mid', 55], ['High', 85]].map(([lbl, val]) => (
                <div key={lbl}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem', color: '#888', fontFamily: 'var(--mono)' }}>
                    <span>{lbl}</span><span>{Math.round(val)}%</span>
                  </div>
                  <div style={{ height: th * 2, background: values.track, borderRadius: values.radius + 'px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${val}%`, background: values.color, borderRadius: values.radius + 'px', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              ))}
              <div>
                <div style={{ fontSize: '0.75rem', color: '#888', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>Indeterminate</div>
                <div style={{ height: th * 2, background: values.track, borderRadius: values.radius + 'px', overflow: 'hidden', position: 'relative' }}>
                  <div className="ss-indeterminate" style={{ '--c': values.color, '--sp': values.speed, height: '100%', borderRadius: values.radius + 'px' }} />
                </div>
              </div>
            </div>
          )}

          {active === 'dots' && (
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { label: 'bounce', cls: 'ss-dots-bounce' },
                { label: 'fade', cls: 'ss-dots-fade' },
                { label: 'scale', cls: 'ss-dots-scale' },
              ].map(({ label, cls }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div className={`ss-dots ${cls}`} style={{ '--c': values.color, '--sz': `${sz / 3}px`, '--gap': `${sz / 4}px`, '--sp': values.speed, marginBottom: '0.75rem' }}>
                    <span /><span /><span />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'var(--mono)' }}>{label}</span>
                </div>
              ))}
            </div>
          )}

          {active === 'pulse' && (
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { label: 'pulse', cls: 'ss-pulse' },
                { label: 'ripple', cls: 'ss-ripple' },
                { label: 'ping', cls: 'ss-ping' },
              ].map(({ label, cls }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: sz * 2, marginBottom: '0.75rem' }}>
                    <div className={cls} style={{ '--c': values.color, '--sz': `${sz}px`, '--sp': values.speed }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'var(--mono)' }}>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCSS(active, values)} />
      </div>
    </div>
  )
}
