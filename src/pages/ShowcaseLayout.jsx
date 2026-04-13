import React, { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { AnimatedCards } from './showcase/AnimatedCards'
import { FormsShowcase } from './showcase/FormsShowcase'
import { ButtonsShowcase } from './showcase/ButtonsShowcase'
import { TypographyShowcase } from './showcase/TypographyShowcase'
import { BadgesShowcase } from './showcase/BadgesShowcase'
import { LoadersShowcase } from './showcase/LoadersShowcase'
import { ModalsShowcase } from './showcase/ModalsShowcase'
import { ToastsShowcase } from './showcase/ToastsShowcase'
import { TablesShowcase } from './showcase/TablesShowcase'
import { TabsAccordionShowcase } from './showcase/TabsAccordionShowcase'
import { AvatarsShowcase } from './showcase/AvatarsShowcase'
import '../styles/showcase/ShowcaseLayout.css'

const COMPONENTS = [
  { path: '/showcase/animated', label: 'Animated Cards', icon: '◈', tag: null },
  { path: '/showcase/forms', label: 'Forms', icon: '⊟', tag: null },
  { path: '/showcase/buttons', label: 'Buttons', icon: '▷', tag: null },
  { path: '/showcase/typography', label: 'Typography', icon: 'Aa', tag: null },
  { path: '/showcase/badges', label: 'Badges & Tags', icon: '◉', tag: null },
  { path: '/showcase/loaders', label: 'Loaders', icon: '◌', tag: null },
  { path: '/showcase/modals', label: 'Modals & Dialogs', icon: '▣', tag: 'New' },
  { path: '/showcase/toasts', label: 'Toasts', icon: '◫', tag: 'New' },
  { path: '/showcase/tables', label: 'Tables', icon: '⊞', tag: 'New' },
  { path: '/showcase/tabs', label: 'Tabs & Accordion', icon: '⊡', tag: 'New' },
  { path: '/showcase/avatars', label: 'Avatars', icon: '◎', tag: 'New' },
]

export const ShowcaseLayout = () => {
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = COMPONENTS.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <p className="showcase-sidebar-label">Components</p>

        {filtered.map(c => (
          <NavLink
            key={c.path}
            to={c.path}
            onClick={closeSidebar}
            className={({ isActive }) => `showcase-sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-link-icon">{c.icon}</span>
            <span className="sidebar-link-label">{c.label}</span>
            {c.tag && <span className={`sidebar-tag ${c.tag === 'Popular' ? 'popular' : 'new'}`}>{c.tag}</span>}
          </NavLink>
        ))}

        {filtered.length === 0 && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', padding: '0.75rem 1rem', fontFamily: 'var(--mono)' }}>
            No components found
          </p>
        )}
      </aside>

      <main className="showcase-main">
        <Routes>
          <Route path="animated" element={<AnimatedCards />} />
          <Route path="forms" element={<FormsShowcase />} />
          <Route path="buttons" element={<ButtonsShowcase />} />
          <Route path="typography" element={<TypographyShowcase />} />
          <Route path="badges" element={<BadgesShowcase />} />
          <Route path="loaders" element={<LoadersShowcase />} />
          <Route path="modals" element={<ModalsShowcase />} />
          <Route path="toasts" element={<ToastsShowcase />} />
          <Route path="tables" element={<TablesShowcase />} />
          <Route path="tabs" element={<TabsAccordionShowcase />} />
          <Route path="avatars" element={<AvatarsShowcase />} />
          <Route index element={<AnimatedCards />} />
        </Routes>
      </main>

      <button className="sidebar-hamburger" onClick={() => setSidebarOpen(o => !o)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>
    </div>
  )
}
