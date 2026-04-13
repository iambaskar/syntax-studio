import React, { useState } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'
import '../../styles/showcase/AvatarsShowcase.css'

const VARIANTS = [
  { id: 'single', label: 'Single Avatar' },
  { id: 'group', label: 'Grouped' },
  { id: 'status', label: 'Status Rings' },
]

const CONTROLS = [
  { key: 'bg', label: 'Preview BG', type: 'color' },
  { key: 'accent', label: 'Ring Color', type: 'color' },
  { key: 'size', label: 'Avatar Size', type: 'range', min: 32, max: 80, unit: 'px' },
  { key: 'gap', label: 'Group Overlap', type: 'range', min: -30, max: -8, unit: 'px' },
  { key: 'borderWidth', label: 'Border Width', type: 'range', min: 1, max: 5, unit: 'px' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 50, unit: '%' },
]

const DEFAULT = { bg: '#0f0f12', accent: '#7c6fff', size: '48', gap: '-14', borderWidth: '2', radius: '50' }

const AVATARS = [
  { name: 'Alice', color: '#7c6fff', initials: 'AC', img: null },
  { name: 'Bob', color: '#f59e0b', initials: 'BM', img: null },
  { name: 'Carol', color: '#10b981', initials: 'CW', img: null },
  { name: 'David', color: '#ef4444', initials: 'DK', img: null },
  { name: 'Eva', color: '#3b82f6', initials: 'ET', img: null },
  { name: 'Frank', color: '#e879f9', initials: 'FL', img: null },
]

const STATUS_RING = [
  { label: 'Online', color: '#4ade80', ring: '#4ade8044' },
  { label: 'Busy', color: '#f87171', ring: '#f8717144' },
  { label: 'Away', color: '#fbbf24', ring: '#fbbf2444' },
  { label: 'Offline', color: '#555', ring: '#55555544' },
]

const generateJSX = (variant) => {
  const codes = {
    single: `const Avatar = ({ src, initials, color, size = 48, radius = '50%' }) => (
  <div className="avatar" style={{ width: size, height: size, borderRadius: radius, background: color }}>
    {src ? <img src={src} alt={initials} /> : initials}
  </div>
)

// Usage
<Avatar initials="AC" color="#7c6fff" size={48} />
<Avatar src="/photo.jpg" initials="BM" size={48} />`,
    group: `const AvatarGroup = ({ avatars, max = 4, size = 48, overlap = -14 }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {avatars.slice(0, max).map((av, i) => (
      <div key={av.name} className="avatar"
        style={{ marginLeft: i === 0 ? 0 : overlap, zIndex: max - i,
          width: size, height: size, background: av.color }}>
        {av.initials}
      </div>
    ))}
    {avatars.length > max && (
      <div className="avatar avatar-overflow"
        style={{ marginLeft: overlap, width: size, height: size }}>
        +{avatars.length - max}
      </div>
    )}
  </div>
)`,
    status: `const StatusAvatar = ({ src, initials, color, status, size = 48 }) => {
  const statusColors = {
    online: '#4ade80', busy: '#f87171', away: '#fbbf24', offline: '#555'
  }
  return (
    <div className="avatar-status-wrap">
      <div className="avatar-ring" style={{ '--ring-color': statusColors[status] }}>
        <div className="avatar-ring-inner" style={{ background: color }}>
          {src ? <img src={src} alt={initials} /> : initials}
        </div>
      </div>
      <div className="status-dot" style={{ background: statusColors[status] }} />
    </div>
  )
}`,
  }
  return codes[variant]
}

const generateCSS = (variant, v) => {
  const codes = {
    single: `.avatar {
  width: ${v.size}px; height: ${v.size}px;
  border-radius: ${v.radius}%;
  display: flex; align-items: center; justify-content: center;
  font-size: ${parseInt(v.size) * 0.35}px;
  font-weight: 700; color: #fff;
  overflow: hidden; flex-shrink: 0;
}
.avatar img { width: 100%; height: 100%; object-fit: cover; }`,
    group: `.avatar-group {
  display: flex;
  align-items: center;
}
.avatar-group .avatar {
  width: ${v.size}px; height: ${v.size}px;
  border-radius: ${v.radius}%;
  border: ${v.borderWidth}px solid #0f0f12;
  margin-left: ${v.gap}px;
  font-size: ${parseInt(v.size) * 0.35}px;
  font-weight: 700; color: #fff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.avatar-group .avatar:first-child { margin-left: 0; }
.avatar-overflow {
  background: #2a2a2e; color: #888;
  font-size: ${parseInt(v.size) * 0.3}px;
}`,
    status: `.avatar-status-wrap {
  position: relative; display: inline-flex;
}
.avatar-ring {
  width: ${v.size}px; height: ${v.size}px;
  border-radius: ${v.radius}%;
  padding: ${v.borderWidth}px;
  background: conic-gradient(var(--ring-color) 0%, var(--ring-color) 100%);
}
.avatar-ring-inner {
  width: 100%; height: 100%;
  border-radius: ${v.radius}%;
  display: flex; align-items: center; justify-content: center;
  font-size: ${parseInt(v.size) * 0.35}px;
  font-weight: 700; color: #fff;
}
.status-dot {
  position: absolute; bottom: 1px; right: 1px;
  width: ${Math.max(8, parseInt(v.size) * 0.2)}px;
  height: ${Math.max(8, parseInt(v.size) * 0.2)}px;
  border-radius: 50%;
  border: 2px solid #0f0f12;
}`,
  }
  return codes[variant]
}

