import { interpolate, useCurrentFrame } from "remotion";

/**
 * AskBetter brand logo — the 8-pointed star SVG rendered inline.
 * Supports animated entrance and optional gentle pulse.
 */
export const BrandLogo: React.FC<{
  size?: number;
  appearFrame?: number;
  pulse?: boolean;
  style?: React.CSSProperties;
}> = ({ size = 64, appearFrame, pulse = false, style }) => {
  const frame = useCurrentFrame();

  let opacity = 1;
  let scale = 1;

  if (appearFrame !== undefined) {
    const rel = frame - appearFrame;
    if (rel < 0) return null;
    opacity = interpolate(rel, [0, 12], [0, 1], {
      extrapolateRight: "clamp",
    });
    scale = interpolate(rel, [0, 12], [0.6, 1], {
      extrapolateRight: "clamp",
    });
  }

  if (pulse) {
    scale *= 1 + Math.sin(frame * 0.08) * 0.04;
  }

  // Slow rotation for visual interest
  const rotation = pulse ? frame * 0.3 : 0;

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        flexShrink: 0,
        ...style,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 32 32"
      >
        <defs>
          <linearGradient id="outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6d28d9" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="mid" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#c026d3" />
          </linearGradient>
          <radialGradient id="center" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e9d5ff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </radialGradient>
        </defs>
        {/* Outer 8-pointed star */}
        <rect
          x="8"
          y="8"
          width="16"
          height="16"
          rx="1"
          fill="url(#outer)"
          transform="rotate(0 16 16)"
        />
        <rect
          x="8"
          y="8"
          width="16"
          height="16"
          rx="1"
          fill="url(#mid)"
          transform="rotate(45 16 16)"
        />
        {/* Inner 4-pointed star */}
        <path
          d="M16 4 L19 13 L28 16 L19 19 L16 28 L13 19 L4 16 L13 13 Z"
          fill="url(#mid)"
          opacity="0.6"
        />
        {/* Bright center */}
        <path
          d="M16 8 L18 14 L24 16 L18 18 L16 24 L14 18 L8 16 L14 14 Z"
          fill="url(#center)"
        />
      </svg>
    </div>
  );
};
