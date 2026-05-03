import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";

export const RedditScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.reddit;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const linkGlow = interpolate(
    Math.sin(rel * 0.15),
    [-1, 1],
    [0.3, 0.8]
  );

  return (
    <AbsoluteFill style={{ background: "#1a1a1b", opacity }}>
      {/* Reddit header */}
      <div
        style={{
          background: "#272729",
          padding: "60px 24px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid #343536",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "#ff4500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 800,
            color: "white",
          }}
        >
          r/
        </div>
        <span
          style={{
            color: "#d7dadc",
            fontSize: 28,
            fontWeight: 600,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          r/ChatGPT
        </span>
      </div>

      {/* Post */}
      <div style={{ padding: "24px 28px" }}>
        <div style={{ display: "flex", gap: 16 }}>
          {/* Votes */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              paddingTop: 4,
            }}
          >
            <span style={{ color: "#ff4500", fontSize: 28 }}>▲</span>
            <span
              style={{
                color: "#d7dadc",
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              847
            </span>
            <span style={{ color: "#818384", fontSize: 28 }}>▽</span>
          </div>

          {/* Post content */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: "#818384",
                fontSize: 20,
                fontFamily: "system-ui, -apple-system, sans-serif",
                marginBottom: 8,
              }}
            >
              u/prompt_engineer_42 · 2h
            </div>
            <div
              style={{
                color: "#d7dadc",
                fontSize: 30,
                fontWeight: 700,
                fontFamily: "system-ui, -apple-system, sans-serif",
                marginBottom: 16,
                lineHeight: 1.3,
              }}
            >
              Found this amazing prompt analyzer tool — it completely changed how
              I use AI
            </div>
            <div
              style={{
                color: "#d7dadc",
                fontSize: 24,
                fontFamily: "system-ui, -apple-system, sans-serif",
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              I was struggling with getting good responses from ChatGPT until I
              found this tool. It analyzes your prompts and shows you exactly
              what you're doing wrong.
            </div>

            {/* The link — uses AskBetter purple glow */}
            <div
              style={{
                background: `rgba(124, 58, 237, ${linkGlow * 0.12})`,
                border: `2px solid rgba(124, 58, 237, ${linkGlow})`,
                borderRadius: 16,
                padding: "20px 24px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  color: COLORS.primaryLight,
                  fontSize: 22,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  marginBottom: 4,
                }}
              >
                🔗 Link
              </div>
              <div
                style={{
                  color: COLORS.primaryLight,
                  fontSize: 26,
                  fontWeight: 600,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textDecoration: "underline",
                }}
              >
                ask-better-kiro-hacks.vercel.app
              </div>
            </div>

            {/* Comments */}
            <div
              style={{
                color: "#818384",
                fontSize: 20,
                fontFamily: "system-ui, -apple-system, sans-serif",
                display: "flex",
                gap: 24,
              }}
            >
              <span>💬 234 comments</span>
              <span>🔄 Share</span>
              <span>⭐ Save</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
