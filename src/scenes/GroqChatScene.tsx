import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { ChatMessage } from "../components/ChatMessage";
import { TextOverlay } from "../components/TextOverlay";

export const GroqChatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start, duration } = SCENES.groqChat;
  const rel = frame - start;

  if (rel < 0 || rel > duration) return null;

  const opacity = interpolate(rel, [0, 10, duration - 10, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      text: "Instead of 'continue', try:\n\n\"Please expand on [topic] with focus on [aspect], providing 3 actionable steps with examples.\"",
      isUser: false,
      frame: 125,
      typing: true,
    },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity }}>
      {/* Chat header */}
      <div
        style={{
          padding: "60px 32px 16px",
          borderBottom: `1px solid ${COLORS.surfaceLight}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 22, color: "white", fontWeight: 800 }}>G</span>
        </div>
        <div>
          <div
            style={{
              color: COLORS.text,
              fontSize: 28,
              fontWeight: 600,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Groq Assistant
          </div>
          <div
            style={{
              color: COLORS.accent,
              fontSize: 18,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            ● Online
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, paddingTop: 20, overflow: "hidden" }}>
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
