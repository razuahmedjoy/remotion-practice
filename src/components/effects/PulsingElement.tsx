import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { pulse } from "../../utils/animations";

interface PulsingElementProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const PulsingElement: React.FC<PulsingElementProps> = ({
  children,
  minScale = 0.95,
  maxScale = 1.05,
  duration = 60,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseStyle = pulse(frame, fps, minScale, maxScale, duration);

  return (
    <div
      className={className}
      style={{
        ...pulseStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
