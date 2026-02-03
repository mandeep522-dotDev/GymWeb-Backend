import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="app-footer w-[100%]">
      <div className="footer-container">
        <div className="brand-and-nav">
          <div className="brand">Gen-Gym</div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="social-and-credit">
          <div className="social-icons" aria-label="social media">
            <a className="social-link" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2v-2.9h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.4.7-1.4 1.4v1.7h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12" />
              </svg>
            </a>

            <a className="social-link" href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M22 5.8c-.6.3-1.2.6-1.9.7.7-.4 1.2-1 1.5-1.7-.7.4-1.5.6-2.3.8C18.5 4.8 17.6 4 16.4 4c-1.8 0-3.2 1.7-2.8 3.4-2.4-.1-4.6-1.3-6-3.1-.9 1.5-.4 3.5 1.1 4.5-.5 0-1-.2-1.4-.4v.1c0 1.6 1.1 3 2.6 3.3-.5.1-1 .2-1.6.1.4 1.3 1.6 2.3 3 2.3-1.1.9-2.4 1.5-3.9 1.5H6c2.2 1.4 4.7 2.1 7.3 2.1 8.8 0 13.6-7.3 13.6-13.6v-.6c.9-.7 1.6-1.6 2.2-2.6-.8.4-1.6.7-2.5.8" />
              </svg>
            </a>

            <a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zm6.4-2.6a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
              </svg>
            </a>

            <a className="social-link" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M12 .5A12 12 0 0 0 0 12.7c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.8-1.2.6-1.1 1.6-1 .9-1.7-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.4-2.4 1.1-3.2-.1-.3-.5-1.6.1-3.4 0 0 .9-.3 3 .1a10.2 10.2 0 0 1 5.5 0c2.1-.4 3-.1 3-.1.6 1.8.2 3 .1 3.4.7.9 1.1 2 1.1 3.2 0 4.5-2.7 5.5-5.3 5.8.9.8 1.6 2.1 1.6 4.3v6.3c0 .3.2.7.8.6A12 12 0 0 0 24 .5 12 12 0 0 0 12 .5z" />
              </svg>
            </a>
          </div>

          <div className="credit">
            <span>Created by Mandeep</span>
            <span className="sep">·</span>
            <span>© {year} Gen-Gym. All rights reserved.</span>
          </div>
        </div>
      </div>

      <style>{`
        .app-footer{background:#0f1724;color:#d1d5db;padding:20px 12px;font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial}
        .footer-container{max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px}
        .brand{font-weight:700;font-size:1.2rem}
        .nav-links{list-style:none;padding:0;margin:0;display:flex;gap:12px}
        .nav-links a{color:inherit;text-decoration:none;opacity:.9;transition:opacity .18s, transform .18s}
        .nav-links a:hover{opacity:1;transform:translateY(-2px)}
        .social-icons{display:flex;gap:12px;align-items:center; justify-content:center}
        .social-link{display:inline-flex;width:36px;height:36px;align-items:center;justify-content:center;border-radius:8px;background:rgba(255,255,255,0.03);color:inherit;transition:transform .18s, background .18s, color .18s}
        .social-link svg{display:block}
        .social-link:hover{transform:translateY(-4px) scale(1.07);background:linear-gradient(135deg,#06b6d4 0%,#3b82f6 100%);color:#fff}
        .credit{display:flex;gap:8px;align-items:center;font-size:.92rem;color:#9ca3af}
        .sep{opacity:.6}
        @media (max-width:600px){.footer-container{flex-direction:column;align-items:flex-start}.nav-links{flex-wrap:wrap}}
      `}</style>
    </footer>
  )
}

export default Footer
