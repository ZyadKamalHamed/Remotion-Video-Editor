import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence } from "remotion";

interface OutroSceneProps {
  primaryColor: string;
}

export const OutroScene: React.FC<OutroSceneProps> = ({ primaryColor }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const startFrame = fps * 7;
  const localFrame = frame - startFrame;

  const opacity = interpolate(localFrame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    localFrame,
    [fps * 2, fps * 3],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Sequence from={startFrame} durationInFrames={durationInFrames - startFrame}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: opacity * fadeOut,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: primaryColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: 48,
              fontWeight: "bold",
            }}
          >
            ✓
          </span>
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};
