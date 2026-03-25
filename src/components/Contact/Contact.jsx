import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'

// ── EmailJS config ──────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free)
// 2. Add an Email Service (Gmail recommended) → copy Service ID
// 3. Create an Email Template with variables:
//      {{from_name}}, {{from_email}}, {{company}}, {{message}}
//    Set "To Email" in the template to ameymvaidya@gmail.com
// 4. Copy your Public Key from Account → API Keys
// Replace the three placeholders below:
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
// ────────────────────────────────────────────────────────────────

const offices = [
  { country: 'India',   city: 'Nashik, Maharashtra', badge: 'Headquarters' },
  { country: 'USA',     city: 'Manhattan, New York',  badge: 'North America' },
  { country: 'Ireland', city: 'Dublin',               badge: 'Europe' },
]

const expects = [
  '30-minute free consultation call',
  'Discuss your business needs and goals',
  'Get a custom solution recommendation',
  'No obligation, no pressure',
]

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>

        {/* ── Left: form ── */}
        <div className={styles.left}>
          <span className={styles.tag}>Get in Touch</span>
          <h1 className={styles.heading}>Let's talk about your ML needs</h1>
          <p className={styles.sub}>
            Whether you're exploring the platform, need a custom enterprise plan, or just have questions — we're here.
          </p>

          <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="from_name">Name</label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  className={styles.input}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="from_email">Email</label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  className={styles.input}
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                className={styles.input}
                placeholder="Your company (optional)"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                placeholder="Tell us about your project or question..."
                rows={5}
                required
              />
            </div>

            {/* hidden field so EmailJS knows the destination */}
            <input type="hidden" name="to_email" value="ameymvaidya@gmail.com" />

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className={styles.successMsg}>
                ✓ Message sent! We'll get back to you shortly.
              </p>
            )}
            {status === 'error' && (
              <p className={styles.errorMsg}>
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>

        {/* ── Right: offices + what to expect ── */}
        <div className={styles.right}>
          <div className={styles.officesCard}>
            <h3 className={styles.cardTitle}>Our Offices</h3>
            <div className={styles.officeList}>
              {offices.map((o, i) => (
                <div key={i} className={styles.officeItem}>
                  <div className={styles.pinWrap}><PinIcon /></div>
                  <div>
                    <div className={styles.officeCountry}>{o.country}</div>
                    <div className={styles.officeCity}>{o.city}</div>
                    <span className={styles.officeBadge}>{o.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.expectCard}>
            <h3 className={styles.expectTitle}>What to Expect</h3>
            <ul className={styles.expectList}>
              {expects.map((item, i) => (
                <li key={i} className={styles.expectItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--green)', flexShrink:0}}>
                    <circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </main>
  )
}
