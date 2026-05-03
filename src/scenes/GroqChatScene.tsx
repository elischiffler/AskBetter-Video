import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { ChatMessage } from "../components/ChatMessage";
import { TextOverlay } from "../components/TextOverlay";
import { AppHeader } from "../components/AppHeader";

export const GroqChatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.groqChat;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(
    rel,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const messages = [
    {
      text: "How can I improve my prompts to get better AI responses?",
      isUser: true,
      frame: 10,
    },
    {
      text: "Great question! Here are key tips:\n\n1. Be specific about what you need\n2. Provide context and background\n3. Define the output format\n4. Set constraints and boundaries\n5. Include examples when possible",
      isUser: false,
      frame: 30,
      typing: true,
    },
    {
      text: "Can you show me an example of a good prompt?",
      isUser: true,
      frame: 110,
    },
    {
      text: 'Instead of "continue", try:\n\n"Please expand on [topic] with focus on [aspect], providing 3 actionable steps with examples."',
      isUser: false,
      frame: 125,
      typing: true,
    },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity }}>
      <AppHeader showNav />

      {/* Live Chat card — matches the Results Page AI coach */}
      <div style={{ paddingTop: 84 }}>
        <div
          style={{
            margin: "12px 28px",
            background: COLORS.card,
            borderRadius: 24,
            border: `1px solid ${COLORS.border}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: 1600,
          }}
        >
          {/* Chat card header */}
          <div
            style={{
              padding: "20px 24px",
              borderBottom: `1px solid ${COLORS.border}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryHover})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ fontSize: 20, color: "white", fontWeight: 800 }}
              >
                G
              </span>
            </div>
            <div>
              <div
                style={{
                  color: COLORS.text,
                  fontSize: 24,
                  fontWeight: 600,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                AI Coach
              </div>
              <div
                style={{
                  color: COLORS.improving,
                  fontSize: 16,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                ● Powered by Groq
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, paddingTop: 16, overflow: "hidden" }}>
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                text={msg.text}
                isUser={msg.isUser}
                appearFrame={start + msg.frame}
                typing={msg.typing}
              />
            ))}
          </div>

          {/* Action buttons at bottom — matches "Draft Better Prompts" / "Ask Your Own Question" */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: `1px solid ${COLORS.border}`,
              display: "flex",
              gap: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                background: COLORS.primary,
                borderRadius: 12,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: COLORS.text,
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                Draft Better Prompts
              </span>
            </div>
            <div
              style={{
                flex: 1,
                background: "transparent",
                border: `1px solid rgba(139, 92, 246, 0.45)`,
                borderRadius: 12,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: COLORS.textMuted,
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                Ask Your Own Question
              </span>
            </div>
          </div>
        </div>
      </div>

      <TextOverlay
        text="💡 Learning from the AI coach"
        startFrame={start + 20}
        duration={60}
        position="bottom"
        fontSize={28}
      />
    </AbsoluteFill>
  );
};
