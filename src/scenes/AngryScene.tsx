import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";

export const AngryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.angry;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const shake =
    Math.sin(rel * 1.5) *
    interpolate(rel, [0, 40, 90], [0, 8, 0], {
      extrapolateRight: "clamp",
    });

  const scale = interpolate(rel, [0, 15], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(
    rel,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const redOverlay = interpolate(
    Math.sin(rel * 0.2),
    [-1, 1],
    [0.05, 0.15]
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle, rgba(239, 68, 68, ${redOverlay}) 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          transform: `translateX(${shake}px) scale(${scale})`,
          textAlign: "center",
          padding: 40,
        }}
      >
        <div style={{ fontSize: 120, marginBottom: 20 }}>😤</div>
        <div
          style={{
            color: COLORS.error,
            fontSize: 48,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          Why won't AI
        </div>
        <div
          style={{
            color: COLORS.text,
            fontSize: 52,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            textTransform: "uppercase",
            letterSpacing: 3,
            marginTop: 8,
          }}
        >
          understand me?!
        </div>
      </div>
    </AbsoluteFill>
  );
};
