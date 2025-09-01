import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { fadeIn } from "../../utils/animations";

interface CounterTextProps {
  from: number;
  to: number;
  fontSize?: number;
  color?: string;
  fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  textAlign?: "left" | "center" | "right";
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const CounterText: React.FC<CounterTextProps> = ({
  from,
  to,
  fontSize = 72,
  color = "#000000",
  fontWeight = "bold",
  textAlign = "center",
  delay = 0,
  duration = 60,
  prefix = "",
  suffix = "",
  decimalPlaces = 0,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();

  const currentValue = interpolate(
    frame,
    [delay, delay + duration],
    [from, to],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const displayValue = decimalPlaces > 0 
    ? currentValue.toFixed(decimalPlaces)
    : Math.round(currentValue).toString();

  const fadeStyle = fadeIn(frame, delay);

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
      {prefix}{displayValue}{suffix}
    </div>
  );
};
