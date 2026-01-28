export interface BaseAnimationConfig {
  fps: number;
  durationInFrames: number;
}

export interface SpringConfig extends BaseAnimationConfig {
  from?: number;
  to?: number;
  damping?: number;
  mass?: number;
  stiffness?: number;
}

export interface BounceConfig extends BaseAnimationConfig {
  from?: number;
  to?: number;
  bounces?: number;
}

export interface ElasticConfig extends BaseAnimationConfig {
  from?: number;
  to?: number;
  amplitude?: number;
  period?: number;
}

export interface PulseConfig extends BaseAnimationConfig {
  scale?: number;
}

export interface RotateConfig extends BaseAnimationConfig {
  from?: number;
  to?: number;
}

export interface AnimationSkills {
  spring: (frame: number, config: SpringConfig) => number;
  bounce: (frame: number, config: BounceConfig) => number;
  elastic: (frame: number, config: ElasticConfig) => number;
  pulse: (frame: number, config: PulseConfig) => number;
  rotate: (frame: number, config: RotateConfig) => number;
}
