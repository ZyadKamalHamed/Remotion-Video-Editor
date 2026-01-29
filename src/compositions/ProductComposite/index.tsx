import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence } from "remotion";
import { GreenScreenComposite } from "../../skills/compositing";
import { useSkills } from "../../skills";
import { ProductCompositeProps } from "./schema";

/**
 * ProductComposite - Composites a green screen product over a background scene
 *
 * Usage:
 * 1. Record your product on a green screen
 * 2. Choose a background scene (video or image)
 * 3. This composition removes the green and places the product in the scene
 */
export const ProductComposite: React.FC<ProductCompositeProps> = ({
  backgroundSrc,
  backgroundIsVideo,
  productSrc,
  productIsVideo,
  keyColor,
  similarity,
  smoothness,
  productX,
  productY,
  productScale,
  promoText,
  promoColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { transitions, effects } = useSkills();

  // Animate product entrance
  const productOpacity = transitions.fadeIn(frame, { durationInFrames: fps });
  const productScaleAnim = interpolate(
    frame,
    [0, fps],
    [0.8, productScale],
    { extrapolateRight: "clamp" }
  );

  // Promo text animation
  const textOpacity = transitions.fadeIn(Math.max(0, frame - fps), { durationInFrames: fps });

  return (
    <AbsoluteFill>
      {/* Green Screen Composite */}
      {backgroundSrc && productSrc ? (
        <GreenScreenComposite
          backgroundSrc={backgroundSrc}
          backgroundIsVideo={backgroundIsVideo}
          foregroundSrc={productSrc}
          foregroundIsVideo={productIsVideo}
          chromaKey={{
            keyColor,
            similarity,
            smoothness,
          }}
          foregroundPosition={{
            x: productX,
            y: productY,
            scale: productScaleAnim,
          }}
          style={{ opacity: productOpacity }}
        />
      ) : (
        // Placeholder when no assets provided
        <AbsoluteFill
          style={{
            backgroundColor: "#1a1a2e",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#666",
              fontSize: 32,
              textAlign: "center",
              fontFamily: "sans-serif",
            }}
          >
            <div>Product Composite</div>
            <div style={{ fontSize: 18, marginTop: 20 }}>
              Provide backgroundSrc and productSrc to composite
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Optional Promo Text Overlay */}
      {promoText && (
        <Sequence from={fps}>
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 100,
            }}
          >
            <div
              style={{
                color: promoColor,
                fontSize: 64,
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textShadow: effects.textShadow({
                  color: "rgba(0,0,0,0.8)",
                  blur: 10,
                }),
                opacity: textOpacity,
              }}
            >
              {promoText}
            </div>
          </AbsoluteFill>
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

export default ProductComposite;
