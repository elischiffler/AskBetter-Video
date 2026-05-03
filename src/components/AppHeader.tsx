import { COLORS } from "../constants";

export const AppHeader: React.FC<{
  showNav?: boolean;
}> = ({ showNav = false }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: COLORS.headerBg,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.headerBorder}`,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 72,
      }}
    >
      {/* Logo: "Ask" in text color + "Better" in primary */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: COLORS.text,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          Ask
        </span>
        <span
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: COLORS.primary,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          Better
        </span>
      </div>

      {/* Nav items */}
      {showNav && (
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {["History", "Dashboard"].map((item) => (
            <span
              key={item}
              style={{
                color: COLORS.textMuted,
                fontSize: 18,
                fontWeight: 600,
                fontFamily: "system-ui, -apple-system, sans-serif",
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              {item}
            </span>
          ))}
          <div
            style={{
              background: "transparent",
              border: `1px solid rgba(139, 92, 246, 0.45)`,
              borderRadius: 12,
              padding: "8px 16px",
              color: COLORS.textMuted,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            Sign out
          </div>
        </div>
      )}
    </div>
  );
};
