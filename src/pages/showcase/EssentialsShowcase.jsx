import React, { useState } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'

const VARIANTS = [
  { id: 'navbar', label: 'Navbar' },
  { id: 'hero', label: 'Hero Section' },
  { id: 'footer', label: 'Footer' },
  { id: 'sidebar', label: 'Sidebar' },
  { id: 'breadcrumb', label: 'Breadcrumb' },
]

const CONTROLS = [
  { key: 'bg', label: 'Background', type: 'color' },
  { key: 'color', label: 'Text Color', type: 'color' },
  { key: 'accent', label: 'Accent Color', type: 'color' },
  { key: 'surface', label: 'Surface Color', type: 'color' },
  { key: 'radius', label: 'Button Radius', type: 'range', min: 0, max: 32, unit: 'px' },
  { key: 'height', label: 'Nav Height', type: 'range', min: 48, max: 80, unit: 'px' },
  { key: 'sticky', label: 'Sticky Nav', type: 'toggle' },
  { key: 'blur', label: 'Frosted Glass', type: 'toggle' },
]

const DEFAULT = { bg: '#0a0a0c', color: '#f0f0f0', accent: '#7c6fff', surface: '#161618', radius: '8', height: '60', sticky: true, blur: false }

const generateCode = (variant, v) => {
  const codes = {
    navbar: `.navbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 2.5rem; height: ${v.height}px;
  background: ${v.blur ? `${v.bg}cc` : v.bg};
  ${v.blur ? 'backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);' : ''}
  color: ${v.color};
  border-bottom: 1px solid ${v.color}0f;
  ${v.sticky ? 'position: sticky; top: 0; z-index: 100;' : ''}
}
.nav-logo { font-weight: 700; font-size: 1.1rem; }
.nav-links { display: flex; gap: 1.5rem; list-style: none; }
.nav-links a { color: ${v.color}; text-decoration: none; font-size: 0.88rem; opacity: 0.65; transition: opacity 0.15s; }
.nav-links a:hover { opacity: 1; }
.nav-cta {
  padding: 0.45rem 1.2rem; background: ${v.accent};
  color: #fff; border: none; border-radius: ${v.radius}px;
  font-size: 0.88rem; font-weight: 600; cursor: pointer;
}`,
    hero: `.hero {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  background: ${v.bg}; color: ${v.color}; padding: 2rem;
}
.hero-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${v.accent}; margin-bottom: 1rem; }
.hero-title { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; }
.hero-sub { font-size: 1.1rem; opacity: 0.6; margin-top: 1.25rem; max-width: 520px; line-height: 1.8; }
.hero-actions { display: flex; gap: 1rem; margin-top: 2.5rem; }
.hero-btn-primary { padding: 0.8rem 2rem; background: ${v.accent}; color: #fff; border: none; border-radius: ${v.radius}px; font-size: 0.95rem; font-weight: 700; cursor: pointer; }
.hero-btn-secondary { padding: 0.8rem 2rem; background: transparent; color: ${v.color}; border: 1px solid ${v.color}33; border-radius: ${v.radius}px; font-size: 0.95rem; cursor: pointer; }`,
    footer: `.footer { background: ${v.bg}; color: ${v.color}; padding: 4rem 2.5rem 2rem; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2.5rem; margin-bottom: 3rem; }
.footer-brand { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem; }
.footer-desc { font-size: 0.85rem; opacity: 0.5; line-height: 1.7; max-width: 240px; }
.footer-col-title { font-weight: 600; font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.4; margin-bottom: 1rem; }
.footer-col a { display: block; font-size: 0.88rem; opacity: 0.6; text-decoration: none; color: ${v.color}; margin-bottom: 0.5rem; transition: opacity 0.15s; }
.footer-col a:hover { opacity: 1; }
.footer-bottom { border-top: 1px solid ${v.color}0f; padding-top: 1.5rem; display: flex; justify-content: space-between; font-size: 0.8rem; opacity: 0.4; }`,
    sidebar: `.sidebar {
  width: 240px; height: 100vh; position: fixed; left: 0; top: 0;
  background: ${v.bg}; color: ${v.color};
  display: flex; flex-direction: column; padding: 1.5rem 0.75rem;
  border-right: 1px solid ${v.color}0a;
}
.sidebar-logo { font-weight: 700; font-size: 1rem; padding: 0.5rem 0.75rem; margin-bottom: 1.5rem; }
.sidebar-section { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${v.color}33; padding: 0 0.75rem; margin: 1rem 0 0.4rem; }
.sidebar-link {
  display: flex; align-items: center; gap: 0.65rem;
  padding: 0.6rem 0.75rem; border-radius: ${v.radius}px;
  color: ${v.color}; text-decoration: none; font-size: 0.88rem;
  opacity: 0.55; transition: background 0.12s, opacity 0.12s;
}
.sidebar-link:hover { background: ${v.color}08; opacity: 0.85; }
.sidebar-link.active { background: ${v.accent}18; opacity: 1; color: ${v.accent}; }`,
    breadcrumb: `.breadcrumb {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.85rem; color: ${v.color};
}
.breadcrumb-item { opacity: 0.5; cursor: pointer; transition: opacity 0.15s; }
.breadcrumb-item:hover { opacity: 1; }
.breadcrumb-item.active { opacity: 1; font-weight: 600; cursor: default; }
.breadcrumb-sep { opacity: 0.3; }`,
  }
  return codes[variant]
}

