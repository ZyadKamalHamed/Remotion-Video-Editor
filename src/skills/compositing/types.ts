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

export interface CompositeLayerConfig {
  src: string;
  isVideo?: boolean;
  x?: number | string;
  y?: number | string;
  scale?: number;
  opacity?: number;
  rotation?: number;
  zIndex?: number;
}

export interface CompositingSkills {
  /** Default chroma key config for green screen */
  greenScreenDefaults: ChromaKeyConfig;
  /** Default chroma key config for blue screen */
  blueScreenDefaults: ChromaKeyConfig;
  /** Calculate optimal chroma key settings based on color */
  getChromaKeyConfig: (color: "green" | "blue" | string) => ChromaKeyConfig;
}
