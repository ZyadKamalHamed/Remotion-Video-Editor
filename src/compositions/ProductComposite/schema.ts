import { z } from "zod";

export const productCompositeSchema = z.object({
  /** Background scene video or image */
  backgroundSrc: z.string(),
  /** Whether background is a video (true) or image (false) */
  backgroundIsVideo: z.boolean().default(true),
  /** Product video/image on green screen */
  productSrc: z.string(),
  /** Whether product source is a video */
  productIsVideo: z.boolean().default(true),
  /** Chroma key color to remove */
  keyColor: z.string().default("#00ff00"),
  /** Color similarity threshold (0-1) */
  similarity: z.number().min(0).max(1).default(0.4),
  /** Edge smoothness (0-1) */
  smoothness: z.number().min(0).max(1).default(0.1),
  /** Product position X (percentage or pixels) */
  productX: z.union([z.number(), z.string()]).default("50%"),
  /** Product position Y (percentage or pixels) */
  productY: z.union([z.number(), z.string()]).default("50%"),
  /** Product scale */
  productScale: z.number().default(1),
  /** Optional promotional text overlay */
  promoText: z.string().optional(),
  /** Promo text color */
  promoColor: z.string().default("#ffffff"),
});

export type ProductCompositeProps = z.infer<typeof productCompositeSchema>;

export const defaultProductCompositeProps: ProductCompositeProps = {
  backgroundSrc: "",
  backgroundIsVideo: true,
  productSrc: "",
  productIsVideo: true,
  keyColor: "#00ff00",
  similarity: 0.4,
  smoothness: 0.1,
  productX: "50%",
  productY: "50%",
  productScale: 1,
  promoText: undefined,
  promoColor: "#ffffff",
};
