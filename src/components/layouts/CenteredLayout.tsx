import React from "react";
import { AbsoluteFill } from "remotion";

interface CenteredLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  backgroundImage?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  children,
  backgroundColor = "#ffffff",
  backgroundImage,
  className = "",
  style = {},
}) => {
  return (
    <AbsoluteFill
      className={`flex items-center justify-center ${className}`}
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
