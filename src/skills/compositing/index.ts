import { CompositingSkills, ChromaKeyConfig } from "./types";

export const compositingSkills: CompositingSkills = {
  greenScreenDefaults: {
    keyColor: "#00ff00",
    similarity: 0.4,
    smoothness: 0.1,
    spillRemoval: 0.1,
  },

  blueScreenDefaults: {
    keyColor: "#0000ff",
    similarity: 0.35,
    smoothness: 0.1,
    spillRemoval: 0.15,
  },

  getChromaKeyConfig: (color: "green" | "blue" | string): ChromaKeyConfig => {
    if (color === "green") {
      return compositingSkills.greenScreenDefaults;
    }
    if (color === "blue") {
      return compositingSkills.blueScreenDefaults;
    }
    // Custom color
    return {
      keyColor: color,
      similarity: 0.4,
      smoothness: 0.1,
      spillRemoval: 0.1,
    };
  },
};

export { ChromaKeyCanvas, GreenScreenComposite } from "./ChromaKey";
export type { ChromaKeyConfig, CompositeLayerConfig, CompositingSkills } from "./types";
