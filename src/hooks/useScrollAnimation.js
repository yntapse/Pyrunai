import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 240
const FRAME_DIR = '/ezgif-112434538e4879d0-jpg/'

const STAGE1_DURATION = 1200   // text → panels
const STAGE2_DURATION = 1000   // panels → feature card
const STAGE3_DURATION = 1000   // feature card → exit

function padded(n) { return String(n).padStart(3, '0') }
function clamp(val, min, max) { return Math.min(Math.max(val, min), max) }
function mapRange(val, inMin, inMax, outMin, outMax) {
  const t = clamp((val - inMin) / (inMax - inMin), 0, 1)
  return outMin + t * (outMax - outMin)
}
function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function easeIn(t) { return t * t * t }

/*
  Stages:
    0  – hero text visible
   to1  – text fades, panels slide in
    1  – panels visible
   to2  – panels exit upward, feature card fades in
    2  – feature card visible
   to3  – feature card exits, hero fades out → problem
    3  – hero hidden, problem visible
*/

function deriveUI(stage, p) {
  let textOpacity = 1, textY = 0
  let panelOpacity = 0, leftPanelX = -36, rightPanelX = 36
  let panelExitOpacity = 1, panelExitY = 0
  let canvasOpacity = 1
  let stickyOpacity = 1, stickyY = 0, stickyBlur = 0
  let featureOpacity = 0, featureY = 40, featureScale = 0.96

  // ── FORWARD ──────────────────────────────────
  if (stage === 'to1') {
    const e = easeInOut(p)
    textOpacity = 1 - e
    textY = mapRange(e, 0, 1, 0, -50)
    panelOpacity = e
    leftPanelX = mapRange(e, 0, 1, -36, 0)
    rightPanelX = mapRange(e, 0, 1, 36, 0)
    canvasOpacity = 1 - e * 0.3

  } else if (stage === 1) {
    textOpacity = 0; textY = -50
    panelOpacity = 1; leftPanelX = 0; rightPanelX = 0
    canvasOpacity = 0.7

  } else if (stage === 'to2') {
    const e = easeInOut(p)
    textOpacity = 0; textY = -50
    panelOpacity = 1; leftPanelX = 0; rightPanelX = 0
    panelExitOpacity = 1 - e
    panelExitY = mapRange(e, 0, 1, 0, -70)
    canvasOpacity = mapRange(e, 0, 1, 0.7, 0.25)
    // Feature card fades in
    featureOpacity = e
    featureY = mapRange(e, 0, 1, 40, 0)
    featureScale = mapRange(e, 0, 1, 0.96, 1)

  } else if (stage === 2) {
    textOpacity = 0; panelOpacity = 0
    panelExitOpacity = 0; panelExitY = -70
    canvasOpacity = 0.25
    featureOpacity = 1; featureY = 0; featureScale = 1

  } else if (stage === 'to3') {
    const e = easeInOut(p)
    textOpacity = 0; panelOpacity = 0
    panelExitOpacity = 0; panelExitY = -70
    canvasOpacity = mapRange(e, 0, 1, 0.25, 0)
    // Feature card exits upward
    featureOpacity = 1 - e
    featureY = mapRange(e, 0, 1, 0, -50)
    featureScale = mapRange(e, 0, 1, 1, 0.96)
    // Hero wrapper fades out
    stickyOpacity = 1 - e
    stickyY = mapRange(e, 0, 1, 0, -60)
    stickyBlur = mapRange(e, 0, 1, 0, 12)

  } else if (stage === 3) {
    textOpacity = 0; panelOpacity = 0
    panelExitOpacity = 0; panelExitY = -70
    canvasOpacity = 0
    featureOpacity = 0; featureY = -50; featureScale = 0.96
    stickyOpacity = 0; stickyY = -60; stickyBlur = 12

  // ── BACKWARD ──────────────────────────────────
  } else if (stage === 'from1') {
    const e = easeInOut(p)
    textOpacity = e
    textY = mapRange(e, 0, 1, -50, 0)
    panelOpacity = 1 - e
    leftPanelX = mapRange(e, 0, 1, 0, -36)
    rightPanelX = mapRange(e, 0, 1, 0, 36)
    canvasOpacity = mapRange(e, 0, 1, 0.7, 1)

  } else if (stage === 'from2') {
    const e = easeInOut(p)
    textOpacity = 0; textY = -50
    panelOpacity = 1; leftPanelX = 0; rightPanelX = 0
    // Panels slide back down into view
    panelExitOpacity = e
    panelExitY = mapRange(e, 0, 1, -70, 0)
    canvasOpacity = mapRange(e, 0, 1, 0.25, 0.7)
    // Feature card fades out as panels return
    featureOpacity = 1 - e
    featureY = mapRange(e, 0, 1, 0, 40)
    featureScale = mapRange(e, 0, 1, 1, 0.96)
    // Keep sticky visible throughout reverse
    stickyOpacity = 1; stickyY = 0; stickyBlur = 0

  } else if (stage === 'from3') {
    const e = easeInOut(p)
    textOpacity = 0; panelOpacity = 0
    panelExitOpacity = 0; panelExitY = -70
    canvasOpacity = mapRange(e, 0, 1, 0, 0.25)
    // Feature card slides back in
    featureOpacity = e
    featureY = mapRange(e, 0, 1, -50, 0)
    featureScale = mapRange(e, 0, 1, 0.96, 1)
    // Sticky wrapper restores
    stickyOpacity = 1
    stickyY = 0
    stickyBlur = 0
  }

  return {
    textOpacity, textY,
    panelOpacity, leftPanelX, rightPanelX,
    panelExitOpacity, panelExitY,
    canvasOpacity,
    stickyOpacity, stickyY, stickyBlur,
    featureOpacity, featureY, featureScale,
  }
}

