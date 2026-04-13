import React, { useState } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'
import '../../styles/showcase/CardShowcase.css'

const VARIANTS = [
  { id: 'basic', label: 'Basic' },
  { id: 'profile', label: 'Profile' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'horizontal', label: 'Horizontal' },
  { id: 'glass', label: 'Glass' },
  { id: 'stats', label: 'Stats' },
]

// Base controls always shown
const BASE_CONTROLS = [
  { key: 'bg', label: 'Background', type: 'color' },
  { key: 'color', label: 'Text Color', type: 'color' },
  { key: 'accent', label: 'Accent Color', type: 'color' },
  { key: 'borderColor', label: 'Border Color', type: 'color' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 32, unit: 'px' },
  { key: 'padding', label: 'Padding', type: 'range', min: 8, max: 56, unit: 'px' },
  { key: 'shadow', label: 'Drop Shadow', type: 'toggle' },
  { key: 'border', label: 'Show Border', type: 'toggle' },
  { key: 'fontSize', label: 'Font Size', type: 'range', min: 12, max: 20, unit: 'px' },
]

// Per-variant extra controls
const VARIANT_CONTROLS = {
  basic: [
    { key: 'showBadge', label: 'Show Badge', type: 'toggle' },
    { key: 'showButton', label: 'Show Button', type: 'toggle' },
  ],
  profile: [
    { key: 'showAvatar', label: 'Show Avatar', type: 'toggle' },
    { key: 'showDivider', label: 'Show Divider', type: 'toggle' },
    { key: 'showStats', label: 'Show Stats', type: 'toggle' },
    { key: 'showOnline', label: 'Online Dot', type: 'toggle' },
    { key: 'showFollowBtn', label: 'Follow Button', type: 'toggle' },
  ],
  pricing: [
    { key: 'showBadge', label: 'Popular Badge', type: 'toggle' },
    { key: 'showFeatures', label: 'Show Features', type: 'toggle' },
    { key: 'showButton', label: 'Show Button', type: 'toggle' },
    { key: 'showAnnual', label: 'Annual Toggle', type: 'toggle' },
  ],
  horizontal: [
    { key: 'showImage', label: 'Show Image', type: 'toggle' },
    { key: 'showTag', label: 'Show Tag', type: 'toggle' },
    { key: 'showArrow', label: 'Show Arrow', type: 'toggle' },
  ],
  glass: [
    { key: 'blur', label: 'Blur Amount', type: 'range', min: 0, max: 30, unit: 'px' },
    { key: 'showIcon', label: 'Show Icon', type: 'toggle' },
    { key: 'showButton', label: 'Show Button', type: 'toggle' },
  ],
  stats: [
    { key: 'showBar', label: 'Show Bar', type: 'toggle' },
    { key: 'showChange', label: 'Show Change', type: 'toggle' },
    { key: 'showIcon', label: 'Show Icon', type: 'toggle' },
  ],
}

const DEFAULT = {
  bg: '#1c1c1f', color: '#f0f0f0', accent: '#7c6fff',
  borderColor: '#2a2a2e', radius: '14', padding: '24',
  shadow: true, border: true, fontSize: '14', blur: '12',
  // basic
  showBadge: true, showButton: true,
  // profile
  showAvatar: true, showDivider: true, showStats: true,
  showOnline: true, showFollowBtn: true,
  // pricing
  showFeatures: true, showAnnual: false,
  // horizontal
  showImage: true, showTag: true, showArrow: true,
  // glass
  showIcon: true,
  // stats
  showBar: true, showChange: true,
}

