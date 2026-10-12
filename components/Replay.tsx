'use client';

import { useEffect, useRef, useState } from 'react';
import { CANDLES, LEVELS as L, MOMENTS as M, STEPS, R_MULTIPLE } from '@/lib/replay';

const N = CANDLES.length;
const START = 20; // candles already on the chart before scrolling

const C = {
  bg: '#0e1013', grid: 'rgba(255,255,255,0.045)', axis: '#7d838c', up: '#34d399', down: '#ef5350',
  mint: '#34d399', mintFill: 'rgba(52,211,153,0.14)', red: 'rgba(239,83,80,0.16)', redLine: '#ef5350',
  white: '#e9ecef', liq: '#f5c451',
};

function draw(cv: HTMLCanvasElement, visible: number) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = cv.clientWidth, H = cv.clientHeight;
  if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
  const ctx = cv.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);

  const axisW = W < 520 ? 52 : 64, top = 44, bottom = H - 26;
  const plotW = W - axisW - 10;
  const cw = plotW / (N + 4);
  const y = (p: number) => bottom - ((p - L.yMin) / (L.yMax - L.yMin)) * (bottom - top);
  const x = (i: number) => 10 + i * cw + cw / 2;
  const right = 10 + plotW;
  const font = (s: number, w = 500) => `${w} ${s}px ui-monospace, "JetBrains Mono", monospace`;

  // grid + price axis
  ctx.font = font(10);
  for (let p = 21480; p <= 21570; p += 10) {
    const yy = y(p);
    ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(right, yy); ctx.stroke();
    ctx.fillStyle = C.axis; ctx.fillText(p.toLocaleString('en-US'), right + 8, yy + 3);
  }

  const vis = Math.floor(visible);
  const seen = (m: number) => vis > m;

  const label = (txt: string, xx: number, yy: number, bg: string, fg = '#0e1013') => {
    ctx.font = font(10, 700);
    const w = ctx.measureText(txt).width + 12;
    ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(xx, yy - 9, w, 18, 4); ctx.fill();
    ctx.fillStyle = fg; ctx.fillText(txt, xx + 6, yy + 4);
  };
  const dashed = (yy: number, x0: number, col: string) => {
    ctx.strokeStyle = col; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(right, yy); ctx.stroke(); ctx.setLineDash([]);
  };

  // liquidity levels
  if (seen(M.bslShown)) { dashed(y(L.bsl), x(5), C.liq); label('BSL · equal highs', x(5) - 4, y(L.bsl) - 14, C.liq); }
  if (seen(M.sslShown)) {
    const swept = seen(M.sweep);
    dashed(y(L.ssl), x(10), swept ? 'rgba(245,196,81,0.35)' : C.liq);
    label(swept ? 'SSL · swept' : 'SSL · equal lows', x(10) - 4, y(L.ssl) + 16, swept ? 'rgba(245,196,81,0.5)' : C.liq);
  }

  // fair value gap → inverted FVG
  if (seen(M.fvgFormed)) {
    const inverted = seen(M.inversion);
    const x0 = x(23) - cw / 2, yT = y(L.fvgTop), yB = y(L.fvgBottom);
    ctx.fillStyle = inverted ? C.mintFill : C.red;
    ctx.fillRect(x0, yT, right - x0, yB - yT);
    ctx.strokeStyle = inverted ? C.mint : C.redLine; ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, yT + 0.5, right - x0 - 1, yB - yT - 1);
    label(inverted ? 'IFVG · inverted' : 'FVG', right - (inverted ? 112 : 40), (yT + yB) / 2, inverted ? C.mint : C.redLine, inverted ? '#0e1013' : '#fff');
  }

  // position: risk/reward box like TradingView's long tool
  if (seen(M.entry)) {
    const x0 = x(M.entry) - cw / 2, x1 = right;
    ctx.fillStyle = 'rgba(52,211,153,0.10)'; ctx.fillRect(x0, y(L.target), x1 - x0, y(L.entry) - y(L.target));
    ctx.fillStyle = 'rgba(239,83,80,0.12)'; ctx.fillRect(x0, y(L.entry), x1 - x0, y(L.stop) - y(L.entry));
    ctx.strokeStyle = C.white; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y(L.entry)); ctx.lineTo(x1, y(L.entry)); ctx.stroke();
    label(`LONG ${L.entry}`, x0 + 4, y(L.entry) - 12, C.white);
    label(`SL ${L.stop}`, x0 + 4, y(L.stop) + 12, C.redLine, '#fff');
    if (!seen(M.tp)) label(`TP ${L.target}`, x0 + 4, y(L.target) - 12, C.mint);
  }

  // candles
  for (let i = 0; i < Math.min(vis + 1, N); i++) {
    const k = CANDLES[i];
    const partial = i === vis ? visible - vis : 1; // the newest candle "prints" as you scroll
    if (partial <= 0) continue;
    const c = k.o + (k.c - k.o) * partial;
    const up = c >= k.o;
    const col = up ? C.up : C.down;
    const xx = x(i);
    // a printing candle grows its wick with it; a finished one shows its full high/low
    const hi = partial < 1 ? Math.max(k.o, c) + (k.h - Math.max(k.o, k.c)) * partial : k.h;
    const lo = partial < 1 ? Math.min(k.o, c) - (Math.min(k.o, k.c) - k.l) * partial : k.l;
    ctx.strokeStyle = col; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(xx, y(hi)); ctx.lineTo(xx, y(lo)); ctx.stroke();
    ctx.fillStyle = col;
    const bw = Math.max(2, cw * 0.62);
    const yo = y(k.o), yc = y(c);
    ctx.fillRect(xx - bw / 2, Math.min(yo, yc), bw, Math.max(1.5, Math.abs(yc - yo)));
  }

  // markers
  if (seen(M.sweep)) {
    const xx = x(M.sweep), yy = y(CANDLES[M.sweep].l) + 16;
    ctx.fillStyle = C.liq; ctx.beginPath(); ctx.moveTo(xx, yy - 8); ctx.lineTo(xx - 6, yy + 2); ctx.lineTo(xx + 6, yy + 2); ctx.fill();
    label('Sweep', xx - 22, yy + 16, C.liq);
  }
  if (seen(M.tp)) {
    const xx = x(M.tp);
    label(`TP HIT  +${R_MULTIPLE}R`, Math.min(xx - 40, right - 110), y(L.target) - 16, C.mint);
  }

  // last price tag
  const lastI = Math.min(vis, N - 1);
  const k = CANDLES[lastI];
  const p = k.o + (k.c - k.o) * Math.min(1, visible - lastI || 1);
  const yy = y(p);
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.setLineDash([2, 3]);
  ctx.beginPath(); ctx.moveTo(x(lastI), yy); ctx.lineTo(right, yy); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = p >= k.o ? C.up : C.down; ctx.fillRect(right + 2, yy - 9, axisW - 4, 18);
  ctx.fillStyle = '#0e1013'; ctx.font = font(10, 700); ctx.fillText(p.toFixed(2), right + 6, yy + 4);
}

