import React, { useState, useRef } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'
import '../../styles/showcase/AnimatedCards.css'

const VARIANTS = [
  { id: 'flip', label: 'Flip Card' },
  { id: 'glow', label: 'Neon Glow' },
  { id: 'slide', label: 'Slide Reveal' },
  { id: 'tilt', label: '3D Tilt' },
  { id: 'magnetic', label: 'Magnetic' },
]

const CONTROLS = [
  { key: 'bg', label: 'Card BG', type: 'color' },
  { key: 'accent', label: 'Accent / Glow', type: 'color' },
  { key: 'color', label: 'Text Color', type: 'color' },
  { key: 'backBg', label: 'Back / Overlay BG', type: 'color' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 32, unit: 'px' },
  { key: 'duration', label: 'Duration', type: 'range', min: 1, max: 12, unit: '00ms' },
  { key: 'intensity', label: 'Effect Intensity', type: 'range', min: 5, max: 40, unit: 'px' },
  { key: 'easing', label: 'Easing', type: 'select', options: ['ease', 'ease-in-out', 'cubic-bezier(0.34,1.56,0.64,1)', 'linear'] },
]

const DEFAULT = { bg: '#13131a', accent: '#7c6fff', color: '#f0f0f0', backBg: '#7c6fff', radius: '16', duration: '4', intensity: '20', easing: 'ease' }

const generateCode = (variant, v) => {
  const dur = `${v.duration * 100}ms`
  const ease = v.easing
  const codes = {
    flip: `.flip-card { width: 260px; height: 320px; perspective: 1000px; cursor: pointer; }
.flip-inner {
  width: 100%; height: 100%; position: relative;
  transform-style: preserve-3d;
  transition: transform ${dur} ${ease};
}
.flip-card:hover .flip-inner { transform: rotateY(180deg); }
.flip-front, .flip-back {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  border-radius: ${v.radius}px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding: 2rem;
}
.flip-front { background: ${v.bg}; color: ${v.color}; border: 1px solid ${v.accent}33; }
.flip-back { background: ${v.backBg}; color: #fff; transform: rotateY(180deg); }`,
    glow: `.glow-card {
  padding: 2rem; border-radius: ${v.radius}px;
  background: ${v.bg}; color: ${v.color};
  border: 1px solid ${v.accent}44;
  transition: box-shadow ${dur} ${ease}, border-color ${dur} ${ease}, transform ${dur} ${ease};
  cursor: pointer;
}
.glow-card:hover {
  box-shadow: 0 0 ${v.intensity}px ${v.accent}, 0 0 ${parseInt(v.intensity) * 2}px ${v.accent}55;
  border-color: ${v.accent};
  transform: translateY(-4px);
}`,
    slide: `.slide-card {
  width: 260px; height: 320px; border-radius: ${v.radius}px;
  background: ${v.bg}; color: ${v.color};
  overflow: hidden; position: relative; cursor: pointer;
  border: 1px solid ${v.accent}22;
}
.slide-overlay {
  position: absolute; bottom: -100%; left: 0;
  width: 100%; height: 100%;
  background: ${v.backBg};
  transition: bottom ${dur} ${ease};
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 2rem; text-align: center;
}
.slide-card:hover .slide-overlay { bottom: 0; }`,
    tilt: `.tilt-card {
  padding: 2rem; border-radius: ${v.radius}px;
  background: ${v.bg}; color: ${v.color};
  border: 1px solid ${v.accent}33;
  transform-style: preserve-3d;
  transition: transform 0.1s linear, box-shadow 0.1s linear;
  cursor: pointer; will-change: transform;
}
/* JS required — add mousemove on card: */
/* const x = (e.offsetX / w - 0.5) * ${v.intensity}
   const y = (e.offsetY / h - 0.5) * ${v.intensity}
   card.style.transform = \`rotateX(\${-y}deg) rotateY(\${x}deg) scale(1.04)\` */`,
    magnetic: `.magnetic-btn {
  padding: 1rem 2.5rem; border-radius: ${v.radius}px;
  background: ${v.bg}; color: ${v.color};
  border: 1px solid ${v.accent}55;
  font-weight: 700; cursor: pointer;
  transition: transform 0.15s ${ease}, box-shadow 0.15s ${ease};
  will-change: transform;
}
/* JS: track mouse proximity and offset element position */
/* const dx = (mouseX - btnCenterX) * 0.35
   const dy = (mouseY - btnCenterY) * 0.35
   btn.style.transform = \`translate(\${dx}px, \${dy}px)\` */`,
  }
  return codes[variant]
}

