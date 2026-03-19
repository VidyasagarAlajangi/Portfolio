import React, { useState, useEffect, useRef, useCallback } from 'react';
import { projects } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const stmtRef = useRef(null);
  const ghostRef = useRef(null);
  const slideRefs = useRef([]);   // one ref per slide
  const progressRef = useRef(null);
  const total = projects.length;

  // ── slide transition ─────────────────────────────────────────
  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= total) return;

    const outSlide = slideRefs.current[current];
    const inSlide = slideRefs.current[idx];

    // 🚨 IMPORTANT GUARD
    if (!outSlide || !inSlide) return;

    const dir = idx > current ? 1 : -1;

    gsap.to(outSlide, {
      opacity: 0,
      x: -60 * dir,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        outSlide.style.display = 'none';
        gsap.set(outSlide, { x: 0 });
      },
    });

    gsap.to(ghostRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        ghostRef.current.textContent = String(idx + 1).padStart(2, '0');
        gsap.fromTo(
          ghostRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      },
    });

    inSlide.style.display = '';

    gsap.fromTo(
      inSlide,
      { opacity: 0, x: 80 * dir },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: 0.15 }
    );

    if (progressRef.current) {
      gsap.fromTo(progressRef.current,
        { width: `${(current / total) * 100}%` },
        {
          width: `${((idx + 1) / total) * 100}%`,
          duration: 4,
          ease: 'linear',
        }
      );
    }

    setCurrent(idx);
  }, [current, total]);

  // ── scroll reveal on mount ──────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([labelRef.current, titleRef.current, stmtRef.current], {
        opacity: 0, y: 44,
      });
      [labelRef, titleRef, stmtRef].forEach((ref, i) => {
        gsap.to(ref.current, {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!slideRefs.current.length) return;

    const interval = setInterval(() => {
      const next = current + 1 >= total ? 0 : current + 1;
      goTo(next);
    }, 4000);

    return () => clearInterval(interval);
  }, [current, total, goTo]);

  // ── keyboard nav ─────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ borderBottom: '1.5px solid var(--sand)', overflow: 'hidden', paddingBottom: 52 }}
    >
      {/* ── Section header ── */}
      <div
        className="flex items-end justify-between gap-8 flex-wrap"
        style={{ padding: '40px clamp(20px, 5vw, 60px) 10px' }}
      >
        <div>
          {/* Label */}
          <div ref={labelRef} className="flex items-center gap-2.5 mb-2">
            <span className="font-mono uppercase"
              style={{ fontSize: '0.65rem', letterSpacing: '0.22em', color: 'var(--rust)' }}>
              03 — Projects
            </span>
            <span style={{ width: 36, height: 1, background: 'var(--sand)', display: 'block' }} />
          </div>

          {/* Title */}
          <h2 ref={titleRef}
            className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(2rem,5vw,4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
          >
            Shipped.<br />
            <em style={{ color: 'var(--rust)', fontStyle: 'italic' }}>Measured.</em>
          </h2>
        </div>

        {/* Counter */}
        <div ref={stmtRef}
          className="font-mono"
          style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--sand)', paddingBottom: 3 }}
        >
          <span style={{ color: 'var(--rust)', fontSize: '1.1rem', fontWeight: 500 }}>
            {String(current + 1).padStart(2, '0')}
          </span>
          {' '}/ {String(total).padStart(2, '0')}
        </div>
      </div>

      {/* ── Stage ── */}
      <div
        className="relative min-h-[750px] sm:min-h-[600px] lg:min-h-[480px] overflow-hidden"
      >

        <div
          ref={ghostRef}
          className="font-serif font-black hidden sm:block"
          style={{
            position: 'absolute',
            left: 40,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 'clamp(120px,18vw,200px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(44,30,18,0.08)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          01
        </div>

        {/* Slides */}
        {projects.map((proj, i) => (
          <div
            key={proj.id}
            ref={el => slideRefs.current[i] = el}
            className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-2 items-center z-[1]"
            style={{
              display: i === 0 ? undefined : 'none',
              padding: '20px clamp(20px, 5vw, 80px) 80px',
            }}
          >
            <div className="w-full lg:pr-12 relative z-[2] mb-10 lg:mb-0">

              <div className="flex items-center gap-2.5 mb-3">
                <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--sand)' }}>
                  {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>

              <div className="font-mono uppercase inline-block mb-4"
                style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--rust)', border: '1px solid var(--rust)', padding: '3px 9px' }}>
                {proj.badge}
              </div>

              <h3 className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.3rem' }}>
                {proj.title}
              </h3>

              <p className="font-mono text-brown-mid" style={{ fontSize: '0.68rem', letterSpacing: '0.06em', marginBottom: '1.4rem' }}>
                {proj.subtitle}
              </p>

              <div style={{ width: 36, height: 2, background: 'var(--rust)', marginBottom: '1.25rem' }} />

              <div className="font-mono uppercase mb-1" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--sand)' }}>
                Tools &amp; Stack
              </div>
              <div className="font-mono text-brown-mid mb-5" style={{ fontSize: '0.72rem', lineHeight: 1.6 }}>
                {proj.stack.join(', ')}
              </div>

              <p className="font-body text-brown-mid mb-6"
                style={{ fontSize: '0.92rem', lineHeight: 1.85, maxWidth: 380 }}
                dangerouslySetInnerHTML={{ __html: proj.description }}
              />

              {/* Links */}
              <div className="flex gap-3">
                <a href={proj.githubLink} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono uppercase transition-all duration-200 hover:-translate-y-0.5"
                  style={{ fontSize: '0.68rem', letterSpacing: '0.08em', padding: '10px 20px', border: '1.5px solid var(--sand)', color: 'var(--brown-mid)', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--brown)'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor = 'var(--brown)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brown-mid)'; e.currentTarget.style.borderColor = 'var(--sand)'; }}
                >
                  <Github size={12} />
                  GitHub
                </a>
                <a href={proj.liveLink}
                  className="inline-flex items-center gap-2 font-mono uppercase transition-all duration-200 hover:-translate-y-0.5"
                  style={{ fontSize: '0.68rem', letterSpacing: '0.08em', padding: '10px 20px', background: 'var(--rust)', color: 'var(--cream)', border: '1.5px solid var(--rust)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--rust-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--rust)'}
                >
                  <ExternalLink size={12} />
                  Live Demo
                </a>
              </div>
            </div>

            {/* Right — mockup */}
            <div className="w-full flex items-center justify-center lg:justify-end">
              <div style={{
                width: '100%',
                maxWidth: 700,
                aspectRatio: '16/10',
                background: 'var(--cream-alt)',
                border: '1.5px solid var(--sand)',
                boxShadow: '8px 8px 0 var(--sand)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
                {/* Replace with <img src={proj.screenshot} .../> when you have screenshots */}
                <img
                  src={proj.screenshot}
                  alt={proj.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Metric badge */}
                <div style={{
                  position: 'absolute', bottom: '1rem', right: '1rem',
                  background: 'var(--rust)', color: 'var(--cream)',
                  fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 900,
                  padding: '6px 14px', letterSpacing: '-0.02em',
                }}>
                  {proj.ghostText}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Nav */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex items-center gap-4 lg:left-[450px] lg:translate-x-0 z-10">

          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="font-mono transition-all duration-200"
            style={{
              width: 48, height: 48,
              border: '1.5px solid var(--brown-mid)',
              background: 'transparent',
              color: 'var(--brown-mid)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current === 0 ? 'not-allowed' : 'none',
              opacity: current === 0 ? 0.3 : 1,
              fontSize: '1.1rem',
            }}
            onMouseEnter={e => { if (current !== 0) { e.currentTarget.style.background = 'var(--brown)'; e.currentTarget.style.color = 'var(--cream)'; } }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brown-mid)'; }}
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  borderRadius: i === current ? 3 : '50%',
                  background: i === current ? 'var(--rust)' : 'var(--sand)',
                  border: 'none',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            className="font-mono transition-all duration-200"
            style={{
              width: 48, height: 48,
              border: '1.5px solid var(--brown-mid)',
              background: 'transparent',
              color: 'var(--brown-mid)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current === total - 1 ? 'not-allowed' : 'none',
              opacity: current === total - 1 ? 0.3 : 1,
              fontSize: '1.1rem',
            }}
            onMouseEnter={e => { if (current !== total - 1) { e.currentTarget.style.background = 'var(--brown)'; e.currentTarget.style.color = 'var(--cream)'; } }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brown-mid)'; }}
          >
            →
          </button>
        </div>

        {/* Progress bar */}


      </div>
    </section>
  );
};

export default Projects;