import React, { useState } from 'react'
import '../../styles/showcase/CustomizerPanel.css'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const highlight = (code) => {
  const tokens = []
  let i = 0
  const src = code

  const KW  = /^(import|export|from|const|let|var|function|return|if|else|try|catch|async|await|new|default|null|undefined|true|false|throw)(?![\w$])/
  const HOOK = /^(useState|useEffect|useRef|useCallback|useMemo|useContext|useReducer|useParams|useNavigate)(?![\w$])/
  const SEL  = /^([.#][\w-]+(?:\s*[.#][\w-]+)*)(?=\s*\{)/
  const PROP = /^([a-z][a-z-]+)(?=\s*:)/
  const HEX  = /^(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})(?![\w])/
  const NUM  = /^(\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|s|ms)?)/
  const STR1 = /^('(?:[^'\\\n]|\\.)*')/
  const STR2 = /^("(?:[^"\\\n]|\\.)*")/
  const CMT1 = /^(\/\/[^\n]*)/
  const CMT2 = /^(\/\*[\s\S]*?\*\/)/

  while (i < src.length) {
    const rest = src.slice(i)
    let m

    if ((m = CMT2.exec(rest))) { tokens.push(`<span class="c-comment">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = CMT1.exec(rest))) { tokens.push(`<span class="c-comment">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = STR1.exec(rest))) { tokens.push(`<span class="c-str">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = STR2.exec(rest))) { tokens.push(`<span class="c-str">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = HOOK.exec(rest))) { tokens.push(`<span class="c-hook">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = KW.exec(rest)))   { tokens.push(`<span class="c-kw">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = SEL.exec(rest)))  { tokens.push(`<span class="c-selector">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = HEX.exec(rest)))  { tokens.push(`<span class="c-hex">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = PROP.exec(rest))) { tokens.push(`<span class="c-prop">${esc(m[1])}</span>`); i += m[1].length }
    else if ((m = NUM.exec(rest)))  { tokens.push(`<span class="c-num">${esc(m[1])}</span>`); i += m[1].length }
    else { tokens.push(esc(src[i])); i++ }
  }

  return tokens.join('')
}

export const CustomizerPanel = ({ controls, values, onChange, cssCode, jsxCode, onReset }) => {
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState('css')
  const [open, setOpen] = useState(false)

  const activeCode = tab === 'css' ? cssCode : (jsxCode || cssCode)

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button className="cp-mobile-toggle" onClick={() => setOpen(o => !o)}>
        {open ? '✕ Close' : '⚙ Customize & Copy'}
      </button>

      <div className={`customizer-panel ${open ? 'mobile-open' : ''}`}>
        {/* Header */}
        <div className="cp-header">
          <span className="cp-header-title">
            <span className="cp-header-dot" />
            Customize
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {onReset && (
              <button className="cp-reset-btn" onClick={onReset}>↺ Reset</button>
            )}
            <button className="cp-mobile-close" onClick={() => setOpen(false)}>✕</button>
          </div>
        </div>

        {/* Controls */}
        <div className="cp-controls">
          {controls.map(ctrl => (
            <div key={ctrl.key} className="cp-row">
              <label className="cp-label">{ctrl.label}</label>
              <div className="cp-control">
                {ctrl.type === 'color' && (
                  <div className="cp-color-wrap">
                    <input type="color" value={values[ctrl.key]} onChange={e => onChange(ctrl.key, e.target.value)} />
                    <span className="cp-color-hex">{values[ctrl.key]}</span>
                  </div>
                )}
                {ctrl.type === 'range' && (
                  <div className="cp-range-wrap">
                    <input type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step || 1}
                      value={values[ctrl.key]} onChange={e => onChange(ctrl.key, e.target.value)} />
                    <span className="cp-range-val">{values[ctrl.key]}{ctrl.unit || ''}</span>
                  </div>
                )}
                {ctrl.type === 'select' && (
                  <select className="cp-select" value={values[ctrl.key]} onChange={e => onChange(ctrl.key, e.target.value)}>
                    {ctrl.options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
                  </select>
                )}
                {ctrl.type === 'toggle' && (
                  <button className={`cp-toggle ${values[ctrl.key] ? 'on' : ''}`} onClick={() => onChange(ctrl.key, !values[ctrl.key])}>
                    <span className="cp-toggle-thumb" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Code block */}
        <div className="cp-code-block">
          <div className="cp-code-header">
            <div className="cp-code-tabs">
              <button className={`cp-code-tab ${tab === 'css' ? 'active' : ''}`} onClick={() => setTab('css')}>CSS</button>
              {jsxCode && (
                <button className={`cp-code-tab ${tab === 'jsx' ? 'active' : ''}`} onClick={() => setTab('jsx')}>JSX</button>
              )}
            </div>
            <button className={`cp-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
              {copied ? '✓ Copied' : '⎘ Copy'}
            </button>
          </div>
          <pre className="cp-pre">
            <code className="cp-code" dangerouslySetInnerHTML={{ __html: highlight(activeCode) }} />
          </pre>
        </div>
      </div>
    </>
  )
}
