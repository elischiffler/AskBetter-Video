import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { ScoreGauge } from "../components/ScoreGauge";
import { TextOverlay } from "../components/TextOverlay";

export const ImprovementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.improvement;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(rel, [0, 10, duration - 10, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showNewPrompt = rel > 5;
  const promptOpacity = interpolate(rel, [5, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showScore = rel > 70;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.surface} 100%)`,
        opacity,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "70px 32px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            fontFamily: "Inter, system-ui, sans-serif",
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          AskBetter
        </div>
        <div
          style={{
            background: `${COLORS.accent}30`,
            borderRadius: 8,
            padding: "4px 12px",
            color: COLORS.accent,
            fontSize: 20,
            fontWeight: 600,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          New Prompt
        </div>
      </div>

      {/* New improved prompt */}
      {showNewPrompt && (
        <div style={{ padding: "20px 32px", opacity: promptOpacity }}>
          <div
            style={{
              color: COLORS.textMuted,
              fontSize: 22,
              fontFamily: "Inter, system-ui, sans-serif",
              marginBottom: 12,
            }}
          >
            Improved prompt:
          </div>
          <div
            style={{
              background: COLORS.surfaceLight,
              borderRadius: 16,
              padding: "20px 24px",
              border: `1px solid ${COLORS.green}40`,
            }}
          >
            <span
              style={{
                color: COLORS.text,
                fontSize: 24,
                fontFamily: "Inter, system-ui, sans-serif",
                lineHeight: 1.6,
              }}
            >
              "Explain the key principles of building scalable microservices architecture. Focus on: 1) Service decomposition strategies, 2) Inter-service communication patterns, 3) Data management. Provide real-world examples for each."
            </span>
          </div>
        </div>
      )}

      {/* New score */}
      {showScore && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: 24,
          }}
        >
          <ScoreGauge
            score={92}
            label="Prompt Quality Score"
            appearFrame={start + 70}
            animDuration={60}
            size={280}
          />

          <div
            style={{
              background: `${COLORS.green}20`,
              border: `1px solid ${COLORS.green}40`,
              borderRadius: 16,
              padding: "16px 32px",
              marginTop: 16,
            }}
          >
            <span
              style={{
                color: COLORS.green,
                fontSize: 28,
                fontWeight: 700,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              ✨ Excellent Prompt!
            </span>
          </div>
        </div>
      )}

      <TextOverlay
        text="From 18 → 92! 🚀"
        startFrame={start + 140}
        duration={40}
        position="bottom"
        fontSize={36}
        color={COLORS.green}
      />
    </AbsoluteFill>
  );
};
