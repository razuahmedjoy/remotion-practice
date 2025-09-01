import { interpolate, spring } from "remotion";

/**
 * Common animation utilities for Remotion videos
 */

export interface SpringConfig {
  damping?: number;
  stiffness?: number;
  mass?: number;
}

/**
 * Creates a smooth slide-in animation from specified direction
 */
export const slideIn = (
  frame: number,
  fps: number,
  from: "left" | "right" | "top" | "bottom" = "left",
  distance: number = 100,
  config?: SpringConfig
) => {
  const progress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      ...config,
    },
  });

  const value = interpolate(progress, [0, 1], [distance, 0]);

  switch (from) {
    case "left":
      return { transform: `translateX(-${value}px)` };
    case "right":
      return { transform: `translateX(${value}px)` };
    case "top":
      return { transform: `translateY(-${value}px)` };
    case "bottom":
      return { transform: `translateY(${value}px)` };
    default:
      return { transform: `translateX(-${value}px)` };
  }
};

/**
 * Creates a fade-in animation
 */
export const fadeIn = (
  frame: number,
  startFrame: number = 0,
  duration: number = 30
) => {
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return { opacity };
};

/**
 * Creates a fade-out animation
 */
export const fadeOut = (
  frame: number,
  startFrame: number,
  duration: number = 30
) => {
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return { opacity };
};

/**
 * Creates a scale animation (zoom effect)
 */
export const scaleIn = (
  frame: number,
  fps: number,
  startFrame: number = 0,
  config?: SpringConfig
) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 150,
      stiffness: 300,
      ...config,
    },
  });

  const scale = interpolate(progress, [0, 1], [0, 1]);

  return { transform: `scale(${scale})` };
};

/**
 * Creates a rotate animation
 */
export const rotate = (
  frame: number,
  fps: number,
  rotationsPerSecond: number = 0.5
) => {
  const rotation = (frame / fps) * rotationsPerSecond * 360;
  return { transform: `rotate(${rotation}deg)` };
};

/**
 * Creates a pulsing scale animation
 */
export const pulse = (
  frame: number,
  fps: number,
  minScale: number = 0.95,
  maxScale: number = 1.05,
  duration: number = 60
) => {
  const progress = (frame % duration) / duration;
  const scale = interpolate(
    Math.sin(progress * Math.PI * 2),
    [-1, 1],
    [minScale, maxScale]
  );

  return { transform: `scale(${scale})` };
};

/**
 * Creates a typewriter effect timing
 */
export const typewriter = (
  frame: number,
  text: string,
  charactersPerSecond: number = 10,
  fps: number = 30
) => {
  const charactersPerFrame = charactersPerSecond / fps;
  const charactersToShow = Math.floor(frame * charactersPerFrame);
  return text.slice(0, Math.max(0, charactersToShow));
};
