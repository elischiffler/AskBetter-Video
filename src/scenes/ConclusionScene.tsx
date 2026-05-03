import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { AnimatedGrid } from "../components/AnimatedGrid";

export const ConclusionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.conclusion;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 15, duration - 15, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoScale = interpolate(rel, [10, 40], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    { text: "📊 Prompt Quality Scoring", delay: 50 },
    { text: "🧠 6 Cognitive Dimensions", delay: 65 },
    { text: "💬 AI Coach powered by Groq", delay: 80 },
    { text: "📈 Track Your Improvement", delay: 95 },
  ];

  const showCTA = rel > 130;
  const ctaOpacity = interpolate(rel, [130, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaPulse = showCTA ? 1 + Math.sin(rel * 0.1) * 0.03 : 1;

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
      <AnimatedGrid opacity={0.3} />

      {/* Ambient purple glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)`,
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Logo — "Ask" white + "Better" purple */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          textAlign: "center",
          marginBottom: 16,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.text,
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            Ask
          </span>
          <span
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.primary,
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            Better
          </span>
        </div>
        <div
          style={{
            color: COLORS.textMuted,
            fontSize: 26,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          Better questions, better answers
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: 48, zIndex: 10 }}>
        {features.map((feature, i) => {
          const fRel = rel - feature.delay;
          if (fRel < 0) return null;
          const fOpacity = interpolate(fRel, [0, 10], [0, 1], {
            extrapolateRight: "clamp",
          });
          const fSlide = interpolate(fRel, [0, 10], [30, 0], {
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity: fOpacity,
                transform: `translateY(${fSlide}px)`,
                color: COLORS.text,
                fontSize: 30,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 500,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              {feature.text}
            </div>
          );
        })}
      </div>

      {/* CTA — primary button style */}
      {showCTA && (
        <div
          style={{
            opacity: ctaOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: COLORS.primary,
              borderRadius: 16,
              padding: "20px 48px",
              transform: `scale(${ctaPulse})`,
            }}
          >
            <span
              style={{
                color: COLORS.text,
                fontSize: 28,
                fontWeight: 700,
                fontFamily: "system-ui, -apple-system, sans-serif",
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              Try it free →
            </span>
          </div>
          <div
            style={{
              color: COLORS.primaryLight,
              fontSize: 24,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 500,
            }}
          >
            ask-better-kiro-hacks.vercel.app
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
