import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Loader
 * ─────────────────────────────────────────────
 * • Counts 0 → 100% over ~2.4 s with an eased
 *   curve (slow start, fast middle, slow finish)
 *   instead of a mechanical linear tick.
 * • Animates the name + tagline in on mount.
 * • Exit: counter fades, panel wipes up via
 *   clipPath, then calls onComplete.
 *
 * Props
 *   onComplete — called after exit animation
 *   duration   — total load time in ms (default 2400)
 */

const Loader = ({ onComplete, duration = 2400 }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const barFillRef = useRef(null);
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const progressVal = useRef(0);        // numeric value, no re-render needed
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const exitedRef = useRef(false);

  // ── stable callback ref so the effect never re-runs ──────────
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  // ── easing: ease-in-out quad ─────────────────────────────────
  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  // ── exit sequence ─────────────────────────────────────────────
  const revealApp = useCallback(() => {
    if (exitedRef.current) return;
    exitedRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => onCompleteRef.current?.(),
    });

    // 1. Stagger counter + bar + tagline upward
    tl.to([counterRef.current, barFillRef.current?.parentElement, taglineRef.current], {
      opacity: 0,
      y: -28,
      duration: 0.45,
      ease: 'power3.in',
      stagger: 0.06,
    })
      // 2. Name fades out
      .to(nameRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.35,
        ease: 'power2.in',
      }, '<0.08')
      // 3. Panel wipes up
      .to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.1,
        ease: 'expo.inOut',
      }, '-=0.1');
  }, []);

  // ── rAF-based progress (eased) ────────────────────────────────
  useEffect(() => {
    // Entrance: animate name + tagline in
    const entranceTl = gsap.timeline();
    entranceTl
      .fromTo(nameRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(taglineRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

    const tick = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const rawT = Math.min(elapsed / duration, 1);
      const t = ease(rawT);
      const pRaw = Math.round(t * 100);
      const p = Math.floor(pRaw / 10) * 10;

      // Update DOM directly — only on 10% intervals
      if (counterRef.current) counterRef.current.textContent = `${p}%`;
      if (barFillRef.current) barFillRef.current.style.width = `${p}%`;
      progressVal.current = p;

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Ensure 100% is displayed before exiting
        if (counterRef.current) counterRef.current.textContent = '100%';
        if (barFillRef.current) barFillRef.current.style.width = '100%';
        // Short pause at 100% so the user sees it
        setTimeout(revealApp, 320);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, revealApp]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        userSelect: 'none',
      }}
    >
      {/* ── Name (top-left branded anchor) ── */}
      <div
        ref={nameRef}
        style={{
          position: 'absolute',
          top: 'clamp(24px, 4vw, 40px)',
          left: 'clamp(20px, 5vw, 60px)',
          fontFamily: 'var(--serif)',
          fontWeight: 900,
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--cream)',
          letterSpacing: '-0.02em',
          opacity: 0,           // animated in
        }}
      >
        Vidyasagar<em style={{ color: 'var(--rust)', fontStyle: 'italic' }}>.</em>
      </div>

      {/* ── Centre: counter + bar + tagline ── */}
      <div style={{ position: 'relative', width: 'clamp(160px, 30vw, 220px)' }}>

        {/* Counter */}
        <div
          ref={counterRef}
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(4rem, 10vw, 6rem)',
            fontWeight: 900,
            color: 'var(--cream)',
            textAlign: 'center',
            lineHeight: 1,
            marginBottom: '1.2rem',
            letterSpacing: '-0.04em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          0%
        </div>

        {/* Bar track */}
        <div
          style={{
            height: '1.5px',
            width: '100%',
            background: 'rgba(240, 232, 208, 0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Bar fill — driven directly via ref, no React state */}
          <div
            ref={barFillRef}
            style={{
              height: '100%',
              width: '0%',
              background: 'var(--rust)',
            }}
          />
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--sand)',
            marginTop: '1.4rem',
            textAlign: 'center',
            opacity: 0,          // animated in
          }}
        >
          Loading portfolio
        </div>
      </div>

      {/* ── Bottom-right: year stamp ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 4vw, 36px)',
          right: 'clamp(20px, 5vw, 60px)',
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          color: 'rgba(240, 232, 208, 0.25)',
          textTransform: 'uppercase',
        }}
      >
        © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Loader;