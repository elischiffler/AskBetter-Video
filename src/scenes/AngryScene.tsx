import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { BrandLogo } from "../components/BrandLogo";

/**
 * Scene 2: The witty hook — instead of generic frustration,
 * we show a "receipt" of what the user actually typed vs what they expected.
 * Punchline: "You typed 1 word. You expected a thesis."
 */
export const AngryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.angry;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 8, duration - 8, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 1: "Your prompt" card slams in
  const cardScale = interpolate(rel, [0, 6], [1.3, 1], {
    extrapolateRight: "clamp",
  });
  const cardOpacity = interpolate(rel, [0, 6], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 2: The punchline text
  const showPunchline = rel > 30;
  const punchlineOpacity = interpolate(rel, [30, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const punchlineSlide = interpolate(rel, [30, 42], [40, 0], {
    extrapolateRight: "clamp",
  });

  // Phase 3: "Maybe the AI isn't the problem" — the real hook
  const showHook = rel > 58;
  const hookOpacity = interpolate(rel, [58, 68], [0, 1], {
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
      {/* Subtle purple radial glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* "Receipt" card — your prompt vs your expectation */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          background: COLORS.card,
          borderRadius: 24,
          padding: "40px 44px",
          border: `1px solid ${COLORS.border}`,
          width: "88%",
          maxWidth: 520,
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          zIndex: 10,
        }}
      >
        {/* Header with logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <BrandLogo size={36} />
          <span
            style={{
              color: COLORS.textMuted,
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            Prompt Receipt
          </span>
        </div>

        {/* What you typed */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              color: COLORS.textDim,
              fontSize: 18,
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 2,
              fontWeight: 600,
            }}
          >
            What you typed
          </div>
          <div
            style={{
              background: COLORS.bg,
              borderRadius: 16,
              padding: "20px 24px",
              border: `1px solid rgba(239, 68, 68, 0.3)`,
            }}
          >
            <span
              style={{
                color: COLORS.text,
                fontSize: 40,
                fontWeight: 900,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              "continue"
            </span>
          </div>
        </div>

        {/* What you expected */}
        <div>
          <div
            style={{
              color: COLORS.textDim,
              fontSize: 18,
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 2,
              fontWeight: 600,
            }}
          >
            What you expected
          </div>
          <div
            style={{
              background: COLORS.bg,
              borderRadius: 16,
              padding: "20px 24px",
              border: `1px solid rgba(34, 197, 94, 0.3)`,
              minHeight: 100,
            }}
          >
            <span
              style={{
                color: COLORS.textMuted,
                fontSize: 22,
                fontFamily: "system-ui, -apple-system, sans-serif",
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              A perfectly structured, deeply insightful, 500-word response
              tailored exactly to your needs...
            </span>
          </div>
        </div>
      </div>

      {/* Punchline */}
      {showPunchline && (
        <div
          style={{
            position: "absolute",
            bottom: 420,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: punchlineOpacity,
            transform: `translateY(${punchlineSlide}px)`,
            zIndex: 20,
          }}
        >
          <div
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: "16px 36px",
            }}
          >
            <span
              style={{
                color: COLORS.text,
                fontSize: 30,
                fontWeight: 700,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              1 word in. A thesis out?{" "}
              <span style={{ fontSize: 32 }}>🤨</span>
            </span>
          </div>
        </div>
      )}

      {/* The real hook */}
      {showHook && (
        <div
          style={{
            position: "absolute",
            bottom: 240,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: hookOpacity,
            zIndex: 20,
          }}
        >
          <span
            style={{
              color: COLORS.primaryLight,
              fontSize: 34,
              fontWeight: 800,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Maybe the AI isn't the problem.
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
