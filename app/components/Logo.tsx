export default function Logo({ size = 120 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.42;
  const midR = size * 0.30;
  const innerR = size * 0.16;
  const voidR = size * 0.09;
  const spikeCount = 8;

  // Crown spikes
  const spikes = Array.from({ length: spikeCount }, (_, i) => {
    const angle = (i / spikeCount) * Math.PI * 2 - Math.PI / 2;
    const isMain = i % 2 === 0;
    const r1 = outerR + size * 0.02;
    const r2 = outerR + size * (isMain ? 0.14 : 0.07);
    return {
      x1: cx + Math.cos(angle) * r1,
      y1: cy + Math.sin(angle) * r1,
      x2: cx + Math.cos(angle) * r2,
      y2: cy + Math.sin(angle) * r2,
      isMain,
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="logo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="void-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#030201" stopOpacity="1" />
          <stop offset="100%" stopColor="#0a0805" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Outer atmospheric glow */}
      <circle cx={cx} cy={cy} r={outerR * 1.6} fill="url(#logo-glow)" />

      {/* Crown spikes */}
      {spikes.map((s, i) => (
        <line
          key={i}
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke="#C9A84C"
          strokeWidth={s.isMain ? 1.8 : 1}
          strokeOpacity={s.isMain ? 0.85 : 0.4}
          strokeLinecap="round"
        />
      ))}

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={outerR} stroke="#C9A84C" strokeWidth={1.5} strokeOpacity={0.75} />

      {/* Middle ring */}
      <circle cx={cx} cy={cy} r={midR} stroke="#C9A84C" strokeWidth={1} strokeOpacity={0.3} />

      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={innerR} stroke="#C9A84C" strokeWidth={0.8} strokeOpacity={0.2} />

      {/* Void fill */}
      <circle cx={cx} cy={cy} r={outerR * 0.97} fill="#080603" />

      {/* Re-draw rings on top of fill */}
      <circle cx={cx} cy={cy} r={outerR} stroke="#C9A84C" strokeWidth={1.5} strokeOpacity={0.75} />
      <circle cx={cx} cy={cy} r={midR} stroke="#C9A84C" strokeWidth={1} strokeOpacity={0.3} />
      <circle cx={cx} cy={cy} r={innerR} stroke="#C9A84C" strokeWidth={0.8} strokeOpacity={0.2} />

      {/* Void core */}
      <circle cx={cx} cy={cy} r={voidR} fill="url(#void-core)" />
      <circle cx={cx} cy={cy} r={voidR} stroke="#C9A84C" strokeWidth={0.8} strokeOpacity={0.15} />

      {/* Four cardinal tick marks */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        const r1 = midR + 3;
        const r2 = innerR - 3;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1}
            x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2}
            stroke="#C9A84C" strokeWidth={0.8} strokeOpacity={0.25}
          />
        );
      })}
    </svg>
  );
}
