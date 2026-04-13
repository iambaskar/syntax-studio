import React, { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { HooksShowcase } from './showcase/HooksShowcase'
import '../styles/showcase/ShowcaseLayout.css'

const HOOKS = [
  { id: 'useLocalStorage', tag: 'State' },
  { id: 'useDebounce', tag: 'Perf' },
  { id: 'useFetch', tag: 'Async' },
  { id: 'useToggle', tag: 'State' },
  { id: 'useClickOutside', tag: 'DOM' },
  { id: 'useWindowSize', tag: 'DOM' },
  { id: 'usePrevious', tag: 'State' },
  { id: 'useCountdown', tag: 'Timer' },
  { id: 'useCopyToClipboard', tag: 'Util' },
  { id: 'useOnScreen', tag: 'DOM' },
]

const TAG_COLORS = {
  State: '#7c6fff', Perf: '#f59e0b', Async: '#38bdf8',
  DOM: '#22d3a5', Timer: '#e879f9', Util: '#fb923c',
}

export const HooksLayout = () => {
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = HOOKS.filter(h =>
    h.id.toLowerCase().includes(search.toLowerCase()) ||
    h.tag.toLowerCase().includes(search.toLowerCase())
  )

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="showcase-layout">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={closeSidebar} />

      <aside className={`showcase-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-search-wrap">
          <span className="sidebar-search-icon">⌕</span>
          <input
            className="sidebar-search"
            placeholder="Search hooks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <p className="showcase-sidebar-label">Custom Hooks</p>

        {filtered.map(h => (
          <NavLink
            key={h.id}
            to={`/hooks/${h.id}`}
            onClick={closeSidebar}
            className={({ isActive }) => `showcase-sidebar-link hook-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-link-icon hooks-fn-icon">ƒ</span>
            <span className="sidebar-link-label sidebar-hook-name">{h.id}</span>
            <span className="sidebar-tag" style={{ background: `${TAG_COLORS[h.tag]}18`, color: TAG_COLORS[h.tag] }}>
              {h.tag}
            </span>
          </NavLink>
        ))}

        {filtered.length === 0 && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', padding: '0.75rem 1rem', fontFamily: 'var(--mono)' }}>
            No hooks found
          </p>
        )}
      </aside>

      <main className="showcase-main">
        <Routes>
          <Route path=":hookId" element={<HooksShowcase />} />
          <Route index element={<HooksShowcase />} />
        </Routes>
      </main>

      <button className="sidebar-hamburger" onClick={() => setSidebarOpen(o => !o)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>
    </div>
  )
}
