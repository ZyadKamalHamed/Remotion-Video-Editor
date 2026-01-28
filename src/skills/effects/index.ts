import { EffectSkills, GlowConfig, ShadowConfig, BlurConfig, GradientConfig } from "./types";

export const effectSkills: EffectSkills = {
  glow: (config) => {
    const { color, intensity = 20, spread = 0 } = config;
    return `0 0 ${intensity}px ${spread}px ${color}`;
  },

  shadow: (config) => {
    const { color = "rgba(0,0,0,0.5)", offsetX = 0, offsetY = 4, blur = 10, spread = 0 } = config;
    return `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`;
  },

  textShadow: (config) => {
    const { color = "rgba(0,0,0,0.5)", offsetX = 0, offsetY = 2, blur = 4 } = config;
    return `${offsetX}px ${offsetY}px ${blur}px ${color}`;
  },

  blur: (frame, config) => {
    const { from = 0, to = 10, durationInFrames } = config;
    const progress = Math.min(frame / durationInFrames, 1);
    const blurValue = from + (to - from) * progress;
    return `blur(${blurValue}px)`;
  },

  gradientBackground: (config) => {
    const { colors, direction = "to bottom", type = "linear" } = config;
    const colorStops = colors.join(", ");

    if (type === "radial") {
      return `radial-gradient(circle, ${colorStops})`;
    }
    return `linear-gradient(${direction}, ${colorStops})`;
  },

  colorOverlay: (config) => {
    const { color, opacity = 0.5 } = config;
    // Parse color and add opacity
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  },

  animatedGradient: (frame, config) => {
    const { colors, speed = 1, durationInFrames } = config;
    const progress = (frame * speed) % durationInFrames;
    const angle = (progress / durationInFrames) * 360;
    const colorStops = colors.join(", ");
    return `linear-gradient(${angle}deg, ${colorStops})`;
  },
};
