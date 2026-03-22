import { useReveal } from '../../hooks/useReveal'
import styles from './MarketOpportunity.module.css'

const markets = [
  { label: 'TAM', title: 'Total Addressable Market', desc: 'Global AI & Machine Learning tools market' },
  { label: 'SAM', title: 'Serviceable Addressable Market', desc: 'Businesses and developers using AI automation platforms' },
  { label: 'SOM', title: 'Serviceable Obtainable Market', desc: 'Startups, developers, and organizations adopting the platform' },
]

export default function MarketOpportunity() {
  useReveal()
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`reveal ${styles.header}`}>
          <span className={styles.tag}>Market Opportunity</span>
          <h2 className={styles.heading}>A Massive and Growing Market</h2>
        </div>
        <div className={styles.grid}>
          {markets.map((m, i) => (
            <div key={i} className={`reveal stagger-${i + 1} ${styles.card}`}>
              <div className={styles.label}>{m.label}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
