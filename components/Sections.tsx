import Image from 'next/image';
import Logo from './Logo';
import { FAQ, LINKS, PAYOUT_HIGHLIGHTS, TESTIMONIALS_URL, TIERS } from '@/lib/site';

export function Proof() {
  return (
    <section id="proof" className="dark" aria-labelledby="proof-title">
      <div className="sec-head">
        <span className="eyebrow-s">From the Discord</span>
        <h2 id="proof-title" className="h2" data-reveal>Receipts,<br /><em>not promises.</em></h2>
      </div>
      <div className="proof-grid">
        <a className="proof-feature" href={LINKS.instagram} target="_blank" rel="noopener" data-reveal>
          <div className="pf-copy">
            <span className="tag">Student spotlight</span>
            <b className="amt">$36,765.67</b>
            <p>One MyFundedFutures payout, posted by student <strong>Money Car</strong>.</p>
            <span className="muted small">“It didn’t start like this.”</span>
          </div>
          <div className="pf-img"><Image src="/img/student-moneycar.jpg" alt="Student spotlight post: Money Car, $36,765.67 MyFundedFutures payout certificate" width={512} height={640} sizes="(max-width: 900px) 90vw, 30vw" /></div>
        </a>
        <div className="proof-side">
          <a className="proof-card" href={LINKS.instagram} target="_blank" rel="noopener" data-reveal data-delay="0.1">
            <Image src="/img/tp-hit.jpg" alt="Post: price about to hit Juni's take-profit on NQ" width={360} height={640} sizes="(max-width: 900px) 45vw, 15vw" />
            <span>TP hit, called in the Discord</span>
          </a>
          <a className="proof-card" href={LINKS.instagram} target="_blank" rel="noopener" data-reveal data-delay="0.2">
            <Image src="/img/juni-payout.jpg" alt="Post: Juni holding a phone showing +$11,030.82" width={360} height={640} sizes="(max-width: 900px) 45vw, 15vw" />
            <span>Juni’s own P&amp;L, posted on Instagram</span>
          </a>
        </div>
      </div>
      <div className="payouts" data-reveal>
        <span className="muted">Monthly payout receipts on Instagram</span>
        <div className="chips">
          {PAYOUT_HIGHLIGHTS.map((p) => <a key={p.m} href={p.href} target="_blank" rel="noopener">{p.m} 💰</a>)}
          <a href={TESTIMONIALS_URL} target="_blank" rel="noopener" className="alt">Testimonials ↗</a>
        </div>
      </div>
      <p className="fine">Results shown are individual and not typical. Trading futures involves substantial risk of loss.</p>
    </section>
  );
}

export function Juni() {
  return (
    <section className="juni" aria-labelledby="juni-title">
      <div className="juni-grid">
        <div className="juni-photo" data-reveal>
          <Image src="/img/juni-bedroom.jpg" alt="Juni, founder of The Tech, filming from his bedroom setup" width={360} height={640} sizes="(max-width: 900px) 70vw, 28vw" />
          <span className="juni-badge"><Logo size={18} /> Founder</span>
        </div>
        <div>
          <span className="eyebrow-s">Meet your mentor</span>
          <h2 id="juni-title" className="h2" data-reveal>Meet <em>Juni.</em></h2>
          <p className="lead" data-reveal>Aussie-Korean NQ futures trader and the founder of The Tech. He started out trading from his bedroom, and built everything around one idea: the edge isn’t a secret pattern, it’s <strong>one mechanical model, executed the same way every day.</strong></p>
          <p className="lead" data-reveal>The Tech is that model, the tools that show it on your chart, and a room of traders who sit through the NY open with you, even at midnight Sydney time.</p>
          <blockquote data-reveal>“Trust, it’s the tech.”</blockquote>
          <a className="btn ghost" href={LINKS.instagram} target="_blank" rel="noopener">Follow @junithetech <span className="arr">→</span></a>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title">
      <div className="sec-head center">
        <span className="eyebrow-s">Pick your tier</span>
        <h2 id="pricing-title" className="h2" data-reveal>Build your <em>edge.</em></h2>
        <p className="lead">Each higher tier includes everything below it. Purchases and subscriptions are completed securely through Whop.</p>
      </div>
      <div className="tiers">
        {TIERS.map((t, i) => (
          <div key={t.n} className={`tier ${'featured' in t && t.featured ? 'featured' : ''}`} data-reveal data-delay={i * 0.08}>
            {'featured' in t && t.featured && <span className="ribbon">Full strategy</span>}
            <span className="tier-n">{t.n} · {t.name}</span>
            <div className="price">{t.price ? <><b>${t.price}</b><span>/ month</span></> : <b className="soon">Waitlist</b>}</div>
            <p className="tier-blurb">{t.blurb}</p>
            <ul>{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
            <a className={`btn ${'featured' in t && t.featured ? '' : 'ghost'} block`} href={t.href} target="_blank" rel="noopener">{t.cta} <span className="arr">→</span></a>
          </div>
        ))}
      </div>
      <div className="extras">
        <div className="extra" data-reveal>
          <div><span className="tier-n">Lifetime · by application</span><b>$2,000 once</b><p>Starts with a call with the team, so we can make sure it’s the right fit.</p></div>
          <a className="btn ghost" href={LINKS.applyLifetime} target="_blank" rel="noopener">Apply for lifetime</a>
        </div>
        <div className="extra" data-reveal data-delay="0.08">
          <div><span className="tier-n">1-on-1 · one hour</span><b>$350 mentor call</b><p>Bring charts, questions and setups. Leave with a plan and feedback for where you are now.</p></div>
          <a className="btn ghost" href={LINKS.call} target="_blank" rel="noopener">Book a call</a>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="faq-grid">
        <div>
          <span className="eyebrow-s">Questions</span>
          <h2 id="faq-title" className="h2" data-reveal>Before you<br /><em>join.</em></h2>
          <p className="lead">Something else? Email <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>.</p>
        </div>
        <div>
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}<span className="pm" aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Final() {
  return (
    <section className="final dark" aria-labelledby="final-title">
      <h2 id="final-title" className="h2 xl" data-reveal>See you at<br />the <em>open.</em></h2>
      <p className="lead">Join the community free: free trading lessons and the Discord. Upgrade when you’re ready.</p>
      <div className="ctas center">
        <a className="btn mint lg" href={LINKS.free} target="_blank" rel="noopener">Join the free Discord <span className="arr">→</span></a>
        <a className="btn ghost-inv lg" href={LINKS.apply} target="_blank" rel="noopener">Not sure? Apply</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="foot-top">
        <a href="#top" className="brand"><Logo size={26} /> THE TECH</a>
        <nav aria-label="Footer">
          <a href={LINKS.outlooks} target="_blank" rel="noopener">Outlooks</a>
          <a href={LINKS.discord} target="_blank" rel="noopener">Discord</a>
          <a href={LINKS.instagram} target="_blank" rel="noopener">Instagram</a>
          <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          <a href={LINKS.terms} target="_blank" rel="noopener">Terms</a>
          <a href={LINKS.privacy} target="_blank" rel="noopener">Privacy</a>
        </nav>
      </div>
      <p className="disclaimer">Trading futures involves substantial risk of loss and is not suitable for every investor. Nothing on this site constitutes financial advice. Results shown are not typical, and past performance is not indicative of future results. Chart replays are illustrative and for education only.</p>
      <p className="copy">© {new Date().getFullYear()} The Tech · Trust, it’s the tech.</p>
    </footer>
  );
}
