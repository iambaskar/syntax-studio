import React, { useState } from 'react'
import { CustomizerPanel } from '../../Components/showcase/CustomizerPanel'

const VARIANTS = [
  { id: 'login', label: 'Login' },
  { id: 'signup', label: 'Sign Up' },
  { id: 'contact', label: 'Contact' },
  { id: 'search', label: 'Search Bar' },
  { id: 'otp', label: 'OTP Input' },
]

const CONTROLS = [
  { key: 'bg', label: 'Form BG', type: 'color' },
  { key: 'pageBg', label: 'Page BG', type: 'color' },
  { key: 'inputBg', label: 'Input BG', type: 'color' },
  { key: 'accent', label: 'Accent Color', type: 'color' },
  { key: 'color', label: 'Text Color', type: 'color' },
  { key: 'borderColor', label: 'Input Border', type: 'color' },
  { key: 'radius', label: 'Border Radius', type: 'range', min: 0, max: 28, unit: 'px' },
  { key: 'inputHeight', label: 'Input Height', type: 'range', min: 36, max: 60, unit: 'px' },
  { key: 'outlined', label: 'Outlined Style', type: 'toggle' },
  { key: 'shadow', label: 'Form Shadow', type: 'toggle' },
]

const DEFAULT = { bg: '#ffffff', pageBg: '#f0f0f5', inputBg: '#f5f5f8', accent: '#7c6fff', color: '#111', borderColor: '#e0e0e8', radius: '12', inputHeight: '46', outlined: false, shadow: true }

const generateCode = (variant, v) => {
  const inp = v.outlined
    ? `border: 1.5px solid ${v.borderColor}; background: transparent;`
    : `border: 1px solid ${v.borderColor}; background: ${v.inputBg};`
  const base = `.form {
  background: ${v.bg}; color: ${v.color};
  padding: 2.5rem; border-radius: ${v.radius}px;
  width: 380px;${v.shadow ? '\n  box-shadow: 0 8px 40px rgba(0,0,0,0.10);' : ''}
}
.form-label { font-size: 0.8rem; font-weight: 600; color: ${v.color}; opacity: 0.7; margin-bottom: 0.4rem; display: block; }
.form-input {
  width: 100%; height: ${v.inputHeight}px; padding: 0 1rem;
  ${inp}
  border-radius: ${v.radius}px; color: ${v.color};
  font-family: inherit; font-size: 0.9rem; outline: none;
  transition: border-color 0.15s;
}
.form-input:focus { border-color: ${v.accent}; }
.form-btn {
  width: 100%; height: ${v.inputHeight}px;
  background: ${v.accent}; color: #fff;
  border: none; border-radius: ${v.radius}px;
  font-size: 0.95rem; font-weight: 700; cursor: pointer;
  transition: filter 0.15s;
}
.form-btn:hover { filter: brightness(1.1); }`
  return base
}