export const AvatarsShowcase = () => {
  const [active, setActive] = useState('single')
  const [values, setValues] = useState(DEFAULT)
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  const sz = parseInt(values.size)
  const r = values.radius + '%'
  const bw = parseInt(values.borderWidth)
  const dotSz = Math.max(8, sz * 0.2)

  const Avatar = ({ av, style = {} }) => (
    <div style={{
      width: sz, height: sz, borderRadius: r,
      background: av.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: sz * 0.35, fontWeight: 700, color: '#fff', flexShrink: 0, overflow: 'hidden',
      ...style
    }}>
      {av.initials}
    </div>
  )

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Avatars & Badges</h1>
          <p>Grouped avatars, status rings, and overflow indicators.</p>
        </div>
      </div>
      <div className="showcase-variant-tabs">
        {VARIANTS.map(v => (
          <button key={v.id} className={`variant-tab ${active === v.id ? 'active' : ''}`}
            onClick={() => setActive(v.id)}>{v.label}</button>
        ))}
      </div>
      <div className="showcase-body">
        <div className="showcase-preview" style={{ background: values.bg, flexDirection: 'column', gap: '2rem' }}>

          {active === 'single' && (
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              {AVATARS.map(av => (
                <div key={av.name} style={{ textAlign: 'center' }}>
                  <Avatar av={av} />
                  <div style={{ fontSize: '0.68rem', color: '#555', marginTop: '0.4rem', fontFamily: 'var(--mono)' }}>{av.name}</div>
                </div>
              ))}
            </div>
          )}

          {active === 'group' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
              {/* Group of 5 + overflow */}
              <div>
                <div style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'var(--mono)', marginBottom: '0.6rem', textAlign: 'center' }}>Team · 5 members</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {AVATARS.slice(0, 5).map((av, i) => (
                    <Avatar key={av.name} av={av} style={{ marginLeft: i === 0 ? 0 : parseInt(values.gap), border: `${bw}px solid ${values.bg}`, zIndex: 5 - i }} />
                  ))}
                  <div style={{
                    width: sz, height: sz, borderRadius: r, background: '#2a2a2e',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: sz * 0.28, fontWeight: 700, color: '#888',
                    marginLeft: parseInt(values.gap), border: `${bw}px solid ${values.bg}`, flexShrink: 0
                  }}>+{AVATARS.length - 5}</div>
                </div>
              </div>

              {/* Stacked group */}
              <div>
                <div style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'var(--mono)', marginBottom: '0.6rem', textAlign: 'center' }}>Compact · 3 visible</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {AVATARS.slice(0, 3).map((av, i) => (
                    <Avatar key={av.name} av={av} style={{ marginLeft: i === 0 ? 0 : parseInt(values.gap) * 1.5, border: `${bw}px solid ${values.bg}`, zIndex: 3 - i }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === 'status' && (
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {STATUS_RING.map((s, i) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ position: 'relative', display: 'inline-flex' }}>
                    {/* Ring */}
                    <div style={{
                      width: sz + bw * 4, height: sz + bw * 4,
                      borderRadius: r,
                      background: s.label === 'Offline' ? 'transparent' : s.ring,
                      border: s.label === 'Offline' ? `${bw}px solid #333` : `${bw}px solid ${s.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: s.label !== 'Offline' ? `0 0 ${bw * 4}px ${s.color}55` : 'none',
                    }}>
                      <Avatar av={AVATARS[i]} />
                    </div>
                    {/* Status dot */}
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: dotSz, height: dotSz,
                      borderRadius: '50%',
                      background: s.color,
                      border: `2px solid ${values.bg}`,
                    }} />
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#555', marginTop: '0.5rem', fontFamily: 'var(--mono)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCSS(active, values)} jsxCode={generateJSX(active)} />
      </div>
    </div>
  )
}
