import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

const links = [
  { label: 'Solution',  id: 'solution' },
  { label: 'Product',   id: 'product'  },
  { label: 'Pricing',   id: 'pricing'  },
  { label: 'About',     id: 'about'    },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)

      // Highlight the section currently in view
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
    scrollTo(id)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo} onClick={e => handleNav(e, 'hero')}>
        <img src="/logo.svg" alt="PyrunAI" className={styles.logoImg} />
      </a>

      <ul className={styles.links}>
        {links.map(({ label, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? styles.activeLink : ''}
              onClick={e => handleNav(e, id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#pricing" className={styles.cta} onClick={e => handleNav(e, 'pricing')}>
        Get Started
      </a>
    </nav>
  )
}