export const FormsShowcase = () => {
  const [active, setActive] = useState('login')
  const [values, setValues] = useState(DEFAULT)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const onChange = (key, val) => setValues(v => ({ ...v, [key]: val }))
  const onReset = () => setValues(DEFAULT)

  const wrap = {
    background: values.bg, color: values.color,
    padding: '2.5rem', borderRadius: `${values.radius}px`,
    boxShadow: values.shadow ? '0 8px 40px rgba(0,0,0,0.10)' : 'none',
    width: 380, maxWidth: '100%',
  }

  const inp = {
    width: '100%', height: `${values.inputHeight}px`, padding: '0 1rem',
    border: values.outlined ? `1.5px solid ${values.borderColor}` : `1px solid ${values.borderColor}`,
    background: values.outlined ? 'transparent' : values.inputBg,
    borderRadius: `${values.radius}px`, color: values.color,
    fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none',
    marginBottom: '1rem', boxSizing: 'border-box', display: 'block',
  }

  const lbl = { fontSize: '0.8rem', fontWeight: 600, color: values.color, opacity: 0.7, marginBottom: '0.4rem', display: 'block' }

  const btn = {
    width: '100%', height: `${values.inputHeight}px`,
    background: values.accent, color: '#fff',
    border: 'none', borderRadius: `${values.radius}px`,
    fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  }

  const handleOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]; next[i] = val; setOtp(next)
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus()
  }

  return (
    <div className="showcase-page">
      <div className="showcase-header">
        <div className="showcase-header-text">
          <h1>Forms Showcase</h1>
          <p>5 form layouts — customize inputs, colors, and sizing.</p>
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
        <div className="showcase-preview light" style={{ background: values.pageBg }}>
          {active === 'login' && (
            <div style={wrap}>
              <h2 style={{ marginBottom: '0.25rem', color: values.color, fontSize: '1.4rem', fontWeight: 700 }}>Welcome back</h2>
              <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.75rem', color: values.color }}>Sign in to your account</p>
              <label style={lbl}>Email address</label>
              <input style={inp} placeholder="you@example.com" readOnly />
              <label style={lbl}>Password</label>
              <input style={{ ...inp, marginBottom: '0.5rem' }} type="password" placeholder="••••••••" readOnly />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', color: values.accent, cursor: 'pointer', fontWeight: 600 }}>Forgot password?</span>
              </div>
              <button style={btn}>Sign In</button>
              <p style={{ fontSize: '0.82rem', opacity: 0.5, textAlign: 'center', marginTop: '1.25rem', color: values.color }}>
                No account? <span style={{ color: values.accent, fontWeight: 600, opacity: 1, cursor: 'pointer' }}>Sign up free</span>
              </p>
            </div>
          )}
          {active === 'signup' && (
            <div style={wrap}>
              <h2 style={{ marginBottom: '0.25rem', color: values.color, fontSize: '1.4rem', fontWeight: 700 }}>Create account</h2>
              <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.75rem', color: values.color }}>Start your free trial today</p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={lbl}>First name</label>
                  <input style={{ ...inp, width: '100%' }} placeholder="Alex" readOnly />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={lbl}>Last name</label>
                  <input style={{ ...inp, width: '100%' }} placeholder="Chen" readOnly />
                </div>
              </div>
              <label style={lbl}>Email</label>
              <input style={inp} placeholder="you@example.com" readOnly />
              <label style={lbl}>Password</label>
              <input style={inp} type="password" placeholder="Min. 8 characters" readOnly />
              <button style={btn}>Create Account</button>
            </div>
          )}
          {active === 'contact' && (
            <div style={wrap}>
              <h2 style={{ marginBottom: '0.25rem', color: values.color, fontSize: '1.4rem', fontWeight: 700 }}>Get in touch</h2>
              <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.75rem', color: values.color }}>We'll reply within 24 hours</p>
              <label style={lbl}>Name</label>
              <input style={inp} placeholder="Your name" readOnly />
              <label style={lbl}>Email</label>
              <input style={inp} placeholder="you@example.com" readOnly />
              <label style={lbl}>Message</label>
              <textarea style={{ ...inp, height: 110, padding: '0.75rem 1rem', resize: 'none' }} placeholder="How can we help?" readOnly />
              <button style={btn}>Send Message</button>
            </div>
          )}
          {active === 'search' && (
            <div style={{ ...wrap, width: 440 }}>
              <h2 style={{ marginBottom: '1.5rem', color: values.color, fontSize: '1.4rem', fontWeight: 700 }}>Search</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input style={{ ...inp, flex: 1, marginBottom: 0 }} placeholder="Search components..." readOnly />
                <button style={{ ...btn, width: 'auto', padding: '0 1.5rem', flexShrink: 0 }}>Search</button>
              </div>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Cards', 'Buttons', 'Forms', 'Animations'].map(tag => (
                  <span key={tag} style={{ fontSize: '0.78rem', padding: '0.25rem 0.75rem', borderRadius: 20, background: values.inputBg, border: `1px solid ${values.borderColor}`, color: values.color, cursor: 'pointer' }}>{tag}</span>
                ))}
              </div>
            </div>
          )}
          {active === 'otp' && (
            <div style={{ ...wrap, textAlign: 'center' }}>
              <h2 style={{ marginBottom: '0.25rem', color: values.color, fontSize: '1.4rem', fontWeight: 700 }}>Verify your email</h2>
              <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '2rem', color: values.color }}>Enter the 6-digit code sent to you@example.com</p>
              <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '1.75rem' }}>
                {otp.map((d, i) => (
                  <input
                    key={i} id={`otp-${i}`}
                    value={d} onChange={e => handleOtp(i, e.target.value)}
                    maxLength={1}
                    style={{ width: `${values.inputHeight}px`, height: `${values.inputHeight}px`, textAlign: 'center', fontSize: '1.3rem', fontWeight: 700, border: `1.5px solid ${d ? values.accent : values.borderColor}`, background: values.inputBg, borderRadius: `${values.radius}px`, color: values.color, fontFamily: 'inherit', outline: 'none' }}
                  />
                ))}
              </div>
              <button style={btn}>Verify Code</button>
              <p style={{ fontSize: '0.82rem', opacity: 0.5, marginTop: '1rem', color: values.color }}>
                Didn't receive it? <span style={{ color: values.accent, fontWeight: 600, opacity: 1, cursor: 'pointer' }}>Resend</span>
              </p>
            </div>
          )}
        </div>
        <CustomizerPanel controls={CONTROLS} values={values} onChange={onChange} onReset={onReset}
          cssCode={generateCode(active, values)}
          jsxCode={`import React, { useState } from 'react'\n\nexport const ${active.charAt(0).toUpperCase() + active.slice(1)}Form = () => {\n  const [form, setForm] = useState({})\n  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))\n\n  return (\n    <div className="form">\n      <h2>Form Title</h2>\n      <label className="form-label">Email</label>\n      <input className="form-input" name="email" onChange={handle} placeholder="you@example.com" />\n      <button className="form-btn" type="submit">Submit</button>\n    </div>\n  )\n}`} />
      </div>
    </div>
  )
}
