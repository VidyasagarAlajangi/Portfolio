import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 'top 0',
      onEnter: () => navRef.current.classList.add('bg-cream/93', 'backdrop-blur-[14px]', 'border-b', 'border-sand'),
      onLeaveBack: () => navRef.current.classList.remove('bg-cream/93', 'backdrop-blur-[14px]', 'border-b', 'border-sand'),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-5 sm:px-8 lg:px-[60px] h-[66px] transition-all duration-300 pointer-events-auto">
      <a href="#hero" className="font-serif text-[1.05rem] font-black text-brown no-underline">VS.</a>
      <ul className="hidden sm:flex gap-10 list-none">
        <li><a href="#about" className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-brown-mid transition-colors duration-200 hover:text-rust">About</a></li>
        <li><a href="#skills" className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-brown-mid transition-colors duration-200 hover:text-rust">Skills</a></li>
        <li><a href="#projects" className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-brown-mid transition-colors duration-200 hover:text-rust">Projects</a></li>
        <li><a href="#contact" className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-brown-mid transition-colors duration-200 hover:text-rust">Contact</a></li>
      </ul>
      <a href="https://drive.google.com/file/d/1_VV2jd5HJcQd1tX5VmOEDFwT_sQJQ4ah/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="sm:inline-block font-mono text-[0.68rem] tracking-[0.1em] uppercase border-[1.5px] border-brown text-brown px-[18px] py-[7px] transition-all duration-200 hover:bg-brown hover:text-cream">Resume</a>
    </nav>
  );
};

export default Navbar;
