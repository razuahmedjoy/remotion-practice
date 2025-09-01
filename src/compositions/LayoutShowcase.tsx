import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AnimatedText } from "../components/text/AnimatedText";
import { SlideIn } from "../components/animations/SlideIn";
import { ScaleIn } from "../components/animations/ScaleIn";
import { SplitLayout } from "../components/layouts/SplitLayout";
import { CenteredLayout } from "../components/layouts/CenteredLayout";
import { PulsingElement } from "../components/effects/PulsingElement";
import { colorPalettes } from "../utils/colors";
import { z } from "zod";

export const layoutShowcaseSchema = z.object({
  leftText: z.string(),
  rightText: z.string(),
  centerText: z.string(),
});

export const LayoutShowcase: React.FC<z.infer<typeof layoutShowcaseSchema>> = ({
  leftText,
  rightText,
  centerText,
}) => {
  return (
    <AbsoluteFill>
      {/* Split layout demonstration */}
      <Sequence durationInFrames={120}>
        <SplitLayout
          leftBackgroundColor={colorPalettes.nature.primary}
          rightBackgroundColor={colorPalettes.nature.secondary}
          leftContent={
            <SlideIn from="left" delay={10}>
              <AnimatedText
                text={leftText}
                fontSize={48}
                color="white"
                fontWeight="bold"
                animationType="fade"
                delay={20}
              />
            </SlideIn>
          }
          rightContent={
            <SlideIn from="right" delay={30}>
              <AnimatedText
                text={rightText}
                fontSize={48}
                color="white"
                fontWeight="bold"
                animationType="fade"
                delay={40}
              />
            </SlideIn>
          }
        />
      </Sequence>

      {/* Vertical split layout */}
      <Sequence from={120} durationInFrames={120}>
        <SplitLayout
          direction="vertical"
          splitRatio={0.3}
          leftBackgroundColor={colorPalettes.vibrant.primary}
          rightBackgroundColor={colorPalettes.vibrant.background}
          leftContent={
            <PulsingElement>
              <AnimatedText
                text="Top Section"
                fontSize={36}
                color="white"
                fontWeight="bold"
              />
            </PulsingElement>
          }
          rightContent={
            <ScaleIn delay={10}>
              <AnimatedText
                text="Bottom Section (70%)"
                fontSize={42}
                color={colorPalettes.vibrant.text}
                fontWeight="600"
              />
            </ScaleIn>
          }
        />
      </Sequence>

      {/* Centered layout with multiple elements */}
      <Sequence from={240} durationInFrames={90}>
        <CenteredLayout backgroundColor={colorPalettes.sunset.background}>
          <div className="text-center">
            <ScaleIn delay={0}>
              <AnimatedText
                text={centerText}
                fontSize={64}
                color={colorPalettes.sunset.primary}
                fontWeight="bold"
                className="mb-8"
              />
            </ScaleIn>
            <SlideIn from="bottom" delay={30}>
              <AnimatedText
                text="Beautiful Centered Content"
                fontSize={32}
                color={colorPalettes.sunset.text}
                fontWeight="400"
              />
            </SlideIn>
          </div>
        </CenteredLayout>
      </Sequence>
    </AbsoluteFill>
  );
};
