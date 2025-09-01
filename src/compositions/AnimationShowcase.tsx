import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { SlideIn } from "../components/animations/SlideIn";
import { ScaleIn } from "../components/animations/ScaleIn";
import { PulsingElement } from "../components/effects/PulsingElement";
import { AnimatedText } from "../components/text/AnimatedText";
import { CenteredLayout } from "../components/layouts/CenteredLayout";
import { rotate } from "../utils/animations";
import { colorPalettes } from "../utils/colors";
import { z } from "zod";

export const animationShowcaseSchema = z.object({
  mainTitle: z.string(),
});

export const AnimationShowcase: React.FC<z.infer<typeof animationShowcaseSchema>> = ({
  mainTitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colorPalettes.monochrome.background }}>
      
      {/* Slide animations from different directions */}
      <Sequence durationInFrames={120}>
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
          {/* Top Left - Slide from left */}
          <div className="flex items-center justify-center bg-blue-100">
            <SlideIn from="left" delay={10}>
              <AnimatedText
                text="From Left"
                fontSize={32}
                color={colorPalettes.modern.primary}
                fontWeight="bold"
              />
            </SlideIn>
          </div>

          {/* Top Right - Slide from right */}
          <div className="flex items-center justify-center bg-green-100">
            <SlideIn from="right" delay={20}>
              <AnimatedText
                text="From Right"
                fontSize={32}
                color={colorPalettes.nature.primary}
                fontWeight="bold"
              />
            </SlideIn>
          </div>

          {/* Bottom Left - Slide from top */}
          <div className="flex items-center justify-center bg-red-100">
            <SlideIn from="top" delay={30}>
              <AnimatedText
                text="From Top"
                fontSize={32}
                color={colorPalettes.vibrant.primary}
                fontWeight="bold"
              />
            </SlideIn>
          </div>

          {/* Bottom Right - Slide from bottom */}
          <div className="flex items-center justify-center bg-yellow-100">
            <SlideIn from="bottom" delay={40}>
              <AnimatedText
                text="From Bottom"
                fontSize={32}
                color={colorPalettes.sunset.primary}
                fontWeight="bold"
              />
            </SlideIn>
          </div>
        </div>
      </Sequence>

      {/* Scale and rotation animations */}
      <Sequence from={120} durationInFrames={120}>
        <CenteredLayout backgroundColor={colorPalettes.modern.background}>
          <div className="grid grid-cols-3 gap-8">
            {/* Scale in animation */}
            <ScaleIn delay={0}>
              <div className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Scale</span>
              </div>
            </ScaleIn>

            {/* Pulsing animation */}
            <PulsingElement minScale={0.8} maxScale={1.2} duration={45}>
              <div className="w-32 h-32 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Pulse</span>
              </div>
            </PulsingElement>

            {/* Rotating animation */}
            <div style={rotate(frame - 120, fps, 0.5)}>
              <div className="w-32 h-32 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Rotate</span>
              </div>
            </div>
          </div>
        </CenteredLayout>
      </Sequence>

      {/* Combined animations */}
      <Sequence from={240} durationInFrames={90}>
        <CenteredLayout backgroundColor={colorPalettes.nature.background}>
          <SlideIn from="bottom" delay={10}>
            <ScaleIn delay={20}>
              <PulsingElement>
                <AnimatedText
                  text={mainTitle}
                  fontSize={72}
                  color={colorPalettes.nature.primary}
                  fontWeight="bold"
                  className="drop-shadow-lg"
                />
              </PulsingElement>
            </ScaleIn>
          </SlideIn>
        </CenteredLayout>
      </Sequence>

    </AbsoluteFill>
  );
};
