import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export const ChatMessage: React.FC<{
  text: string;
  isUser: boolean;
  appearFrame: number;
  typing?: boolean;
}> = ({ text, isUser, appearFrame, typing = false }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - appearFrame;

  if (relativeFrame < 0) return null;

  const opacity = interpolate(relativeFrame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(relativeFrame, [0, 8], [30, 0], {
    extrapolateRight: "clamp",
  });

  const charsToShow = typing
    ? Math.min(
        text.length,
        Math.floor(interpolate(relativeFrame, [0, 60], [0, text.length], {
          extrapolateRight: "clamp",
        }))
      )
    : text.length;

  const displayText = text.slice(0, charsToShow);
  const showCursor = typing && charsToShow < text.length;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        opacity,
        transform: `translateY(${translateY}px)`,
        marginBottom: 16,
        padding: "0 24px",
      }}
    >
      <div
        style={{
          background: isUser ? COLORS.chatBubbleUser : COLORS.chatBubbleAI,
          color: COLORS.text,
          padding: "16px 24px",
          borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
          maxWidth: "80%",
          fontSize: 28,
          fontFamily: "Inter, system-ui, sans-serif",
          lineHeight: 1.5,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {displayText}
        {showCursor && (
          <span
            style={{
              opacity: Math.sin(relativeFrame * 0.3) > 0 ? 1 : 0,
              color: COLORS.primaryLight,
            }}
          >
            ▊
          </span>
        )}
      </div>
    </div>
  );
};
