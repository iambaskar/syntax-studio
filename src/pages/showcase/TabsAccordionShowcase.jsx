import React, { useState } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'
import '../../styles/showcase/TabsAccordionShowcase.css'

const VARIANTS = [
  { id: 'tabs', label: 'Tabs' },
  { id: 'accordion', label: 'Accordion' },
  { id: 'pills', label: 'Pill Tabs' },
]

const CONTROLS = [
  { key: 'bg', label: 'Preview BG', type: 'color' },
  { key: 'panelBg', label: 'Panel BG', type: 'color' },
  { key: 'accent', label: 'Accent', type: 'color' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 20, unit: 'px' },
  { key: 'speed', label: 'Anim Speed', type: 'select', options: ['0.15s', '0.25s', '0.35s', '0.5s'] },
]

const DEFAULT = { bg: '#0f0f12', panelBg: '#1c1c1f', accent: '#7c6fff', radius: '10', speed: '0.25s' }

const TABS = [
  { id: 'overview', label: 'Overview', content: 'A clean, minimal overview of your component. Describe the purpose, use cases, and key features here.' },
  { id: 'props', label: 'Props', content: 'Document your component props: name, type, default value, and description. Keep it concise and scannable.' },
  { id: 'examples', label: 'Examples', content: 'Show real-world usage examples with code snippets. Include edge cases and common patterns.' },
  { id: 'changelog', label: 'Changelog', content: 'Track version history, breaking changes, and new features. Helps users understand what changed.' },
]

const ACCORDION_ITEMS = [
  { id: 1, q: 'What is a design system?', a: 'A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.' },
  { id: 2, q: 'How do I customize components?', a: 'Use the Customizer Panel on the right to tweak colors, spacing, radius, and more. Changes reflect live in the preview.' },
  { id: 3, q: 'Can I use these in production?', a: 'Yes. All components are MIT licensed. Copy the CSS or JSX and drop it into your project.' },
  { id: 4, q: 'Is TypeScript supported?', a: 'The snippets are in JSX but converting to TypeScript is straightforward — just add prop types and you\'re good to go.' },
]

const generateJSX = (variant) => {
  const codes = {
    tabs: `const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <div>
      <div className="tabs">
        {tabs.map(t => (
          <button key={t.id}
            className={\`tab-btn \${active === t.id ? 'active' : ''}\`}
            onClick={() => setActive(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div key={active} className="tab-panel">
        {tabs.find(t => t.id === active)?.content}
      </div>
    </div>
  )
}`,
    accordion: `const Accordion = ({ items }) => {
  const [open, setOpen] = useState(null)
  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="accordion-item">
          <button
            className={\`accordion-trigger \${open === item.id ? 'open' : ''}\`}
            onClick={() => setOpen(open === item.id ? null : item.id)}>
            <span>{item.question}</span>
            <span className="accordion-icon">▾</span>
          </button>
          {open === item.id && (
            <div className="accordion-body">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}`,
    pills: `const PillTabs = ({ tabs }) => {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <div>
      <div className="pill-tabs">
        {tabs.map(t => (
          <button key={t.id}
            className={\`pill-btn \${active === t.id ? 'active' : ''}\`}
            onClick={() => setActive(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div key={active} className="tab-panel">
        {tabs.find(t => t.id === active)?.content}
      </div>
    </div>
  )
}`,
  }
  return codes[variant]
}

