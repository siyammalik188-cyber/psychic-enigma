type Props = {
  size?: number;
  className?: string;
  stroke?: string;
  voidColor?: string;
};

export default function Logo({
  size = 32,
  className = "",
  stroke = "#C9A84C",
  voidColor = "#080603",
}: Props) {
  const cx = 100, cy = 100;
  const outerR = 56, midR = 48, innerR = 40, voidR = 14;

  const spikes = Array.from({ length: 8 }, (_, i) => {
    const angle = ((-90 + i * 45) * Math.PI) / 180;
    const isTall = i % 2 === 0;
    const spikeLen = isTall ? 28 : 14;
    return {
      x1: cx + Math.cos(angle) * outerR,
      y1: cy + Math.sin(angle) * outerR,
      x2: cx + Math.cos(angle) * (outerR + spikeLen),
      y2: cy + Math.sin(angle) * (outerR + spikeLen),
      isTall,
      key: i,
    };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Void King sigil"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crown spikes */}
      <g stroke={stroke} strokeLinecap="square">
        {spikes.map((s) => (
          <line key={s.key} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            strokeWidth={s.isTall ? 2.25 : 1.75} />
        ))}
      </g>

      {/* Tick marks between spikes */}
      <g stroke={stroke} strokeOpacity={0.35} strokeLinecap="square">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = ((-90 + 22.5 + i * 45) * Math.PI) / 180;
          return (
            <line key={`t${i}`}
              x1={cx + Math.cos(angle) * outerR} y1={cy + Math.sin(angle) * outerR}
              x2={cx + Math.cos(angle) * (outerR + 5)} y2={cy + Math.sin(angle) * (outerR + 5)}
              strokeWidth={1} />
          );
        })}
      </g>

      {/* Rings */}
      <circle cx={cx} cy={cy} r={outerR} stroke={stroke} strokeWidth={2.25} />
      <circle cx={cx} cy={cy} r={midR} stroke={stroke} strokeOpacity={0.45} strokeWidth={1} />
      <circle cx={cx} cy={cy} r={innerR} stroke={stroke} strokeOpacity={0.25} strokeWidth={1} />
      <circle cx={cx} cy={cy} r={voidR + 8} stroke={stroke} strokeOpacity={0.6} strokeWidth={1} />

      {/* Void core */}
      <circle cx={cx} cy={cy} r={voidR} fill={voidColor} stroke={stroke} strokeWidth={1.25} />
    </svg>
  );
}
