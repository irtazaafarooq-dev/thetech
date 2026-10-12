'use client';

import { useEffect, useRef, useState } from 'react';
import { LINKS } from '@/lib/site';

const TABS = [
  { k: 'mentorship', t: 'Mentorship', s: 'Learn it' },
  { k: 'indicator', t: 'IFVG Indicator', s: 'See it' },
  { k: 'orb', t: 'ORB', s: 'Automate it' },
] as const;

const COURSE = [
  ['01', 'Market structure & liquidity', 'Foundations'],
  ['02', 'Fair value gaps & inversions', 'The model'],
  ['03', 'Power of 3 & session timing', 'The model'],
  ['04', 'Entries, stops & targets', 'Execution'],
  ['05', 'Risk, journaling & psychology', 'Discipline'],
  ['06', 'Prop firm evaluations', 'Funding'],
];

const ORB_LOG = [
  ['09:30:00', 'Session open · building opening range'],
  ['09:45:00', 'Range locked · H 21,548.25 · L 21,512.50'],
  ['09:52:14', 'Close above range high · rules met'],
  ['09:52:15', 'LONG 2 MNQ @ 21,549.00 · SL 21,530.00'],
  ['10:07:41', 'Target reached · +2.0R · position flat'],
  ['10:07:42', 'Done for the session. No revenge trades.'],
];

function OrbTerminal({ active }: { active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    setN(0);
    const id = setInterval(() => setN((v) => (v >= ORB_LOG.length ? v : v + 1)), 650);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="term" role="img" aria-label="Example ORB bot log: opening range, breakout entry, target reached">
      <div className="term-bar"><i /><i /><i /><span>orb · NQ · demo log</span></div>
      <div className="term-body">
        {ORB_LOG.slice(0, n).map(([t, l], i) => (
          <p key={t} className={i === 3 ? 'buy' : i === 4 ? 'win' : ''}><span>{t}</span>{l}</p>
        ))}
        {n < ORB_LOG.length && <p className="cursor">▍</p>}
      </div>
    </div>
  );
}

function IndicatorMock() {
  return (
    <div className="tv" role="img" aria-label="TradingView-style indicator settings and alert log for The Tech+ IFVG">
      <div className="tv-head"><span className="tv-name">The Tech+ IFVG</span><span className="tv-chip">v2 · invite-only</span></div>
      <div className="tv-rows">
        {[['Show FVGs', true], ['Highlight inversions', true], ['Liquidity levels', true], ['Session filter · NY AM', true], ['Alerts → Discord', true]].map(([k, on]) => (
          <div className="tv-row" key={k as string}><span>{k as string}</span><span className={`sw ${on ? 'on' : ''}`} /></div>
        ))}
      </div>
      <div className="tv-alerts">
        <span className="muted">Alerts</span>
        <p><b className="mint">▲ IFVG long</b> NQ1! 1m · retest 21,518</p>
        <p><b className="gold">◆ Liquidity</b> SSL swept · 21,482</p>
        <p><b className="mint">✓ Target</b> BSL 21,556 reached</p>
      </div>
    </div>
  );
}

export default function Products() {
  const [tab, setTab] = useState<(typeof TABS)[number]['k']>('mentorship');
  const sec = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    if (sec.current) io.observe(sec.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="products" ref={sec} aria-labelledby="products-title">
      <div className="sec-head">
        <span className="eyebrow-s">Three tiers · one progression</span>
        <h2 id="products-title" className="h2" data-reveal>Learn it. See it.<br /><em>Automate it.</em></h2>
      </div>
      <div className="tabs" role="tablist" aria-label="Products">
        {TABS.map((t) => (
          <button key={t.k} role="tab" aria-selected={tab === t.k} onClick={() => setTab(t.k)}>
            <small>{t.s}</small>{t.t}
          </button>
        ))}
      </div>

      <div className="panel" role="tabpanel">
        {tab === 'mentorship' && (
          <div className="panel-grid">
            <div>
              <h3>Mentorship</h3>
              <p className="lead">Build a repeatable edge in NQ futures: the complete course, daily market outlooks, live trade breakdowns, accountability, psychology support and direct mentor Q&amp;A.</p>
              <a className="btn" href={LINKS.tier1} target="_blank" rel="noopener">From $200 / month <span className="arr">→</span></a>
            </div>
            <ol className="course">
              {COURSE.map(([n, t, tag]) => <li key={n}><span>{n}</span><b>{t}</b><em>{tag}</em></li>)}
            </ol>
          </div>
        )}
        {tab === 'indicator' && (
          <div className="panel-grid">
            <div>
              <h3>The Tech+ IFVG indicator</h3>
              <p className="lead">The exact tool used in the strategy, on your TradingView chart. Gaps, inversions and liquidity drawn for you, with live alerts in Discord, setup help and ongoing troubleshooting.</p>
              <a className="btn" href={LINKS.tier2} target="_blank" rel="noopener">Tier 2 · $250 / month <span className="arr">→</span></a>
            </div>
            <IndicatorMock />
          </div>
        )}
        {tab === 'orb' && (
          <div className="panel-grid">
            <div>
              <h3>ORB, our first bot</h3>
              <p className="lead">ORB runs the opening-range rules the same way every session, without hesitation or discretion. Tier 3 members get first access when it opens.</p>
              <a className="btn" href={LINKS.orb} target="_blank" rel="noopener">Join the waitlist <span className="arr">→</span></a>
            </div>
            <OrbTerminal active={seen && tab === 'orb'} />
          </div>
        )}
      </div>
    </section>
  );
}
