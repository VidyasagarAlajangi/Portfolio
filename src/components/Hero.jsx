import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const nameRef = useRef(null);
  const charsRef = useRef([]);
  const tagRef = useRef(null);
  const bottomRef = useRef(null);
  const ghostRef = useRef(null);
  useEffect(() => {
    const nameEl = nameRef.current;
    if (!nameEl) return;

    nameEl.innerHTML = '';
    charsRef.current = [];

    const lines = ["Alajangi", "Vidya Sagar"];
    const lineElements = [];

    lines.forEach((line, lineIndex) => {
      const lineWrapper = document.createElement('div');
      lineWrapper.style.display = 'block';
      lineWrapper.style.paddingBottom = lineIndex === 0 ? '0.2em' : '0';

      lineElements.push(lineWrapper);

      line.split('').forEach(ch => {
        if (ch === ' ') {
          const sp = document.createElement('span');
          sp.style.cssText = 'display:inline-block;width:0.4em';
          lineWrapper.appendChild(sp);
        } else {
          const s = document.createElement('span');
          s.className = 'char';
          s.setAttribute('data-char', ch);
          s.textContent = ch;
          lineWrapper.appendChild(s);
          charsRef.current.push(s);
        }
      });

      nameEl.appendChild(lineWrapper);
    });

    const chars = charsRef.current;
    gsap.set([tagRef.current, bottomRef.current], {
      opacity: 0,
      y: 40,
    });
    // ENTRY
    gsap.set(chars, {
      y: 140,
      opacity: 0,
      scale: 0.85,
      filter: 'blur(14px)',
    });

    gsap.set(bottomRef.current, {
      opacity: 0,
      y: 60,
    });
    const tl = gsap.timeline({ delay: 0.3 });

    tl
      .to(chars, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power4.out',
        stagger: {
          each: 0.04,
          from: 'center',
        },
      })
      .to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.9')
      .to(bottomRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6');

    // ── LIGHT FOLLOW SYSTEM ─────────────────
    const updateLight = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      document.documentElement.style.setProperty('--mx', `${x}px`);
      document.documentElement.style.setProperty('--my', `${y}px`);
    };

    // ── PHYSICS MAGNETIC ────────────────────
    const onMove = (e) => {
      const rect = nameEl.getBoundingClientRect();

      chars.forEach((char) => {
        const r = char.getBoundingClientRect();

        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);

        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 120 - dist) / 120;

        gsap.to(char, {
          x: dx * force * 0.25,
          y: dy * force * 0.25,
          scale: 1 + force * 0.2,
          duration: 0.4,
          ease: 'power3.out',
        });
      });

      // ghost reacts slower (depth illusion)
      gsap.to(ghostRef.current, {
        x: (e.clientX - rect.width / 2) * 0.02,
        y: (e.clientY - rect.height / 2) * 0.02,
        duration: 1.2,
        ease: 'power3.out',
      });
    };

    const reset = () => {
      gsap.to(chars, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: { each: 0.002 },
      });
    };

    // ── ENERGY PULSE ────────────────────────
    const pulse = () => {
      gsap.to(chars, {
        scale: 1.08,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.01,
          from: 'center',
        },
      });
    };

    nameEl.addEventListener('mousemove', onMove);
    nameEl.addEventListener('mouseleave', reset);
    nameEl.addEventListener('mouseenter', pulse);
    window.addEventListener('mousemove', updateLight);

    return () => {
      nameEl.removeEventListener('mousemove', onMove);
      nameEl.removeEventListener('mouseleave', reset);
      nameEl.removeEventListener('mouseenter', pulse);
      window.removeEventListener('mousemove', updateLight);
      tl.kill();
    };
  }, []);

  const scrollTo = (id) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: `#${id}`, offsetY: 66 },
      ease: 'power3.inOut',
    });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderBottom: '1.5px solid var(--sand)',
        padding: '0 clamp(20px, 6vw, 80px)',
      }}
    >
      {/* ── Ghost year — large, right side ── */}
      <div
        aria-hidden="true"
        className="hidden sm:block"
        style={{
          position: 'absolute',
          top: '50%',
          right: -20,
          transform: 'translateY(-52%)',
          fontFamily: 'var(--serif)',
          fontWeight: 900,
          fontSize: 'clamp(200px, 30vw, 420px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(44,30,18,0.07)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          letterSpacing: '-0.04em',
        }}
      >
        2026
      </div>

      {/* ── Centre block: tag + name — fills viewport height ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',  /* name+tag sit in vertical centre */
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Tag line — just above the name */}
        <div
          ref={tagRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'var(--mono)',
            fontSize: '0.67rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--brown-mid)',
            marginBottom: '1.2rem',
            opacity: 0,
          }}
        >
          <span style={{
            width: 28, height: 1,
            background: 'var(--rust)',
            display: 'inline-block',
            flexShrink: 0,
          }} />
          Full-Stack Developer &amp; AI Systems Architect
        </div>

        {/* Hero name — chars injected by GSAP */}
        <h1
          ref={nameRef}
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 900,
            willChange: 'transform',
            fontSize: 'clamp(2.5rem, 10vw, 10rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
            cursor: 'none',
            maxWidth: '100%',
          }}
        />
      </div>

      {/* ── Bottom row — pinned to bottom of section ── */}
      <div
        ref={bottomRef}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '2.5rem',
          paddingBottom: 'clamp(40px, 10vh, 102px)',
          opacity: 0,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left — italic description */}
        <p style={{
          fontFamily: 'var(--body)',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'var(--brown-mid)',
          maxWidth: 460,
          lineHeight: 1.85,
          margin: 0,
        }}>
          Architecting scalable full-stack ecosystems where AI meets infrastructure. From immutable blockchain ledgers to AI-powered clinical triage, I build for impact and measurement.
        </p>

        {/* Right — buttons + scroll hint */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', flexShrink: 0 }}>

          {/* View Work — rust filled */}
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); scrollTo('projects'); }}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'var(--rust)',
              color: 'var(--cream)',
              padding: '18px 36px',
              textDecoration: 'none',
              cursor: 'none',
              display: 'inline-block',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--rust-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--rust)'}
          >
            View Work
          </a>

          {/* Get In Touch + SCROLL stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('contact'); }}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1.5px solid var(--brown)',
                color: 'var(--brown)',
                padding: '17px 36px',
                textDecoration: 'none',
                cursor: 'none',
                display: 'inline-block',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brown)'; e.currentTarget.style.color = 'var(--cream)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brown)'; }}
            >
              Get In Touch
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;