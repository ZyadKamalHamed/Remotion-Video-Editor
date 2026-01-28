import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence } from "remotion";
import { AnimationSkills } from "../../../skills/animations/types";

interface IntroSceneProps {
  title: string;
  primaryColor: string;
  animations: AnimationSkills;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  title,
  primaryColor,
  animations,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = animations.spring(frame, {
    fps,
    from: 0.8,
    to: 1,
    durationInFrames: fps,
  });

  return (
    <Sequence from={0} durationInFrames={fps * 3}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity,
        }}
      >
        <h1
          style={{
            color: primaryColor,
            fontSize: 80,
            fontFamily: "system-ui, sans-serif",
            fontWeight: "bold",
            transform: `scale(${scale})`,
            textAlign: "center",
            margin: 0,
          }}
        >
          {title}
        </h1>
      </AbsoluteFill>
    </Sequence>
  );
};
