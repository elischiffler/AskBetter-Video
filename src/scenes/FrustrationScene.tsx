import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "../constants";
import { ChatMessage } from "../components/ChatMessage";
import { TextOverlay } from "../components/TextOverlay";

export const FrustrationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { start } = SCENES.frustration;
  const rel = frame - start;

  if (rel < 0 || rel > 180) return null;

  const messages = [
    { text: "continue", isUser: true, frame: 5 },
    {
      text: "Sure! As I was saying, the key factors to consider when...",
      isUser: false,
      frame: 20,
    },
    { text: "continue", isUser: true, frame: 55 },
    {
      text: "...building scalable systems include proper architecture and...",
      isUser: false,
      frame: 70,
    },
    { text: "continue", isUser: true, frame: 105 },
    {
      text: "...load balancing strategies. Additionally, you should...",
      isUser: false,
      frame: 120,
    },
    { text: "continue", isUser: true, frame: 145 },
  ];

  const bgPulse = interpolate(rel, [140, 180], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* ChatGPT-style header */}
      <div
        style={{
          padding: "60px 32px 20px",
          borderBottom: `1px solid rgba(139, 92, 246, 0.15)`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background: "linear-gradient(135deg, #74aa9c, #10a37f)",
          }}
        />
        <span
          style={{
            color: COLORS.text,
            fontSize: 30,
            fontWeight: 600,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          ChatGPT
        </span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, paddingTop: 24, overflow: "hidden" }}>
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            text={msg.text}
            isUser={msg.isUser}
            appearFrame={start + msg.frame}
          />
        ))}
      </div>

      {/* Frustration overlay — uses error red */}
      <AbsoluteFill
        style={{
          background: `rgba(239, 68, 68, ${bgPulse})`,
          pointerEvents: "none",
        }}
      />

      <TextOverlay
        text="We've all been here... 😩"
        startFrame={start + 10}
        duration={80}
        position="bottom"
        fontSize={32}
      />
    </AbsoluteFill>
  );
};
