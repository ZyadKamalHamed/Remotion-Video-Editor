import { TransitionSkills, FadeConfig, SlideConfig, WipeConfig, ZoomConfig } from "./types";

export const transitionSkills: TransitionSkills = {
  fadeIn: (frame, config) => {
    const { durationInFrames, delay = 0 } = config;
    const adjustedFrame = frame - delay;
    if (adjustedFrame < 0) return 0;
    return Math.min(adjustedFrame / durationInFrames, 1);
  },

  fadeOut: (frame, config) => {
    const { durationInFrames, delay = 0 } = config;
    const adjustedFrame = frame - delay;
    if (adjustedFrame < 0) return 1;
    return Math.max(1 - adjustedFrame / durationInFrames, 0);
  },

  slideIn: (frame, config) => {
    const { durationInFrames, direction = "left", distance = 100, delay = 0 } = config;
    const adjustedFrame = frame - delay;
    if (adjustedFrame < 0) return -distance;

    const progress = Math.min(adjustedFrame / durationInFrames, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

    const multiplier = direction === "left" || direction === "up" ? -1 : 1;
    return multiplier * distance * (1 - eased);
  },

  slideOut: (frame, config) => {
    const { durationInFrames, direction = "right", distance = 100, delay = 0 } = config;
    const adjustedFrame = frame - delay;
    if (adjustedFrame < 0) return 0;

    const progress = Math.min(adjustedFrame / durationInFrames, 1);
    const eased = progress * progress * progress; // Ease in cubic

    const multiplier = direction === "left" || direction === "up" ? -1 : 1;
    return multiplier * distance * eased;
  },

  wipe: (frame, config) => {
    const { durationInFrames, direction = "left", delay = 0 } = config;
    const adjustedFrame = frame - delay;
    if (adjustedFrame < 0) return 0;

    const progress = Math.min(adjustedFrame / durationInFrames, 1);
    return progress * 100; // Returns percentage
  },

  zoom: (frame, config) => {
    const { durationInFrames, from = 0, to = 1, delay = 0 } = config;
    const adjustedFrame = frame - delay;
    if (adjustedFrame < 0) return from;

    const progress = Math.min(adjustedFrame / durationInFrames, 1);
    const eased = 1 - Math.pow(1 - progress, 2); // Ease out quad

    return from + (to - from) * eased;
  },

  crossfade: (frame, config) => {
    const { durationInFrames, delay = 0 } = config;
    const adjustedFrame = frame - delay;
    if (adjustedFrame < 0) return { opacity1: 1, opacity2: 0 };

    const progress = Math.min(adjustedFrame / durationInFrames, 1);
    return {
      opacity1: 1 - progress,
      opacity2: progress,
    };
  },
};
