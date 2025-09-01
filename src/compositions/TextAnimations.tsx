import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AnimatedText } from "../components/text/AnimatedText";
import { CounterText } from "../components/text/CounterText";
import { CenteredLayout } from "../components/layouts/CenteredLayout";
import { GradientBackground } from "../components/effects/GradientBackground";
import { colorPalettes } from "../utils/colors";
import { z } from "zod";

export const textAnimationsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  counterFrom: z.number(),
  counterTo: z.number(),
});

export const TextAnimations: React.FC<z.infer<typeof textAnimationsSchema>> = ({
  title,
  subtitle,
  counterFrom,
  counterTo,
}) => {
  return (
    <AbsoluteFill>
      <GradientBackground 
        color1={colorPalettes.modern.primary} 
        color2={colorPalettes.modern.secondary}
        direction="diagonal"
      />
      
      {/* Title with fade animation */}
      <Sequence durationInFrames={90}>
        <CenteredLayout>
          <AnimatedText
            text={title}
            fontSize={64}
            color="black"
            fontWeight="bold"
            animationType="fade"
            delay={10}
            className="drop-shadow-lg"
          />
        </CenteredLayout>
      </Sequence>

      {/* Subtitle with typewriter effect */}
      <Sequence from={60} durationInFrames={120}>
        <CenteredLayout>
          <div className="mt-32">
            <AnimatedText
              text={subtitle}
              fontSize={32}
              color="black"
              fontWeight="400"
              animationType="typewriter"
              charactersPerSecond={15}
              delay={10}
              className="opacity-90"
            />
          </div>
        </CenteredLayout>
      </Sequence>

      {/* Counter animation */}
      <Sequence from={150} durationInFrames={90}>
        <CenteredLayout>
          <CounterText
            from={counterFrom}
            to={counterTo}
            fontSize={96}
            color="black"
            fontWeight="bold"

            duration={60}
            suffix="%"
            className="drop-shadow-lg"
          />
        </CenteredLayout>
      </Sequence>
    </AbsoluteFill>
  );
};
