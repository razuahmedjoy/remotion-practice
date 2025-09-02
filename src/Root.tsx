import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

// New example compositions
import {
  TextAnimations,
  textAnimationsSchema,
} from "./compositions/TextAnimations";
import {
  LayoutShowcase,
  layoutShowcaseSchema,
} from "./compositions/LayoutShowcase";
import {
  AnimationShowcase,
  animationShowcaseSchema,
} from "./compositions/AnimationShowcase";
import {
  ArrowAnimation,
  arrowAnimationSchema,
} from "./compositions/ArrowAnimation";
import { ImageAndText, imageAndTextSchema } from "./compositions/ImageAndText";
import {
  TextHighlightAnimation,
  textHighlightAnimationSchema,
} from "./compositions/TextHighlightAnimation/TextHighlightAnimation";
import {
  TextListAnimation,
  textListAnimationSchema,
} from "./compositions/TextListAnimation/TextListAnimation";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original Hello World compositions */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={120}
        fps={60}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
      {/* Text Animation Examples */}
      <Composition
        id="TextAnimations"
        component={TextAnimations}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        schema={textAnimationsSchema}
        defaultProps={{
          title: "Amazing Text Animations",
          subtitle: "This text types out character by character...",
          counterFrom: 0,
          counterTo: 100,
        }}
      />
      {/* Layout Showcase */}
      <Composition
        id="LayoutShowcase"
        component={LayoutShowcase}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
        schema={layoutShowcaseSchema}
        defaultProps={{
          leftText: "Left Side Content",
          rightText: "Right Side Content",
          centerText: "Centered Magic",
        }}
      />
      {/* Animation Showcase */}
      <Composition
        id="AnimationShowcase"
        component={AnimationShowcase}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
        schema={animationShowcaseSchema}
        defaultProps={{
          mainTitle: "Combined Animations!",
        }}
      />
      {/* Arrow Animation */}
      <Composition
        id="ArrowAnimation"
        component={ArrowAnimation}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
        schema={arrowAnimationSchema}
        defaultProps={{
          backgroundImage:
            "https://images.unsplash.com/photo-1521020781921-ce0d582b7665?q=80&w=1280",
          leftImage:
            "https://images.unsplash.com/photo-1521020781921-ce0d582b7665?q=80&w=1280",
          rightImage:
            "https://images.unsplash.com/photo-1521020781921-ce0d582b7665?q=80&w=1280",
        }}
      />
      <Composition
        id="ImageAndText"
        component={ImageAndText}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
        schema={imageAndTextSchema}
        defaultProps={{
          image:
            "https://images.unsplash.com/photo-1521020781921-ce0d582b7665?q=80&w=1280",
          text: "John F Kenedy, 1994",
          theme: "theme1",
        }}
      />
      <Composition
        id="TextHighlightAnimation"
        component={TextHighlightAnimation}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={textHighlightAnimationSchema}
        defaultProps={{
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ],
          highlightsText: [
            "Lorem ipsum",
            "quis nostrud exercitation ullamco",
            "reprehenderit in voluptate",
            "laborum",
          ],
          theme: "theme1",
        }}
      />
      <Composition
        id="TextListAnimation"
        component={TextListAnimation}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={textListAnimationSchema}
        defaultProps={{
          title: "TOP TECH TRENDS 2024",
          listItems: [
            "ARTIFICIAL INTELLIGENCE",
            "QUANTUM COMPUTING",
            "SUSTAINABLE TECHNOLOGY",
            "CYBERSECURITY",
            "METAVERSE",
          ],
          theme: "dark" as const,
        }}
      />
    </>
  );
};
