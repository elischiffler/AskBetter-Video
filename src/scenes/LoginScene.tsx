import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";

export const LoginScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.login;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(rel, [0, 10, duration - 10, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardScale = interpolate(rel, [0, 20], [0.9, 1], {
    extrapolateRight: "clamp",
  });

  const showGoogleBtn = rel > 30;
  const googleOpacity = interpolate(rel, [30, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const clickEffect = rel > 60 && rel < 80;
  const btnScale = clickEffect
    ? interpolate(rel, [60, 65, 70], [1, 0.95, 1], { extrapolateRight: "clamp" })
    : 1;

  const showSuccess = rel > 80;
  const successOpacity = interpolate(rel, [80, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, ${COLORS.surface} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          background: COLORS.surface,
          borderRadius: 24,
          padding: "48px 40px",
          width: "85%",
          maxWidth: 500,
          transform: `scale(${cardScale})`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          border: `1px solid ${COLORS.surfaceLight}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            fontFamily: "Inter, system-ui, sans-serif",
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: 12,
          }}
        >
          AskBetter
        </div>
        <div
          style={{
            color: COLORS.textMuted,
            fontSize: 24,
            fontFamily: "Inter, system-ui, sans-serif",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Analyze & improve your AI prompts
        </div>

        {/* Google Sign In */}
        {showGoogleBtn && (
          <div
            style={{
              opacity: googleOpacity,
              transform: `scale(${btnScale})`,
              background: showSuccess ? COLORS.green : "white",
              borderRadius: 12,
              padding: "16px 32px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              cursor: "pointer",
              width: "100%",
              justifyContent: "center",
              transition: "background 0.3s",
            }}
          >
            {showSuccess ? (
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: "white",
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: successOpacity,
                }}
              >
                ✓ Signed in!
              </span>
            ) : (
              <>
                <span style={{ fontSize: 28 }}>G</span>
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    color: "#333",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  Sign in with Google
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
