import { useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

/**
 * The animated perspective grid from the AskBetter hero section.
 * Purple grid lines with perspective transform and scrolling animation.
 */
export const AnimatedGrid: React.FC<{
  opacity?: number;
}> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();

  // Simulate the CSS gridScroll animation — vertical scroll over ~6s (180 frames)
  const scrollOffset = (frame % 180) * 2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* Grid container with perspective */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-20%",
          right: "-20%",
          height: "60%",
          transform: "perspective(600px) rotateX(40deg)",
          transformOrigin: "bottom center",
        }}
      >
        {/* Horizontal lines */}
        {Array.from({ length: 20 }).map((_, i) => {
          const y = ((i * 60 + scrollOffset) % 1200) - 60;
          return (
            <div
              key={`h-${i}`}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: y,
                height: 1,
                background: COLORS.gridLine,
              }}
            />
          );
        })}
        {/* Vertical lines */}
        {Array.from({ length: 15 }).map((_, i) => {
          const x = `${(i / 14) * 100}%`;
          return (
            <div
              key={`v-${i}`}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: x,
                width: 1,
                background: COLORS.gridLine,
              }}
            />
          );
        })}
      </div>

      {/* Radial vignette fading to bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center 70%, transparent 20%, ${COLORS.bg} 80%)`,
        }}
      />
    </div>
  );
};
