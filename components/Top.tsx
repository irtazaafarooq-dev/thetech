'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import SessionClock from './SessionClock';
import { LINKS } from '@/lib/site';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand" aria-label="The Tech home"><Logo size={28} /> THE TECH</a>
      <nav className="nav-links" aria-label="Sections">
        <a href="#strategy">Strategy</a>
        <a href="#products">Products</a>
        <a href="#proof">Proof</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div className="nav-cta">
        <a className="btn ghost sm" href={LINKS.free} target="_blank" rel="noopener">Start free</a>
        <a className="btn sm" href="#pricing">Choose a tier</a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div>
          <span className="pill"><span className="flag">AU × KR</span> NQ futures mentorship · ICT</span>
          <h1>
            <span className="line">Trust,</span>
            <span className="line">it’s the <em>tech.</em></span>
          </h1>
          <p className="lead">
            Learn <strong>one mechanical NQ strategy</strong>, see it on your chart with our indicator, and trade it with mentors beside you every session.
          </p>
          <div className="ctas">
            <a className="btn lg" href="#pricing">Choose a tier <span className="arr">→</span></a>
            <a className="btn ghost lg" href={LINKS.free} target="_blank" rel="noopener">Start free</a>
          </div>
          <ul className="trust">
            <li><b>A–Z</b> ICT &amp; SMC course</li>
            <li><b>Daily</b> NQ outlooks</li>
            <li><b>7-day</b> refund</li>
          </ul>
        </div>
        <SessionClock />
      </div>
      <a className="scroll-cue" href="#strategy" aria-label="Scroll to the strategy"><span>Scroll to watch the strategy play out</span><i /></a>
    </section>
  );
}
