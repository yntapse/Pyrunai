import { useReveal } from '../../hooks/useReveal'
import styles from './FinalCTA.module.css'

export default function FinalCTA() {
  useReveal()
  return (
    <section className={styles.section}>
      <div className={`reveal ${styles.inner}`}>
        <h2 className={styles.heading}>Start Building with AI</h2>
        <p className={styles.sub}>
          Build, evaluate, and deploy machine learning models with ease using your own data.
        </p>
        <a href="#" className={styles.cta}>Get Started</a>
      </div>
    </section>
  )
}
