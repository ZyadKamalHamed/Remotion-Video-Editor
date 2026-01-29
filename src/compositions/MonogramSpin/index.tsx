import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { MonogramSpinProps } from "./schema";

/**
 * MonogramSpin - Displays a monogram spinning on its vertical axis over a background
 */
export const MonogramSpin: React.FC<MonogramSpinProps> = ({
  backgroundSrc,
  monogramSrc,
  spinSpeed,
  monogramScale,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate rotation angle based on frame
  // spinSpeed = rotations per second, so multiply by 360 for degrees
  const rotation = (frame / fps) * spinSpeed * 360;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
      }}
    >
      {/* Background Image - Centered and Still */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile(backgroundSrc)}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </AbsoluteFill>

      {/* Monogram - Centered and Spinning on Vertical Axis */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          perspective: 1000, // Adds 3D depth
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg) scale(${monogramScale})`,
          }}
        >
          <Img
            src={staticFile(monogramSrc)}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default MonogramSpin;
