import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { AppHeader } from "../components/AppHeader";
import { ScoreGauge } from "../components/ScoreGauge";
import { TextOverlay } from "../components/TextOverlay";
import { BrandLogo } from "../components/BrandLogo";

export const ImprovementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.improvement;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showNewPrompt = rel > 5;
  const promptOpacity = interpolate(rel, [5, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showScore = rel > 70;

  // Feedback cards for the good prompt
  const showFeedback = rel > 130;
  const feedbackOpacity = interpolate(rel, [130, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity }}>
      <AppHeader showNav />

      <div style={{ paddingTop: 90 }}>
        {/* New prompt card */}
        {showNewPrompt && (
          <div style={{ padding: "12px 28px", opacity: promptOpacity }}>
            <div
              style={{
                background: COLORS.card,
                borderRadius: 24,
                padding: 28,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div
                style={{
                  color: COLORS.textMuted,
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: 4,
                  marginBottom: 16,
                }}
              >
                New Analysis
              </div>
              <div
                style={{
                  background: COLORS.bg,
                  borderRadius: 16,
                  padding: "16px 24px",
                  border: `1px solid rgba(34, 197, 94, 0.3)`,
                }}
              >
                <span
                  style={{
                    color: COLORS.text,
                    fontSize: 22,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  "Explain the key principles of building scalable
                  microservices architecture. Focus on: 1) Service
                  decomposition strategies, 2) Inter-service communication
                  patterns, 3) Data management. Provide real-world examples
                  for each."
                </span>
              </div>
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
              paddingTop: 32,
              gap: 20,
            }}
          >
            <div
              style={{
                background: COLORS.card,
                borderRadius: 24,
                padding: 32,
                border: `1px solid ${COLORS.border}`,
                width: "85%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <BrandLogo size={28} />
                <div
                  style={{
                    color: COLORS.textMuted,
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: 4,
                  }}
                >
                  Chat Analysis
                </div>
              </div>

              <ScoreGauge
                score={92}
                label="Overall Quality"
                appearFrame={start + 70}
                animDuration={60}
                size={240}
              />
            </div>

            {/* Positive feedback card */}
            {showFeedback && (
              <div
                style={{
                  opacity: feedbackOpacity,
                  width: "85%",
                }}
              >
                <div
                  style={{
                    background: "rgba(34, 197, 94, 0.08)",
                    borderRadius: 16,
                    padding: "16px 20px",
                    marginBottom: 12,
                    borderLeft: `3px solid ${COLORS.positive}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 22 }}>✅</span>
                  <span
                    style={{
                      color: COLORS.positive,
                      fontSize: 22,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Shows Own Thinking — you shared your reasoning before asking
                  </span>
                </div>
                <div
                  style={{
                    background: "rgba(34, 197, 94, 0.08)",
                    borderRadius: 16,
                    padding: "16px 20px",
                    borderLeft: `3px solid ${COLORS.positive}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 22 }}>✅</span>
                  <span
                    style={{
                      color: COLORS.positive,
                      fontSize: 22,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    High Specificity — clear goals, constraints, and format
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <TextOverlay
        text="From 18 → 92! 🚀"
        startFrame={start + 150}
        duration={30}
        position="bottom"
        fontSize={36}
        color={COLORS.positive}
      />
    </AbsoluteFill>
  );
};
