import React from "react";
import { AbsoluteFill } from "remotion";

interface SplitLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftBackgroundColor?: string;
  rightBackgroundColor?: string;
  splitRatio?: number; // 0.5 = 50/50, 0.3 = 30/70, etc.
  direction?: "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  leftContent,
  rightContent,
  leftBackgroundColor = "#f8f9fa",
  rightBackgroundColor = "#ffffff",
  splitRatio = 0.5,
  direction = "horizontal",
  className = "",
  style = {},
}) => {
  const leftSize = splitRatio * 100;
  const rightSize = (1 - splitRatio) * 100;

  if (direction === "horizontal") {
    return (
      <AbsoluteFill className={`flex ${className}`} style={style}>
        <div
          className="flex items-center justify-center"
          style={{
            width: `${leftSize}%`,
            height: "100%",
            backgroundColor: leftBackgroundColor,
          }}
        >
          {leftContent}
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            width: `${rightSize}%`,
            height: "100%",
            backgroundColor: rightBackgroundColor,
          }}
        >
          {rightContent}
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill className={`flex flex-col ${className}`} style={style}>
      <div
        className="flex items-center justify-center"
        style={{
          width: "100%",
          height: `${leftSize}%`,
          backgroundColor: leftBackgroundColor,
        }}
      >
        {leftContent}
      </div>
      <div
        className="flex items-center justify-center"
        style={{
          width: "100%",
          height: `${rightSize}%`,
          backgroundColor: rightBackgroundColor,
        }}
      >
        {rightContent}
      </div>
    </AbsoluteFill>
  );
};
