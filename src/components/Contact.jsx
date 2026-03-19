import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [state, handleSubmit] = useForm("mwvryqoa");  // ← replaces all your fetch logic

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.r-left').forEach(el => {
        gsap.to(el, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      });
      gsap.utils.toArray('.r-right').forEach(el => {
        gsap.to(el, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="px-5 sm:px-8 lg:px-[60px] py-[110px] bg-[var(--cream-alt)]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[80px] items-start">

        {/* ── Left: info ── */}
        <div className="contact-left r-left opacity-0 translate-x-[-44px]">
          <h2 className="font-serif text-[clamp(2rem,4.5vw,4rem)] font-black leading-[0.95] tracking-[-0.03em] mb-5">
            Got a role<br />in mind?<br /><em className="text-rust italic">Let's talk.</em>
          </h2>
          <p className="font-body italic text-[1rem] text-brown-mid leading-[1.9] mb-8">
            I'm available now. If you're building something and need someone who ships, send a message.
          </p>
          <div className="flex flex-col gap-0 border-t border-sand">
            <a href="mailto:vidyasagaralajangi@gmail.com" className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.04em] text-brown py-3.5 border-b border-sand transition-all duration-200 hover:text-rust hover:gap-6">
              <span className="text-[0.58rem] tracking-[0.14em] uppercase text-sand min-w-[52px]">Email</span>
              vidyasagaralajangi@gmail.com
            </a>
            <a href="https://linkedin.com/in/alajangi-vidyasagar" target="_blank" rel="noreferrer" className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.04em] text-brown py-3.5 border-b border-sand transition-all duration-200 hover:text-rust hover:gap-6">
              <span className="text-[0.58rem] tracking-[0.14em] uppercase text-sand min-w-[52px]">LinkedIn</span>
              alajangi-vidyasagar
            </a>
            <a href="https://github.com/VidyasagarAlajangi" target="_blank" rel="noreferrer" className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.04em] text-brown py-3.5 border-b border-sand transition-all duration-200 hover:text-rust hover:gap-6">
              <span className="text-[0.58rem] tracking-[0.14em] uppercase text-sand min-w-[52px]">GitHub</span>
              VidyasagarAlajangi
            </a>
            <a href="tel:+917702162216" className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.04em] text-brown py-3.5 border-b border-sand transition-all duration-200 hover:text-rust hover:gap-6">
              <span className="text-[0.58rem] tracking-[0.14em] uppercase text-sand min-w-[52px]">Phone</span>
              +91 7702162216
            </a>
          </div>
        </div>

        {/* ── Right: form ── */}
        {state.succeeded ? (
          // Success state — replaces the form entirely
          <div className="r-right opacity-0 translate-x-[44px] flex flex-col gap-4 justify-center min-h-[300px]">
            <div className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-rust mb-2">Message received</div>
            <p className="font-serif font-black text-[2rem] leading-[1.1] text-ink">
              Thanks — I'll<br />be in touch.
            </p>
            <p className="font-body text-brown-mid text-[0.9rem] leading-[1.8]">
              Usually within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[1.4rem] r-right opacity-0 translate-x-[44px]">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-brown-mid">Name</label>
              <input
                id="name" name="name" type="text"
                placeholder="Your name" required
                className="bg-transparent border-none border-b-[1.5px] border-sand py-2 font-body text-[1rem] text-ink outline-none transition-colors duration-200 focus:border-rust"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors}
                className="font-mono text-[0.6rem] text-rust" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-brown-mid">Email</label>
              <input
                id="email" name="email" type="email"
                placeholder="you@company.com" required
                className="bg-transparent border-none border-b-[1.5px] border-sand py-2 font-body text-[1rem] text-ink outline-none transition-colors duration-200 focus:border-rust"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors}
                className="font-mono text-[0.6rem] text-rust" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-brown-mid">Message</label>
              <textarea
                id="message" name="message"
                placeholder="Tell me about the role..." required
                className="bg-transparent border-none border-b-[1.5px] border-sand py-2 font-body text-[1rem] text-ink outline-none transition-colors duration-200 focus:border-rust min-h-[110px] resize-none leading-[1.7]"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors}
                className="font-mono text-[0.6rem] text-rust" />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className={`font-mono text-[0.7rem] tracking-[0.12em] uppercase bg-ink text-cream border-none px-[30px] py-[15px] w-full sm:w-auto self-start transition-all duration-200 mt-1
                ${state.submitting
                  ? 'opacity-60 cursor-default'
                  : 'hover:bg-rust hover:-translate-y-0.5'
                }`}
            >
              {state.submitting ? 'Sending...' : 'Send Message ↗'}
            </button>

          </form>
        )}

      </div>
    </section>
  );
};

export default Contact;