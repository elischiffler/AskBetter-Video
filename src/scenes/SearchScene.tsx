import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";

export const SearchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.search;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const searchQuery = "how to make AI respond better";
  const charsToShow = Math.min(
    searchQuery.length,
    Math.floor(
      interpolate(rel, [20, 80], [0, searchQuery.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );

  const showResults = rel > 90;
  const resultsOpacity = interpolate(rel, [90, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity }}>
      {/* Browser chrome */}
      <div
        style={{
          background: COLORS.card,
          padding: "60px 24px 16px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#febc2e",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#28c840",
            }}
          />
        </div>
        {/* Search bar */}
        <div
          style={{
            background: COLORS.bg,
            borderRadius: 16,
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: `1px solid ${COLORS.inputBorder}`,
          }}
        >
          <span style={{ fontSize: 24, color: COLORS.textDim }}>&#x2315;</span>
          <span
            style={{
              color: COLORS.text,
              fontSize: 26,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {searchQuery.slice(0, charsToShow)}
            <span
              style={{
                opacity: Math.sin(rel * 0.3) > 0 ? 1 : 0,
                color: COLORS.primary,
              }}
            >
              |
            </span>
          </span>
        </div>
      </div>

      {/* Search results */}
      {showResults && (
        <div style={{ padding: "24px 32px", opacity: resultsOpacity }}>
          {[
            {
              title: "10 Tips for Better AI Prompts",
              url: "medium.com/ai-tips",
              desc: "Learn how to craft prompts that get better responses...",
            },
            {
              title: "r/ChatGPT - Found this amazing prompt analyzer tool",
              url: "reddit.com/r/ChatGPT",
              desc: "Just discovered AskBetter — it analyzes your prompts and tells you...",
              highlight: true,
            },
            {
              title: "Prompt Engineering Guide 2025",
              url: "promptguide.dev",
              desc: "The complete guide to writing effective prompts...",
            },
          ].map((result, i) => (
            <div
              key={i}
              style={{
                marginBottom: 28,
                padding: result.highlight ? "20px 24px" : "0",
                background: result.highlight
                  ? "rgba(124, 58, 237, 0.08)"
                  : "transparent",
                borderRadius: 16,
                border: result.highlight
                  ? `2px solid rgba(124, 58, 237, 0.4)`
                  : "none",
              }}
            >
              <div
                style={{
                  color: COLORS.textDim,
                  fontSize: 20,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  marginBottom: 4,
                }}
              >
                {result.url}
              </div>
              <div
                style={{
                  color: result.highlight ? COLORS.primaryLight : "#8ab4f8",
                  fontSize: 28,
                  fontWeight: 600,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  marginBottom: 6,
                }}
              >
                {result.title}
              </div>
              <div
                style={{
                  color: COLORS.textMuted,
                  fontSize: 22,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {result.desc}
              </div>
            </div>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
