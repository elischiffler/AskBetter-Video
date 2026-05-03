import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";

export const HistoryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.history;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(rel, [0, 10, duration - 10, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const entries = [
    { prompt: '"continue"', score: 18, date: "2 hours ago", delay: 15 },
    { prompt: '"tell me about coding"', score: 35, date: "1 hour ago", delay: 30 },
    { prompt: '"Explain React hooks with examples..."', score: 68, date: "45 min ago", delay: 45 },
    { prompt: '"Explain scalable microservices..."', score: 92, date: "Just now", delay: 60 },
  ];

  const getScoreColor = (s: number) => {
    if (s < 40) return COLORS.red;
    if (s < 70) return COLORS.yellow;
    return COLORS.green;
  };

  // Animated chart line
  const chartProgress = interpolate(rel, [80, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity }}>
      {/* Header */}
      <div
        style={{
          padding: "70px 32px 20px",
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
          📈 Prompt History
        </div>
      </div>

      {/* History entries */}
      <div style={{ padding: "20px 28px" }}>
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
                background: COLORS.surfaceLight,
                borderRadius: 16,
                padding: "18px 24px",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: i === entries.length - 1
                  ? `1px solid ${COLORS.green}40`
                  : `1px solid transparent`,
              }}
            >
              <div style={{ flex: 1, marginRight: 16 }}>
                <div
                  style={{
                    color: COLORS.text,
                    fontSize: 22,
                    fontFamily: "Inter, system-ui, sans-serif",
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
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {entry.date}
                </div>
              </div>
              <div
                style={{
                  background: `${getScoreColor(entry.score)}20`,
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
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {entry.score}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini chart */}
      <div
        style={{
          padding: "20px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <svg width="900" height="200" viewBox="0 0 900 200">
          {/* Grid lines */}
          {[0, 50, 100].map((v) => (
            <line
              key={v}
              x1="50"
              y1={180 - v * 1.6}
              x2="850"
              y2={180 - v * 1.6}
              stroke={COLORS.surfaceLight}
              strokeWidth="1"
            />
          ))}
          {/* Line chart */}
          <polyline
            points={`100,${180 - 18 * 1.6} 350,${180 - 35 * 1.6} 600,${180 - 68 * 1.6} 850,${180 - 92 * 1.6}`}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1200"
            strokeDashoffset={1200 - chartProgress * 1200}
          />
          {/* Data points */}
          {[
            { x: 100, y: 180 - 18 * 1.6 },
            { x: 350, y: 180 - 35 * 1.6 },
            { x: 600, y: 180 - 68 * 1.6 },
            { x: 850, y: 180 - 92 * 1.6 },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="8"
              fill={COLORS.accent}
              opacity={chartProgress > i * 0.25 ? 1 : 0}
            />
          ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
