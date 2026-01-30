import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { CCLoopSpinDiagonalProps } from "./schema";

/**
 * CCLoopSpinDiagonal - Diagonal spin axis with perspective depth
 *
 * Combines rotateX + rotateY for a tilted spin axis that makes
 * opposite rotation directions clearly visible.
 *
 * Layers (bottom to top):
 * 1. Green screen background (toggleable)
 * 2. Background image - SOCIAL TEST NO LOGO.png (toggleable)
 * 3. CC Loop A - spinning right/clockwise on diagonal axis
 * 4. CC Loop B - spinning left/counter-clockwise on diagonal axis
 */
export const CCLoopSpinDiagonal: React.FC<CCLoopSpinDiagonalProps> = ({
  backgroundSrc,
  loopASrc,
  loopBSrc,
  spinSpeed,
  showGreenScreen,
  showBackground,
  showLoopA,
  showLoopB,
  greenScreenColor,
  tiltAngle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate rotation angles
  // Loop A spins right (clockwise) - positive rotation
  const rotationA = (frame / fps) * spinSpeed * 360;
  // Loop B spins left (counter-clockwise) - negative rotation, 180° offset
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

      {/* 3D Perspective Container for both loops */}
      <AbsoluteFill
        style={{
          perspective: 1000,
          perspectiveOrigin: "center center",
        }}
      >
        {/* Layer 3: CC Loop A - Spinning Right (Clockwise) - Diagonal Axis */}
        {showLoopA && (
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              transformStyle: "preserve-3d",
            }}
          >
            <Img
              src={staticFile(loopASrc)}
              style={{
                objectFit: "contain",
                // Diagonal axis: tilt on X, spin on Y
                transform: `rotateX(${tiltAngle}deg) rotateY(${rotationA}deg)`,
                transformOrigin: "center center",
                backfaceVisibility: "visible",
              }}
            />
          </AbsoluteFill>
        )}

        {/* Layer 4: CC Loop B - Spinning Left (Counter-Clockwise) - Diagonal Axis */}
        {showLoopB && (
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              transformStyle: "preserve-3d",
            }}
          >
            <Img
              src={staticFile(loopBSrc)}
              style={{
                objectFit: "contain",
                // Diagonal axis: opposite tilt on X, spin on Y in opposite direction
                transform: `rotateX(${-tiltAngle}deg) rotateY(${rotationB}deg)`,
                transformOrigin: "center center",
                backfaceVisibility: "visible",
              }}
            />
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default CCLoopSpinDiagonal;
