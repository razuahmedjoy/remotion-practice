import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { TextHighlightAnimationTheme } from "../theme";

interface HighlightedParagraphsProps {
    paragraphs: string[];
    highlightsText: string[];
    fps: number;
    currentTheme: TextHighlightAnimationTheme;
    paragraphTextStyle: React.CSSProperties;
}

type Segment = { 
    text: string; 
    highlighted: boolean; 
    startFrame?: number; 
    endFrame?: number 
};

export const HighlightedParagraphs: React.FC<HighlightedParagraphsProps> = ({
    paragraphs,
    highlightsText,
    fps,
    currentTheme,
    paragraphTextStyle,
}) => {
    const frame = useCurrentFrame();

    const paragraphSegments: Segment[][] = useMemo(() => {
        const tokens = (highlightsText || [])
            .map((t) => t?.trim())
            .filter((t): t is string => Boolean(t) && t.length > 0);
        
        const perHighlightFrames = Math.max(1, Math.round(fps * 0.8));
        const gapFrames = Math.max(1, Math.round(fps * 0.2));
        const startDelay = Math.round(fps * 0.4);

        let runningFrame = startDelay;
        
        return paragraphs.map((paragraph) => {
            type Range = { start: number; end: number };
            const ranges: Range[] = [];
            const lower = paragraph.toLowerCase();
            
            for (const token of tokens) {
                const tokenLower = token.toLowerCase();
                if (!tokenLower) continue;
                let searchStart = 0;
                while (true) {
                    const idx = lower.indexOf(tokenLower, searchStart);
                    if (idx === -1) break;
                    ranges.push({ start: idx, end: idx + tokenLower.length });
                    searchStart = idx + tokenLower.length;
                }
            }

            // Merge overlapping ranges
            ranges.sort((a, b) => a.start - b.start);
            const merged: Range[] = [];
            for (const r of ranges) {
                const last = merged[merged.length - 1];
                if (!last || r.start > last.end) {
                    merged.push({ ...r });
                } else {
                    last.end = Math.max(last.end, r.end);
                }
            }

            // Build segments from merged ranges
            const segments: Segment[] = [];
            let cursor = 0;
            for (const r of merged) {
                if (cursor < r.start) {
                    segments.push({ text: paragraph.slice(cursor, r.start), highlighted: false });
                }
                segments.push({
                    text: paragraph.slice(r.start, r.end),
                    highlighted: true,
                    startFrame: runningFrame,
                    endFrame: runningFrame + perHighlightFrames,
                });
                runningFrame += perHighlightFrames + gapFrames;
                cursor = r.end;
            }
            if (cursor < paragraph.length) {
                segments.push({ text: paragraph.slice(cursor), highlighted: false });
            }
            return segments;
        });
    }, [paragraphs, highlightsText, fps]);

    return (
        <div className="flex flex-col gap-y-10 justify-center h-full">
            {paragraphSegments.map((segments, index) => (
                <div key={index}>
                    <p style={{ ...paragraphTextStyle, color: currentTheme.textColor }}>
                        {segments.map((seg, sIndex) => {
                            if (!seg.highlighted) {
                                return <span key={sIndex}>{seg.text}</span>;
                            }
                            const progressLocal = seg.startFrame !== undefined && seg.endFrame !== undefined
                                ? interpolate(
                                    frame,
                                    [seg.startFrame, seg.endFrame],
                                    [0, 1],
                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                )
                                : 0;
                            const widthPercent = Math.round(progressLocal * 100);
                            return (
                                <span
                                    key={sIndex}
                                    style={{
                                        fontWeight: currentTheme.highlightFontWeight as React.CSSProperties["fontWeight"],
                                        fontSize: currentTheme.highlightFontSize,
                                        backgroundImage: `linear-gradient(${currentTheme.highlightColor}, ${currentTheme.highlightColor})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: `${widthPercent}% 100%`,
                                        backgroundPosition: "0% 100%",
                                    }}
                                >
                                    {seg.text}
                                </span>
                            );
                        })}
                    </p>
                </div>
            ))}
        </div>
    );
};
