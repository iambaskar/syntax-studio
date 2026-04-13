import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../../styles/showcase/HooksShowcase.css'

const TAG_COLORS = {
  State: '#7c6fff', Perf: '#f59e0b', Async: '#38bdf8',
  DOM: '#22d3a5', Timer: '#e879f9', Util: '#fb923c',
}

const HOOK_META = {
  useLocalStorage:    { tag: 'State', desc: 'Persist state to localStorage with automatic JSON serialization. Falls back gracefully if localStorage is unavailable.' },
  useDebounce:        { tag: 'Perf',  desc: 'Delay updating a value until after a specified wait time. Essential for search inputs and API calls to avoid excessive requests.' },
  useFetch:           { tag: 'Async', desc: 'Fetch data from any URL with built-in loading, error, and abort handling. Automatically cancels on component unmount.' },
  useToggle:          { tag: 'State', desc: 'Simple boolean toggle with optional setter. Perfect for modals, dropdowns, and any on/off state.' },
  useClickOutside:    { tag: 'DOM',   desc: 'Detect clicks outside a referenced element. Use it to close dropdowns, modals, and popovers.' },
  useWindowSize:      { tag: 'DOM',   desc: 'Track the browser window dimensions in real time. Useful for responsive logic that CSS alone cannot handle.' },
  usePrevious:        { tag: 'State', desc: 'Store the previous value of any state or prop. Useful for animations, comparisons, and undo functionality.' },
  useCountdown:       { tag: 'Timer', desc: 'A countdown timer hook with start, pause, and reset controls. Returns remaining seconds and running status.' },
  useCopyToClipboard: { tag: 'Util',  desc: 'Copy any text to the clipboard with a timed "copied" feedback state. Works across all modern browsers.' },
  useOnScreen:        { tag: 'DOM',   desc: 'Detect when an element enters or exits the viewport using IntersectionObserver. Great for lazy loading and scroll animations.' },
}

const HOOK_CODE = {
  useLocalStorage: `import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])

  return [value, setValue]
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'dark')
const [user, setUser] = useLocalStorage('user', null)`,

  useDebounce: `import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Usage
const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 400)

useEffect(() => {
  if (debouncedSearch) fetchResults(debouncedSearch)
}, [debouncedSearch])`,

  useFetch: `import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()
    setLoading(true); setError(null)

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        return res.json()
      })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

// Usage
const { data, loading, error } = useFetch(
  'https://api.example.com/posts'
)`,

  useToggle: `import { useState, useCallback } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(v => !v), [])
  const setOn   = useCallback(() => setValue(true), [])
  const setOff  = useCallback(() => setValue(false), [])

  return [value, toggle, setOn, setOff]
}

// Usage
const [isOpen, toggle, open, close] = useToggle(false)

return (
  <>
    <button onClick={toggle}>Toggle Modal</button>
    {isOpen && <Modal onClose={close} />}
  </>
)`,

  useClickOutside: `import { useEffect } from 'react'

export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return
      handler(e)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

// Usage
const dropdownRef = useRef(null)
const [open, setOpen] = useState(false)
useClickOutside(dropdownRef, () => setOpen(false))

return (
  <div ref={dropdownRef}>
    <button onClick={() => setOpen(true)}>Open</button>
    {open && <Dropdown />}
  </div>
)`,

  useWindowSize: `import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handler = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

// Usage
const { width, height } = useWindowSize()
const isMobile = width < 768`,

  usePrevious: `import { useRef, useEffect } from 'react'

export function usePrevious(value) {
  const ref = useRef(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// Usage
const [count, setCount] = useState(0)
const prevCount = usePrevious(count)

return (
  <p>Now: {count}, Before: {prevCount ?? 'none'}</p>
)`,

  useCountdown: `import { useState, useEffect, useRef, useCallback } from 'react'

export function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s - 1)
      }, 1000)
    } else if (seconds === 0) {
      setRunning(false)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, seconds])

  const start = useCallback(() => setRunning(true), [])
  const pause = useCallback(() => setRunning(false), [])
  const reset = useCallback(() => {
    setRunning(false)
    setSeconds(initialSeconds)
  }, [initialSeconds])

  return { seconds, running, start, pause, reset }
}

// Usage
const { seconds, running, start, pause, reset } =
  useCountdown(60)`,

  useCopyToClipboard: `import { useState, useCallback } from 'react'

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    } catch {
      setCopied(false)
    }
  }, [resetDelay])

  return [copied, copy]
}

// Usage
const [copied, copy] = useCopyToClipboard()

return (
  <button onClick={() => copy('Hello world!')}>
    {copied ? '✓ Copied!' : 'Copy'}
  </button>
)`,

  useOnScreen: `import { useState, useEffect } from 'react'

export function useOnScreen(ref, threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isVisible
}

// Usage
const ref = useRef(null)
const isVisible = useOnScreen(ref, 0.2)

return (
  <div
    ref={ref}
    style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}
  >
    I fade in when visible
  </div>
)`,
}

