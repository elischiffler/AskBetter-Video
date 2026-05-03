import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { AppHeader } from "../components/AppHeader";
import { ScoreGauge } from "../components/ScoreGauge";
import { TextOverlay } from "../components/TextOverlay";
import { BrandLogo } from "../components/BrandLogo";

export const AnalyzeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.analyze;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
    <AbsoluteFill style={{ background: COLORS.bg, opacity }}>
      <AppHeader showNav />

      {/* Content below header */}
      <div style={{ paddingTop: 90 }}>
        {/* Eyebrow label */}
        <div style={{ padding: "20px 32px 0" }}>
          <div
            style={{
              color: COLORS.textMuted,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textTransform: "uppercase",
              letterSpacing: 4,
              marginBottom: 8,
            }}
          >
            AI Prompt Analysis
          </div>
        </div>

        {/* URL input area — matches the analyze section */}
        {showPrompt && (
          <div style={{ padding: "12px 32px", opacity: promptOpacity }}>
            <div
              style={{
                background: COLORS.card,
                borderRadius: 24,
                padding: 32,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div
                style={{
                  color: COLORS.textMuted,
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  marginBottom: 16,
                }}
              >
                Paste your ChatGPT share link
              </div>
              <div
                style={{
                  background: COLORS.bg,
                  borderRadius: 16,
                  padding: "16px 24px",
                  border: `1px solid ${COLORS.inputBorderFocus}`,
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    color: COLORS.text,
                    fontSize: 22,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  https://chatgpt.com/share/abc123...
                </span>
              </div>
              {/* Analyze button — primary style */}
              <div
                style={{
                  background: COLORS.primary,
                  borderRadius: 16,
                  padding: "16px 32px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    color: COLORS.text,
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: 3,
                  }}
                >
                  Analyze Chat
                </span>
              </div>
              <div
                style={{
                  color: COLORS.textDim,
                  fontSize: 16,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                Supports ChatGPT, Gemini, Perplexity
              </div>
            </div>
          </div>
        )}

        {/* Analyzing spinner */}
        {showAnalyzing && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 120,
              opacity: analyzingOpacity,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                border: `4px solid ${COLORS.progressTrack}`,
                borderTopColor: COLORS.primary,
                transform: `rotate(${rel * 8}deg)`,
              }}
            />
            <div
              style={{
                color: COLORS.textMuted,
                fontSize: 28,
                fontFamily: "system-ui, -apple-system, sans-serif",
                marginTop: 24,
              }}
            >
              Analyzing conversation...
            </div>
          </div>
        )}

        {/* Score result — matches Results Page overall score badge */}
        {showScore && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 60,
              gap: 24,
            }}
          >
            {/* Chat Analysis card */}
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
                score={18}
                label="Overall Quality"
                appearFrame={start + 110}
                size={260}
              />

              {/* Stat chips */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 24,
                }}
              >
                <div
                  style={{
                    background: "rgba(124, 58, 237, 0.1)",
                    borderRadius: 12,
                    padding: "8px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      color: COLORS.primaryLight,
                      fontWeight: 700,
                    }}
                  >
                    //
                  </span>
                  <span
                    style={{
                      color: COLORS.textMuted,
                      fontSize: 20,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    11 messages
                  </span>
                </div>
                <div
                  style={{
                    background: "rgba(124, 58, 237, 0.1)",
                    borderRadius: 12,
                    padding: "8px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      color: COLORS.primaryLight,
                      fontWeight: 700,
                    }}
                  >
                    ~
                  </span>
                  <span
                    style={{
                      color: COLORS.textMuted,
                      fontSize: 20,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    9 minutes
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: `1px solid rgba(239, 68, 68, 0.3)`,
                borderRadius: 16,
                padding: "16px 32px",
              }}
            >
              <span
                style={{
                  color: COLORS.error,
                  fontSize: 28,
                  fontWeight: 700,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                ⚠ Poor Quality Prompt
              </span>
            </div>
          </div>
        )}
      </div>

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
