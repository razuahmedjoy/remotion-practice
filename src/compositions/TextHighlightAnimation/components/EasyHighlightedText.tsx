import React from 'react';
import { TextHighlightAnimationTheme } from '../theme';

interface EasyHighlightedTextProps {
    paragraphs: string[];
    highlightsText: string[];
    currentTheme: TextHighlightAnimationTheme;
    paragraphTextStyle: React.CSSProperties;
}

export const EasyHighlightedText: React.FC<EasyHighlightedTextProps> = ({
    paragraphs,
    highlightsText,
    currentTheme,
    paragraphTextStyle,
}) => {
    // Super simple: just wrap matched words in highlighted spans
    const highlightText = (text: string, paragraphIndex: number) => {
        if (!highlightsText.length) return text;

        let result = text;
        let offset = 0;

        // Find and wrap each highlight word
        highlightsText.forEach((word, wordIndex) => {
            if (!word) return;

            const regex = new RegExp(`(${word})`, 'gi');
            const matches = [...result.matchAll(regex)];

            // Process matches in reverse order to maintain indices
            for (let i = matches.length - 1; i >= 0; i--) {
                const match = matches[i];
                const start = match.index! + offset;
                const end = start + match[0].length;

                const before = result.slice(0, start);
                const after = result.slice(end);
                const highlighted = `<span class="easy-highlight easy-highlight-${wordIndex}" data-paragraph="${paragraphIndex}">${match[0]}</span>`;

                result = before + highlighted + after;
                offset += highlighted.length - match[0].length;
            }
        });

        return result;
    };

    return (
        <div className="flex flex-col gap-y-10 justify-center h-full">
            {paragraphs.map((paragraph, paragraphIndex) => (
                <div key={paragraphIndex}>
                    <div
                        style={{ ...paragraphTextStyle, color: currentTheme.textColor }}
                        dangerouslySetInnerHTML={{
                            __html: highlightText(paragraph, paragraphIndex)
                        }}
                    />
                </div>
            ))}
            
            {/* CSS for animations */}
            <style>{`
                .easy-highlight {
                    background-color: ${currentTheme.highlightColor};
                    color: black;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: ${currentTheme.highlightFontWeight};
                    font-size: ${currentTheme.highlightFontSize}px;
                    display: inline-block;
                    animation: easyHighlightFade 0.8s ease-in-out both;
                }
                
                @keyframes easyHighlightFade {
                    0% {
                        opacity: 0;
                        transform: scale(0.7);
                        background-color: transparent;
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.1);
                        background-color: ${currentTheme.highlightColor};
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                        background-color: ${currentTheme.highlightColor};
                    }
                }
                
                /* Staggered animation delays */
                .easy-highlight-0 { animation-delay: 0s; }
                .easy-highlight-1 { animation-delay: 0.2s; }
                .easy-highlight-2 { animation-delay: 0.4s; }
                .easy-highlight-3 { animation-delay: 0.6s; }
                .easy-highlight-4 { animation-delay: 0.8s; }
                
                /* Paragraph delays */
                [data-paragraph="1"] { animation-delay: calc(var(--base-delay, 0s) + 0.3s); }
                [data-paragraph="2"] { animation-delay: calc(var(--base-delay, 0s) + 0.6s); }
                [data-paragraph="3"] { animation-delay: calc(var(--base-delay, 0s) + 0.9s); }
            `}</style>
        </div>
    );
};
