import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { ProgressBar } from "../components/ProgressBar";
import { TextOverlay } from "../components/TextOverlay";
import { AppHeader } from "../components/AppHeader";

export const MetricsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.metrics;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Real AskBetter score dimensions
  const scoreBreakdown = [
    { label: "Autonomy", value: 12, color: COLORS.error, delay: 0 },
    { label: "Curiosity", value: 8, color: COLORS.error, delay: 8 },
    { label: "Critical Thinking", value: 5, color: COLORS.error, delay: 16 },
    { label: "Specificity", value: 10, color: COLORS.error, delay: 24 },
    { label: "Context", value: 6, color: COLORS.error, delay: 32 },
    { label: "Engagement", value: 15, color: COLORS.error, delay: 40 },
  ];

  // Category breakdown (intent distribution)
  const categories = [
    { label: "Delegation", value: 82, color: COLORS.delegation, delay: 50 },
    { label: "Curiosity", value: 9, color: COLORS.curiosity, delay: 56 },
    { label: "Collaborative", value: 5, color: COLORS.collaborative, delay: 62 },
    { label: "Verification", value: 4, color: COLORS.verification, delay: 68 },
  ];

  // Feedback cards
  const feedbackCards = [
    {
      severity: "warning" as const,
      text: "Copy-Paste Heavy — several prompts were long pastes without a clear question",
      delay: 80,
    },
    {
      severity: "warning" as const,
      text: "Low Effort — single-word prompts detected",
      delay: 90,
    },
  ];

  const severityColors = {
    warning: { bg: "rgba(251, 146, 60, 0.08)", border: COLORS.warning, text: COLORS.warning },
    positive: { bg: "rgba(34, 197, 94, 0.08)", border: COLORS.positive, text: COLORS.positive },
  };

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity }}>
      <AppHeader showNav />

      <div style={{ paddingTop: 90 }}>
        {/* Score Breakdown card */}
        <div style={{ padding: "12px 28px" }}>
          <div
            style={{
              background: COLORS.card,
              borderRadius: 24,
              padding: "24px 8px",
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
                marginBottom: 20,
                paddingLeft: 32,
              }}
            >
              Score Breakdown
            </div>
            {scoreBreakdown.map((metric, i) => (
              <ProgressBar
                key={i}
                label={metric.label}
                value={metric.value}
                color={metric.color}
                appearFrame={start + metric.delay}
              />
            ))}
          </div>
        </div>

        {/* Category Breakdown card */}
        <div style={{ padding: "12px 28px" }}>
          <div
            style={{
              background: COLORS.card,
              borderRadius: 24,
              padding: "24px 8px",
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
                marginBottom: 20,
                paddingLeft: 32,
              }}
            >
              Category Breakdown
            </div>
            {categories.map((cat, i) => (
              <ProgressBar
                key={i}
                label={cat.label}
                value={cat.value}
                color={cat.color}
                appearFrame={start + cat.delay}
              />
            ))}
          </div>
        </div>

        {/* Feedback cards */}
        <div style={{ padding: "12px 28px" }}>
          {feedbackCards.map((card, i) => {
            const cardRel = rel - card.delay;
            if (cardRel < 0) return null;
            const cardOpacity = interpolate(cardRel, [0, 8], [0, 1], {
              extrapolateRight: "clamp",
            });
            const colors = severityColors[card.severity];
            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  background: colors.bg,
                  borderRadius: 16,
                  padding: "16px 20px",
                  marginBottom: 12,
                  borderLeft: `3px solid ${colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 22 }}>⚠️</span>
                <span
                  style={{
                    color: colors.text,
                    fontSize: 22,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {card.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <TextOverlay
        text="Yikes... let's fix this 🔧"
        startFrame={start + 110}
        duration={40}
        position="bottom"
        fontSize={30}
      />
    </AbsoluteFill>
  );
};
