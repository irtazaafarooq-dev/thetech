'use client';

import { useEffect, useState } from 'react';

/** Next NY cash open (9:30 New York time, Mon–Fri) as a Date. */
function nextOpen(now: Date) {
  const ny = (d: Date) => new Date(d.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const nyNow = ny(now);
  const offset = now.getTime() - nyNow.getTime(); // local ms minus "NY wall clock" ms
  const t = new Date(nyNow);
  t.setHours(9, 30, 0, 0);
  if (nyNow >= t) t.setDate(t.getDate() + 1);
  while (t.getDay() === 0 || t.getDay() === 6) t.setDate(t.getDate() + 1);
  return new Date(t.getTime() + offset);
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function SessionClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [tz, setTz] = useState('');
  useEffect(() => {
    // read the visitor's zone only in the browser (the server renders in UTC)
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop()?.replace(/_/g, ' ') || '');
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const open = now ? nextOpen(now) : null;
  const diff = now && open ? Math.max(0, open.getTime() - now.getTime()) : 0;
  const h = Math.floor(diff / 3.6e6), m = Math.floor((diff % 3.6e6) / 6e4), s = Math.floor((diff % 6e4) / 1000);
  const local = open?.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const day = open?.toLocaleDateString([], { weekday: 'long' });
  const syd = open?.toLocaleTimeString('en-AU', { timeZone: 'Australia/Sydney', hour: 'numeric', minute: '2-digit' });

  return (
    <div className="clock" aria-live="off">
      <div className="clock-top">
        <span><i className="dot" /> NY open countdown</span>
        <span className="muted">NQ1!</span>
      </div>
      <div className="clock-num" suppressHydrationWarning>{now ? `${pad(h)}:${pad(m)}:${pad(s)}` : '--:--:--'}</div>
      <div className="clock-rows">
        <div><span>Your time{tz ? ` · ${tz}` : ''}</span><b suppressHydrationWarning>{now ? `${day} ${local}` : '—'}</b></div>
        <div><span>Sydney</span><b suppressHydrationWarning>{now ? syd : '—'}</b></div>
        <div><span>New York</span><b>9:30 AM</b></div>
      </div>
      <p className="clock-note">The NY open lands around midnight in Australia. We trade it together, live.</p>
    </div>
  );
}