function getStageDuration(from, to) {
  const stage = Math.max(from, to)
  if (stage === 1) return STAGE1_DURATION
  if (stage === 2) return STAGE2_DURATION
  return STAGE3_DURATION
}

function getStageKey(from, to) {
  if (to > from) {
    // forward
    if (from === 0) return 'to1'
    if (from === 1) return 'to2'
    return 'to3'
  } else {
    // backward
    if (from === 3) return 'from3'
    if (from === 2) return 'from2'
    return 'from1'
  }
}

export function useScrollAnimation() {
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const [loaded, setLoaded] = useState(false)
  const lastFrameRef = useRef(-1)
  const rafRef = useRef(null)

  const restStageRef = useRef(0)
  const animRef = useRef(null)
  const lockedRef = useRef(true)

  const [uiState, setUiState] = useState(() => deriveUI(0, 0))

  // ── Frame loading ──
  useEffect(() => {
    let count = 0
    const images = new Array(TOTAL_FRAMES)
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `${FRAME_DIR}ezgif-frame-${padded(i)}.jpg`
      img.onload = () => {
        count++
        if (count === TOTAL_FRAMES) { framesRef.current = images; setLoaded(true) }
      }
      images[i - 1] = img
    }
  }, [])

  function drawFrame(progress) {
    const canvas = canvasRef.current
    if (!canvas) return
    const frameProgress = easeIn(clamp(progress, 0, 1))
    const index = Math.round(frameProgress * (TOTAL_FRAMES - 1))
    if (index === lastFrameRef.current) return
    lastFrameRef.current = index
    const img = framesRef.current[index]
    if (!img) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
    const x = (canvas.width - img.naturalWidth * scale) / 2
    const y = (canvas.height - img.naturalHeight * scale) / 2
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
  }

  function runAnimLoop(onComplete) {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    function tick(now) {
      const anim = animRef.current
      if (!anim) return

      const elapsed = now - anim.startTime
      const rawP = clamp(elapsed / anim.duration, 0, 1)
      const stageKey = getStageKey(anim.from, anim.to)

      const ui = deriveUI(stageKey, rawP)
      setUiState(ui)

      // Canvas frame mapping across all stages
      // Forward: 0→1 uses frames 0–0.33, 1→2 uses 0.33–0.66, 2→3 uses 0.66–1.0
      // Backward is the reverse
      if (anim.forward) {
        if (anim.from === 0) drawFrame(rawP * 0.33)
        else if (anim.from === 1) drawFrame(0.33 + rawP * 0.33)
        else if (anim.from === 2) drawFrame(0.66 + rawP * 0.34)
      } else {
        if (anim.from === 3) drawFrame(1 - rawP * 0.34)
        else if (anim.from === 2) drawFrame(0.66 - rawP * 0.33)
        else if (anim.from === 1) drawFrame(0.33 - rawP * 0.33)
      }

      // Problem section opacity — only during stage 2↔3
      const problem = document.getElementById('problem')
      if (problem) {
        if (anim.from === 2 && anim.forward) {
          problem.style.opacity = rawP
        } else if (anim.from === 3 && !anim.forward) {
          problem.style.opacity = 1 - rawP
        }
      }

      if (rawP < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        restStageRef.current = anim.to
        animRef.current = null
        setUiState(deriveUI(anim.to, 0))
        if (problem) {
          if (anim.to === 3) problem.style.opacity = 1
          else if (anim.to <= 2) problem.style.opacity = 0
        }
        if (onComplete) onComplete(anim.to)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  function triggerForward(onComplete) {
    if (animRef.current?.forward) return
    const from = restStageRef.current
    if (from >= 3) return

    if (animRef.current && !animRef.current.forward) {
      restStageRef.current = animRef.current.from
      animRef.current = null
    }

    const to = restStageRef.current + 1
    const duration = getStageDuration(restStageRef.current, to)
    animRef.current = { from: restStageRef.current, to, forward: true, startTime: performance.now(), duration }
    runAnimLoop(onComplete)
  }

  function triggerBackward(onComplete) {
    if (animRef.current && !animRef.current.forward) return
    const from = restStageRef.current
    if (from <= 0) return

    if (animRef.current?.forward) {
      restStageRef.current = animRef.current.from
      animRef.current = null
    }

    const to = restStageRef.current - 1
    const duration = getStageDuration(to, restStageRef.current)
    animRef.current = { from: restStageRef.current, to, forward: false, startTime: performance.now(), duration }
    runAnimLoop(onComplete)
  }

  useEffect(() => {
    if (!loaded) return
    drawFrame(0)
    setUiState(deriveUI(0, 0))
    lockedRef.current = true

    const problem = document.getElementById('problem')
    if (problem) problem.style.opacity = 0
    window.scrollTo(0, 0)

    function onHeroComplete() {
      lockedRef.current = false
      if (problem) {
        window.scrollTo({ top: problem.offsetTop, behavior: 'smooth' })
      }
    }

    function onHeroReversed() {
      lockedRef.current = true
      if (problem) problem.style.opacity = 0
    }

    function handleForward() {
      if (restStageRef.current < 3) {
        triggerForward((toStage) => {
          if (toStage === 3) {
            onHeroComplete()
          }
        })
      }
    }

    function handleBackward() {
      if (restStageRef.current > 0) {
        triggerBackward((toStage) => {
          if (toStage === 0) {
            onHeroReversed()
          }
        })
      }
    }

    function onWheel(e) {
      if (lockedRef.current) {
        e.preventDefault()
        if (e.deltaY > 0) handleForward()
        else if (e.deltaY < 0) handleBackward()
        return
      }

      // Not locked — check if user scrolled back near top to re-engage
      if (e.deltaY < 0 && window.scrollY <= window.innerHeight * 1.15) {
        e.preventDefault()
        lockedRef.current = true
        // Jump to stage 3 and start full 3-step reverse
        restStageRef.current = 3
        animRef.current = null
        setUiState(deriveUI('from3', 0))
        if (problem) problem.style.opacity = 0
        window.scrollTo(0, 0)
        drawFrame(1)
        handleBackward()
      }
    }

    let touchStartY = 0
    function onTouchStart(e) { touchStartY = e.touches[0].clientY }
    function onTouchMove(e) {
      if (lockedRef.current) {
        e.preventDefault()
        const delta = touchStartY - e.touches[0].clientY
        if (delta > 8) handleForward()
        else if (delta < -8) handleBackward()
        touchStartY = e.touches[0].clientY
        return
      }

      if (e.touches[0].clientY > touchStartY && window.scrollY <= window.innerHeight * 1.15) {
        e.preventDefault()
        lockedRef.current = true
        // Jump to stage 3 and start full 3-step reverse
        restStageRef.current = 3
        animRef.current = null
        setUiState(deriveUI('from3', 0))
        if (problem) problem.style.opacity = 0
        window.scrollTo(0, 0)
        drawFrame(1)
        handleBackward()
      }
    }

    function onResize() {
      const idx = lastFrameRef.current >= 0 ? lastFrameRef.current : 0
      const img = framesRef.current[idx]
      if (!img) return
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
      const x = (canvas.width - img.naturalWidth * scale) / 2
      const y = (canvas.height - img.naturalHeight * scale) / 2
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [loaded])

  return { canvasRef, loaded, uiState }
}
