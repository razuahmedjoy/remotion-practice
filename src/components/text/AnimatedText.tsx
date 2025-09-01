import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, typewriter } from "../../utils/animations";

interface AnimatedTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  textAlign?: "left" | "center" | "right";
  delay?: number;
  animationType?: "fade" | "typewriter" | "both";
  charactersPerSecond?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize = 48,
  color = "#000000",
  fontWeight = "bold",
  textAlign = "center",
  delay = 0,
  animationType = "fade",
  charactersPerSecond = 10,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const displayText = animationType === "typewriter" || animationType === "both"
    ? typewriter(frame - delay, text, charactersPerSecond, fps)
    : text;

  const fadeStyle = animationType === "fade" || animationType === "both"
    ? fadeIn(frame, delay)
    : {};

  return (
    <div
      className={`${className}`}
      style={{
        fontSize: `${fontSize}px`,
        color,
        fontWeight,
        textAlign,
        display: "flex",
        alignItems: "center",
        justifyContent: textAlign === "center" ? "center" : textAlign === "right" ? "flex-end" : "flex-start",
        width: "100%",
        height: "100%",
        fontFamily: "system-ui, -apple-system, sans-serif",
        ...fadeStyle,
        ...style,
      }}
    >
      {displayText}
    </div>
  );
};
