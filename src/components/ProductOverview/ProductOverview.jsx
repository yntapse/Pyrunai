import { useEffect, useRef, useState } from 'react'
import styles from './ProductOverview.module.css'

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
      </svg>
    ),
    label: 'Step 01',
    title: 'Upload & Experiment',
    desc: 'Upload datasets and initiate machine learning experiments instantly with zero configuration.',
    accent: '#2563eb',
    accentBg: 'rgba(37,99,235,0.08)',
    accentBorder: 'rgba(37,99,235,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    label: 'Step 02',
    title: 'Auto Pipeline',
    desc: 'Automatic ML pipeline generation with feature engineering and algorithm selection tailored to your data.',
    accent: '#10b981',
    accentBg: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    label: 'Step 03',
    title: 'Model Evaluation',
    desc: 'Comprehensive performance evaluation across all trained models on a live leaderboard.',
    accent: '#2563eb',
    accentBg: 'rgba(37,99,235,0.08)',
    accentBorder: 'rgba(37,99,235,0.2)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    label: 'Step 04',
    title: 'Deploy Anywhere',
    desc: 'Deploy models via REST API or download production-ready code packages in one click.',
    accent: '#10b981',
    accentBg: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.2)',
  },
]

// Final spread positions (translateY in px, scale)
const FINAL = [
  { y: 0,   x: -340 },
  { y: 0,   x: -113 },
  { y: 0,   x:  113 },
  { y: 0,   x:  340 },
]

// Stacked positions (all near center with slight y offset)
const STACKED = [
  { y: -9,  x: 0 },
  { y: -4,  x: 0 },
  { y:  1,  x: 0 },
  { y:  6,  x: 0 },
]

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function lerp(a, b, t) { return a + (b - a) * t }

export default function ProductOverview() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Start animating when section top hits 80% of viewport, finish at 20%
      const start = vh * 0.75
      const end = vh * 0.1
      const raw = (start - rect.top) / (start - end)
      setProgress(Math.min(Math.max(raw, 0), 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="product" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.tag}>Product Overview</span>
        <h2 className={styles.heading}>Everything You Need to Ship ML</h2>
        <p className={styles.sub}>Four steps from raw data to production model.</p>
      </div>

      <div className={styles.stackWrap}>
        {features.map((f, i) => {
          // Stagger: card i starts animating slightly after card i-1
          const stagger = 0.15
          const cardStart = i * stagger
          const cardEnd = cardStart + (1 - (features.length - 1) * stagger)
          const raw = Math.min(Math.max((progress - cardStart) / (cardEnd - cardStart), 0), 1)
          const p = easeInOut(raw)

          const x = lerp(STACKED[i].x, FINAL[i].x, p)
          const y = lerp(STACKED[i].y, FINAL[i].y, p)
          const scale = lerp(1 - (features.length - 1 - i) * 0.03, 1, p)
          const opacity = lerp(0.55 + i * 0.12, 1, p)
          const zIndex = i + 1

          return (
            <div
              key={i}
              className={styles.card}
              style={{
                transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
                opacity,
                zIndex,
                '--accent': f.accent,
                '--accent-bg': f.accentBg,
                '--accent-border': f.accentBorder,
              }}
            >
              <div className={styles.iconWrap}>{f.icon}</div>
              <span className={styles.cardLabel}>{f.label}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          )
        })}
      </div>

    </section>
  )
}