const TiltCard = ({ values }) => {
  const ref = useRef()
  const move = e => {
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * values.intensity
    const y = ((e.clientY - top) / height - 0.5) * values.intensity
    ref.current.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) scale(1.04)`
    ref.current.style.boxShadow = `${-x * 0.5}px ${y * 0.5}px 30px ${values.accent}44`
  }
  const leave = () => {
    ref.current.style.transform = 'rotateX(0) rotateY(0) scale(1)'
    ref.current.style.boxShadow = 'none'
  }
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave}
      style={{ background: values.bg, color: values.color, border: `1px solid ${values.accent}33`, borderRadius: `${values.radius}px`, padding: '2rem', minWidth: 240, transformStyle: 'preserve-3d', transition: 'transform 0.1s linear', cursor: 'pointer' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>◈</div>
      <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>3D Tilt Card</div>
      <div style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: 1.7 }}>Move your cursor over this card to see the 3D perspective tilt effect.</div>
      <div style={{ marginTop: '1.25rem', height: 3, borderRadius: 2, background: values.accent, width: '40%' }} />
    </div>
  )
}

const MagneticBtn = ({ values }) => {
  const ref = useRef()
  const move = e => {
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (left + width / 2)) * 0.35
    const dy = (e.clientY - (top + height / 2)) * 0.35
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`
  }
  const leave = () => { ref.current.style.transform = 'translate(0,0)' }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      <p style={{ color: '#555', fontSize: '0.82rem' }}>Hover near the button</p>
      <button ref={ref} onMouseMove={move} onMouseLeave={leave}
        style={{ padding: '1rem 2.5rem', borderRadius: `${values.radius}px`, background: values.bg, color: values.color, border: `1px solid ${values.accent}55`, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.95rem', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}>
        Magnetic Button
      </button>
    </div>
  )
}

export const AnimatedCards = () => {
  const [active, setActive] = useState('flip')
  const [values, setValues] = useState(DEFAULT)
  const [flipped, setFlipped] = useState(false)
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Animated Cards</h1>
          <p>5 animation styles — tune timing, easing, and intensity.</p>
        </div>
      </div>
      <div className="showcase-variant-tabs">
        {VARIANTS.map(v => (
          <button key={v.id} className={`variant-tab ${active === v.id ? 'active' : ''}`} onClick={() => { setActive(v.id); setFlipped(false) }}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="showcase-body">
        <div className="showcase-preview" style={{ background: '#0a0a0f', minHeight: 400 }}>
          {active === 'flip' && (
            <div onClick={() => setFlipped(f => !f)} style={{ width: 260, height: 320, perspective: 1000, cursor: 'pointer' }}>
              <div style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', transition: `transform ${values.duration * 100}ms ${values.easing}`, transform: flipped ? 'rotateY(180deg)' : 'none' }}>
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: values.bg, color: values.color, border: `1px solid ${values.accent}33`, borderRadius: `${values.radius}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✦</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Front Side</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '0.5rem' }}>Click to flip →</div>
                </div>
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: values.backBg, color: '#fff', borderRadius: `${values.radius}px`, transform: 'rotateY(180deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>◈</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Back Side</div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.85, marginTop: '0.5rem' }}>Hidden content revealed!</div>
                </div>
              </div>
            </div>
          )}
          {active === 'glow' && (
            <div className="anim-glow-card" style={{ background: values.bg, color: values.color, border: `1px solid ${values.accent}44`, borderRadius: `${values.radius}px`, padding: '2rem', minWidth: 240, '--glow': values.accent, '--glow-size': `${values.intensity}px`, '--dur': `${values.duration * 100}ms`, '--ease': values.easing }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⬡</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Neon Glow Card</div>
              <div style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: 1.7 }}>Hover to activate the neon glow effect around this card.</div>
              <div style={{ marginTop: '1.25rem', height: 3, borderRadius: 2, background: values.accent, width: '40%' }} />
            </div>
          )}
          {active === 'slide' && (
            <div className="anim-slide-card" style={{ background: values.bg, color: values.color, borderRadius: `${values.radius}px`, border: `1px solid ${values.accent}22`, width: 260, height: 320, overflow: 'hidden', position: 'relative' }}>
              <div style={{ padding: '2rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>▦</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Slide Reveal</div>
                <div style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: 1.7 }}>Hover to reveal the hidden overlay below.</div>
              </div>
              <div className="anim-slide-overlay" style={{ background: values.backBg, '--dur': `${values.duration * 100}ms`, '--ease': values.easing }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>Hidden Content</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '0.5rem', textAlign: 'center', color: '#fff' }}>Slides up smoothly on hover!</div>
              </div>
            </div>
          )}
          {active === 'tilt' && <TiltCard values={values} />}
          {active === 'magnetic' && <MagneticBtn values={values} />}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCode(active, values)}
          jsxCode={`// ${active} — see CSS tab for styles\nexport const AnimatedCard = () => {\n  // Paste the CSS into your stylesheet\n  // then use the JSX structure below:\n  return (\n    <div className="${active}-card">\n      <div className="${active}-inner">\n        {/* your content */}\n      </div>\n    </div>\n  )\n}`} />
      </div>
    </div>
  )
}