/**
 * "Bar replay": the section is tall; its chart sticks to the screen and each bit of scroll
 * prints the next candle, so the strategy plays out as the visitor scrolls.
 */
export default function Replay() {
  const box = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0);
  const [bar, setBar] = useState(START);

  useEffect(() => {
    let raf = 0;
    const render = () => {
      raf = 0;
      const el = box.current, c = cv.current;
      if (!el || !c) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      const visible = START + p * (N - START - 0.001);
      draw(c, visible);
      const v = Math.floor(visible);
      setBar(v);
      setStep(STEPS.findIndex((s) => v < s.until));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(render); };
    render();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="replay" id="strategy" ref={box} aria-labelledby="replay-title">
      <div className="replay-sticky">
        <div className="replay-copy">
          <span className="eyebrow-s">Bar replay · scroll to play</span>
          <h2 id="replay-title" className="h2">One strategy.<br /><em>Mechanical.</em></h2>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.k} className={i === step ? 'on' : i < step ? 'done' : ''}>
                <span className="k">{i < step ? '✓' : s.k}</span>
                <div><b>{s.t}</b><p>{s.d}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="chart">
          <div className="chart-bar">
            <span><i className="dot" />NQ1! · 1m · CME</span>
            <span className="muted">The Tech+ IFVG</span>
            <span className="muted">Bar {bar + 1} / {N}</span>
          </div>
          <canvas ref={cv} aria-label="Animated chart replay of the IFVG strategy on NQ futures" role="img" />
          <p className="chart-note">Illustrative replay for education. Not a live trade or a signal.</p>
        </div>
      </div>
    </section>
  );
}
