import { useReveal } from '../../hooks/useReveal'
import styles from './Capabilities.module.css'

const caps = [
  { label: 'Project Creation', desc: 'Create projects and upload datasets in seconds.' },
  { label: 'Target Column Selection', desc: 'Pick the column you want to predict.' },
  { label: 'Training Pipeline', desc: 'Multi-stage pipeline with preprocessing and feature engineering.' },
  { label: 'Training Monitoring', desc: 'Live logs, system usage, and progress tracking.' },
  { label: 'Model Leaderboard', desc: 'Compare all trained models side by side.' },
  { label: 'Performance Metrics', desc: 'Accuracy, F1, AUC, RMSE and more.' },
  { label: 'Model Deployment', desc: 'REST API endpoint or downloadable code package.' },
]

export default function Capabilities() {
  useReveal()
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`reveal ${styles.header}`}>
          <span className={styles.tag}>Platform Capabilities</span>
          <h2 className={styles.heading}>A Complete ML Environment</h2>
          <p className={styles.sub}>
            From data ingestion to deployment — everything managed in one place.
          </p>
        </div>
        <div className={styles.list}>
          {caps.map((c, i) => (
            <div key={i} className={`reveal stagger-${Math.min(i + 1, 5)} ${styles.item}`}>
              <div className={styles.dot} />
              <div>
                <h3>{c.label}</h3>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
