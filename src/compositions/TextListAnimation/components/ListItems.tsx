import React from "react";
import { BrushStroke } from "./BrushStroke";
import { fadeIn as fadeInUtil } from "../../../utils/animations";

export interface ListItemsProps {
    items: string[];
    itemStyle: React.CSSProperties;
    numberStyle: React.CSSProperties;
    color: string;
    fixedWidthPx: number;
    frame: number;
    visibilityTimings: { startFrame: number; endFrame: number }[];
    brushTimings: { startFrame: number; endFrame: number }[];
}

const listItemsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    width: "50%",
    margin: "0 auto",
    marginTop: "1.5rem",
    alignItems: "flex-start"
}

export const ListItems: React.FC<ListItemsProps> = ({
    items,
    itemStyle,
    numberStyle,
    color,
    fixedWidthPx,
    frame,
    visibilityTimings,
    brushTimings,
}) => {
    return (
        <div style={listItemsStyle}>
            {items.map((item, index) => {
                const vTiming = visibilityTimings[index];
                const bTiming = brushTimings[index];

                // Faster fade-in using shared util (6 frames)
                const { opacity } = fadeInUtil(frame, vTiming.startFrame, 6);

                // Brush erase based on brush timing (after all visible)
                const bProgress = Math.min(1, Math.max(0, (frame - bTiming.startFrame) / (bTiming.endFrame - bTiming.startFrame)));
                const widthPercent = Math.max(0, Math.min(100, Math.round((1 - bProgress) * 100)));

                return (
                    <div key={index} style={{ ...itemStyle, opacity }}>
                        <span style={numberStyle}>{index + 1}.</span>
                        <span style={{ position: "relative", display: "inline-block", width: `${fixedWidthPx}px`, whiteSpace: "nowrap", zIndex: 3}}>
                            {item}
                            <BrushStroke id={`brush-${index}`} color={color} widthPercent={widthPercent} />
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
