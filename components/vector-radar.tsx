import type { VectorScore } from "@/lib/scoring";

type VectorRadarProps = {
  score: VectorScore;
  color: string;
};

type RadarPoint = {
  key: keyof VectorScore;
  angle: number;
  label: string;
  value: number;
};

function polarToCartesian(
  center: number,
  radius: number,
  angleInDegrees: number,
  value: number = 1
) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;

  return {
    x: center + Math.cos(angleInRadians) * radius * value,
    y: center + Math.sin(angleInRadians) * radius * value,
  };
}

export function VectorRadar({ score, color }: VectorRadarProps) {
  const center = 140;
  const radius = 88;

  // IMPORTANT :
  // Ce composant reçoit un score normalisé entre 0 et 1.
  // Exemple : 1 = axe dominant, 0.75 = 75%, 0.25 = 25%.
  const maxScore = 1;

  const points: RadarPoint[] = [
    {
      key: "structuration",
      angle: -90,
      label: "Structuration",
      value: score.structuration,
    },
    {
      key: "valorisation",
      angle: 30,
      label: "Valorisation",
      value: score.valorisation,
    },
    {
      key: "comprehension",
      angle: 150,
      label: "Compréhension",
      value: score.comprehension,
    },
  ];

  const polygonPoints = points
    .map((point) => {
      const position = polarToCartesian(
        center,
        radius,
        point.angle,
        point.value / maxScore
      );

      return `${position.x},${position.y}`;
    })
    .join(" ");

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#1f2633] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.10),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />

      <div className="relative rounded-[22px] border border-white/10 bg-[#e7e7e7] p-4 shadow-inner">
        <svg
          viewBox="0 0 280 280"
          className="h-auto w-full"
          role="img"
          aria-label="Répartition vectorielle du profil"
        >
          <defs>
            <filter id="radarGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="radarBackground" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          <circle cx={center} cy={center} r="104" fill="url(#radarBackground)" />

          {[1, 0.75, 0.5, 0.25].map((level) => (
            <polygon
              key={level}
              points={points
                .map((point) => {
                  const position = polarToCartesian(
                    center,
                    radius,
                    point.angle,
                    level
                  );

                  return `${position.x},${position.y}`;
                })
                .join(" ")}
              fill="none"
              stroke="rgba(30, 41, 59, 0.14)"
              strokeWidth="1"
            />
          ))}

          {points.map((point) => {
            const axisEnd = polarToCartesian(center, radius, point.angle, 1);

            return (
              <line
                key={point.key}
                x1={center}
                y1={center}
                x2={axisEnd.x}
                y2={axisEnd.y}
                stroke="rgba(30, 41, 59, 0.13)"
                strokeWidth="1"
              />
            );
          })}

          <polygon
            points={polygonPoints}
            fill={color}
            fillOpacity="0.18"
            stroke={color}
            strokeWidth="2.4"
            strokeLinejoin="round"
            filter="url(#radarGlow)"
          />

          {points.map((point) => {
            const position = polarToCartesian(
              center,
              radius,
              point.angle,
              point.value / maxScore
            );

            return (
              <circle
                key={point.key}
                cx={position.x}
                cy={position.y}
                r="4.5"
                fill="#ffffff"
                stroke={color}
                strokeWidth="2"
              />
            );
          })}

          {points.map((point) => {
            const labelPosition = polarToCartesian(
              center,
              radius + 30,
              point.angle,
              1
            );

            return (
              <g key={point.label}>
                <text
                  x={labelPosition.x}
                  y={labelPosition.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-700 text-[10px] font-medium"
                >
                  {point.label}
                </text>
                <text
                  x={labelPosition.x}
                  y={labelPosition.y + 13}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-500 text-[9px]"
                >
                  {Math.round(point.value * 100)}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="relative mt-5 space-y-3">
        {points.map((point) => (
          <div key={point.key}>
            <div className="mb-1 flex items-center justify-between gap-4 text-[11px] text-white/75">
              <span>{point.label}</span>
              <span>{Math.round(point.value * 100)}%</span>
            </div>

            <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round(point.value * 100)}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 18px ${color}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
