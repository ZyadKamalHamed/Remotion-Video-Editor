import { z } from "zod";

export const monogramSpinSchema = z.object({
  /** Background image source */
  backgroundSrc: z.string(),
  /** Monogram image source */
  monogramSrc: z.string(),
  /** Spin speed - rotations per second */
  spinSpeed: z.number().default(0.5),
  /** Monogram scale */
  monogramScale: z.number().default(1),
});

export type MonogramSpinProps = z.infer<typeof monogramSpinSchema>;

export const defaultMonogramSpinProps: MonogramSpinProps = {
  backgroundSrc: "assets/text/SOCIAL TEST.png",
  monogramSrc: "assets/text/CC_Monogram.png",
  spinSpeed: 0.5,
  monogramScale: 1,
};
