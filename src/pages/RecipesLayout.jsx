import React, { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { RecipeShowcase } from './showcase/RecipeShowcase'
import '../styles/showcase/ShowcaseLayout.css'

export const RECIPES = [
  { id: 'login-form',      label: 'Login Form',       tag: 'Auth',    icon: '⊙' },
  { id: 'signup-form',     label: 'Signup Form',      tag: 'Auth',    icon: '⊕' },
  { id: 'contact-form',    label: 'Contact Form',     tag: 'Forms',   icon: '✉' },
  { id: 'multistep-form',  label: 'Multi-step Form',  tag: 'Forms',   icon: '⊞' },
  { id: 'search-filter',   label: 'Search & Filter',  tag: 'UX',      icon: '⌕' },
]

const TAG_COLORS = {
  Auth: '#7c6fff', Forms: '#22d3a5', UX: '#f59e0b',
}

export const RecipesLayout = () => {
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = RECIPES.filter(r =>
    r.label.toLowerCase().includes(search.toLowerCase()) ||
    r.tag.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Search recipes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <p className="showcase-sidebar-label">Form Recipes</p>

        {filtered.map(r => (
          <NavLink
            key={r.id}
            to={`/recipes/${r.id}`}
            onClick={closeSidebar}
            className={({ isActive }) => `showcase-sidebar-link hook-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-link-icon">{r.icon}</span>
            <span className="sidebar-link-label">{r.label}</span>
            <span className="sidebar-tag" style={{ background: `${TAG_COLORS[r.tag]}18`, color: TAG_COLORS[r.tag] }}>
              {r.tag}
            </span>
          </NavLink>
        ))}

        {filtered.length === 0 && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', padding: '0.75rem 1rem', fontFamily: 'var(--mono)' }}>
            No recipes found
          </p>
        )}
      </aside>

      <main className="showcase-main">
        <Routes>
          <Route path=":recipeId" element={<RecipeShowcase />} />
          <Route index element={<RecipeShowcase />} />
        </Routes>
      </main>

      <button className="sidebar-hamburger" onClick={() => setSidebarOpen(o => !o)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>
    </div>
  )
}
