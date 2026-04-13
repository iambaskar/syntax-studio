import React from 'react'
import '../styles/footer.css'

export const Footer = () => (
  <footer className="footer">
    <p className="footer-text">
      Made with care <span className="footer-heart">♥</span> &copy;{' '}
      <a href="https://iamponbaskar.vercel.app/" target="_blank" rel="noreferrer" className="footer-link">
        ponbaskar.dev
      </a>
    </p>
  </footer>
)
