import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/home.css'

const CATEGORIES = [
  { title: 'Animated', sub: 'Flip · Glow · Slide · Tilt · Magnetic', path: '/showcase/animated', num: '01', color: '#e879f9' },
  { title: 'Forms', sub: 'Login · Signup · Contact · OTP', path: '/showcase/forms', num: '02', color: '#22d3a5' },
  { title: 'Buttons', sub: 'Solid · Outline · Ghost · Gradient', path: '/showcase/buttons', num: '03', color: '#fb923c' },
  { title: 'Typography', sub: 'Headings · Body · Quote · Code', path: '/showcase/typography', num: '04', color: '#f59e0b' },
  { title: 'Badges', sub: 'Pills · Status · Notifications · Tags', path: '/showcase/badges', num: '05', color: '#f43f5e' },
  { title: 'Loaders', sub: 'Skeleton · Spinner · Progress · Dots', path: '/showcase/loaders', num: '06', color: '#a78bfa' },
  { title: 'Modals', sub: 'Confirmation · Drawer · Bottom Sheet', path: '/showcase/modals', num: '07', color: '#34d399' },
  { title: 'Toasts', sub: 'Success · Error · Warning · Info', path: '/showcase/toasts', num: '08', color: '#fbbf24' },
  { title: 'Tables', sub: 'Sortable · Striped · Paginated', path: '/showcase/tables', num: '09', color: '#60a5fa' },
  { title: 'Tabs & Accordion', sub: 'Tabs · Pills · Expand/Collapse', path: '/showcase/tabs', num: '10', color: '#f472b6' },
  { title: 'Avatars', sub: 'Grouped · Status Rings · Overflow', path: '/showcase/avatars', num: '11', color: '#22d3a5' },
  { title: 'React Hooks', sub: 'useLocalStorage · useDebounce · useFetch · useToggle +6', path: '/hooks/useLocalStorage', num: '12', color: '#22d3a5' },
]

const MARQUEE = ['Copy', 'Customize', 'Paste', 'Ship', 'Repeat', '—']

export const Home = () => {
  const navigate = useNavigate()
  const heroRef = useRef()

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="home-hero" ref={heroRef}>
        <div className="home-hero-cursor-glow" />

        <div className="home-hero-left">
          <div className="home-hero-eyebrow">
            <span className="home-hero-eyebrow-dot" />
            <span>UI Component Studio</span>
            <span className="home-hero-eyebrow-sep">·</span>
            <span>Free & Open Source</span>
          </div>

          <h1 className="home-hero-title">
            <span className="home-hero-title-line">Copy.</span>
            <span className="home-hero-title-line">Tweak.</span>
            <span className="home-hero-title-line accent">Ship.</span>
          </h1>

          <p className="home-hero-desc">
            Browse production-ready components and hooks — customize every property live, then copy clean CSS & JSX straight into your project.
          </p>

          <div className="home-hero-actions">
            <button className="home-btn-primary" onClick={() => navigate('/hooks/useLocalStorage')}>
                            Explore Hooks
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="home-btn-ghost" onClick={() => navigate('/showcase/animated')}>
              Browse Components
            </button>
          </div>

          <div className="home-hero-meta">
            {[['45+', 'Components'], ['12', 'Categories'], ['CSS + JSX', 'Code Output']].map(([v, l]) => (
              <div key={l} className="home-hero-meta-item">
                <span className="home-hero-meta-val">{v}</span>
                <span className="home-hero-meta-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="home-hero-right">
          <div className="home-hero-code-window">
            <div className="home-hero-code-bar">
              <span className="code-dot red" /><span className="code-dot amber" /><span className="code-dot green" />
              <span className="code-bar-title">useFetch.js</span>
            </div>
            <pre className="home-hero-code-body">
              <code dangerouslySetInnerHTML={{ __html:
`<span class="tok-sel">import</span> { useState, useEffect } <span class="tok-sel">from</span> <span class="tok-str">'react'</span>

<span class="tok-sel">export function</span> <span class="tok-prop">useFetch</span>(url) {
  <span class="tok-sel">const</span> [data, setData] = <span class="tok-prop">useState</span>(<span class="tok-val">null</span>)
  <span class="tok-sel">const</span> [loading, setLoading] = <span class="tok-prop">useState</span>(<span class="tok-val">true</span>)
  <span class="tok-sel">const</span> [error, setError] = <span class="tok-prop">useState</span>(<span class="tok-val">null</span>)

  <span class="tok-prop">useEffect</span>(() => {
    <span class="tok-sel">if</span> (!url) <span class="tok-sel">return</span>
    <span class="tok-sel">const</span> controller = <span class="tok-sel">new</span> <span class="tok-prop">AbortController</span>()
    <span class="tok-prop">fetch</span>(url, { signal: controller.signal })
      .then(res => res.<span class="tok-prop">json</span>())
      .then(setData)
      .<span class="tok-prop">catch</span>(err => {
        <span class="tok-sel">if</span> (err.name !== <span class="tok-str">'AbortError'</span>)
          <span class="tok-prop">setError</span>(err.message)
      })
      .<span class="tok-prop">finally</span>(() => <span class="tok-prop">setLoading</span>(<span class="tok-val">false</span>))
    <span class="tok-sel">return</span> () => controller.<span class="tok-prop">abort</span>()
  }, [url])

  <span class="tok-sel">return</span> { data, loading, error }
}

<span class="tok-num">// Usage</span>
<span class="tok-sel">const</span> { data, loading, error } = <span class="tok-prop">useFetch</span>(
  <span class="tok-str">'https://api.example.com/posts'</span>
)`
              }} />
            </pre>
            <div className="home-hero-code-footer">
              <span className="code-copied-badge">⎘ Copy snippet</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="home-marquee">
        <div className="home-marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="home-marquee-word">{w}</span>
          ))}
        </div>
      </div>

      {/* ── Categories ── */}
      <section className="home-cats">
        <div className="home-cats-header">
          <div className="home-cats-label">
            <span className="home-cats-label-line" />
            Component Library
          </div>
          <h2 className="home-cats-title">
            Everything in<br />one place.
          </h2>
        </div>

        <div className="home-cats-list">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.path} className="home-cat-row" onClick={() => navigate(cat.path)}
              style={{ '--c': cat.color }}>
              <span className="home-cat-row-num">{cat.num}</span>
              <div className="home-cat-row-body">
                <span className="home-cat-row-title">{cat.title}</span>
                <span className="home-cat-row-sub">{cat.sub}</span>
              </div>
              <div className="home-cat-row-arrow">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 15L15 3M15 3H7M15 3V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="home-process">
        <div className="home-process-label">
          <span className="home-cats-label-line" />
          The Process
        </div>
        <div className="home-process-grid">
          {[
            ['Pick', 'Browse 35+ components across 7 categories. Cards, forms, buttons, animations — all in one place.'],
            ['Customize', 'Tweak colors, radius, spacing, font weight, shadows, and animations with live controls.'],
            ['Copy', 'Hit copy. Get clean CSS or JSX. Drop it straight into your project. Done.'],
          ].map(([title, desc], i) => (
            <div key={title} className="home-process-step">
              <div className="home-process-step-num">0{i + 1}</div>
              <h3 className="home-process-step-title">{title}</h3>
              <p className="home-process-step-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home-cta-section">
        <div className="home-cta-inner">
          <p className="home-cta-label">Ready to build?</p>
          <h2 className="home-cta-title">Start customizing<br />right now.</h2>
          <button className="home-btn-primary large" onClick={() => navigate('/showcase/animated')}>
            Open Studio
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

    </div>
  )
}
