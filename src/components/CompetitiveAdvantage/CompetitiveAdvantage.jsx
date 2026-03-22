import { useReveal } from '../../hooks/useReveal'
import styles from './CompetitiveAdvantage.module.css'

const rows = [
  { label: 'Pipeline', them: 'Predefined pipelines', us: 'Dynamic pipeline generation' },
  { label: 'Automation', them: 'Limited automation', us: 'Automated dataset analysis' },
  { label: 'Experiments', them: 'Manual experimentation', us: 'Automated experiments' },
  { label: 'Flexibility', them: 'Less flexible', us: 'Best model auto-selected' },
]

export default function CompetitiveAdvantage() {
  useReveal()
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`reveal ${styles.header}`}>
          <span className={styles.tag}>Why PyrunAI</span>
          <h2 className={styles.heading}>We're Built Different</h2>
        </div>
        <div className={`reveal ${styles.table}`}>
          <div className={styles.colHeaders}>
            <div />
            <div className={styles.colLabel}>Traditional AutoML</div>
            <div className={`${styles.colLabel} ${styles.colUs}`}>PyrunAI Platform</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className={`reveal stagger-${i + 1} ${styles.row}`}>
              <div className={styles.rowLabel}>{r.label}</div>
              <div className={styles.them}><span>✗</span> {r.them}</div>
              <div className={styles.us}><span>✓</span> {r.us}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