// ── Code Panel ──────────────────────────────────────────────────────────────

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const highlight = (code) => {
  const out = []
  let i = 0
  const KW   = /^(import|export|from|const|let|var|function|return|if|else|try|catch|async|await|new|default|null|undefined|true|false|throw)(?![\w$])/
  const HOOK = /^(useState|useEffect|useRef|useCallback|useMemo|useContext|useReducer|useParams|useNavigate)(?![\w$])/
  const CMT  = /^(\/\/[^\n]*)/
  const STR1 = /^('(?:[^'\\\n]|\\.)*')/
  const STR2 = /^("(?:[^"\\\n]|\\.)*")/
  const NUM  = /^(\d+(?:\.\d+)?)/
  while (i < code.length) {
    const s = code.slice(i)
    let m
    if ((m = CMT.exec(s)))  { out.push(`<span class="hk-comment">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = STR1.exec(s))) { out.push(`<span class="hk-str">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = STR2.exec(s))) { out.push(`<span class="hk-str">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = HOOK.exec(s))) { out.push(`<span class="hk-hook">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = KW.exec(s)))   { out.push(`<span class="hk-kw">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = NUM.exec(s)))  { out.push(`<span class="hk-num">${esc(m[1])}</span>`); i += m[1].length }
    else { out.push(esc(code[i])); i++ }
  }
  return out.join('')
}

function CodePanel({ code, hookId }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="hook-code-panel">
      <div className="hook-code-panel-header">
        <div className="hook-code-panel-dots">
          <span className="hcp-dot red" /><span className="hcp-dot amber" /><span className="hcp-dot green" />
          <span className="hcp-filename">{hookId}.js</span>
        </div>
        <button className={`hcp-copy ${copied ? 'copied' : ''}`} onClick={copy}>
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      </div>
      <pre className="hook-code-panel-pre">
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </div>
  )
}

// ── Live Demos ──────────────────────────────────────────────────────────────

function DemoLocalStorage() {
  const [val, setVal] = useState(() => { try { return localStorage.getItem('ss_demo') || '' } catch { return '' } })
  const save = () => { try { localStorage.setItem('ss_demo', val) } catch {} }
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">Type something — it persists across page reloads</p>
      <div className="hook-demo-row">
        <input className="hook-demo-input" value={val} onChange={e => setVal(e.target.value)} placeholder="Type and save..." />
        <button className="hook-demo-btn" onClick={save}>Save</button>
      </div>
      <div className="hook-demo-badge">localStorage key: <code>ss_demo</code></div>
    </div>
  )
}

function DemoDebounce() {
  const [raw, setRaw] = useState('')
  const [debounced, setDebounced] = useState('')
  useEffect(() => { const t = setTimeout(() => setDebounced(raw), 500); return () => clearTimeout(t) }, [raw])
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">Debounced value updates 500ms after you stop typing</p>
      <input className="hook-demo-input" value={raw} onChange={e => setRaw(e.target.value)} placeholder="Type quickly..." />
      <div className="hook-demo-row" style={{ gap: '2rem' }}>
        <div><div className="hook-demo-label">Raw</div><div className="hook-demo-value">{raw || '—'}</div></div>
        <div><div className="hook-demo-label">Debounced</div><div className="hook-demo-value accent">{debounced || '—'}</div></div>
      </div>
    </div>
  )
}

function DemoFetch() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const load = () => {
    setLoading(true); setError(null); setData(null)
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(r => r.json()).then(setData).catch(e => setError(e.message)).finally(() => setLoading(false))
  }
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">Fetches from JSONPlaceholder API with loading & error states</p>
      <button className="hook-demo-btn" onClick={load} disabled={loading}>{loading ? 'Fetching...' : 'Fetch Post #1'}</button>
      {error && <div className="hook-demo-error">{error}</div>}
      {data && <div className="hook-demo-result"><div className="hook-demo-label">Title</div><div className="hook-demo-value">{data.title}</div></div>}
    </div>
  )
}

function DemoToggle() {
  const [on, setOn] = useState(false)
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">Toggle, setOn, and setOff — three controls from one hook</p>
      <div className="hook-demo-row">
        <button className="hook-demo-btn" onClick={() => setOn(v => !v)}>Toggle</button>
        <button className="hook-demo-btn outline" onClick={() => setOn(true)}>Set On</button>
        <button className="hook-demo-btn outline" onClick={() => setOn(false)}>Set Off</button>
      </div>
      <div className={`hook-demo-indicator ${on ? 'on' : 'off'}`}>{on ? 'ON' : 'OFF'}</div>
    </div>
  )
}

function DemoClickOutside() {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">Click outside the dropdown to close it</p>
      <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
        <button className="hook-demo-btn" onClick={() => setOpen(v => !v)}>Open Dropdown ▾</button>
        {open && (
          <div className="hook-demo-dropdown">
            {['Profile', 'Settings', 'Logout'].map(item => (
              <div key={item} className="hook-demo-dropdown-item">{item}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DemoWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  useEffect(() => {
    const h = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">Resize the browser window to see live updates</p>
      <div className="hook-demo-row" style={{ gap: '2rem' }}>
        <div><div className="hook-demo-label">Width</div><div className="hook-demo-value accent">{size.width}px</div></div>
        <div><div className="hook-demo-label">Height</div><div className="hook-demo-value accent">{size.height}px</div></div>
        <div><div className="hook-demo-label">Device</div><div className="hook-demo-value">{size.width < 768 ? 'Mobile' : size.width < 1024 ? 'Tablet' : 'Desktop'}</div></div>
      </div>
    </div>
  )
}

function DemoPrevious() {
  const [count, setCount] = useState(0)
  const prev = useRef(undefined)
  useEffect(() => { prev.current = count })
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">Tracks the previous value before each state update</p>
      <div className="hook-demo-row">
        <button className="hook-demo-btn outline" onClick={() => setCount(c => c - 1)}>−</button>
        <button className="hook-demo-btn outline" onClick={() => setCount(c => c + 1)}>+</button>
      </div>
      <div className="hook-demo-row" style={{ gap: '2rem' }}>
        <div><div className="hook-demo-label">Current</div><div className="hook-demo-value accent">{count}</div></div>
        <div><div className="hook-demo-label">Previous</div><div className="hook-demo-value">{prev.current ?? '—'}</div></div>
      </div>
    </div>
  )
}

function DemoCountdown() {
  const [seconds, setSeconds] = useState(30)
  const [running, setRunning] = useState(false)
  const ref = useRef()
  useEffect(() => {
    if (running && seconds > 0) { ref.current = setInterval(() => setSeconds(s => s - 1), 1000) }
    else { clearInterval(ref.current); if (seconds === 0) setRunning(false) }
    return () => clearInterval(ref.current)
  }, [running, seconds])
  const pct = (seconds / 30) * 100
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">Start, pause, and reset a countdown timer</p>
      <div className="hook-demo-countdown">
        <svg viewBox="0 0 80 80" className="hook-demo-ring">
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--line-2)" strokeWidth="4" />
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--ink)" strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
            strokeLinecap="round" transform="rotate(-90 40 40)"
            style={{ transition: 'stroke-dashoffset 1s linear' }} />
          <text x="40" y="45" textAnchor="middle" fill="var(--text)" fontSize="16" fontWeight="700" fontFamily="var(--mono)">{seconds}s</text>
        </svg>
      </div>
      <div className="hook-demo-row">
        <button className="hook-demo-btn" onClick={() => setRunning(true)} disabled={running || seconds === 0}>Start</button>
        <button className="hook-demo-btn outline" onClick={() => setRunning(false)} disabled={!running}>Pause</button>
        <button className="hook-demo-btn outline" onClick={() => { setRunning(false); setSeconds(30) }}>Reset</button>
      </div>
    </div>
  )
}

function DemoCopyClipboard() {
  const [copied, setCopied] = useState(false)
  const snippets = ['npm install react', 'npx create-react-app my-app', 'import React from "react"']
  const copy = (text) => { navigator.clipboard.writeText(text).then(() => { setCopied(text); setTimeout(() => setCopied(false), 2000) }) }
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">Click any snippet to copy it to your clipboard</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {snippets.map(s => (
          <div key={s} className={`hook-demo-snippet ${copied === s ? 'copied' : ''}`} onClick={() => copy(s)}>
            <code>{s}</code>
            <span>{copied === s ? '✓' : '⎘'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DemoOnScreen() {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div className="hook-demo">
      <p className="hook-demo-hint">The box below reacts when it enters the viewport</p>
      <div ref={ref} className={`hook-demo-visibility-box ${visible ? 'visible' : ''}`}>
        {visible ? '👁 Visible' : '⊘ Not visible'}
      </div>
    </div>
  )
}

const DEMOS = {
  useLocalStorage: DemoLocalStorage, useDebounce: DemoDebounce,
  useFetch: DemoFetch, useToggle: DemoToggle,
  useClickOutside: DemoClickOutside, useWindowSize: DemoWindowSize,
  usePrevious: DemoPrevious, useCountdown: DemoCountdown,
  useCopyToClipboard: DemoCopyClipboard, useOnScreen: DemoOnScreen,
}

export const HooksShowcase = () => {
  const { hookId } = useParams()
  const navigate = useNavigate()
  const active = hookId || 'useLocalStorage'

  useEffect(() => {
    if (!hookId) navigate('/hooks/useLocalStorage', { replace: true })
  }, [hookId, navigate])

  const meta = HOOK_META[active]
  const code = HOOK_CODE[active]
  const Demo = DEMOS[active]

  if (!meta || !Demo) return null

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Custom Hooks</h1>
          <p>10 production-ready hooks — live demo + copy the full code.</p>
        </div>
      </div>

      <div className="hooks-hook-header">
        <div>
          <div className="hooks-hook-name">
            <span className="hooks-hook-fn">fn</span>
            {active}
          </div>
          <p className="hooks-hook-desc">{meta.desc}</p>
        </div>
        <span className="hooks-hook-tag" style={{ background: `${TAG_COLORS[meta.tag]}18`, color: TAG_COLORS[meta.tag] }}>
          {meta.tag}
        </span>
      </div>

      <div className="hooks-body">
        <div className="hooks-demo-pane">
          <div className="hooks-demo-label">
            <span className="hooks-demo-dot" />
            Live Demo
          </div>
          <Demo />
        </div>

        <CodePanel code={code} hookId={active} />
      </div>
    </div>
  )
}
