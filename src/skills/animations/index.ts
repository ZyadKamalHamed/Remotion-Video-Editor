import { AnimationSkills, SpringConfig, BounceConfig, ElasticConfig } from "./types";

const defaultSpringConfig = {
  damping: 10,
  mass: 1,
  stiffness: 100,
};

export const animationSkills: AnimationSkills = {
  spring: (frame, config) => {
    const { fps, from = 0, to = 1, durationInFrames } = config;
    const progress = Math.min(frame / durationInFrames, 1);

    // Simple spring approximation
    const springValue = 1 - Math.exp(-6 * progress) * Math.cos(12 * progress);
    return from + (to - from) * springValue;
  },

  bounce: (frame, config) => {
    const { fps, from = 0, to = 1, durationInFrames, bounces = 3 } = config;
    const progress = Math.min(frame / durationInFrames, 1);

    // Bounce easing
    const n1 = 7.5625;
    const d1 = 2.75;
    let bounceProgress: number;

    if (progress < 1 / d1) {
      bounceProgress = n1 * progress * progress;
    } else if (progress < 2 / d1) {
      const p = progress - 1.5 / d1;
      bounceProgress = n1 * p * p + 0.75;
    } else if (progress < 2.5 / d1) {
      const p = progress - 2.25 / d1;
      bounceProgress = n1 * p * p + 0.9375;
    } else {
      const p = progress - 2.625 / d1;
      bounceProgress = n1 * p * p + 0.984375;
    }

    return from + (to - from) * bounceProgress;
  },

  elastic: (frame, config) => {
    const { fps, from = 0, to = 1, durationInFrames, amplitude = 1, period = 0.3 } = config;
    const progress = Math.min(frame / durationInFrames, 1);

    if (progress === 0 || progress === 1) {
      return progress === 0 ? from : to;
    }

    const p = period;
    const a = amplitude;
    const s = p / 4;

    const elasticProgress = a * Math.pow(2, -10 * progress) *
      Math.sin(((progress - s) * (2 * Math.PI)) / p) + 1;

    return from + (to - from) * elasticProgress;
  },

  pulse: (frame, config) => {
    const { fps, scale = 1.1, durationInFrames } = config;
    const progress = (frame % durationInFrames) / durationInFrames;
    const pulseValue = 1 + (scale - 1) * Math.sin(progress * Math.PI * 2);
    return pulseValue;
  },

  rotate: (frame, config) => {
    const { fps, from = 0, to = 360, durationInFrames } = config;
    const progress = Math.min(frame / durationInFrames, 1);
    return from + (to - from) * progress;
  },
};
