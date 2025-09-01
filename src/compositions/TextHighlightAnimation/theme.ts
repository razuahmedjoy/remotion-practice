

export interface TextHighlightAnimationTheme {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    highlightColor: string;
    highlightFontWeight: string;
    highlightFontSize: number;
}



export const themes: Record<string, TextHighlightAnimationTheme> = {
    theme1: {
        backgroundColor: "white",
        textColor: "black",
        fontFamily: '"Times New Roman", Times, serif',
        highlightColor: "#ffeb3b",
        highlightFontWeight: "bold",
        highlightFontSize: 32,

    },
    theme2: {
        backgroundColor: "black",
        textColor: "white",
        fontFamily: "Arial, sans-serif",
        highlightColor: "#ffeb3b",
        highlightFontWeight: "bold",
        highlightFontSize: 32,
    },
    theme3: {
        backgroundColor: "white",
        textColor: "black",
        fontFamily: "monospace",
        highlightColor: "#ffeb3b",
        highlightFontWeight: "bold",
        highlightFontSize: 32,
    },
    theme4: {
        backgroundColor: "black",
        textColor: "white",
        fontFamily: 'sans-serif',
        highlightColor: "red",
        highlightFontWeight: "bold",
        highlightFontSize: 32,
    },
}
