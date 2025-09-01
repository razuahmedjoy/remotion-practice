import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { scaleIn } from "../../utils/animations";
import type { SpringConfig } from "../../utils/animations";

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  config?: SpringConfig;
  className?: string;
  style?: React.CSSProperties;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  config,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleStyle = scaleIn(frame, fps, delay, config);

  return (
    <div
      className={className}
      style={{
        ...scaleStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
