import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const curRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cur = curRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;

    // Hide cursor on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      cur.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(cur, { x: mx, y: my, duration: 0.05, ease: 'none' });
    };

    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);

    // Cursor grow on hover
    const targets = document.querySelectorAll('a, button, .sk-tag');
    const enterFn = () => {
      gsap.to(cur, { scale: 0.3, duration: 0.15 });
      gsap.to(ring, { scale: 1.7, opacity: 0.85, duration: 0.2 });
    };
    const leaveFn = () => {
      gsap.to(cur, { scale: 1, duration: 0.15 });
      gsap.to(ring, { scale: 1, opacity: 0.4, duration: 0.2 });
    };
    targets.forEach(el => {
      el.addEventListener('mouseenter', enterFn);
      el.addEventListener('mouseleave', leaveFn);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', enterFn);
        el.removeEventListener('mouseleave', leaveFn);
      });
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div id="cur" ref={curRef} />
      <div id="cur-ring" ref={ringRef} />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}