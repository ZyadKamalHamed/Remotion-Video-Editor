export type EasingType =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "easeInCubic"
  | "easeOutCubic"
  | "easeInOutCubic"
  | "easeInQuart"
  | "easeOutQuart"
  | "easeInOutQuart";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface TimeInfo {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface ColorUtils {
  hexToRgb: (hex: string) => RGB | null;
  rgbToHex: (r: number, g: number, b: number) => string;
  interpolateColor: (color1: string, color2: string, factor: number) => string;
  adjustBrightness: (color: string, percent: number) => string;
}

export interface UtilitySkills {
  clamp: (value: number, min: number, max: number) => number;
  lerp: (start: number, end: number, progress: number) => number;
  mapRange: (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) => number;
  easing: (progress: number, type?: EasingType) => number;
  frameToTime: (frame: number, fps: number) => TimeInfo;
  timeToFrame: (
    minutes: number,
    seconds: number,
    milliseconds: number,
    fps: number
  ) => number;
  randomInRange: (min: number, max: number, seed?: number) => number;
  colorUtils: ColorUtils;
}
