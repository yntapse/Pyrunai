import { useReveal } from '../../hooks/useReveal'
import styles from './CompetitiveAdvantage.module.css'

const competitors = ['DataRobot', 'H2O.ai', 'Vertex AI', 'SageMaker', 'Open source', 'Our Tool']

const rows = [
  {
    feature: 'Data validation',
    values: ['check', 'check', 'check', 'check', 'partial', 'check'],
  },
  {
    feature: 'Data transformation',
    values: ['check', 'check', 'check', 'check', 'partial', 'check'],
  },
  {
    feature: 'Feature engineering',
    values: ['check', 'check', 'partial', 'partial', 'cross', 'check'],
  },
  {
    feature: 'Model selection',
    values: ['check', 'check', 'check', 'check', 'check', 'check'],
  },
  {
    feature: 'Multi-experiment tracking',
    values: ['check', 'partial', 'partial', 'partial', 'cross', 'check-note:research grade'],
  },
  {
    feature: 'Model deployment',
    values: ['check', 'check', 'check', 'check', 'cross', 'check'],
  },
  {
    feature: 'Model monitoring',
    values: ['check', 'check', 'partial', 'partial', 'cross', 'check'],
  },
  {
    feature: 'Accessible pricing',
    values: ['cross', 'cross', 'partial', 'partial', 'check-note:(free)', 'check-note:your edge'],
  },
]

function Cell({ value, isYours }) {
  if (value.startsWith('check-note:')) {
    const note = value.replace('check-note:', '')
    return (
      <td className={`${styles.cell} ${isYours ? styles.yourCell : ''}`}>
        <span className={styles.check}>✓</span>
        <span className={styles.note}>{note}</span>
      </td>
    )
  }
  if (value === 'check') {
    return (
      <td className={`${styles.cell} ${isYours ? styles.yourCell : ''}`}>
        <span className={styles.check}>✓</span>
      </td>
    )
  }
  if (value === 'partial') {
    return (
      <td className={`${styles.cell} ${isYours ? styles.yourCell : ''}`}>
        <span className={styles.partial}>partial</span>
      </td>
    )
  }
  return (
    <td className={`${styles.cell} ${isYours ? styles.yourCell : ''}`}>
      <span className={styles.cross}>✕</span>
    </td>
  )
}

export default function CompetitiveAdvantage() {
  useReveal()
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`reveal ${styles.header}`}>
          <span className={styles.tag}>Why PyrunAI</span>
          <h2 className={styles.heading}>We're Built Different</h2>
          <p className={styles.sub}>See how PyrunAI stacks up against the competition across every critical capability.</p>
        </div>

        <div className={`reveal ${styles.tableWrap}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.featureHead}>Feature</th>
                {competitors.map((c, i) => {
                  const isYours = c === 'Our Tool'
                  return (
                    <th key={i} className={`${styles.compHead} ${isYours ? styles.yourHead : ''}`}>
                      {c === 'Our Tool' ? <strong>{c}</strong> : c}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td className={styles.featureCell}>{row.feature}</td>
                  {row.values.map((val, ci) => (
                    <Cell key={ci} value={val} isYours={competitors[ci] === 'Our Tool'} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
