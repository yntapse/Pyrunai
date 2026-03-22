import { useEffect, useRef, useState } from 'react'
import styles from './TargetUsers.module.css'

const users = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: 'Developers',
    desc: 'Integrate ML into your apps without deep expertise. Ship smarter features faster.',
    accent: '#2563eb',
    accentBg: 'rgba(37,99,235,0.08)',
    accentBorder: 'rgba(37,99,235,0.18)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    label: 'Startups',
    desc: 'Ship AI features fast without a dedicated data science team or heavy infrastructure.',
    accent: '#10b981',
    accentBg: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.18)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    label: 'Data Analysts',
    desc: 'Go beyond dashboards — build predictive models directly from your existing data.',
    accent: '#2563eb',
    accentBg: 'rgba(37,99,235,0.08)',
    accentBorder: 'rgba(37,99,235,0.18)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    label: 'Businesses',
    desc: 'Adopt AI at scale without high development costs or months of engineering work.',
    accent: '#10b981',
    accentBg: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.18)',
  },
]

const STAGGER_MS = 120

export default function TargetUsers() {
  const sectionRef = useRef(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const timerRef = useRef(null)
  const lastTriggered = useRef(false)

  useEffect(() => {
    function check() {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.72

      if (inView && !lastTriggered.current) {
        lastTriggered.current = true
        // Stagger cards in
        let count = 0
        timerRef.current = setInterval(() => {
          count++
          setVisibleCount(count)
          if (count >= users.length) clearInterval(timerRef.current)
        }, STAGGER_MS)
      } else if (!inView && lastTriggered.current) {
        // Reset when section scrolls back above viewport
        lastTriggered.current = false
        clearInterval(timerRef.current)
        setVisibleCount(0)
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => {
      window.removeEventListener('scroll', check)
      clearInterval(timerRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.tag}>Who Is It For</span>
          <h2 className={styles.heading}>Built for Everyone Building with Data</h2>
          <p className={styles.sub}>Whether you're a solo dev or an enterprise team, PyrunAI fits your workflow.</p>
        </div>

        <div className={styles.grid}>
          {users.map((u, i) => {
            const visible = i < visibleCount
            return (
              <div
                key={i}
                className={styles.card}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(40px) scale(0.96)',
                  boxShadow: visible
                    ? '0 12px 40px rgba(0,0,0,0.3)'
                    : '0 1px 4px rgba(0,0,0,0.15)',
                  '--accent': u.accent,
                  '--accent-bg': u.accentBg,
                  '--accent-border': u.accentBorder,
                }}
              >
                <div className={styles.iconWrap}>{u.icon}</div>
                <h3 className={styles.cardTitle}>{u.label}</h3>
                <p className={styles.cardDesc}>{u.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
