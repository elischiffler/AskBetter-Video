import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export const ScoreGauge: React.FC<{
  score: number;
  label: string;
  appearFrame: number;
  animDuration?: number;
  size?: number;
}> = ({ score, label, appearFrame, animDuration = 40, size = 200 }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - appearFrame;

  if (relativeFrame < 0) return null;

  const opacity = interpolate(relativeFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const currentScore = interpolate(
    relativeFrame,
    [5, animDuration],
    [0, score],
    { extrapolateRight: "clamp" }
  );

  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset =
    circumference - (currentScore / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 40) return COLORS.red;
    if (s < 70) return COLORS.yellow;
    return COLORS.green;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        gap: 12,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={COLORS.surfaceLight}
          strokeWidth="12"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={getColor(currentScore)}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 100 100)"
          style={{ transition: "stroke 0.3s" }}
        />
        <text
          x="100"
          y="95"
          textAnchor="middle"
          fill={getColor(currentScore)}
          fontSize="48"
          fontWeight="bold"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {Math.round(currentScore)}
        </text>
        <text
          x="100"
          y="125"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="18"
          fontFamily="Inter, system-ui, sans-serif"
        >
          / 100
        </text>
      </svg>
      <span
        style={{
          color: COLORS.textMuted,
          fontSize: 24,
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
};
