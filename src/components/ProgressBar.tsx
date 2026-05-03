import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export const ProgressBar: React.FC<{
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  appearFrame: number;
}> = ({
  label,
  value,
  maxValue = 100,
  color = COLORS.primary,
  appearFrame,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - appearFrame;

  if (relativeFrame < 0) return null;

  const opacity = interpolate(relativeFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const width = interpolate(
    relativeFrame,
    [0, 30],
    [0, (value / maxValue) * 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ opacity, marginBottom: 20, padding: "0 40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <span style={{ color: COLORS.text, fontSize: 22, fontWeight: 500 }}>
          {label}
        </span>
        <span style={{ color: COLORS.textMuted, fontSize: 22 }}>
          {value}%
        </span>
      </div>
      <div
        style={{
          height: 10,
          background: COLORS.progressTrack,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: color,
            borderRadius: 5,
          }}
        />
      </div>
    </div>
  );
};
