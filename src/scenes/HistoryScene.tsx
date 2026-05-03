import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { AppHeader } from "../components/AppHeader";

export const HistoryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.history;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const entries = [
    { prompt: '"continue"', score: 18, date: "2 hours ago", delay: 15 },
    {
      prompt: '"tell me about coding"',
      score: 35,
      date: "1 hour ago",
      delay: 30,
    },
    {
      prompt: '"Explain React hooks with examples..."',
      score: 68,
      date: "45 min ago",
      delay: 45,
    },
    {
      prompt: '"Explain scalable microservices..."',
      score: 92,
      date: "Just now",
      delay: 60,
    },
  ];

  const getScoreColor = (s: number) => {
    if (s < 40) return COLORS.error;
    if (s < 70) return COLORS.warning;
    return COLORS.positive;
  };

  // Animated chart line
  const chartProgress = interpolate(rel, [80, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity }}>
      <AppHeader showNav />

      <div style={{ paddingTop: 84 }}>
        {/* Dashboard-style header */}
        <div style={{ padding: "20px 32px" }}>
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
            Your Progress
          </div>
          <div
            style={{
              color: COLORS.text,
              fontSize: 36,
              fontWeight: 900,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Prompt History
          </div>
        </div>

        {/* Trend chart card */}
        <div style={{ padding: "8px 28px" }}>
          <div
            style={{
              background: COLORS.card,
              borderRadius: 24,
              padding: "24px 16px",
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <svg width="980" height="220" viewBox="0 0 980 220">
              {/* Grid lines */}
              {[0, 50, 100].map((v) => (
                <line
                  key={v}
                  x1="50"
                  y1={200 - v * 1.8}
                  x2="930"
                  y2={200 - v * 1.8}
                  stroke={COLORS.progressTrack}
                  strokeWidth="1"
                />
              ))}
              {/* Line chart — uses improving teal */}
              <polyline
                points={`100,${200 - 18 * 1.8} 380,${200 - 35 * 1.8} 660,${200 - 68 * 1.8} 930,${200 - 92 * 1.8}`}
                fill="none"
                stroke={COLORS.improving}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1400"
                strokeDashoffset={1400 - chartProgress * 1400}
              />
              {/* Data points */}
              {[
                { x: 100, y: 200 - 18 * 1.8 },
                { x: 380, y: 200 - 35 * 1.8 },
                { x: 660, y: 200 - 68 * 1.8 },
                { x: 930, y: 200 - 92 * 1.8 },
              ].map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="8"
                  fill={COLORS.improving}
                  opacity={chartProgress > i * 0.25 ? 1 : 0}
                />
              ))}
            </svg>

            {/* Trend indicator */}
            {chartProgress > 0.8 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  paddingLeft: 40,
                  paddingTop: 8,
                }}
              >
                <span style={{ color: COLORS.improving, fontSize: 22 }}>
                  ↑
                </span>
                <span
                  style={{
                    color: COLORS.improving,
                    fontSize: 20,
                    fontWeight: 600,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Improving
                </span>
              </div>
            )}
          </div>
        </div>

        {/* History entries */}
        <div style={{ padding: "12px 28px" }}>
          {entries.map((entry, i) => {
            const entryRel = rel - entry.delay;
            if (entryRel < 0) return null;
            const entryOpacity = interpolate(entryRel, [0, 10], [0, 1], {
              extrapolateRight: "clamp",
            });
            const entrySlide = interpolate(entryRel, [0, 10], [20, 0], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  opacity: entryOpacity,
                  transform: `translateX(${entrySlide}px)`,
                  background: COLORS.card,
                  borderRadius: 16,
                  padding: "18px 24px",
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border:
                    i === entries.length - 1
                      ? `1px solid rgba(34, 197, 94, 0.3)`
                      : `1px solid ${COLORS.border}`,
                }}
              >
                <div style={{ flex: 1, marginRight: 16 }}>
                  <div
                    style={{
                      color: COLORS.text,
                      fontSize: 22,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 500,
                      marginBottom: 4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 600,
                    }}
                  >
                    {entry.prompt}
                  </div>
                  <div
                    style={{
                      color: COLORS.textDim,
                      fontSize: 18,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {entry.date}
                  </div>
                </div>
                <div
                  style={{
                    background: `${getScoreColor(entry.score)}15`,
                    borderRadius: 12,
                    padding: "8px 16px",
                    minWidth: 70,
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      color: getScoreColor(entry.score),
                      fontSize: 26,
                      fontWeight: 700,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {entry.score}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
