import styles from './ProblemSection.module.css'

const points = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Scarce Expertise',
    text: 'Building ML models demands skilled data scientists that most teams simply don\'t have.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Slow Iteration',
    text: 'Experimentation cycles take weeks, delaying insights and slowing product decisions.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
        <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
      </svg>
    ),
    title: 'Algorithm Overload',
    text: 'Evaluating dozens of algorithms manually is tedious and prone to human bias.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Pipeline Complexity',
    text: 'Wiring together preprocessing, training, and evaluation requires significant engineering effort.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'High Cost',
    text: 'Development overhead and infrastructure costs make AI inaccessible for most organizations.',
  },
]

// Duplicate 3 times for seamless loop
const repeated = [...points, ...points, ...points]

export default function ProblemSection() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.tag}>The Problem</span>
        <h2 className={styles.heading}>Why AI Adoption Stalls</h2>
        <p className={styles.sub}>
          Many organizations want to adopt AI, but building machine learning models
          remains complex and resource-intensive.
        </p>
      </div>

      <div className={styles.marqueeWrap}>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />
        <div className={styles.track}>
          {repeated.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.iconWrap}>{p.icon}</div>
              <div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
