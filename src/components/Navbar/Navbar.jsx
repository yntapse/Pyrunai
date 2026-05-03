import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  return localStorage.getItem('theme') || 'light'
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

const links = [
  { label: 'Platform',  id: 'solution' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [theme, setTheme] = useState(getInitialTheme)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
      const ids = ['hero', ...links.map(l => l.id)]
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setActive(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNav(e, id) {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for home page to mount and hook to attach, then unlock + scroll
      setTimeout(() => {
        window.dispatchEvent(new Event('pyrun:skiphero'))
        setTimeout(() => scrollTo(id), 80)
      }, 200)
    } else {
      window.dispatchEvent(new Event('pyrun:skiphero'))
      setTimeout(() => scrollTo(id), 20)
    }
  }

  const isContact = location.pathname === '/contact'

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo} onClick={e => handleNav(e, 'hero')}>
        <img src="/FullLogo.PNG" alt="PyrunAI" className={styles.logoImg} />
      </a>

      <ul className={styles.links}>
        {links.map(({ label, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={!isContact && active === id ? styles.activeLink : ''}
              onClick={e => handleNav(e, id)}
            >
              {label}
            </a>
          </li>
        ))}
        <li>
          <Link
            to="/contact"
            className={isContact ? styles.activeLink : ''}
          >
            Contact
          </Link>
        </li>
      </ul>

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  )
}
