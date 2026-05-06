import type { AxisKey, SubSignals } from "@/lib/scoring";

import {
  normalizeSubSignals,
  type SubSignalKey,
} from "@/lib/scoring";

type RoleRadarProps = {
  axis: AxisKey;
  color: string;
  subSignals: Partial<SubSignals>;
};

type RoleMetric = {
  key: SubSignalKey;
  label: string;
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

export function VectorRadar({ axis, color, subSignals }: RoleRadarProps) {
  const center = 145;
  const radius = 84;

  const metricsByAxis: Record<AxisKey, RoleMetric[]> = {
    structuration: [
      { key: "clarte", label: "Clarté" },
      { key: "methode", label: "Méthode" },
      { key: "pilotage", label: "Pilotage" },
    ],

    comprehension: [
      { key: "discernement", label: "Discernement" },
      { key: "ecoute", label: "Écoute" },
      { key: "lecture", label: "Lecture" },
    ],

    valorisation: [
      { key: "perception", label: "Perception" },
      { key: "impact", label: "Impact" },
      { key: "lisibilite", label: "Lisibilité" },
    ],
  };

  const axisMetrics = metricsByAxis[axis];

  const normalized = normalizeSubSignals(
    subSignals,
    axisMetrics.map((metric) => metric.key)
  );

  const points = axisMetrics.map((metric, index) => {
    const data = normalized[index];

    return {
      key: metric.key,
      label: metric.label,
      value: data.value,
      percent: data.percent,
      angle: [-90, 30, 150][index],
    };
  });

  const polygonPoints = points
    .map((point) => {
      const position = polarToCartesian(
        center,
        radius,
        point.angle,
        point.value
      );

      return `${position.x},${position.y}`;
    })
    .join(" ");

  return (
    <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,#3b4659,#283140)] p-5 shadow-[0_34px_110px_rgba(15,23,42,0.34)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.20),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%,rgba(0,0,0,0.10))]" />

      <div className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: `${color}30` }}
      />

      <div className="relative rounded-[28px] border border-white/25 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98),rgba(244,247,251,0.94)_42%,rgba(229,236,246,0.90))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_18px_55px_rgba(15,23,42,0.14)]">
        <div className="mb-3 text-center">
          <p className="text-[10px] uppercase tracking-[0.34em] text-slate-500">
            Analyse vectorielle
          </p>
        </div>

        <svg
          viewBox="0 0 280 280"
          className="h-auto w-full"
          role="img"
          aria-label="Radar de lecture du rôle dominant"
        >
          <defs>
            <filter
              id="radarGlow"
              x="-45%"
              y="-45%"
              width="190%"
              height="190%"
            >
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="radarBackground" cx="50%" cy="45%" r="62%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
              <stop offset="58%" stopColor="rgba(255,255,255,0.38)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            <radialGradient id="radarFill" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.60)" />
              <stop offset="100%" stopColor={color} />
            </radialGradient>
          </defs>

          <circle
            cx={center}
            cy={center}
            r="112"
            fill="url(#radarBackground)"
          />

          <circle
            cx={center}
            cy={center}
            r="74"
            fill="none"
            stroke="rgba(148,163,184,0.12)"
            strokeWidth="22"
          />

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
              stroke="rgba(30,41,59,0.13)"
              strokeWidth="1"
            />
          ))}

          {points.map((point) => {
            const axisEnd = polarToCartesian(
              center,
              radius,
              point.angle,
              1
            );

            return (
              <line
                key={point.key}
                x1={center}
                y1={center}
                x2={axisEnd.x}
                y2={axisEnd.y}
                stroke="rgba(30,41,59,0.12)"
                strokeWidth="1"
              />
            );
          })}

          <polygon
            points={polygonPoints}
            fill="url(#radarFill)"
            fillOpacity="0.16"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
            filter="url(#radarGlow)"
          />

          <polygon
            points={polygonPoints}
            fill="none"
            stroke="rgba(255,255,255,0.72)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {points.map((point) => {
            const position = polarToCartesian(
              center,
              radius,
              point.angle,
              point.value
            );

            return (
              <circle
                key={point.key}
                cx={position.x}
                cy={position.y}
                r="4.6"
                fill="#ffffff"
                stroke={color}
                strokeWidth="2"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255,255,255,.95))",
                }}
              />
            );
          })}

          {points.map((point) => {
            const labelPosition = polarToCartesian(
              center,
              radius + 33,
              point.angle,
              1
            );

            return (
              <g key={point.key}>
                <text
                  x={labelPosition.x}
                  y={labelPosition.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-600 text-[10px] tracking-[0.08em]"
                >
                  {point.label}
                </text>

                <text
                  x={labelPosition.x}
                  y={labelPosition.y + 13}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-400 text-[9px]"
                >
                  {point.percent}%
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-3 border-t border-slate-300/45 pt-4">
          <p className="text-center text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Lecture des signaux dominants
          </p>
        </div>
      </div>

      <div className="relative mt-6 space-y-4">
        {points.map((point) => (
          <div key={point.key}>
            <div className="mb-2 flex items-center justify-between gap-4 text-[11px] text-white/78">
              <span>{point.label}</span>
              <span>{point.percent}%</span>
            </div>

            <div className="h-[4px] overflow-hidden rounded-full bg-white/10 shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${point.percent}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 20px ${color}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
