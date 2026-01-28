import { animationSkills } from "./animations";
import { transitionSkills } from "./transitions";
import { effectSkills } from "./effects";
import { utilitySkills } from "./utils";
import { AnimationSkills } from "./animations/types";
import { TransitionSkills } from "./transitions/types";
import { EffectSkills } from "./effects/types";
import { UtilitySkills } from "./utils/types";

export interface Skills {
  animations: AnimationSkills;
  transitions: TransitionSkills;
  effects: EffectSkills;
  utils: UtilitySkills;
}

export const useSkills = (): Skills => {
  return {
    animations: animationSkills,
    transitions: transitionSkills,
    effects: effectSkills,
    utils: utilitySkills,
  };
};

export { animationSkills, transitionSkills, effectSkills, utilitySkills };
export type { AnimationSkills, TransitionSkills, EffectSkills, UtilitySkills };
