import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { TextHighlightAnimationTheme } from '../theme';

interface SimpleHighlightedTextProps {
    paragraphs: string[];
    highlightsText: string[];
    currentTheme: TextHighlightAnimationTheme;
    paragraphTextStyle: React.CSSProperties;
}

export const SimpleHighlightedText: React.FC<SimpleHighlightedTextProps> = ({
    paragraphs,
    highlightsText,
    currentTheme,
    paragraphTextStyle,
}) => {
    const frame = useCurrentFrame();
    
    // Simple approach: just find and highlight text sequentially
    const renderParagraph = (paragraph: string, paragraphIndex: number) => {
        // If no highlights, just return the paragraph
        if (!highlightsText.length) {
            return <span>{paragraph}</span>;
        }

        const parts: React.ReactNode[] = [];
        let remainingText = paragraph;
        let highlightIndex = 0;

        // Process each highlight word
        highlightsText.forEach((highlightWord, wordIndex) => {
            if (!highlightWord || !remainingText) return;

            const lowerRemaining = remainingText.toLowerCase();
            const lowerHighlight = highlightWord.toLowerCase();
            const wordIndexInText = lowerRemaining.indexOf(lowerHighlight);

            if (wordIndexInText !== -1) {
                // Add text before the highlight
                if (wordIndexInText > 0) {
                    parts.push(
                        <span key={`text-${highlightIndex++}`}>
                            {remainingText.substring(0, wordIndexInText)}
                        </span>
                    );
                }

                // Add the highlighted word with animation
                const animationDelay = (paragraphIndex * 0.5) + (wordIndex * 0.3);
                const progress = interpolate(
                    frame,
                    [animationDelay * 30, (animationDelay + 0.5) * 30], // 30 fps timing
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                parts.push(
                    <span
                        key={`highlight-${highlightIndex++}`}
                        style={{
                            backgroundColor: currentTheme.highlightColor,
                            color: 'black',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            fontWeight: currentTheme.highlightFontWeight as React.CSSProperties['fontWeight'],
                            fontSize: currentTheme.highlightFontSize,
                            opacity: progress,
                            transform: `scale(${0.8 + (progress * 0.2)})`,
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {remainingText.substring(wordIndexInText, wordIndexInText + highlightWord.length)}
                    </span>
                );

                // Update remaining text
                remainingText = remainingText.substring(wordIndexInText + highlightWord.length);
            }
        });

        // Add any remaining text
        if (remainingText) {
            parts.push(
                <span key={`text-${highlightIndex++}`}>
                    {remainingText}
                </span>
            );
        }

        return parts;
    };

    return (
        <div className="flex flex-col gap-y-10 justify-center h-full">
            {paragraphs.map((paragraph, paragraphIndex) => (
                <div key={paragraphIndex}>
                    <p style={{ ...paragraphTextStyle, color: currentTheme.textColor }}>
                        {renderParagraph(paragraph, paragraphIndex)}
                    </p>
                </div>
            ))}
        </div>
    );
};