const generateCSS = (variant, v) => {
  const shadow = v.shadow ? `box-shadow: 0 8px 32px rgba(0,0,0,0.25);` : ''
  const border = v.border ? `border: 1px solid ${v.borderColor};` : 'border: none;'
  const base = `.card {\n  background: ${v.bg};\n  color: ${v.color};\n  ${border}\n  border-radius: ${v.radius}px;\n  padding: ${v.padding}px;\n  font-size: ${v.fontSize}px;\n  ${shadow}\n}`
  const map = {
    basic: `${base}\n\n.card-badge { display: inline-block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; background: ${v.accent}22; color: ${v.accent}; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.75rem; }\n.card-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; }\n.card-desc { opacity: 0.6; line-height: 1.7; }\n.card-btn { margin-top: 1.25rem; padding: 0.55rem 1.4rem; background: ${v.accent}; color: #fff; border: none; border-radius: ${v.radius}px; cursor: pointer; font-weight: 600; }`,
    profile: `${base}\n\n.card { text-align: center; position: relative; }\n.card-online { position: absolute; top: 0; right: 0; width: 10px; height: 10px; border-radius: 50%; background: #34d399; border: 2px solid ${v.bg}; }\n.card-avatar { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem; border: 3px solid ${v.accent}; }\n.card-name { font-size: 1.05rem; font-weight: 700; }\n.card-role { font-size: 0.82rem; opacity: 0.5; }\n.card-divider { height: 1px; background: ${v.borderColor}; margin: 1rem 0; }\n.card-stats { display: flex; justify-content: center; gap: 2rem; }\n.card-follow { margin-top: 1rem; width: 100%; padding: 0.5rem; background: ${v.accent}; color: #fff; border: none; border-radius: ${v.radius}px; cursor: pointer; font-weight: 600; }`,
    pricing: `${base}\n\n.card-popular { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; background: ${v.accent}; color: #fff; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.75rem; display: inline-block; }\n.card-plan { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: ${v.accent}; }\n.card-price { font-size: 2.8rem; font-weight: 800; margin: 0.5rem 0; line-height: 1; }\n.card-features { list-style: none; margin: 1.25rem 0; display: flex; flex-direction: column; gap: 0.6rem; }\n.card-btn { width: 100%; padding: 0.75rem; background: ${v.accent}; color: #fff; border: none; border-radius: ${v.radius}px; cursor: pointer; font-weight: 700; }`,
    horizontal: `${base}\n\n.card { display: flex; gap: 1.25rem; align-items: center; }\n.card-img { width: 88px; height: 88px; border-radius: ${Math.max(0, v.radius - 4)}px; object-fit: cover; flex-shrink: 0; }\n.card-tag { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: ${v.accent}; margin-bottom: 0.3rem; }\n.card-title { font-size: 0.95rem; font-weight: 700; }\n.card-arrow { color: ${v.accent}; font-size: 1rem; }`,
    glass: `.card {\n  background: ${v.bg}44;\n  backdrop-filter: blur(${v.blur}px);\n  -webkit-backdrop-filter: blur(${v.blur}px);\n  border: 1px solid ${v.color}18;\n  border-radius: ${v.radius}px;\n  padding: ${v.padding}px;\n  color: ${v.color};\n  ${shadow}\n}`,
    stats: `${base}\n\n.card-label { font-size: 0.78rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.08em; }\n.card-value { font-size: 2.2rem; font-weight: 800; margin: 0.3rem 0; }\n.card-change.up { background: #0f2a1a; color: #34d399; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.82rem; }\n.card-change.down { background: #2a0f0f; color: #f87171; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.82rem; }\n.card-bar { height: 4px; background: ${v.borderColor}; border-radius: 2px; margin-top: 1.25rem; overflow: hidden; }\n.card-bar-fill { height: 100%; background: ${v.accent}; border-radius: 2px; }`,
  }
  return map[variant]
}

const generateJSX = (variant, v) => {
  const map = {
    basic: `export const BasicCard = () => (\n  <div className="card">\n    <span className="card-badge">Design</span>\n    <h3 className="card-title">Beautiful UI Components</h3>\n    <p className="card-desc">Copy-paste ready components.</p>\n    <button className="card-btn">Learn More</button>\n  </div>\n)`,
    profile: `export const ProfileCard = ({ user }) => (\n  <div className="card">\n    <span className="card-online" />\n    <img className="card-avatar" src={user.img} alt={user.name} />\n    <div className="card-name">{user.name}</div>\n    <div className="card-role">{user.role}</div>\n    <div className="card-divider" />\n    <div className="card-stats">\n      <div><b>{user.posts}</b><span>Posts</span></div>\n      <div><b>{user.followers}</b><span>Followers</span></div>\n    </div>\n    <button className="card-follow">Follow</button>\n  </div>\n)`,
    pricing: `export const PricingCard = () => (\n  <div className="card">\n    <span className="card-popular">Most Popular</span>\n    <div className="card-plan">Pro Plan</div>\n    <div className="card-price">$29<sub>/mo</sub></div>\n    <ul className="card-features">\n      <li>Unlimited projects</li>\n      <li>Priority support</li>\n    </ul>\n    <button className="card-btn">Get Started</button>\n  </div>\n)`,
    horizontal: `export const HorizontalCard = () => (\n  <div className="card">\n    <img className="card-img" src="image.jpg" alt="" />\n    <div>\n      <div className="card-tag">Design</div>\n      <div className="card-title">Modern UI Patterns</div>\n      <span className="card-arrow">→</span>\n    </div>\n  </div>\n)`,
    glass: `export const GlassCard = () => (\n  <div className="card">\n    <div className="card-icon">✦</div>\n    <h3>Glassmorphism</h3>\n    <p>Frosted glass using backdrop-filter.</p>\n    <button>Explore</button>\n  </div>\n)`,
    stats: `export const StatsCard = ({ label, value, change, fill }) => (\n  <div className="card">\n    <div className="card-label">{label}</div>\n    <div className="card-value">{value}</div>\n    <span className={\`card-change \${change > 0 ? 'up' : 'down'}\`}>\n      {change > 0 ? '↑' : '↓'} {change}%\n    </span>\n    <div className="card-bar">\n      <div className="card-bar-fill" style={{ width: \`\${fill}%\` }} />\n    </div>\n  </div>\n)`,
  }
  return map[variant]
}