export const EssentialsShowcase = () => {
  const [active, setActive] = useState('navbar')
  const [values, setValues] = useState(DEFAULT)
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Website Essentials</h1>
          <p>Core layout components — navbar, hero, footer, sidebar, and more.</p>
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
        <div className="showcase-preview" style={{ padding: 0, overflow: 'hidden', background: values.bg }}>
          {active === 'navbar' && (
            <div style={{ background: values.blur ? `${values.bg}cc` : values.bg, backdropFilter: values.blur ? 'blur(12px)' : 'none', color: values.color, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2.5rem', height: `${values.height}px`, width: '100%', borderBottom: `1px solid ${values.color}0f` }}>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Syntax Studio</span>
              <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0 }}>
                {['Home', 'Docs', 'Showcase', 'Blog'].map(l => (
                  <li key={l}><a href="#" style={{ color: values.color, textDecoration: 'none', fontSize: '0.88rem', opacity: 0.65 }}>{l}</a></li>
                ))}
              </ul>
              <button style={{ padding: '0.45rem 1.2rem', background: values.accent, color: '#fff', border: 'none', borderRadius: `${values.radius}px`, fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Get Started
              </button>
            </div>
          )}
          {active === 'hero' && (
            <div style={{ minHeight: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: values.bg, color: values.color, padding: '3rem 2rem', width: '100%' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: values.accent, marginBottom: '1rem' }}>Copy. Paste. Ship.</div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: values.color }}>Build Faster with<br />Syntax Studio</h1>
              <p style={{ fontSize: '1rem', opacity: 0.6, marginTop: '1.25rem', maxWidth: 460, lineHeight: 1.8, color: values.color }}>
                Copy-paste UI components for your next project. Fully customizable, production-ready.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                <button style={{ padding: '0.8rem 2rem', background: values.accent, color: '#fff', border: 'none', borderRadius: `${values.radius}px`, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Browse Components</button>
                <button style={{ padding: '0.8rem 2rem', background: 'transparent', color: values.color, border: `1px solid ${values.color}33`, borderRadius: `${values.radius}px`, cursor: 'pointer', fontFamily: 'inherit' }}>View Docs</button>
              </div>
            </div>
          )}
          {active === 'footer' && (
            <div style={{ background: values.bg, color: values.color, padding: '2.5rem 2rem 1.5rem', width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>Syntax Studio</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.5, lineHeight: 1.7, maxWidth: 220 }}>Copy-paste UI components for modern web development.</div>
                </div>
                {[['Product', ['Cards', 'Forms', 'Buttons', 'Typography']], ['Company', ['About', 'Blog', 'Contact', 'License']]].map(([title, links]) => (
                  <div key={title}>
                    <div style={{ fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '1rem' }}>{title}</div>
                    {links.map(l => <div key={l} style={{ fontSize: '0.88rem', opacity: 0.6, marginBottom: '0.5rem', cursor: 'pointer' }}>{l}</div>)}
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${values.color}0f`, paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.4 }}>
                <span>© 2024 Syntax Studio</span>
                <span>MIT License</span>
              </div>
            </div>
          )}
          {active === 'sidebar' && (
            <div style={{ display: 'flex', height: 380, width: '100%' }}>
              <div style={{ width: 220, background: values.bg, color: values.color, display: 'flex', flexDirection: 'column', padding: '1.5rem 0.75rem', borderRight: `1px solid ${values.color}0a`, flexShrink: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', padding: '0.5rem 0.75rem', marginBottom: '1.5rem' }}>Studio</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: `${values.color}44`, padding: '0 0.75rem', marginBottom: '0.4rem' }}>Main</div>
                {[['⊞', 'Dashboard', true], ['◈', 'Components', false], ['✦', 'Animations', false]].map(([icon, label, isActive]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.6rem 0.75rem', borderRadius: `${values.radius}px`, marginBottom: '0.15rem', background: isActive ? `${values.accent}18` : 'transparent', color: isActive ? values.accent : values.color, opacity: isActive ? 1 : 0.55, fontSize: '0.88rem', cursor: 'pointer' }}>
                    <span>{icon}</span>{label}
                  </div>
                ))}
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: `${values.color}44`, padding: '0 0.75rem', margin: '1rem 0 0.4rem' }}>Settings</div>
                {[['⬡', 'Preferences', false], ['◉', 'Account', false]].map(([icon, label, isActive]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.6rem 0.75rem', borderRadius: `${values.radius}px`, marginBottom: '0.15rem', background: 'transparent', color: values.color, opacity: 0.55, fontSize: '0.88rem', cursor: 'pointer' }}>
                    <span>{icon}</span>{label}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, background: values.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', color: values.color, opacity: 0.2, fontSize: '0.88rem' }}>
                Main content area
              </div>
            </div>
          )}
          {active === 'breadcrumb' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem', width: '100%' }}>
              {[
                ['Home', 'Showcase', 'Cards'],
                ['Home', 'Docs', 'Components', 'Button'],
              ].map((crumbs, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: values.color }}>
                  {crumbs.map((c, j) => (
                    <React.Fragment key={c}>
                      <span style={{ opacity: j === crumbs.length - 1 ? 1 : 0.5, fontWeight: j === crumbs.length - 1 ? 600 : 400, cursor: j < crumbs.length - 1 ? 'pointer' : 'default' }}>{c}</span>
                      {j < crumbs.length - 1 && <span style={{ opacity: 0.3 }}>/</span>}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCode(active, values)}
          jsxCode={`export const ${active.charAt(0).toUpperCase() + active.slice(1)} = () => (\n  <div className="${active}">\n    {/* Paste the CSS from the CSS tab into your stylesheet */}\n    {/* then use this JSX structure */}\n    <div className="${active}-inner">\n      <span className="${active}-logo">Brand</span>\n      <nav className="${active}-links">\n        <a href="/">Home</a>\n        <a href="/about">About</a>\n      </nav>\n    </div>\n  </div>\n)`} />
      </div>
    </div>
  )
}
