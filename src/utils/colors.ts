/**
 * Color utilities and palettes for Remotion videos
 */

export const colorPalettes = {
  modern: {
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#10B981",
    background: "#F8FAFC",
    text: "#1E293B",
    muted: "#64748B",
  },
  vibrant: {
    primary: "#EF4444",
    secondary: "#F59E0B",
    accent: "#8B5CF6",
    background: "#FEF2F2",
    text: "#7F1D1D",
    muted: "#DC2626",
  },
  nature: {
    primary: "#059669",
    secondary: "#0891B2",
    accent: "#65A30D",
    background: "#F0FDF4",
    text: "#14532D",
    muted: "#16A34A",
  },
  monochrome: {
    primary: "#000000",
    secondary: "#374151",
    accent: "#6B7280",
    background: "#FFFFFF",
    text: "#111827",
    muted: "#9CA3AF",
  },
  sunset: {
    primary: "#F97316",
    secondary: "#DC2626",
    accent: "#FBBF24",
    background: "#FFF7ED",
    text: "#9A3412",
    muted: "#FB923C",
  },
};

export type ColorPalette = keyof typeof colorPalettes;

/**
 * Get a color palette by name
 */
export const getPalette = (name: ColorPalette) => colorPalettes[name];

/**
 * Create a gradient string from two colors
 */
export const createGradient = (
  color1: string,
  color2: string,
  direction: "horizontal" | "vertical" | "diagonal" = "horizontal"
) => {
  const directions = {
    horizontal: "to right",
    vertical: "to bottom",
    diagonal: "to bottom right",
  };

  return `linear-gradient(${directions[direction]}, ${color1}, ${color2})`;
};

/**
 * Darken a hex color by a percentage
 */
export const darken = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255))
    .toString(16)
    .slice(1)}`;
};

/**
 * Lighten a hex color by a percentage
 */
export const lighten = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255))
    .toString(16)
    .slice(1)}`;
};

/**
 * Convert hex to rgba with opacity
 */
export const hexToRgba = (hex: string, opacity: number): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
