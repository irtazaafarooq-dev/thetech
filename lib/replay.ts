// A scripted NQ 1-minute session that walks through the IFVG model step by step.
// Prices are illustrative (education, not a real trade).

export type Candle = { o: number; h: number; l: number; c: number };

const CLOSES = [
  21528, 21534, 21541, 21538, 21547, 21552, 21545, 21536, 21527, 21519,
  21514, 21522, 21531, 21540, 21548, 21543, 21534, 21526, 21517, 21515,
  21524, 21530, 21524, 21518, 21496, 21490, 21494, 21499, 21512, 21527,
  21533, 21528, 21522, 21518, 21527, 21533, 21530, 21538, 21544, 21541,
  21549, 21554, 21552, 21559, 21556, 21562, 21558, 21565,
];

// hand-placed wicks for the moments that matter
const OVERRIDE: Record<number, Partial<Candle>> = {
  5: { h: 21556 }, 14: { h: 21557 },            // equal highs = buy-side liquidity
  10: { l: 21511 }, 19: { l: 21511 },           // equal lows = sell-side liquidity
  23: { l: 21516 },                             // top of the fair value gap
  24: { h: 21519, l: 21494 },                   // displacement candle
  25: { h: 21500, l: 21487 },                   // bottom of the gap
  26: { l: 21482 },                             // the sweep
  33: { l: 21515 },                             // retest of the inverted gap
  43: { h: 21561 },                             // target hit
};

function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

export const CANDLES: Candle[] = (() => {
  const r = rand(7);
  return CLOSES.map((c, i) => {
    const o = i === 0 ? 21522 : CLOSES[i - 1];
    let h = Math.max(o, c) + 1 + Math.round(r() * 3);
    let l = Math.min(o, c) - 1 - Math.round(r() * 3);
    if (i < 23) l = Math.max(l, 21513);           // keep the equal lows clean
    if (i < 43) h = Math.min(h, 21554.5);         // keep the equal highs clean
    return { o, c, h, l, ...OVERRIDE[i] };
  });
})();

export const LEVELS = {
  ssl: 21511, bsl: 21557,
  fvgTop: 21516, fvgBottom: 21500,
  entry: 21518, stop: 21498, target: 21556,
  yMin: 21474, yMax: 21572,
};

export const MOMENTS = {
  bslShown: 14, sslShown: 19, fvgFormed: 25, sweep: 26, inversion: 29, entry: 34, tp: 43,
};

export const R_MULTIPLE = ((LEVELS.target - LEVELS.entry) / (LEVELS.entry - LEVELS.stop)).toFixed(1);

export const STEPS = [
  { until: 22, k: '01', t: 'Mark the liquidity', d: 'Equal highs and equal lows are where stops sit. That’s where price wants to go.' },
  { until: 28, k: '02', t: 'Wait for the sweep', d: 'Price runs the lows, grabs the stops and leaves a fair value gap on the way down.' },
  { until: 34, k: '03', t: 'The inversion is the entry', d: 'A close back through the gap flips it into an IFVG. Retest it, and you’re in. Mechanical.' },
  { until: 99, k: '04', t: 'Let the tech pay', d: `Stop under the gap, target the buy-side liquidity. This one paid +${R_MULTIPLE}R.` },
];
