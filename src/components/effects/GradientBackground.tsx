import React from "react";
import { AbsoluteFill } from "remotion";
import { createGradient } from "../../utils/colors";

interface GradientBackgroundProps {
  children?: React.ReactNode;
  color1: string;
  color2: string;
  direction?: "horizontal" | "vertical" | "diagonal";
  className?: string;
  style?: React.CSSProperties;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  color1,
  color2,
  direction = "diagonal",
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill
      className={className}
      style={{
        background: createGradient(color1, color2, direction),
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
