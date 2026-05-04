import type { VectorScore } from "@/lib/scoring";

type VectorRadarProps = {
  score: VectorScore;
  color: string;
};

export function VectorRadar({ score, color }: VectorRadarProps) {
  const center = 120;
  const radius = 84;
  const points = [
    { angle: -90, value: score.structuration, label: "Structuration" },
    { angle: 30, value: score.valorisation, label: "Valorisation" },
    { angle: 150, value: score.comprehension, label: "Compréhension" },
  ];

  const vertices = points
    .map((point) => {
      const angle = (point.angle * Math.PI) / 180;
      const x = center + Math.cos(angle) * radius * point.value;
      const y = center + Math.sin(angle) * radius * point.value;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="surface p-4">
      <svg viewBox="0 0 240 240" className="w-full h-auto" role="img" aria-label="Répartition vectorielle">
        {[1, 0.66, 0.33].map((level) => (
          <polygon
            key={level}
            points={points
              .map((point) => {
                const a = (point.angle * Math.PI) / 180;
                return `${center + Math.cos(a) * radius * level},${center + Math.sin(a) * radius * level}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(0,0,0,0.12)"
          />
        ))}
        <polygon points={vertices} fill={color} fillOpacity="0.28" stroke={color} strokeWidth="2" />
      </svg>
    </div>
  );
}
