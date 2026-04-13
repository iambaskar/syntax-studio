import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import '../styles/navbar.css'
import { AIGenerator } from './AIGenerator'

const THEMES = [
  { id: 'dark',   label: 'Dark',   color: '#080809', dot: '#7c6fff' },
  { id: 'purple', label: 'Purple', color: '#a78bfa', dot: '#a78bfa', dotted: true },
  { id: 'ocean',  label: 'Ocean',  color: '#38bdf8', dot: '#38bdf8', dotted: true },
]

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('ss-theme') || 'dark')
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ss-theme', theme)
  }, [theme])

  return (
    <>
      {/* ── Theme bar ── */}
      <div className="theme-bar">
        <span className="theme-bar-label">Theme</span>
        <div className="theme-bar-options">
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`theme-btn ${theme === t.id ? 'active' : ''}`}
              onClick={() => setTheme(t.id)}
              title={t.label}
            >
              <span
                className={`theme-btn-swatch ${t.dotted ? 'dotted' : ''}`}
                style={{ background: t.dotted ? 'transparent' : t.color, borderColor: t.dot }}
              />
              <span className="theme-btn-label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Navbar ── */}
      <nav className={`nav-bar ${scrolled ? 'scrolled' : ''}`}>
        <Link to='/' className="nav-logo">
          <span className="nav-logo-box">
            <span className="nav-logo-syntax">Syntax</span>
            <span className="nav-logo-studio">Studio</span>
          </span>
        </Link>

        <ul className="nav-links">
          {[
            ['/', 'Home', true],
            ['/showcase', 'Components', false],
            ['/hooks', 'Custom Hooks', false],
            // ['/recipes', 'Recipes', false],
          ].map(([to, label, end]) => (
            <li key={to}>
              <NavLink to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <Link to="/showcase" className="nav-cta">
            <span>Open Studio</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
            <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {[
          ['/', 'Home', true],
          ['/showcase', 'Components', false],
          ['/hooks', 'Custom Hooks', false],
          ['/recipes', 'Recipes', false],
        ].map(([to, label, end], i) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => `nav-mobile-link ${isActive ? 'active' : ''}`}
            style={{ '--i': i }}>
            <span className="nav-mobile-num">0{i + 1}</span>
            {label}
          </NavLink>
        ))}
        {/* Theme switcher in mobile menu */}
        <div className="nav-mobile-themes">
          <span className="nav-mobile-themes-label">Theme</span>
          <div className="nav-mobile-themes-row">
            {THEMES.map(t => (
              <button
                key={t.id}
                className={`theme-btn ${theme === t.id ? 'active' : ''}`}
                onClick={() => setTheme(t.id)}
              >
                <span
                  className={`theme-btn-swatch ${t.dotted ? 'dotted' : ''}`}
                  style={{ background: t.dotted ? 'transparent' : t.color, borderColor: t.dot }}
                />
                <span className="theme-btn-label">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
        <Link to="/showcase" className="nav-mobile-cta">Open Studio →</Link>
      </div>
    </>
  )
}
