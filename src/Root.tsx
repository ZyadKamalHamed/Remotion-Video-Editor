import { Composition } from "remotion";
import { PromoVideo } from "./compositions/PromoVideo";
import { defaultPromoVideoProps, promoVideoSchema } from "./compositions/PromoVideo/schema";
import { ProductComposite } from "./compositions/ProductComposite";
import { defaultProductCompositeProps, productCompositeSchema } from "./compositions/ProductComposite/schema";
import { MonogramSpin } from "./compositions/MonogramSpin";
import { defaultMonogramSpinProps, monogramSpinSchema } from "./compositions/MonogramSpin/schema";
import { CCLoopSpin } from "./compositions/CCLoopSpin";
import { defaultCCLoopSpinProps, ccLoopSpinSchema } from "./compositions/CCLoopSpin/schema";
import { CCLoopSpinSimple } from "./compositions/CCLoopSpinSimple";
import { defaultCCLoopSpinSimpleProps, ccLoopSpinSimpleSchema } from "./compositions/CCLoopSpinSimple/schema";
import { CCLoopSpinDiagonal } from "./compositions/CCLoopSpinDiagonal";
import { defaultCCLoopSpinDiagonalProps, ccLoopSpinDiagonalSchema } from "./compositions/CCLoopSpinDiagonal/schema";

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
      <Composition
        id="ProductComposite"
        component={ProductComposite}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={productCompositeSchema}
        defaultProps={defaultProductCompositeProps}
      />
      <Composition
        id="MonogramSpin"
        component={MonogramSpin}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={monogramSpinSchema}
        defaultProps={defaultMonogramSpinProps}
      />
      <Composition
        id="CCLoopSpin"
        component={CCLoopSpin}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={ccLoopSpinSchema}
        defaultProps={defaultCCLoopSpinProps}
      />
      <Composition
        id="CCLoopSpinSimple"
        component={CCLoopSpinSimple}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={ccLoopSpinSimpleSchema}
        defaultProps={defaultCCLoopSpinSimpleProps}
      />
      <Composition
        id="CCLoopSpinDiagonal"
        component={CCLoopSpinDiagonal}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={ccLoopSpinDiagonalSchema}
        defaultProps={defaultCCLoopSpinDiagonalProps}
      />
    </>
  );
};
