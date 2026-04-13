import React, { useState } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'

const VARIANTS = [
  { id: 'heading', label: 'Headings' },
  { id: 'body', label: 'Body Text' },
  { id: 'quote', label: 'Blockquote' },
  { id: 'code', label: 'Code Block' },
  { id: 'gradient', label: 'Gradient Text' },
]

const CONTROLS = [
  { key: 'color', label: 'Text Color', type: 'color' },
  { key: 'bg', label: 'Background', type: 'color' },
  { key: 'accent', label: 'Accent Color', type: 'color' },
  { key: 'gradEnd', label: 'Gradient End', type: 'color' },
  { key: 'fontSize', label: 'Base Font Size', type: 'range', min: 12, max: 22, unit: 'px' },
  { key: 'lineHeight', label: 'Line Height', type: 'range', min: 12, max: 24, step: 1, unit: 'x0.1' },
  { key: 'weight', label: 'Font Weight', type: 'select', options: ['300', '400', '500', '600', '700', '800', '900'] },
  { key: 'family', label: 'Font Family', type: 'select', options: ['Poppins, sans-serif', 'Georgia, serif', 'monospace', 'system-ui, sans-serif'] },
  { key: 'tracking', label: 'Letter Spacing', type: 'range', min: -2, max: 10, unit: 'x0.01em' },
]

const DEFAULT = { color: '#f0f0f0', bg: '#0f0f12', accent: '#7c6fff', gradEnd: '#e879f9', fontSize: '16', lineHeight: '17', weight: '400', family: 'Poppins, sans-serif', tracking: '0' }

const generateCode = (variant, v) => {
  const lh = (v.lineHeight * 0.1).toFixed(1)
  const ls = v.tracking !== '0' ? `letter-spacing: ${v.tracking * 0.01}em;` : ''
  const codes = {
    heading: `h1, h2, h3, h4 {
  font-family: ${v.family};
  color: ${v.color};
  ${ls}
}
h1 { font-size: 3rem; font-weight: 800; line-height: 1.1; }
h2 { font-size: 2rem; font-weight: 700; line-height: 1.2; }
h3 { font-size: 1.4rem; font-weight: 600; line-height: 1.3; }
h4 { font-size: 1.1rem; font-weight: 600; line-height: 1.4; }`,
    body: `p {
  font-family: ${v.family};
  font-size: ${v.fontSize}px;
  font-weight: ${v.weight};
  line-height: ${lh};
  color: ${v.color};
  ${ls}
}
.text-muted { opacity: 0.55; }
.text-sm { font-size: ${parseInt(v.fontSize) - 2}px; }
.text-lg { font-size: ${parseInt(v.fontSize) + 4}px; }`,
    quote: `blockquote {
  border-left: 3px solid ${v.accent};
  padding: 1rem 1.5rem;
  margin: 0;
  background: ${v.accent}0d;
  border-radius: 0 8px 8px 0;
  font-family: ${v.family};
  font-size: ${v.fontSize}px;
  color: ${v.color};
  line-height: ${lh};
  font-style: italic;
}
blockquote cite {
  display: block; margin-top: 0.75rem;
  font-size: 0.82rem; opacity: 0.6; font-style: normal;
}`,
    code: `.code-block {
  background: #0a0a0c;
  border: 1px solid #1e1e22;
  border-radius: 10px;
  overflow: hidden;
}
.code-header {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.65rem 1rem;
  border-bottom: 1px solid #1e1e22;
}
.code-dot { width: 10px; height: 10px; border-radius: 50%; }
.code-body {
  padding: 1.25rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: ${v.color};
  line-height: 1.75;
}`,
    gradient: `.gradient-text {
  font-family: ${v.family};
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, ${v.accent}, ${v.gradEnd});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.15;
}`,
  }
  return codes[variant]
}

