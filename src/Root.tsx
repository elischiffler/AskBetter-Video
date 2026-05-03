import "./index.css";
import { Composition } from "remotion";
import { AskBetterVideo } from "./Composition";
import {
  FPS,
  DURATION_IN_FRAMES,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
} from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main vertical video for LinkedIn / Instagram (9:16) */}
      <Composition
        id="AskBetterVideo"
        component={AskBetterVideo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      {/* Landscape version if needed (16:9) */}
      <Composition
        id="AskBetterVideo-Landscape"
        component={AskBetterVideo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
