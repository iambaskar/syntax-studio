import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/Home/EssentialTemplate.css'

export const EssentialTemplate = ({ data }) => {
    const [copied, setCopied] = useState(false)
    const navigate = useNavigate()

    const handleCopy = () => {
        navigator.clipboard.writeText(data.snippet || `/* ${data.title} snippet */`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="essential-template">
            <div className="essential-template-left">
                {data.tag && <span className="essential-template-tag">{data.tag}</span>}
                <h1>{data.title}</h1>
            </div>
            <div className="essential-template-right">
                <p>{data.desc}</p>
                <div className="essential-template-actions">
                    <button
                        className="essential-template-learn"
                        onClick={() => navigate(data.route || '/recipes')}
                    >
                        Learn more <span className="essential-template-arrow">→</span>
                    </button>
                    <button
                        className={`essential-template-copy ${copied ? 'copied' : ''}`}
                        onClick={handleCopy}
                    >
                        {copied ? '✓ Copied' : 'Copy Snippet'}
                    </button>
                </div>
            </div>
        </div>
    )
}
