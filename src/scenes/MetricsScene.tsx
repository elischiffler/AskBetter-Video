import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { ProgressBar } from "../components/ProgressBar";
import { TextOverlay } from "../components/TextOverlay";

export const MetricsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.metrics;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(rel, [0, 10, duration - 10, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const metrics = [
    { label: "Specificity", value: 5, color: COLORS.red, delay: 0 },
    { label: "Context Provided", value: 8, color: COLORS.red, delay: 10 },
    { label: "Clarity", value: 12, color: COLORS.red, delay: 20 },
    { label: "Goal Definition", value: 3, color: COLORS.red, delay: 30 },
    { label: "Actionability", value: 10, color: COLORS.red, delay: 40 },
  ];

  const issues = [
    { text: "❌ No context provided", delay: 60 },
    { text: "❌ Single word prompt", delay: 70 },
    { text: "❌ No clear objective", delay: 80 },
    { text: "❌ Missing constraints", delay: 90 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        opacity,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "70px 32px 24px",
          borderBottom: `1px solid ${COLORS.surfaceLight}`,
        }}
      >
        <div
          style={{
            color: COLORS.text,
            fontSize: 34,
            fontWeight: 700,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          📊 Prompt Breakdown
        </div>
      </div>

      {/* Metrics */}
      <div style={{ paddingTop: 32 }}>
        {metrics.map((metric, i) => (
          <ProgressBar
            key={i}
            label={metric.label}
            value={metric.value}
            color={metric.color}
            appearFrame={start + metric.delay}
          />
        ))}
      </div>

      {/* Issues list */}
      <div style={{ padding: "24px 40px" }}>
        <div
          style={{
            color: COLORS.red,
            fontSize: 28,
            fontWeight: 700,
            fontFamily: "Inter, system-ui, sans-serif",
            marginBottom: 16,
          }}
        >
          Issues Found:
        </div>
        {issues.map((issue, i) => {
          const issueRel = rel - issue.delay;
          if (issueRel < 0) return null;
          const issueOpacity = interpolate(issueRel, [0, 8], [0, 1], {
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity: issueOpacity,
                color: COLORS.textMuted,
                fontSize: 26,
                fontFamily: "Inter, system-ui, sans-serif",
                marginBottom: 12,
                paddingLeft: 8,
              }}
            >
              {issue.text}
            </div>
          );
        })}
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
