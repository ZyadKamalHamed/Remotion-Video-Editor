import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { promoVideoSchema } from "./schema";
import { useSkills } from "../../skills";
import { IntroScene } from "./scenes/IntroScene";
import { MainScene } from "./scenes/MainScene";
import { OutroScene } from "./scenes/OutroScene";

type PromoVideoProps = z.infer<typeof promoVideoSchema>;

export const PromoVideo: React.FC<PromoVideoProps> = ({
  title,
  subtitle,
  backgroundColor,
  primaryColor,
}) => {
  const { transitions, animations } = useSkills();

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <IntroScene
        title={title}
        primaryColor={primaryColor}
        animations={animations}
      />
      <MainScene
        subtitle={subtitle}
        primaryColor={primaryColor}
        transitions={transitions}
      />
      <OutroScene primaryColor={primaryColor} />
    </AbsoluteFill>
  );
};
