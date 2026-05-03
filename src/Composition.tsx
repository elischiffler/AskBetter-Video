import { AbsoluteFill } from "remotion";
import { FrustrationScene } from "./scenes/FrustrationScene";
import { AngryScene } from "./scenes/AngryScene";
import { SearchScene } from "./scenes/SearchScene";
import { RedditScene } from "./scenes/RedditScene";
import { LoginScene } from "./scenes/LoginScene";
import { AnalyzeScene } from "./scenes/AnalyzeScene";
import { MetricsScene } from "./scenes/MetricsScene";
import { GroqChatScene } from "./scenes/GroqChatScene";
import { ImprovementScene } from "./scenes/ImprovementScene";
import { HistoryScene } from "./scenes/HistoryScene";
import { ConclusionScene } from "./scenes/ConclusionScene";

export const AskBetterVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0f0f0f" }}>
      <FrustrationScene />
      <AngryScene />
      <SearchScene />
      <RedditScene />
      <LoginScene />
      <AnalyzeScene />
      <MetricsScene />
      <GroqChatScene />
      <ImprovementScene />
      <HistoryScene />
      <ConclusionScene />
    </AbsoluteFill>
  );
};
