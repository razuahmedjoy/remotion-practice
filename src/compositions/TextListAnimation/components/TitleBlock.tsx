import React from "react";

export interface TitleBlockProps {
    title: string;
    titleStyle: React.CSSProperties;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({ title, titleStyle }) => {
    return (
        <>
            <h1 style={titleStyle}>{title}</h1>
        </>
    );
};
