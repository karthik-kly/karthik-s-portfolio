import { useEffect, useRef } from 'react'
import './Hero.css'

const NAME_LETTERS = ['K','A','R','T','H','I','K']

export default function Hero() {
  const lettersRef = useRef([])

  useEffect(() => {
    // Stagger each letter animation with delay
    lettersRef.current.forEach((el, i) => {
      if (!el) return
      el.style.animationDelay = `${0.5 + i * 0.09}s`
    })
  }, [])

  return (
    <section id="home" className="hero">

      {/* ── PORTFOLIO 2026 — top center ── */}
      <p className="h-eyebrow">PORTFOLIO 2026</p>

      {/* ── GIANT NAME — left aligned, letter by letter ── */}
      <h1 className="h-name" aria-label="KARTHIK">
        {NAME_LETTERS.map((letter, i) => (
          <span
            key={i}
            className={`h-letter ${i === NAME_LETTERS.length - 1 ? 'h-letter-purple' : ''}`}
            ref={el => lettersRef.current[i] = el}
          >
            {letter}
          </span>
        ))}
      </h1>

      {/* ── WEB DEVELOPER — gray, wide spacing ── */}
      <p className="h-role">WEB DEVELOPER</p>

      {/* ── TAGLINE — bottom center ── */}
      <p className="h-tagline">
        Crafting digital experiences at the intersection of design &amp; technology
      </p>

      {/* ── SCROLL + pulsing line — bottom center ── */}
      <div className="h-scroll">
        <span className="h-scroll-label">SCROLL</span>
        <div className="h-scroll-line" />
      </div>

      {/* ── DECORATIVE CIRCLE — top right ── */}
      <div className="h-circle" aria-hidden="true">
        <div className="h-circle-inner" />
      </div>

      {/* ── AVAILABLE FOR WORK — bottom right ── */}
      <div className="h-available">
        <span className="avail-dot" />
        <span>Available for work</span>
      </div>

    </section>
  )
}
