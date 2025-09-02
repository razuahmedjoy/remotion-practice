import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { themes } from "./theme";
import { useMemo } from "react";

export const textHighlightAnimationSchema = z.object({
    paragraphs: z.array(z.string()),
    highlightsText: z.array(z.string()),
    theme: z.enum(["theme1", "theme2", "theme3", "theme4"]).default("theme1"),
});

type TextHighlightAnimationProps = z.infer<typeof textHighlightAnimationSchema>;

const paragraphContainer: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "70%",
    height: "100%",

}

const paragraphText = {
    color: "black",
    fontSize: 30,
}

export const TextHighlightAnimation: React.FC<TextHighlightAnimationProps> = ({
    paragraphs,
    highlightsText,
    theme,
}: TextHighlightAnimationProps) => {

    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame: frame,
        fps,
        config: {
            damping: 500,
            stiffness: 20,
            mass: 20,
           
        },
    });
    const scale = interpolate(progress, [0, 1], [1, 1.3], {
        easing: Easing.ease,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const currentTheme = useMemo(() => themes[theme], [theme]);

    type Segment = { text: string; highlighted: boolean; startFrame?: number; endFrame?: number };
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
        <AbsoluteFill style={{ backgroundColor: currentTheme.backgroundColor, fontFamily: currentTheme.fontFamily }} >

            <AbsoluteFill style={{ ...paragraphContainer, transform: `translate(-50%, -50%) scale(${scale})` }}>

                <div className="flex flex-col gap-y-10 justify-center h-full">
                    {paragraphSegments.map((segments, index) => (
                        <div key={index}>
                            <p style={{ ...paragraphText, color: currentTheme.textColor }}>
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




            </AbsoluteFill>


        </AbsoluteFill>
    );
}