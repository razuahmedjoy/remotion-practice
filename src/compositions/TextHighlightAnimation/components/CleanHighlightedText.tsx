import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { TextHighlightAnimationTheme } from "../theme";

interface CleanHighlightedTextProps {
    paragraphs: string[];
    highlightsText: string[];
    fps: number;
    currentTheme: TextHighlightAnimationTheme;
    paragraphTextStyle: React.CSSProperties;
}

type TextPart = {
    text: string;
    isHighlighted: boolean;
    startFrame?: number;
    endFrame?: number;
};

export const CleanHighlightedText: React.FC<CleanHighlightedTextProps> = ({
    paragraphs,
    highlightsText,
    fps,
    currentTheme,
    paragraphTextStyle,
}) => {
    const frame = useCurrentFrame();

    // Much simpler logic: just find all matches and assign sequential timing
    const paragraphParts: TextPart[][] = useMemo(() => {
        const highlightWords = highlightsText.filter(word => word?.trim().length > 0);
        if (highlightWords.length === 0) {
            return paragraphs.map(paragraph => [{ text: paragraph, isHighlighted: false }]);
        }

        // Animation timing settings
        const highlightDuration = Math.round(fps * 0.8); // 0.8 seconds per highlight
        const gapBetweenHighlights = Math.round(fps * 0.2); // 0.2 seconds gap
        const startDelay = Math.round(fps * 0.4); // 0.4 seconds initial delay

        let currentFrame = startDelay;
        const allParts: TextPart[][] = [];

        paragraphs.forEach((paragraph, paragraphIndex) => {
            const parts: TextPart[] = [];
            let remainingText = paragraph;
            let lastIndex = 0;

            // Find all highlight matches in this paragraph
            const matches: Array<{ word: string; start: number; end: number }> = [];
            
            highlightWords.forEach(word => {
                const regex = new RegExp(word, 'gi');
                let match;
                while ((match = regex.exec(paragraph)) !== null) {
                    matches.push({
                        word: match[0],
                        start: match.index,
                        end: match.index + match[0].length
                    });
                }
            });

            // Sort matches by position
            matches.sort((a, b) => a.start - b.start);

            // Remove overlapping matches (keep the longer one)
            const cleanMatches: Array<{ word: string; start: number; end: number }> = [];
            for (const match of matches) {
                const lastMatch = cleanMatches[cleanMatches.length - 1];
                if (!lastMatch || match.start >= lastMatch.end) {
                    cleanMatches.push(match);
                } else if (match.end > lastMatch.end) {
                    // Replace with longer match
                    cleanMatches[cleanMatches.length - 1] = match;
                }
            }

            // Build parts array
            cleanMatches.forEach(match => {
                // Add text before highlight
                if (match.start > lastIndex) {
                    parts.push({
                        text: paragraph.slice(lastIndex, match.start),
                        isHighlighted: false
                    });
                }

                // Add highlighted text with timing
                parts.push({
                    text: match.word,
                    isHighlighted: true,
                    startFrame: currentFrame,
                    endFrame: currentFrame + highlightDuration
                });

                currentFrame += highlightDuration + gapBetweenHighlights;
                lastIndex = match.end;
            });

            // Add remaining text
            if (lastIndex < paragraph.length) {
                parts.push({
                    text: paragraph.slice(lastIndex),
                    isHighlighted: false
                });
            }

            allParts.push(parts);
        });

        return allParts;
    }, [paragraphs, highlightsText, fps]);

    return (
        <div className="flex flex-col gap-y-10 justify-center h-full">
            {paragraphParts.map((parts, paragraphIndex) => (
                <div key={paragraphIndex}>
                    <p style={{ ...paragraphTextStyle, color: currentTheme.textColor }}>
                        {parts.map((part, partIndex) => {
                            if (!part.isHighlighted) {
                                return <span key={partIndex}>{part.text}</span>;
                            }

                            // Same animation logic as original - background grows from 0% to 100%
                            const progress = part.startFrame !== undefined && part.endFrame !== undefined
                                ? interpolate(
                                    frame,
                                    [part.startFrame, part.endFrame],
                                    [0, 1],
                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                )
                                : 0;

                            const widthPercent = Math.round(progress * 100);

                            return (
                                <span
                                    key={partIndex}
                                    style={{
                                        fontWeight: currentTheme.highlightFontWeight as React.CSSProperties["fontWeight"],
                                        fontSize: currentTheme.highlightFontSize,
                                        backgroundImage: `linear-gradient(${currentTheme.highlightColor}, ${currentTheme.highlightColor})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: `${widthPercent}% 100%`,
                                        backgroundPosition: "0% 100%",
                                    }}
                                >
                                    {part.text}
                                </span>
                            );
                        })}
                    </p>
                </div>
            ))}
        </div>
    );
};
