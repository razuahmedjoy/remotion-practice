import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { slideIn } from "../../utils/animations";
import type { SpringConfig } from "../../utils/animations";

interface SlideInProps {
  children: React.ReactNode;
  from?: "left" | "right" | "top" | "bottom";
  distance?: number;
  delay?: number;
  config?: SpringConfig;
  className?: string;
  style?: React.CSSProperties;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  from = "left",
  distance = 150,
  delay = 0,
  config,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideStyle = slideIn(frame - delay, fps, from, distance, config);

  return (
    <div
      className={className}
      style={{
        ...slideStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
