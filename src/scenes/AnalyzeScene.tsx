import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { ScoreGauge } from "../components/ScoreGauge";
import { TextOverlay } from "../components/TextOverlay";

export const AnalyzeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.analyze;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(rel, [0, 10, duration - 10, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showPrompt = rel > 10;
  const promptOpacity = interpolate(rel, [10, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showAnalyzing = rel > 50 && rel < 110;
  const analyzingOpacity = interpolate(
    rel,
    [50, 60, 100, 110],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showScore = rel > 110;

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
      </div>

      {/* Prompt input area */}
      {showPrompt && (
        <div style={{ padding: "20px 32px", opacity: promptOpacity }}>
          <div
            style={{
              color: COLORS.textMuted,
              fontSize: 22,
              fontFamily: "Inter, system-ui, sans-serif",
              marginBottom: 12,
            }}
          >
            Your prompt:
          </div>
          <div
            style={{
              background: COLORS.surfaceLight,
              borderRadius: 16,
              padding: "20px 24px",
              border: `1px solid ${COLORS.red}40`,
            }}
          >
            <span
              style={{
                color: COLORS.text,
                fontSize: 26,
                fontFamily: "Inter, system-ui, sans-serif",
                lineHeight: 1.5,
              }}
            >
              "continue"
            </span>
          </div>
        </div>
      )}

      {/* Analyzing animation */}
      {showAnalyzing && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            opacity: analyzingOpacity,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              border: `4px solid ${COLORS.surfaceLight}`,
              borderTopColor: COLORS.primary,
              transform: `rotate(${rel * 8}deg)`,
            }}
          />
          <div
            style={{
              color: COLORS.textMuted,
              fontSize: 28,
              fontFamily: "Inter, system-ui, sans-serif",
              marginTop: 24,
            }}
          >
            Analyzing prompt...
          </div>
        </div>
      )}

      {/* Score result */}
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
            score={18}
            label="Prompt Quality Score"
            appearFrame={start + 110}
            size={280}
          />

          <div
            style={{
              background: `${COLORS.red}20`,
              border: `1px solid ${COLORS.red}40`,
              borderRadius: 16,
              padding: "16px 32px",
              marginTop: 16,
            }}
          >
            <span
              style={{
                color: COLORS.red,
                fontSize: 28,
                fontWeight: 700,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              ⚠️ Poor Quality Prompt
            </span>
          </div>
        </div>
      )}

      <TextOverlay
        text="Time to see what's wrong..."
        startFrame={start + 160}
        duration={50}
        position="bottom"
        fontSize={30}
      />
    </AbsoluteFill>
  );
};
