import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import '../styles/aigenerator.css'

const SUGGESTIONS = [
  'A glassmorphism card with hover glow',
  'An animated gradient button',
  'A dark mode toggle switch',
  'A skeleton loader for a profile card',
]

export const AIGenerator = ({ onClose }) => {
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => { textareaRef.current?.focus() }, [])

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const generate = async () => {
    if (!prompt.trim() || loading) return
    setLoading(true)
    setOutput('')
    setError('')
    try {
      const { data } = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are a UI code generator. Output only clean, production-ready JSX + CSS. No explanations, no markdown fences — just the raw code with a comment separating JSX and CSS sections.',
            },
            { role: 'user', content: `Generate a React component: ${prompt}` },
          ],
          max_tokens: 1024,
        },
        { headers: { Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` } }
      )
      setOutput(data.choices[0].message.content)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Something went wrong. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="ai-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ai-panel">
        {/* Header */}
        <div className="ai-header">
          <div className="ai-header-left">
            <span className="ai-badge">AI</span>
            <span className="ai-title">Code Generator</span>
          </div>
          <button className="ai-close" onClick={onClose}>✕</button>
        </div>

        {/* Prompt */}
        <div className="ai-body">
          <textarea
            ref={textareaRef}
            className="ai-textarea"
            placeholder="Describe the component you want…"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && e.metaKey && generate()}
            rows={3}
          />

          {/* Suggestions */}
          <div className="ai-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="ai-chip" onClick={() => setPrompt(s)}>{s}</button>
            ))}
          </div>

          <button className="ai-generate-btn" onClick={generate} disabled={loading || !prompt.trim()}>
            {loading ? <span className="ai-spinner" /> : 'Generate'}
          </button>
        </div>

        {/* Output */}
        {(output || error) && (
          <div className="ai-output-wrap">
            {error
              ? <p className="ai-error">{error}</p>
              : <>
                  <div className="ai-output-bar">
                    <span className="ai-output-label">Output</span>
                    <button className="ai-copy-btn" onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
                  </div>
                  <pre className="ai-output"><code>{output}</code></pre>
                </>
            }
          </div>
        )}
      </div>
    </div>
  )
}
