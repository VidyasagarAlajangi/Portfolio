import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const labelRef   = useRef(null);
  const asideRef   = useRef(null);
  const listRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Set initial states via GSAP
      gsap.set([labelRef.current, titleRef.current], { opacity: 0, y: 44 });
      gsap.set(asideRef.current, { opacity: 0, x: -44 });
      gsap.set(listRef.current,  { opacity: 0, x:  44 });

      // Reveal label
      gsap.to(labelRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 88%', once: true }
      });

      // Reveal title
      gsap.to(titleRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: titleRef.current, start: 'top 88%', once: true }
      });

      // Reveal aside note
      gsap.to(asideRef.current, {
        opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: asideRef.current, start: 'top 86%', once: true }
      });

      // Reveal skill list wrapper
      gsap.to(listRef.current, {
        opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 86%', once: true }
      });

      // Stagger skill rows
      gsap.from('.skill-row', {
        opacity: 0, x: -20, duration: 0.5, ease: 'power2.out', stagger: 0.07,
        scrollTrigger: { trigger: listRef.current, start: 'top 76%', once: true }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="px-5 sm:px-8 lg:px-[60px] py-[110px]"
      style={{ borderBottom: '1.5px solid var(--sand)' }}
    >
      <div className="max-w-[1100px]">

        {/* Section label */}
        <div ref={labelRef} className="flex items-center gap-2.5 mb-2">
          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.65rem', letterSpacing: '0.22em', color: 'var(--rust)' }}
          >
            Skills
          </span>
          <span style={{ width: 36, height: 1, background: 'var(--sand)', display: 'block' }} />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-serif font-black text-ink mb-6"
          style={{ fontSize: 'clamp(2rem,5vw,4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
        >
          The<br />
          <em style={{ color: 'var(--rust)', fontStyle: 'italic' }}>toolkit.</em>
        </h2>

        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[220px_1fr] items-start"
          style={{ gap: '48px', marginTop: 60 }}
        >
          {/* Sticky aside */}
          <p
            ref={asideRef}
            className="font-body italic text-brown-mid lg:sticky"
            style={{ fontSize: '1rem', lineHeight: 1.9, top: 110 }}
          >
            Every tool below has been used in something that shipped — not just listed for decoration.
          </p>

          {/* Skill rows */}
          <div ref={listRef} className="skill-list flex flex-col">
            {skills.map((skillObj, i) => (
              <div
                key={i}
                className="skill-row grid items-start"
                style={{
                  gridTemplateColumns: '140px 1fr',
                  gap: '1.5rem',
                  padding: '1.3rem 0',
                  borderTop: '1px solid var(--sand)',
                  borderBottom: i === skills.length - 1 ? '1px solid var(--sand)' : 'none',
                }}
              >
                {/* Category label */}
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.13em',
                    color: 'var(--rust)',
                    paddingTop: 4,
                  }}
                >
                  {skillObj.category}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-[7px]">
                  {skillObj.tags.map((tag, j) => (
                    <span key={j} className="sk-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;