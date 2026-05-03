// Video configuration
export const FPS = 30;
export const DURATION_IN_SECONDS = 60;
export const DURATION_IN_FRAMES = FPS * DURATION_IN_SECONDS; // 1800

// 1080x1920 for LinkedIn/Instagram vertical (9:16)
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

// AskBetter Brand Colors (from ASKBETTER_CONTEXT.md)
export const COLORS = {
  // Core backgrounds
  bg: "#0f0a1e",              // Page background — deep dark purple-black
  bgDark: "#0a0716",          // Even darker variant
  card: "#1a1030",            // Card/panel surfaces
  border: "rgba(139, 92, 246, 0.25)", // Card borders, dividers

  // Primary accent (purple)
  primary: "#7c3aed",         // Buttons, highlights, logo "Better" text
  primaryHover: "#6d28d9",    // Button hover / deep purple
  primaryLight: "#a78bfa",    // Labels, secondary text, section headers
  primaryPale: "#c4b5fd",     // Pale lavender

  // Text
  text: "#f5f3ff",            // Headings, body text (near-white with violet tint)
  textMuted: "#a78bfa",       // Labels, secondary text
  textDim: "#6b5fa0",         // Disclaimers, footnotes, tertiary text

  // Semantic colors
  positive: "#22c55e",        // Positive feedback, good scores
  positiveMid: "#4ade80",     // Positive mid
  positiveLight: "#86efac",   // Positive light
  warning: "#fb923c",         // Suggestion cards, warning banners
  warningLight: "#fdba74",    // Warning light
  error: "#ef4444",           // Warning patterns, error states
  errorLight: "#f87171",      // Error light
  improving: "#10b981",       // Trend-up indicators

  // Category colors (intent types)
  delegation: "#7c3aed",      // Primary purple
  curiosity: "#a78bfa",       // Light purple
  collaborative: "#6d28d9",   // Deep purple
  verification: "#c4b5fd",    // Pale lavender

  // Chat
  chatBubbleUser: "#7c3aed",
  chatBubbleAI: "#1a1030",

  // UI elements
  progressTrack: "rgba(139, 92, 246, 0.12)",
  inputBorder: "rgba(139, 92, 246, 0.3)",
  inputBorderFocus: "rgba(139, 92, 246, 0.8)",
  headerBg: "rgba(15, 10, 30, 0.85)",
  headerBorder: "rgba(139, 92, 246, 0.15)",
  gridLine: "rgba(139, 92, 246, 0.25)",
};

// Scene timings (in frames at 30fps)
export const SCENES = {
  // Scene 1: User spamming "continue" (0-6s)
  frustration: { start: 0, duration: 180 },
  // Scene 2: User gets frustrated (6-9s)
  angry: { start: 180, duration: 90 },
  // Scene 3: Searches for help (9-14s)
  search: { start: 270, duration: 150 },
  // Scene 4: Finds Reddit link to AskBetter (14-19s)
  reddit: { start: 420, duration: 150 },
  // Scene 5: Logs in to AskBetter (19-23s)
  login: { start: 570, duration: 120 },
  // Scene 6: Analyzes prompt - bad score (23-30s)
  analyze: { start: 690, duration: 210 },
  // Scene 7: Sees bad metrics breakdown (30-35s)
  metrics: { start: 900, duration: 150 },
  // Scene 8: Chats with Groq bot for tips (35-41s)
  groqChat: { start: 1050, duration: 180 },
  // Scene 9: Uses feedback, gets better score (41-47s)
  improvement: { start: 1230, duration: 180 },
  // Scene 10: History shows improvement (47-52s)
  history: { start: 1410, duration: 150 },
  // Scene 11: Conclusion / CTA (52-60s)
  conclusion: { start: 1560, duration: 240 },
};
