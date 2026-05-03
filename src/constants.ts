// Video configuration
export const FPS = 30;
export const DURATION_IN_SECONDS = 60;
export const DURATION_IN_FRAMES = FPS * DURATION_IN_SECONDS; // 1800

// 1080x1920 for LinkedIn/Instagram vertical (9:16)
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

// Colors
export const COLORS = {
  bg: "#0f0f0f",
  bgDark: "#0a0a0a",
  surface: "#1a1a2e",
  surfaceLight: "#16213e",
  primary: "#6c63ff",
  primaryLight: "#8b83ff",
  accent: "#00d4aa",
  accentAlt: "#ff6b6b",
  text: "#ffffff",
  textMuted: "#a0a0b0",
  textDim: "#666680",
  red: "#ff4757",
  green: "#2ed573",
  yellow: "#ffa502",
  chatBubbleUser: "#6c63ff",
  chatBubbleAI: "#2a2a3e",
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
