import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export const TextOverlay: React.FC<{
  text: string;
  startFrame: number;
  duration?: number;
  fontSize?: number;
  color?: string;
  position?: "top" | "bottom" | "center";
  style?: React.CSSProperties;
}> = ({
  text,
  startFrame,
  duration = 60,
  fontSize = 36,
  color = COLORS.text,
  position = "bottom",
  style,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame > duration) return null;

  const opacity = interpolate(
    relativeFrame,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = interpolate(relativeFrame, [0, 10], [20, 0], {
    extrapolateRight: "clamp",
  });

  const positionStyles: Record<string, React.CSSProperties> = {
    top: { top: 120, left: 0, right: 0 },
    center: { top: "50%", left: 0, right: 0, transform: `translateY(-50%)` },
    bottom: { bottom: 160, left: 0, right: 0 },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles[position],
        display: "flex",
        justifyContent: "center",
        opacity,
        transform:
          position === "center"
            ? `translateY(calc(-50% + ${translateY}px))`
            : `translateY(${position === "top" ? "" : "-"}${translateY}px)`,
        zIndex: 100,
        ...style,
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          padding: "16px 32px",
          borderRadius: 16,
          fontSize,
          fontWeight: 700,
          color,
          fontFamily: "Inter, system-ui, sans-serif",
          textAlign: "center",
          maxWidth: "90%",
        }}
      >
        {text}
      </div>
    </div>
  );
};
