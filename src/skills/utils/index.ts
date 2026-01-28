import { UtilitySkills, EasingType, ColorUtils } from "./types";

// Easing functions
const easings: Record<EasingType, (t: number) => number> = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => 1 - Math.pow(1 - t, 2),
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
};

// Color utility functions
const colorUtils: ColorUtils = {
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  rgbToHex: (r, g, b) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  },

  interpolateColor: (color1, color2, factor) => {
    const rgb1 = colorUtils.hexToRgb(color1);
    const rgb2 = colorUtils.hexToRgb(color2);

    if (!rgb1 || !rgb2) return color1;

    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);

    return colorUtils.rgbToHex(r, g, b);
  },

  adjustBrightness: (color, percent) => {
    const rgb = colorUtils.hexToRgb(color);
    if (!rgb) return color;

    const adjust = (value: number) =>
      Math.min(255, Math.max(0, Math.round(value * (1 + percent / 100))));

    return colorUtils.rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
  },
};

export const utilitySkills: UtilitySkills = {
  clamp: (value, min, max) => Math.min(Math.max(value, min), max),

  lerp: (start, end, progress) => start + (end - start) * progress,

  mapRange: (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  },

  easing: (progress, type = "easeInOut") => {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    return easings[type](clampedProgress);
  },

  frameToTime: (frame, fps) => {
    const totalSeconds = frame / fps;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds % 1) * 1000);
    return { minutes, seconds, milliseconds };
  },

  timeToFrame: (minutes, seconds, milliseconds, fps) => {
    const totalSeconds = minutes * 60 + seconds + milliseconds / 1000;
    return Math.round(totalSeconds * fps);
  },

  randomInRange: (min, max, seed) => {
    // Simple seeded random if seed is provided
    if (seed !== undefined) {
      const x = Math.sin(seed) * 10000;
      const random = x - Math.floor(x);
      return min + random * (max - min);
    }
    return min + Math.random() * (max - min);
  },

  colorUtils,
};
