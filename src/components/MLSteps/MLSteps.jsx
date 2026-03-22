import { useState, useEffect, useRef } from 'react'
import styles from './MLSteps.module.css'

const steps = [
  {
    title: 'Data Ingestion',
    desc: 'Connect to any data source — CSV, databases, APIs, or cloud storage. PyrunAI automatically validates and ingests your raw data in seconds.',
  },
  {
    title: 'Data Cleaning',
    desc: 'Automatically detect and handle missing values, outliers, and inconsistencies. Get a clean, analysis-ready dataset without writing a single line of code.',
  },
  {
    title: 'Feature Engineering',
    desc: 'Smart feature extraction and transformation pipelines that identify the most predictive signals from your data automatically.',
  },
  {
    title: 'Model Training',
    desc: 'Train multiple algorithms in parallel — from linear models to gradient boosting and neural networks — with zero configuration required.',
  },
  {
    title: 'Evaluation',
    desc: 'Compare models on a live leaderboard with accuracy, precision, recall, F1, and AUC metrics. Understand exactly why each model performs the way it does.',
  },
  {
    title: 'Deployment',
    desc: 'Deploy your best model instantly as a REST API endpoint or download a production-ready code package with one click.',
  },
  {
    title: 'Monitoring',
    desc: 'Track model performance in production, detect data drift, and get alerts when accuracy degrades — keeping your ML system healthy over time.',
  },
]

export default function MLSteps() {
  const [active, setActive] = useState(0)
  const pausedRef = useRef(false)
  const timerRef = useRef(null)

  function startCycle() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive(prev => (prev + 1) % steps.length)
      }
    }, 2800)
  }

  useEffect(() => {
    startCycle()
    return () => clearInterval(timerRef.current)
  }, [])

  function handleEnter(i) {
    pausedRef.current = true
    setActive(i)
  }

  function handleLeave() {
    pausedRef.current = false
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.tag}>How It Works</span>
          <h2 className={styles.heading}>ML Environment Steps</h2>
          <p className={styles.sub}>From raw data to deployed model — fully automated.</p>
        </div>

        <div className={styles.track}>
          {steps.map((s, i) => (
            <div
              key={i}
              className={`${styles.box} ${active === i ? styles.boxActive : ''}`}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
              onClick={() => handleEnter(i)}
            >
              <div className={styles.boxTop}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.title}>{s.title}</span>
              </div>
              <div className={styles.descWrap}>
                <p className={styles.desc}>{s.desc}</p>
              </div>
              <span className={styles.activeLine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
