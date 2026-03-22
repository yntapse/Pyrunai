import { useReveal } from '../../hooks/useReveal'
import styles from './SolutionSection.module.css'

const steps = [
  { num: '01', label: 'Dataset Upload', desc: 'Drop your CSV or connect a data source' },
  { num: '02', label: 'AI Data Analysis', desc: 'Automatic feature detection and profiling' },
  { num: '03', label: 'ML Pipeline Generation', desc: 'Dynamic pipelines built for your data' },
  { num: '04', label: 'Model Training', desc: 'Multiple algorithms trained in parallel' },
  { num: '05', label: 'Best Model Selection', desc: 'Top performer selected automatically' },
]

export default function SolutionSection() {
  useReveal()
  return (
    <section id="solution" className={styles.section}>
      <div className={styles.inner}>
        <div className={`reveal ${styles.header}`}>
          <span className={styles.tag}>Our Solution</span>
          <h2 className={styles.heading}>Automate the Entire ML Workflow</h2>
          <p className={styles.sub}>
            The platform automates the entire machine learning workflow, enabling users to
            build, evaluate, and select the best-performing model from their data.
          </p>
        </div>
        <div className={styles.pipeline}>
          {steps.map((s, i) => (
            <div key={i} className={`reveal stagger-${i + 1} ${styles.step}`}>
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.connector} />
              <div className={styles.stepBody}>
                <h3>{s.label}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
