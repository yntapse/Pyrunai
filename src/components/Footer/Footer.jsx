import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer id="about" className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src="/logo.svg" alt="PyrunAI" className={styles.logoImg} />
          </div>
          <p className={styles.tagline}>
            Smart services. Balanced lives.<br />
            Building intelligent solutions that<br />
            drive business optimization.
          </p>
          <a href="https://linkedin.com" className={styles.linkedin} target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            Follow us on LinkedIn
          </a>
        </div>

        {/* Company */}
        <div className={styles.col}>
          <h4 className={styles.colHead}>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colHead}>Services</h4>
          <ul>
            <li><a href="#">AI &amp; Machine Learning</a></li>
            <li><a href="#">Data Analytics</a></li>
            <li><a href="#">Web/App Development</a></li>
            <li><a href="#">Power BI Solutions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.colHead}>Contact</h4>
          <ul className={styles.contactList}>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
              info@pyrunai.com
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
              +91 8180907138
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Nashik, India · New York, USA · Dublin, Ireland
            </li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        <span>© 2026 PyrunAi Services LLP. All rights reserved.</span>
        <span className={styles.bottomTagline}>Smart services. Balanced lives.</span>
      </div>
    </footer>
  )
}
