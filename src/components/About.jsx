import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import photo from '../assets/22222.jpeg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Set initial states via GSAP — not Tailwind classes
      gsap.set(leftRef.current, { opacity: 0, x: -44 });
      gsap.set(rightRef.current, { opacity: 0, x: 44 });

      gsap.to(leftRef.current, {
        opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 86%', once: true }
      });

      gsap.to(rightRef.current, {
        opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: rightRef.current, start: 'top 86%', once: true }
      });

      // Fact rows stagger
      gsap.from('.fact-row', {
        opacity: 0, y: 14, duration: 0.45, ease: 'power2.out', stagger: 0.06,
        scrollTrigger: { trigger: '.about-facts', start: 'top 82%', once: true }
      });

      // Photo parallax
      gsap.to(photoRef.current, {
        yPercent: -8, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: 'var(--cream-alt)', borderBottom: '1.5px solid var(--sand)' }}
      className="px-5 sm:px-8 lg:px-[60px] py-[50px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-[80px] items-center justify-center max-w-[1100px]">

        {/* Left — text */}
        <div ref={leftRef}>
          {/* Section label */}
          <div className="flex items-center gap-5 mb-2">
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.65rem', letterSpacing: '0.22em', color: 'var(--rust)' }}
            >
              About
            </span>
            <span style={{ width: 36, height: 1, background: 'var(--sand)', display: 'block' }} />
          </div>

          <h2
            className="font-serif font-black text-ink mb-6"
            style={{ fontSize: 'clamp(2rem,5vw,4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
          >
            I ship.<br />
            <em style={{ color: 'var(--rust)', fontStyle: 'italic' }}>For real.</em>
          </h2>

          <p
            className="font-body text-brown-mid mb-8"
            style={{ fontSize: '1rem', lineHeight: 1.95 }}
          >
            Final-year CS student at RGUKT Srikakulam, graduating mid-2026.
            I've built <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>three real platforms</strong> from
            scratch — a blockchain certificate system, an AI telehealth app, and a full-stack restaurant tool.
            Each one shipped, tested, and measured.
            <br /><br />
            Looking for a full-stack or backend engineering role where I can keep building things that matter.
          </p>

          {/* Fact table */}
          <div className="about-facts flex flex-col" style={{ borderTop: '1px solid var(--sand)' }}>
            {[
              ['Degree', 'B.Tech Computer Science · 8.72 CGPA'],
              ['Graduating', '2026 · RGUKT Srikakulam'],
              ['Stack', 'MERN · Spring Boot · Java'],
              ['Location', 'Andhra Pradesh · Open to remote'],
              ['Looking for', 'Full-time · Full-stack / Backend'],
            ].map(([key, val]) => (
              <div
                key={key}
                className="fact-row flex items-baseline justify-between"
                style={{ padding: '0.9rem 0', borderBottom: '1px solid var(--sand)' }}
              >
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '0.63rem', letterSpacing: '0.13em', color: 'var(--sand)' }}
                >
                  {key}
                </span>
                <span
                  className="font-body text-right text-ink"
                  style={{ fontSize: '0.95rem' }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo */}
        <div ref={rightRef} className="relative flex flex-col gap-6" style={{ paddingLeft: '120px' }}>
          <div
            ref={photoRef}
            className="photo-box overflow-hidden relative h-[550px] w-[550px] sm:w-[300px]"
            style={{ aspectRatio: '0.78', background: 'var(--sand)' }}
          >
            <img
              src={photo}
              alt="Alajangi Vidya Sagar"
              className="w-full h-full object-cover object-top"
              onError={e => { e.target.style.display = 'none'; }}
            />

            {/* Corner brackets */}
            <span style={{
              position: 'absolute', top: -6, left: -6,
              width: 32, height: 32,
              borderTop: '2px solid var(--rust)',
              borderLeft: '2px solid var(--rust)',
            }} />
            <span style={{
              position: 'absolute', bottom: -6, right: -6,
              width: 32, height: 32,
              borderBottom: '2px solid var(--rust)',
              borderRight: '2px solid var(--rust)',
            }} />
          </div>

          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.58rem', letterSpacing: '0.13em', color: 'var(--brown-mid)' }}
          >
            Alajangi Vidya Sagar — 2026
          </span>
        </div>

      </div>
    </section>
  );
};

export default About;