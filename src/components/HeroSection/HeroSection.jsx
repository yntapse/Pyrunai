import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const { canvasRef, loaded, uiState } = useScrollAnimation()
  const {
    textOpacity, textY,
    panelOpacity, leftPanelX, rightPanelX,
    panelExitOpacity, panelExitY,
    canvasOpacity,
    stickyOpacity, stickyY, stickyBlur,
    featureOpacity, featureY, featureScale,
  } = uiState

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.sticky} style={{ opacity: stickyOpacity, transform: `translateY(${stickyY}px)`, filter: `blur(${stickyBlur}px)` }}>
        {!loaded && <div className={styles.loader}>Loading...</div>}

        <canvas ref={canvasRef} className={styles.canvas} style={{ opacity: loaded ? canvasOpacity : 0 }} />


        {/* Hero text — fades up in phase 1 */}
        <div
          className={styles.content}
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            pointerEvents: textOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          <div className={styles.badge}>PyrunAI</div>
          <h1 className={styles.title}>
            AI Model Builder<br />
            <span className={styles.gradient}>Platform</span>
          </h1>
          <p className={styles.subtitle}>Transform datasets into production ML models — automatically.</p>
          <a href="#problem" className={styles.cta}>Get Started</a>
        </div>

        {/* Left panel — slides in from left, exits upward */}
        <div
          className={`${styles.panel} ${styles.panelLeft}`}
          style={{
            opacity: panelOpacity * panelExitOpacity,
            transform: `translateX(${leftPanelX}vw) translateY(${panelExitY}px)`,
          }}
        >
          <div className={styles.panelAccent} />
          <span className={styles.panelLabel}>Automation</span>
          <h2 className={styles.panelTitle}>Automated ML Pipelines</h2>
          <p className={styles.panelDesc}>
            Upload your dataset and let the platform handle everything —
            feature engineering, algorithm selection, and hyperparameter tuning happen automatically.
          </p>
          <ul className={styles.panelList}>
            <li>Dynamic pipeline generation</li>
            <li>Auto feature engineering</li>
            <li>Multi-algorithm training</li>
            <li>Zero manual configuration</li>
          </ul>
        </div>

        {/* Right panel — slides in from right, exits upward */}
        <div
          className={`${styles.panel} ${styles.panelRight}`}
          style={{
            opacity: panelOpacity * panelExitOpacity,
            transform: `translateX(${rightPanelX}vw) translateY(${panelExitY}px)`,
          }}
        >
          <div className={styles.panelAccent} />
          <span className={styles.panelLabel}>Deployment</span>
          <h2 className={styles.panelTitle}>Model Evaluation & Deployment</h2>
          <p className={styles.panelDesc}>
            Compare all trained models on a live leaderboard, pick the best performer,
            and deploy instantly via REST API or downloadable code.
          </p>
          <ul className={styles.panelList}>
            <li>Model leaderboard</li>
            <li>Performance metrics</li>
            <li>One-click REST API</li>
            <li>Downloadable code package</li>
          </ul>
        </div>

        {/* Feature showcase card — appears in stage 2 */}
        <div
          className={styles.featureCard}
          style={{
            opacity: featureOpacity,
            transform: `translateY(${featureY}px) scale(${featureScale})`,
            pointerEvents: featureOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          <div className={styles.featureInner}>
            <div className={styles.featureHeader}>
              <span className={styles.featureBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22"/><path d="M8 6a4 4 0 0 1 .68-2.24"/><path d="M15.32 3.76A4 4 0 0 1 16 6c0 1.95-1.4 3.58-3.25 3.93"/>
                  <circle cx="12" cy="6" r="1"/><path d="M4.5 12.5 3 14l1.5 1.5"/><path d="M19.5 12.5 21 14l-1.5 1.5"/>
                  <path d="M7 18h10"/><path d="M9 21h6"/>
                </svg>
                AI Agent
              </span>
              <h2 className={styles.featureTitle}>Dataset Transformation Agent</h2>
              <p className={styles.featureDesc}>
                Automatically clean, transform, and prepare your datasets using intelligent
                automation. Just describe what you need in plain English — using a simple
                prompt — and the agent handles the rest. No code, no manual steps.
              </p>
            </div>

            <div className={styles.promptBox}>
              <div className={styles.promptDots}>
                <span /><span /><span />
              </div>
              <p className={styles.promptText}>
                "Remove duplicates, fill missing ages with the median, and normalise all numeric columns."
              </p>
            </div>

            <ul className={styles.featureList}>
              <li>
                <span className={styles.featureCheck}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                Intelligent schema detection
              </li>
              <li>
                <span className={styles.featureCheck}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                Auto missing-value handling
              </li>
              <li>
                <span className={styles.featureCheck}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                Feature normalisation & encoding
              </li>
              <li>
                <span className={styles.featureCheck}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                One-click export to pipeline
              </li>
            </ul>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={styles.scrollHint} style={{ opacity: textOpacity }}>
          <span>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  )
}
