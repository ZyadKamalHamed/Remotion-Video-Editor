import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { TransitionSkills } from "../../../skills/transitions/types";

interface MainSceneProps {
  subtitle: string;
  primaryColor: string;
  transitions: TransitionSkills;
}

export const MainScene: React.FC<MainSceneProps> = ({
  subtitle,
  primaryColor,
  transitions,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - fps * 3;
  const progress = transitions.fadeIn(localFrame, { durationInFrames: fps });

  return (
    <Sequence from={fps * 3} durationInFrames={fps * 4}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: Math.max(0, progress),
        }}
      >
        <p
          style={{
            color: "#ffffff",
            fontSize: 48,
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
        <div
          style={{
            width: 200,
            height: 4,
            backgroundColor: primaryColor,
            marginTop: 40,
            borderRadius: 2,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};
