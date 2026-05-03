# AskBetter Video - UGC Promo

A 1-minute UGC promotional video for [AskBetter](https://ask-better-kiro-hacks.vercel.app/), an AI prompt analyzer. Built with [Remotion](https://remotion.dev).

## Video Format

- **Duration:** 60 seconds
- **Resolution:** 1080x1920 (9:16 vertical for LinkedIn/Instagram)
- **FPS:** 30
- **Landscape variant** also available at 1920x1080

## Storyboard

1. User spamming "continue" in ChatGPT
2. User gets frustrated
3. Searches Google for help
4. Finds Reddit post linking to AskBetter
5. Logs in with Google
6. Analyzes their prompt — gets a bad score (18/100)
7. Sees detailed metrics breakdown
8. Chats with Groq AI coach for tips
9. Uses feedback on a new prompt — scores 92/100
10. Views history showing improvement over time
11. Conclusion with CTA

## Getting Started

```bash
npm install
npm run dev        # Open Remotion Studio
```

## Render

```bash
# Vertical (LinkedIn/Instagram)
npx remotion render AskBetterVideo out/askbetter-vertical.mp4

# Landscape
npx remotion render AskBetterVideo-Landscape out/askbetter-landscape.mp4
```

## Customization

- Scene timings: `src/constants.ts`
- Individual scenes: `src/scenes/`
- Reusable components: `src/components/`

## Tech

- [Remotion](https://remotion.dev) — React-based video framework
- TailwindCSS v4
- TypeScript
