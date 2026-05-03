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
    step: '01',
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
    step: '02',
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
    step: '03',
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
    step: '04',
    title: 'Deploy Anywhere',
    desc: 'Deploy models via REST API or download production-ready code packages in one click.',
    accent: '#10b981',
    accentBg: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.2)',
  },
]

export default function ProductOverview() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="product" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.tag}>Product Overview</span>
        <h2 className={styles.heading}>Everything You Need to Ship ML</h2>
        <p className={styles.sub}>Four steps from raw data to production model.</p>
      </div>

      <div className={styles.grid}>
        {features.map((f, i) => (
          <div
            key={i}
            className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
            style={{
              '--accent': f.accent,
              '--accent-bg': f.accentBg,
              '--accent-border': f.accentBorder,
              transitionDelay: `${i * 100}ms`,
            }}
          >
            {/* Step connector line (not on last card) */}
            {i < features.length - 1 && <div className={styles.connector} />}

            <div className={styles.cardTop}>
              <div className={styles.iconWrap}>{f.icon}</div>
              <span className={styles.stepBadge}>Step {f.step}</span>
            </div>

            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>

            <div className={styles.cardAccent} />
          </div>
        ))}
      </div>
    </section>
  )
}
