export interface BaseTransitionConfig {
  durationInFrames: number;
  delay?: number;
}

export interface FadeConfig extends BaseTransitionConfig {}

export interface SlideConfig extends BaseTransitionConfig {
  direction?: "left" | "right" | "up" | "down";
  distance?: number;
}

export interface WipeConfig extends BaseTransitionConfig {
  direction?: "left" | "right" | "up" | "down";
}

export interface ZoomConfig extends BaseTransitionConfig {
  from?: number;
  to?: number;
}

export interface CrossfadeConfig extends BaseTransitionConfig {}

export interface CrossfadeResult {
  opacity1: number;
  opacity2: number;
}

export interface TransitionSkills {
  fadeIn: (frame: number, config: FadeConfig) => number;
  fadeOut: (frame: number, config: FadeConfig) => number;
  slideIn: (frame: number, config: SlideConfig) => number;
  slideOut: (frame: number, config: SlideConfig) => number;
  wipe: (frame: number, config: WipeConfig) => number;
  zoom: (frame: number, config: ZoomConfig) => number;
  crossfade: (frame: number, config: CrossfadeConfig) => CrossfadeResult;
}
