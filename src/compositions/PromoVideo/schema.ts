import { z } from "zod";

export const promoVideoSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  backgroundColor: z.string(),
  primaryColor: z.string(),
});

export const defaultPromoVideoProps: z.infer<typeof promoVideoSchema> = {
  title: "Welcome",
  subtitle: "Your Promo Video Generator",
  backgroundColor: "#0f0f23",
  primaryColor: "#6366f1",
};
