import React, { useRef, useEffect, useState } from "react";
import { useCurrentFrame, useVideoConfig, Video, Img, OffthreadVideo } from "remotion";

export interface ChromaKeyConfig {
  /** The color to remove (default: "#00ff00" for green) */
  keyColor?: string;
  /** How similar a color must be to keyColor to be removed (0-1, default: 0.4) */
  similarity?: number;
  /** Smoothness of the edge (0-1, default: 0.1) */
  smoothness?: number;
  /** Amount of color spill removal (0-1, default: 0.1) */
  spillRemoval?: number;
}

interface ChromaKeyVideoProps extends ChromaKeyConfig {
  /** Source video/image with green screen */
  src: string;
  /** Whether the source is a video (true) or image (false) */
  isVideo?: boolean;
  /** Width of the output */
  width?: number;
  /** Height of the output */
  height?: number;
  /** Additional styles */
  style?: React.CSSProperties;
}

/**
 * Converts hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 255, b: 0 };
};

/**
 * Calculates color distance in RGB space
 */
const colorDistance = (
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number
): number => {
  return Math.sqrt(
    Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
  ) / 441.67; // Normalize to 0-1 (max distance is sqrt(255^2 * 3))
};

/**
 * ChromaKeyCanvas - Renders a video/image with chroma key (green screen removal)
 */
export const ChromaKeyCanvas: React.FC<ChromaKeyVideoProps> = ({
  src,
  isVideo = true,
  keyColor = "#00ff00",
  similarity = 0.4,
  smoothness = 0.1,
  spillRemoval = 0.1,
  width,
  height,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const frame = useCurrentFrame();
  const { width: videoWidth, height: videoHeight, fps } = useVideoConfig();

  const finalWidth = width || videoWidth;
  const finalHeight = height || videoHeight;
  const keyRgb = hexToRgb(keyColor);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const sourceElement = isVideo ? videoRef.current : imgRef.current;
    if (!sourceElement) return;

    const processFrame = () => {
      ctx.drawImage(sourceElement, 0, 0, finalWidth, finalHeight);
      const imageData = ctx.getImageData(0, 0, finalWidth, finalHeight);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const distance = colorDistance(r, g, b, keyRgb.r, keyRgb.g, keyRgb.b);

        if (distance < similarity) {
          // Fully transparent
          data[i + 3] = 0;
        } else if (distance < similarity + smoothness) {
          // Partial transparency for smooth edges
          const alpha = (distance - similarity) / smoothness;
          data[i + 3] = Math.round(alpha * 255);

          // Spill removal - reduce green tint on edges
          if (spillRemoval > 0) {
            const spillFactor = 1 - alpha * spillRemoval;
            data[i + 1] = Math.round(g * spillFactor + (r + b) / 2 * (1 - spillFactor));
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = frame / fps;
      videoRef.current.onseeked = processFrame;
    } else {
      processFrame();
    }
  }, [frame, isVideo, finalWidth, finalHeight, keyRgb, similarity, smoothness, spillRemoval, fps]);

  return (
    <div style={{ position: "relative", width: finalWidth, height: finalHeight, ...style }}>
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          style={{ display: "none" }}
          muted
          playsInline
        />
      ) : (
        <img
          ref={imgRef}
          src={src}
          style={{ display: "none" }}
          alt=""
        />
      )}
      <canvas
        ref={canvasRef}
        width={finalWidth}
        height={finalHeight}
        style={{ width: finalWidth, height: finalHeight }}
      />
    </div>
  );
};

interface GreenScreenCompositeProps {
  /** Background video or image source */
  backgroundSrc: string;
  /** Whether background is a video */
  backgroundIsVideo?: boolean;
  /** Foreground (green screen) video or image source */
  foregroundSrc: string;
  /** Whether foreground is a video */
  foregroundIsVideo?: boolean;
  /** Chroma key configuration */
  chromaKey?: ChromaKeyConfig;
  /** Keep the foreground at its original position (full frame overlay) */
  preservePosition?: boolean;
  /** Foreground position (only used if preservePosition is false) */
  foregroundPosition?: {
    x?: number | string;
    y?: number | string;
    scale?: number;
  };
  /** Container styles */
  style?: React.CSSProperties;
}

/**
 * GreenScreenComposite - Composites a green screen foreground over a background
 */
export const GreenScreenComposite: React.FC<GreenScreenCompositeProps> = ({
  backgroundSrc,
  backgroundIsVideo = true,
  foregroundSrc,
  foregroundIsVideo = true,
  chromaKey = {},
  preservePosition = true,
  foregroundPosition = {},
  style,
}) => {
  const { width, height } = useVideoConfig();
  const { x = "50%", y = "50%", scale = 1 } = foregroundPosition;

  return (
    <div style={{ position: "relative", width, height, overflow: "hidden", ...style }}>
      {/* Background Layer */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        {backgroundIsVideo ? (
          <OffthreadVideo src={backgroundSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Img src={backgroundSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>

      {/* Foreground Layer (Green Screen) */}
      {preservePosition ? (
        // Full frame overlay - keeps product at original position from green screen video
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <ChromaKeyCanvas
            src={foregroundSrc}
            isVideo={foregroundIsVideo}
            {...chromaKey}
          />
        </div>
      ) : (
        // Custom positioning
        <div
          style={{
            position: "absolute",
            left: typeof x === "number" ? x : x,
            top: typeof y === "number" ? y : y,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <ChromaKeyCanvas
            src={foregroundSrc}
            isVideo={foregroundIsVideo}
            {...chromaKey}
          />
        </div>
      )}
    </div>
  );
};

export default GreenScreenComposite;
