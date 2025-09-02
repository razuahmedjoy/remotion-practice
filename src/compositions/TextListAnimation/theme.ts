export interface TextListTheme {
    backgroundColor: string;
    textColor: string;
    highlightColor: string;
    titleFontSize: string;
    listItemFontSize: string;
    fontFamily?: string;
    spacing: {
        titleBottom: string;
        underlineBottom: string;
        listItemGap: string;
    };
}

export const themes: Record<string, TextListTheme> = {
    dark: {
        backgroundColor: "#1a1a1a",
        textColor: "#e5e7eb",
        highlightColor: "#ff4444",
        fontFamily: "Montserrat",
        titleFontSize: "5rem",
        listItemFontSize: "3rem",
        spacing: {
            titleBottom: "2rem",
            underlineBottom: "3rem",
            listItemGap: "1.5rem",
        },
    },
    light: {
        backgroundColor: "#ffffff",
        textColor: "#000000",
        highlightColor: "#ff4444",
        titleFontSize: "5rem",
        listItemFontSize: "3rem",
        fontFamily: "monospace",
        spacing: {
            titleBottom: "2rem",
            underlineBottom: "3rem",
            listItemGap: "1.5rem",
        },
    },
    blue: {
        backgroundColor: "#0f1419",
        textColor: "#ffffff",
        highlightColor: "#00bfff",
        titleFontSize: "5rem",
        listItemFontSize: "3rem",
        fontFamily: "Times New Roman, Times, serif",
        spacing: {
            titleBottom: "2rem",
            underlineBottom: "3rem",
            listItemGap: "1.5rem",
        },
    },
};