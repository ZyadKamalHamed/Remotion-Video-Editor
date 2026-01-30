import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { CCLoopSpinOscillateProps } from "./schema";

/**
 * CCLoopSpinOscillate - Rocks back and forth instead of full spin
 *
 * Uses sine wave oscillation (±maxAngle) so direction is clearly visible
 * from the rocking motion. Loop A rocks right, Loop B rocks left.
 *
 * Layers (bottom to top):
 * 1. Green screen background (toggleable)
 * 2. Background image - SOCIAL TEST NO LOGO.png (toggleable)
 * 3. CC Loop A - rocking right on vertical axis
 * 4. CC Loop B - rocking left on vertical axis (opposite phase)
 */
export const CCLoopSpinOscillate: React.FC<CCLoopSpinOscillateProps> = ({
  backgroundSrc,
  loopASrc,
  loopBSrc,
  oscillateSpeed,
  maxAngle,
  showGreenScreen,
  showBackground,
  showLoopA,
  showLoopB,
  greenScreenColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate oscillation using sine wave
  // oscillateSpeed = cycles per second
  const time = frame / fps;
  const oscillation = Math.sin(time * oscillateSpeed * Math.PI * 2);

  // Loop A rocks in positive direction (right)
  const rotationA = oscillation * maxAngle;
  // Loop B rocks in negative direction (left) - opposite phase
  const rotationB = -oscillation * maxAngle;

  return (
    <AbsoluteFill>
      {/* Layer 1: Green Screen Background */}
      {showGreenScreen && (
        <AbsoluteFill
          style={{
            backgroundColor: greenScreenColor,
          }}
        />
      )}

      {/* Layer 2: Background Image (SOCIAL TEST NO LOGO.png) */}
      {showBackground && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile(backgroundSrc)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Layer 3: CC Loop A - Rocking Right */}
      {showLoopA && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile(loopASrc)}
            style={{
              objectFit: "contain",
              transform: `rotateY(${rotationA}deg)`,
              transformOrigin: "center center",
              backfaceVisibility: "visible",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Layer 4: CC Loop B - Rocking Left (opposite direction) */}
      {showLoopB && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile(loopBSrc)}
            style={{
              objectFit: "contain",
              transform: `rotateY(${rotationB}deg)`,
              transformOrigin: "center center",
              backfaceVisibility: "visible",
            }}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export default CCLoopSpinOscillate;
