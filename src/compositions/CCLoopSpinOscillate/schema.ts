import { z } from "zod";

export const ccLoopSpinOscillateSchema = z.object({
  /** Background image source (SOCIAL TEST NO LOGO.png) */
  backgroundSrc: z.string(),
  /** CC Loop A image source */
  loopASrc: z.string(),
  /** CC Loop B image source */
  loopBSrc: z.string(),
  /** Oscillation speed - cycles per second */
  oscillateSpeed: z.number().default(0.5),
  /** Maximum rotation angle (rocks ± this value) */
  maxAngle: z.number().default(45),
  /** Show green screen background layer */
  showGreenScreen: z.boolean().default(true),
  /** Show background image layer */
  showBackground: z.boolean().default(true),
  /** Show CC Loop A layer */
  showLoopA: z.boolean().default(true),
  /** Show CC Loop B layer */
  showLoopB: z.boolean().default(true),
  /** Green screen color */
  greenScreenColor: z.string().default("#00ff00"),
});

export type CCLoopSpinOscillateProps = z.infer<typeof ccLoopSpinOscillateSchema>;

export const defaultCCLoopSpinOscillateProps: CCLoopSpinOscillateProps = {
  backgroundSrc: "assets/text/SOCIAL TEST NO LOGO.png",
  loopASrc: "assets/text/CC Loop A.png",
  loopBSrc: "assets/text/CC Loop B.png",
  oscillateSpeed: 0.5,
  maxAngle: 45,
  showGreenScreen: true,
  showBackground: true,
  showLoopA: true,
  showLoopB: true,
  greenScreenColor: "#00ff00",
};