const generateCSS = (variant, v) => {
  const codes = {
    tabs: `.tabs { border-bottom: 1px solid #2a2a2e; display: flex; gap: 0; }
.tab-btn {
  padding: 0.6rem 1.1rem;
  background: none; border: none;
  color: #666; font-size: 0.82rem; font-weight: 500;
  cursor: pointer; border-bottom: 2px solid transparent;
  transition: color ${v.speed}, border-color ${v.speed};
}
.tab-btn.active { color: ${v.accent}; border-bottom-color: ${v.accent}; }
.tab-panel {
  padding: 1.25rem;
  background: ${v.panelBg};
  border-radius: 0 0 ${v.radius}px ${v.radius}px;
  animation: tab-fade ${v.speed} ease;
}
@keyframes tab-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`,
    accordion: `.accordion-item {
  border: 1px solid #2a2a2e;
  border-radius: ${v.radius}px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.accordion-trigger {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 0.85rem 1rem; background: ${v.panelBg};
  border: none; color: var(--text); font-size: 0.85rem; font-weight: 500;
  cursor: pointer; text-align: left;
  transition: background ${v.speed};
}
.accordion-trigger:hover { background: #222226; }
.accordion-icon { transition: transform ${v.speed}; }
.accordion-trigger.open .accordion-icon { transform: rotate(180deg); }
.accordion-body {
  padding: 0 1rem 1rem;
  font-size: 0.82rem; color: #888; line-height: 1.6;
  animation: acc-open ${v.speed} ease;
}
@keyframes acc-open { from { opacity: 0; } to { opacity: 1; } }`,
    pills: `.pill-tabs { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem; }
.pill-btn {
  padding: 0.4rem 1rem;
  border-radius: ${v.radius}px;
  border: 1px solid #2a2a2e;
  background: transparent; color: #666;
  font-size: 0.8rem; font-weight: 500; cursor: pointer;
  transition: all ${v.speed};
}
.pill-btn.active {
  background: ${v.accent}; color: #fff; border-color: ${v.accent};
}
.pill-btn:hover:not(.active) { background: #1e1e22; color: var(--text); }`,
  }
  return codes[variant]
}

export const TabsAccordionShowcase = () => {
  const [active, setActive] = useState('tabs')
  const [values, setValues] = useState(DEFAULT)
  const [activeTab, setActiveTab] = useState('overview')
  const [activePill, setActivePill] = useState('overview')
  const [openAcc, setOpenAcc] = useState(null)
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  const r = values.radius + 'px'
  const sp = values.speed

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Tabs & Accordion</h1>
          <p>Animated tab panels and expand/collapse accordions.</p>
        </div>
      </div>
      <div className="showcase-variant-tabs">
        {VARIANTS.map(v => (
          <button key={v.id} className={`variant-tab ${active === v.id ? 'active' : ''}`}
            onClick={() => setActive(v.id)}>{v.label}</button>
        ))}
      </div>
      <div className="showcase-body">
        <div className="showcase-preview" style={{ background: values.bg, alignItems: 'flex-start', padding: '2rem 1.5rem' }}>
          <div style={{ width: '100%', maxWidth: 520 }}>

            {active === 'tabs' && (
              <div>
                <div className="ta-tabs" style={{ borderColor: '#2a2a2e' }}>
                  {TABS.map(t => (
                    <button key={t.id} className={`ta-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                      style={activeTab === t.id ? { color: values.accent, borderBottomColor: values.accent } : {}}
                      onClick={() => setActiveTab(t.id)}>{t.label}</button>
                  ))}
                </div>
                <div key={activeTab} className="ta-tab-panel"
                  style={{ background: values.panelBg, borderRadius: `0 0 ${r} ${r}`, animationDuration: sp }}>
                  <p className="ta-panel-text">{TABS.find(t => t.id === activeTab)?.content}</p>
                </div>
              </div>
            )}

            {active === 'accordion' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {ACCORDION_ITEMS.map(item => (
                  <div key={item.id} className="ta-acc-item" style={{ borderRadius: r, background: values.panelBg }}>
                    <button className={`ta-acc-trigger ${openAcc === item.id ? 'open' : ''}`}
                      onClick={() => setOpenAcc(openAcc === item.id ? null : item.id)}>
                      <span>{item.q}</span>
                      <span className="ta-acc-icon" style={{ transition: `transform ${sp}`, transform: openAcc === item.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                    </button>
                    {openAcc === item.id && (
                      <div className="ta-acc-body" style={{ animationDuration: sp }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {active === 'pills' && (
              <div>
                <div className="ta-pills">
                  {TABS.map(t => (
                    <button key={t.id} className={`ta-pill-btn ${activePill === t.id ? 'active' : ''}`}
                      style={activePill === t.id ? { background: values.accent, borderColor: values.accent, borderRadius: r } : { borderRadius: r }}
                      onClick={() => setActivePill(t.id)}>{t.label}</button>
                  ))}
                </div>
                <div key={activePill} className="ta-tab-panel"
                  style={{ background: values.panelBg, borderRadius: r, animationDuration: sp }}>
                  <p className="ta-panel-text">{TABS.find(t => t.id === activePill)?.content}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCSS(active, values)} jsxCode={generateJSX(active)} />
      </div>
    </div>
  )
}
