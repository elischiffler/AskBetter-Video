import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export const ProgressBar: React.FC<{
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  appearFrame: number;
}> = ({ label, value, maxValue = 100, color = COLORS.primary, appearFrame }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - appearFrame;

  if (relativeFrame < 0) return null;

  const opacity = interpolate(relativeFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const width = interpolate(relativeFrame, [5, 35], [0, (value / maxValue) * 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, marginBottom: 20, padding: "0 40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontFamily: "Inter, system-ui, sans-serif",
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
          height: 14,
          background: COLORS.surfaceLight,
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            borderRadius: 7,
          }}
        />
      </div>
    </div>
  );
};
