import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { CCLoopSpinProps } from "./schema";

/**
 * CCLoopSpin - Layered composition with counter-rotating CC loops
 *
 * Layers (bottom to top):
 * 1. Green screen background (toggleable)
 * 2. Background image - SOCIAL TEST NO LOGO.png (toggleable)
 * 3. CC Loop A - spinning right/clockwise (toggleable)
 * 4. CC Loop B - spinning left/counter-clockwise (toggleable)
 */
export const CCLoopSpin: React.FC<CCLoopSpinProps> = ({
  backgroundSrc,
  loopASrc,
  loopBSrc,
  spinSpeed,
  showGreenScreen,
  showBackground,
  showLoopA,
  showLoopB,
  greenScreenColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate rotation angles
  // Loop A spins right (clockwise) - positive rotation, starts at 0°
  const rotationA = (frame / fps) * spinSpeed * 360;
  // Loop B spins left (counter-clockwise) - negative rotation, starts at 180° offset
  // The offset makes them visually out of phase so opposite directions are clear
  const rotationB = 180 - ((frame / fps) * spinSpeed * 360);

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

      {/* Layer 3: CC Loop A - Spinning Right (Clockwise) */}
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

      {/* Layer 4: CC Loop B - Spinning Left (Counter-Clockwise) */}
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

export default CCLoopSpin;