export const CardShowcase = () => {
  const [active, setActive] = useState('basic')
  const [values, setValues] = useState(DEFAULT)
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  // Merge base + variant-specific controls
  const controls = [...BASE_CONTROLS, ...(VARIANT_CONTROLS[active] || [])]

  const cs = {
    background: values.bg, color: values.color,
    border: values.border ? `1px solid ${values.borderColor}` : 'none',
    borderRadius: `${values.radius}px`, padding: `${values.padding}px`,
    fontSize: `${values.fontSize}px`,
    boxShadow: values.shadow ? '0 8px 32px rgba(0,0,0,0.25)' : 'none',
  }
  const btn = {
    padding: '0.55rem 1.4rem', background: values.accent, color: '#fff',
    border: 'none', borderRadius: `${values.radius}px`, cursor: 'pointer',
    fontWeight: 600, fontSize: '0.88rem', fontFamily: 'inherit',
  }

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Card UI Showcase</h1>
          <p>6 card variants — customize every detail, copy CSS or JSX.</p>
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
        <div className={`showcase-preview ${active === 'glass' ? '' : 'light'}`}
          style={active === 'glass' ? { background: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)' } : {}}>

          {/* ── Basic ── */}
          {active === 'basic' && (
            <div style={{ ...cs, maxWidth: 280 }}>
              {values.showBadge && (
                <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', background: `${values.accent}22`, color: values.accent, padding: '0.2rem 0.6rem', borderRadius: 4, marginBottom: '0.75rem' }}>Design</span>
              )}
              <div style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: values.color }}>Beautiful UI Components</div>
              <div style={{ opacity: 0.6, lineHeight: 1.7, color: values.color }}>Copy-paste ready components for your next project. Fully customizable.</div>
              {values.showButton && (
                <button style={{ ...btn, marginTop: '1.25rem' }}>Learn More</button>
              )}
            </div>
          )}

          {/* ── Profile ── */}
          {active === 'profile' && (
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80', name: 'Ellie Williams', role: 'UI Designer', posts: '312', followers: '8.1k', following: '204' },
                { img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', name: 'Joel Miller', role: 'Frontend Dev', posts: '187', followers: '5.4k', following: '139' },
              ].map(p => (
                <div key={p.name} style={{ ...cs, textAlign: 'center', minWidth: 200, position: 'relative' }}>
                  {values.showOnline && (
                    <span style={{ position: 'absolute', top: 12, right: 12, width: 10, height: 10, borderRadius: '50%', background: '#34d399', border: `2px solid ${values.bg}`, display: 'block' }} />
                  )}
                  {values.showAvatar && (
                    <img src={p.img} alt={p.name} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem', display: 'block', border: `3px solid ${values.accent}` }} />
                  )}
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: values.color }}>{p.name}</div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.5, marginTop: '0.2rem', color: values.color }}>{p.role}</div>
                  {values.showDivider && (
                    <div style={{ height: 1, background: values.borderColor, margin: '1rem 0' }} />
                  )}
                  {values.showStats && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem' }}>
                      {[[p.posts, 'Posts'], [p.followers, 'Followers'], [p.following, 'Following']].map(([val, lbl]) => (
                        <div key={lbl} style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 700, color: values.color }}>{val}</div>
                          <div style={{ fontSize: '0.72rem', opacity: 0.5, color: values.color }}>{lbl}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {values.showFollowBtn && (
                    <button style={{ ...btn, marginTop: '1rem', width: '100%', padding: '0.5rem' }}>Follow</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Pricing ── */}
          {active === 'pricing' && (
            <div style={{ ...cs, minWidth: 230 }}>
              {values.showBadge && (
                <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', background: values.accent, color: '#fff', padding: '0.2rem 0.65rem', borderRadius: 4, marginBottom: '0.75rem' }}>Most Popular</span>
              )}
              {values.showAnnual && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.78rem', color: values.color, opacity: 0.6 }}>
                  <span>Monthly</span>
                  <div style={{ width: 32, height: 16, borderRadius: 16, background: values.accent, position: 'relative', cursor: 'pointer' }}>
                    <span style={{ position: 'absolute', right: 2, top: 2, width: 12, height: 12, borderRadius: '50%', background: '#fff', display: 'block' }} />
                  </div>
                  <span style={{ color: values.accent, fontWeight: 600 }}>Annual</span>
                </div>
              )}
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: values.accent }}>Pro Plan</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1, color: values.color }}>
                <sup style={{ fontSize: '1.1rem', verticalAlign: 'super' }}>$</sup>
                {values.showAnnual ? '19' : '29'}
                <sub style={{ fontSize: '0.85rem', opacity: 0.5, fontWeight: 400 }}>/mo</sub>
              </div>
              {values.showFeatures && (
                <ul style={{ listStyle: 'none', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                  {['Unlimited projects', 'Priority support', 'Custom domain', 'Analytics'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8, color: values.color }}>
                      <span style={{ color: values.accent, fontWeight: 700 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              )}
              {values.showButton && (
                <button style={{ ...btn, width: '100%', padding: '0.7rem', fontWeight: 700 }}>Get Started</button>
              )}
            </div>
          )}

          {/* ── Horizontal ── */}
          {active === 'horizontal' && (
            <div style={{ ...cs, display: 'flex', gap: '1rem', alignItems: 'center', maxWidth: 340 }}>
              {values.showImage && (
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80" alt="" style={{ width: 80, height: 80, borderRadius: `${Math.max(0, values.radius - 4)}px`, objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                {values.showTag && (
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: values.accent, marginBottom: '0.3rem' }}>Design</div>
                )}
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: values.color, marginBottom: '0.3rem' }}>Modern UI Patterns</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: 1.6, color: values.color }}>Explore the latest design patterns.</div>
              </div>
              {values.showArrow && (
                <span style={{ color: values.accent, fontSize: '1.1rem', flexShrink: 0 }}>→</span>
              )}
            </div>
          )}

          {/* ── Glass ── */}
          {active === 'glass' && (
            <div style={{ background: `${values.bg}44`, backdropFilter: `blur(${values.blur}px)`, WebkitBackdropFilter: `blur(${values.blur}px)`, border: `1px solid ${values.color}18`, borderRadius: `${values.radius}px`, padding: `${values.padding}px`, color: values.color, boxShadow: values.shadow ? '0 8px 32px rgba(0,0,0,0.25)' : 'none', maxWidth: 270 }}>
              {values.showIcon && (
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>✦</div>
              )}
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Glassmorphism</div>
              <div style={{ opacity: 0.7, lineHeight: 1.7, fontSize: '0.85rem' }}>A frosted glass effect using backdrop-filter.</div>
              {values.showButton && (
                <button style={{ ...btn, marginTop: '1.25rem', background: `${values.color}22`, color: values.color, border: `1px solid ${values.color}33` }}>Explore</button>
              )}
            </div>
          )}

          {/* ── Stats ── */}
          {active === 'stats' && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                ['Revenue', '$48,295', '+12.5%', true, 72, '📈'],
                ['Users', '8,492', '+4.2%', true, 58, '👥'],
                ['Bounce', '24.8%', '-2.1%', false, 35, '↩'],
              ].map(([label, value, change, up, fill, icon]) => (
                <div key={label} style={{ ...cs, minWidth: 140 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <div style={{ fontSize: '0.72rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em', color: values.color }}>{label}</div>
                    {values.showIcon && <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>{icon}</span>}
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.3rem 0', color: values.color }}>{value}</div>
                  {values.showChange && (
                    <span style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.15rem 0.45rem', borderRadius: 4, background: up ? '#0f2a1a' : '#2a0f0f', color: up ? '#34d399' : '#f87171' }}>
                      {up ? '↑' : '↓'} {change}
                    </span>
                  )}
                  {values.showBar && (
                    <div style={{ height: 3, background: values.borderColor, borderRadius: 2, marginTop: '1rem', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${fill}%`, background: values.accent, borderRadius: 2 }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <CustomizerPanel
          controls={controls}
          values={values}
          onChange={onChange}
          onReset={onReset}
          cssCode={generateCSS(active, values)}
          jsxCode={generateJSX(active, values)}
        />
      </div>
    </div>
  )
}
