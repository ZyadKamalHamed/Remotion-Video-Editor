export interface GlowConfig {
  color: string;
  intensity?: number;
  spread?: number;
}

export interface ShadowConfig {
  color?: string;
  offsetX?: number;
  offsetY?: number;
  blur?: number;
  spread?: number;
}

export interface TextShadowConfig {
  color?: string;
  offsetX?: number;
  offsetY?: number;
  blur?: number;
}

export interface BlurConfig {
  from?: number;
  to?: number;
  durationInFrames: number;
}

export interface GradientConfig {
  colors: string[];
  direction?: string;
  type?: "linear" | "radial";
}

export interface ColorOverlayConfig {
  color: string;
  opacity?: number;
}

export interface AnimatedGradientConfig {
  colors: string[];
  speed?: number;
  durationInFrames: number;
}

export interface EffectSkills {
  glow: (config: GlowConfig) => string;
  shadow: (config: ShadowConfig) => string;
  textShadow: (config: TextShadowConfig) => string;
  blur: (frame: number, config: BlurConfig) => string;
  gradientBackground: (config: GradientConfig) => string;
  colorOverlay: (config: ColorOverlayConfig) => string;
  animatedGradient: (frame: number, config: AnimatedGradientConfig) => string;
}
