import { useReveal } from '../../hooks/useReveal'
import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Free',
    price: '$0',
    desc: 'Get started with no commitment.',
    features: ['Limited credits for testing', 'Basic model training', 'Community support'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$49/mo',
    desc: 'For developers and growing teams.',
    features: ['Higher usage limits', 'API access', 'Priority support', 'Model deployment'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For organizations at scale.',
    features: ['Custom pricing', 'Multi-user access', 'Dedicated support', 'SLA guarantee'],
    highlight: false,
  },
]

export default function Pricing() {
  useReveal()
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.inner}>
        <div className={`reveal ${styles.header}`}>
          <span className={styles.tag}>Pricing Plans</span>
          <h2 className={styles.heading}>Simple, Transparent Pricing</h2>
        </div>
        <div className={styles.grid}>
          {plans.map((p, i) => (
            <div key={i} className={`reveal stagger-${i + 1} ${styles.card} ${p.highlight ? styles.highlighted : ''}`}>
              {p.highlight && <div className={styles.badge}>Most Popular</div>}
              <h3 className={styles.planName}>{p.name}</h3>
              <div className={styles.price}>{p.price}</div>
              <p className={styles.planDesc}>{p.desc}</p>
              <ul className={styles.features}>
                {p.features.map((f, j) => (
                  <li key={j}><span className={styles.check}>✓</span>{f}</li>
                ))}
              </ul>
              <a href="#" className={`${styles.btn} ${p.highlight ? styles.btnPrimary : styles.btnSecondary}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
