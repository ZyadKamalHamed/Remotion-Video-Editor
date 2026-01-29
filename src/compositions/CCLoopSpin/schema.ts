import { z } from "zod";

export const ccLoopSpinSchema = z.object({
  /** Background image source (SOCIAL TEST NO LOGO.png) */
  backgroundSrc: z.string(),
  /** CC Loop A image source */
  loopASrc: z.string(),
  /** CC Loop B image source */
  loopBSrc: z.string(),
  /** Spin speed - rotations per second */
  spinSpeed: z.number().default(0.5),
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

export type CCLoopSpinProps = z.infer<typeof ccLoopSpinSchema>;

export const defaultCCLoopSpinProps: CCLoopSpinProps = {
  backgroundSrc: "assets/text/SOCIAL TEST NO LOGO.png",
  loopASrc: "assets/text/CC Loop A.png",
  loopBSrc: "assets/text/CC Loop B.png",
  spinSpeed: 0.5,
  showGreenScreen: true,
  showBackground: true,
  showLoopA: true,
  showLoopB: true,
  greenScreenColor: "#00ff00",
};
