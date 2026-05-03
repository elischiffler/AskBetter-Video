import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { AnimatedGrid } from "../components/AnimatedGrid";
import { BrandLogo } from "../components/BrandLogo";

export const LoginScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.login;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
    ? interpolate(rel, [60, 65, 70], [1, 0.95, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  const showSuccess = rel > 80;
  const successOpacity = interpolate(rel, [80, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      {/* Animated grid background */}
      <AnimatedGrid opacity={0.4} />

      {/* Card — matches AskBetter card style */}
      <div
        style={{
          background: COLORS.card,
          borderRadius: 24,
          padding: "48px 40px",
          width: "85%",
          maxWidth: 500,
          transform: `scale(${cardScale})`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          border: `1px solid ${COLORS.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Logo icon + text: Ask + Better */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <BrandLogo size={80} pulse style={{ marginBottom: 16 }} />
          <div
            style={{
              display: "flex",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: COLORS.text,
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              Ask
            </span>
            <span
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: COLORS.primary,
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              Better
            </span>
          </div>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            color: COLORS.textMuted,
            fontSize: 18,
            fontWeight: 600,
            fontFamily: "system-ui, -apple-system, sans-serif",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 40,
          }}
        >
          Better questions, better answers
        </div>

        {/* Google Sign In — primary button style */}
        {showGoogleBtn && (
          <div
            style={{
              opacity: googleOpacity,
              transform: `scale(${btnScale})`,
              background: showSuccess ? COLORS.positive : COLORS.primary,
              borderRadius: 12,
              padding: "16px 32px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%",
              justifyContent: "center",
            }}
          >
            {showSuccess ? (
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.text,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  opacity: successOpacity,
                }}
              >
                Signed in
              </span>
            ) : (
              <>
                <span
                  style={{
                    fontSize: 28,
                    color: "white",
                    fontWeight: 800,
                  }}
                >
                  G
                </span>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: COLORS.text,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: 2,
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
