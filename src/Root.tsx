import { Composition } from "remotion";
import { PromoVideo } from "./compositions/PromoVideo";
import { defaultPromoVideoProps, promoVideoSchema } from "./compositions/PromoVideo/schema";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={promoVideoSchema}
        defaultProps={defaultPromoVideoProps}
      />
    </>
  );
};