export const TypographyShowcase = () => {
  const [active, setActive] = useState('heading')
  const [values, setValues] = useState(DEFAULT)
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  const lh = (values.lineHeight * 0.1).toFixed(1)
  const ls = values.tracking !== '0' ? `${values.tracking * 0.01}em` : 'normal'
  const textBase = { color: values.color, fontFamily: values.family, letterSpacing: ls }

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Typography</h1>
          <p>Headings, body, quotes, code blocks — tune every text property.</p>
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
        <div className="showcase-preview" style={{ background: values.bg, alignItems: 'flex-start', padding: '2.5rem' }}>
          {active === 'heading' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
              {[['3rem', '800', 'The quick brown fox'], ['2rem', '700', 'Jumps over the lazy dog'], ['1.4rem', '600', 'Typography matters in design'], ['1.1rem', '600', 'Every detail counts']].map(([size, weight, text]) => (
                <div key={size} style={{ ...textBase, fontSize: size, fontWeight: weight, lineHeight: 1.15 }}>{text}</div>
              ))}
            </div>
          )}
          {active === 'body' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: 520 }}>
              <p style={{ ...textBase, fontSize: `${values.fontSize}px`, fontWeight: values.weight, lineHeight: lh }}>
                Good typography is invisible. It guides the reader through the content without drawing attention to itself. The best typographic choices feel natural and effortless.
              </p>
              <p style={{ ...textBase, fontSize: `${parseInt(values.fontSize) - 2}px`, fontWeight: values.weight, lineHeight: lh, opacity: 0.55 }}>
                Muted text — used for secondary information, captions, and supporting content that shouldn't compete with the primary message.
              </p>
              <p style={{ ...textBase, fontSize: `${parseInt(values.fontSize) + 4}px`, fontWeight: values.weight, lineHeight: lh }}>
                Large text — ideal for lead paragraphs and introductory content.
              </p>
            </div>
          )}
          {active === 'quote' && (
            <div style={{ borderLeft: `3px solid ${values.accent}`, padding: '1rem 1.5rem', background: `${values.accent}0d`, borderRadius: '0 8px 8px 0', maxWidth: 480 }}>
              <p style={{ ...textBase, fontSize: `${values.fontSize}px`, fontWeight: values.weight, lineHeight: lh, fontStyle: 'italic' }}>
                "Design is not just what it looks like and feels like. Design is how it works."
              </p>
              <cite style={{ ...textBase, display: 'block', marginTop: '0.75rem', fontSize: '0.82rem', opacity: 0.6, fontStyle: 'normal' }}>— Steve Jobs</cite>
            </div>
          )}
          {active === 'code' && (
            <div style={{ background: '#0a0a0c', border: '1px solid #1e1e22', borderRadius: 10, overflow: 'hidden', width: '100%', maxWidth: 480 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1rem', borderBottom: '1px solid #1e1e22' }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                <span style={{ fontSize: '0.75rem', color: '#555', marginLeft: '0.5rem', fontFamily: 'monospace' }}>styles.css</span>
              </div>
              <pre style={{ padding: '1.25rem', margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '0.85rem', color: values.color, lineHeight: 1.75, overflowX: 'auto' }}>
                <code>{`.gradient-text {\n  background: linear-gradient(\n    135deg,\n    ${values.accent},\n    ${values.gradEnd}\n  );\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}`}</code>
              </pre>
            </div>
          )}
          {active === 'gradient' && (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ fontFamily: values.family, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, background: `linear-gradient(135deg, ${values.accent}, ${values.gradEnd})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.15, letterSpacing: ls }}>
                Beautiful Gradient Text
              </div>
              <div style={{ ...textBase, fontSize: `${values.fontSize}px`, opacity: 0.5, marginTop: '1rem', lineHeight: lh }}>
                Combine two colors for stunning gradient typography effects.
              </div>
            </div>
          )}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCode(active, values)}
          jsxCode={`export const ${active.charAt(0).toUpperCase() + active.slice(1)}Text = ({ children }) => (\n  <${active === 'heading' ? 'h1' : active === 'quote' ? 'blockquote' : active === 'code' ? 'pre' : 'p'}\n    className="${active}-text"\n  >\n    {children}\n  </${active === 'heading' ? 'h1' : active === 'quote' ? 'blockquote' : active === 'code' ? 'pre' : 'p'}>\n)`} />
      </div>
    </div>
  )
}
