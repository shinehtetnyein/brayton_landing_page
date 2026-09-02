import { motion } from 'framer-motion'

/**
 * The site's signature visual: a leaded-glass lancet window built from
 * layered SVG panes in the church's palette (forest, brass, wine, sky),
 * with a soft band of light sweeping across it and slow-drifting motes —
 * echoing afternoon sun through a sanctuary window.
 */
export default function StainedGlass({ className = '' }) {
  const panes = [
    { d: 'M20,220 L20,460 L100,460 L100,300 L60,220 Z', fill: 'var(--color-forest)' },
    { d: 'M340,220 L340,460 L260,460 L260,300 L300,220 Z', fill: 'var(--color-forest)' },
    { d: 'M60,220 L100,300 L100,460 L160,460 L160,240 Z', fill: 'var(--color-wine)' },
    { d: 'M300,220 L260,300 L260,460 L200,460 L200,240 Z', fill: 'var(--color-wine)' },
    { d: 'M160,240 L160,460 L200,460 L200,240 Z', fill: 'var(--color-brass)' },
    { d: 'M20,220 L60,220 L98,150 L52,140 Z', fill: 'var(--color-sky)' },
    { d: 'M340,220 L300,220 L262,150 L308,140 Z', fill: 'var(--color-sky)' },
    { d: 'M52,140 L98,150 L138,95 L92,85 Z', fill: 'var(--color-forest)' },
    { d: 'M308,140 L262,150 L222,95 L268,85 Z', fill: 'var(--color-forest)' },
    { d: 'M92,85 L138,95 L166,55 L128,42 Z', fill: 'var(--color-wine)' },
    { d: 'M268,85 L222,95 L194,55 L232,42 Z', fill: 'var(--color-wine)' },
    { d: 'M128,42 L166,55 L180,20 L180,20 Z', fill: 'var(--color-brass)' },
    { d: 'M232,42 L194,55 L180,20 L180,20 Z', fill: 'var(--color-brass)' },
    { d: 'M98,150 L138,95 L222,95 L262,150 L200,240 L160,240 Z', fill: 'var(--color-forest-deep)' },
  ]

  const leading = [
    'M20,220 L60,220 L98,150 L52,140 Z',
    'M340,220 L300,220 L262,150 L308,140 Z',
    'M60,220 L100,300 L100,460',
    'M300,220 L260,300 L260,460',
    'M160,240 L160,460 M200,240 L200,460',
    'M98,150 L52,140 M138,95 L92,85 M166,55 L128,42',
    'M262,150 L308,140 M222,95 L268,85 M194,55 L232,42',
    'M98,150 L138,95 L222,95 L262,150 L200,240 L160,240 Z',
    'M20,460 L20,220 A320,320 0 0,1 180,20 A320,320 0 0,1 340,220 L340,460',
  ]

  return (
    <svg
      viewBox="0 0 360 480"
      className={`w-full max-w-[360px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] ${className}`}
      role="img"
      aria-label="Illustration of a sanctuary window, lit from within"
    >
      <defs>
        <clipPath id="archClip">
          <path d="M20,460 L20,220 A320,320 0 0,1 180,20 A320,320 0 0,1 340,220 L340,460 Z" />
        </clipPath>
        <linearGradient id="sweepGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="var(--color-accent-light)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-accent-light)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow behind the window */}
      <circle cx="180" cy="190" r="220" fill="url(#glow)" />

      {/* stone surround */}
      <path
        d="M8,472 L8,216 A340,340 0 0,1 180,6 A340,340 0 0,1 352,216 L352,472"
        fill="none"
        stroke="var(--color-ink-faint)"
        strokeOpacity="0.35"
        strokeWidth="14"
      />

      <g clipPath="url(#archClip)">
        <rect x="0" y="0" width="360" height="480" fill="var(--color-forest-tint)" />
        {panes.map((p, i) => (
          <path key={i} d={p.d} fill={p.fill} opacity="0.92" />
        ))}

        {/* moving light sweep */}
        <motion.rect
          x="-260"
          y="-40"
          width="180"
          height="600"
          fill="url(#sweepGradient)"
          initial={{ x: -260 }}
          animate={{ x: 420 }}
          transition={{ duration: 6, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
          style={{ mixBlendMode: 'screen' }}
        />
      </g>

      {/* leading (the dark strips between panes) */}
      <g clipPath="url(#archClip)" fill="none" stroke="var(--color-forest-deep)" strokeWidth="4" strokeLinejoin="round">
        {leading.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* central cross, cut from the light */}
      <g opacity="0.95">
        <rect x="172" y="120" width="16" height="150" rx="3" fill="var(--color-surface)" />
        <rect x="132" y="160" width="96" height="16" rx="3" fill="var(--color-surface)" />
      </g>

      {/* drifting motes */}
      {[
        { cx: 90, cy: 340, r: 3.2, delay: 0 },
        { cx: 250, cy: 300, r: 2.4, delay: 0.8 },
        { cx: 150, cy: 400, r: 2, delay: 1.6 },
        { cx: 210, cy: 420, r: 2.8, delay: 2.4 },
      ].map((m, i) => (
        <motion.circle
          key={i}
          cx={m.cx}
          cy={m.cy}
          r={m.r}
          fill="var(--color-brass-bright)"
          initial={{ opacity: 0.15, y: 0 }}
          animate={{ opacity: [0.15, 0.75, 0.15], y: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity, delay: m.delay, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}
