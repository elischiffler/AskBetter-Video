import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";

export const ConclusionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.conclusion;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(rel, [0, 15, duration - 15, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(rel, [10, 40], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    { text: "📊 Prompt Analysis", delay: 50 },
    { text: "💬 AI Coaching with Groq", delay: 65 },
    { text: "📈 Track Your Progress", delay: 80 },
    { text: "🚀 Better AI Responses", delay: 95 },
  ];

  const showCTA = rel > 130;
  const ctaOpacity = interpolate(rel, [130, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaPulse = showCTA
    ? 1 + Math.sin(rel * 0.1) * 0.03
    : 1;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.surface} 0%, ${COLORS.bgDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primary}20 0%, transparent 70%)`,
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            fontFamily: "Inter, system-ui, sans-serif",
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: 8,
          }}
        >
          AskBetter
        </div>
        <div
          style={{
            color: COLORS.textMuted,
            fontSize: 28,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Stop guessing. Start prompting.
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: 48 }}>
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
                fontFamily: "Inter, system-ui, sans-serif",
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

      {/* CTA */}
      {showCTA && (
        <div
          style={{
            opacity: ctaOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
              borderRadius: 20,
              padding: "20px 48px",
              transform: `scale(${ctaPulse})`,
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: 32,
                fontWeight: 700,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Try it free →
            </span>
          </div>
          <div
            style={{
              color: COLORS.primaryLight,
              fontSize: 24,
              fontFamily: "Inter, system-ui, sans-serif",
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
