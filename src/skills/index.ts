import { animationSkills } from "./animations";
import { transitionSkills } from "./transitions";
import { effectSkills } from "./effects";
import { utilitySkills } from "./utils";
import { compositingSkills } from "./compositing";
import { AnimationSkills } from "./animations/types";
import { TransitionSkills } from "./transitions/types";
import { EffectSkills } from "./effects/types";
import { UtilitySkills } from "./utils/types";
import { CompositingSkills } from "./compositing/types";

export interface Skills {
  animations: AnimationSkills;
  transitions: TransitionSkills;
  effects: EffectSkills;
  utils: UtilitySkills;
  compositing: CompositingSkills;
}

export const useSkills = (): Skills => {
  return {
    animations: animationSkills,
    transitions: transitionSkills,
    effects: effectSkills,
    utils: utilitySkills,
    compositing: compositingSkills,
  };
};

export { animationSkills, transitionSkills, effectSkills, utilitySkills, compositingSkills };
export type { AnimationSkills, TransitionSkills, EffectSkills, UtilitySkills, CompositingSkills };

// Re-export compositing components for direct use
export { ChromaKeyCanvas, GreenScreenComposite } from "./compositing";
