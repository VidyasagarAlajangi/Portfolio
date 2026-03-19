import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brown px-5 sm:px-8 lg:px-[60px] py-6 border-t-[3px] border-rust text-sand">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">

        {/* Left */}
        <div className="text-center sm:text-left">
          <div className="font-serif text-[1.5rem] font-black text-cream">VS.</div>
          <p className="font-mono text-[0.65rem] tracking-[0.08em] uppercase mt-2">
            Building clean & creative web experiences
          </p>
        </div>

        {/* Center - Navigation */}
        <div className="flex gap-6 font-mono text-[0.65rem] tracking-[0.1em] uppercase">
          <a href="#hero" className="hover:text-cream transition">Home</a>
          <a href="#projects" className="hover:text-cream transition">Projects</a>
          <a href="#contact" className="hover:text-cream transition">Contact</a>
        </div>

        {/* Right - Actions */}
        <div className="flex gap-4 items-center">

          {/* Resume Button */}
          <a
            href="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.6rem] tracking-[0.1em] uppercase border border-sand px-4 py-2 hover:bg-cream hover:text-brown transition"
          >
            Resume
          </a>

          {/* Social Links */}
          <a
            href="https://github.com/vidyasagaralajangi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream transition"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/alajangi-vidyasagar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream transition"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className=" flex justify-center items-center mt-8 text-center font-mono text-[0.6rem] tracking-[0.08em] uppercase">
        © 2026 Alajangi Vidya Sagar • Designed & Built by Me 🚀
      </div>

      {/* Back to Top */}


    </footer>
  );
};

export default Footer;