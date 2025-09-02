import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { useMemo } from "react";
import { themes, TextListTheme } from "./theme";
import { TitleBlock } from "./components/TitleBlock";
import { ListItems } from "./components/ListItems";
import { SlideIn } from "../../components";

export const textListAnimationSchema = z.object({
    title: z.string()
        .max(20, "Title must be less than 20 characters")
        .min(1, "Title must be at least 1 character"),
    listItems: z.array(z.string().max(30, "List item must be less than 20 characters"))
        .min(1)
        .max(5, "Maximum 5 list items allowed"),
    theme: z.enum(["dark", "light", "blue"]).default("dark"),
});

type TextListAnimationProps = z.infer<typeof textListAnimationSchema>;

const containerStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};

const getTitleStyle = (theme: TextListTheme): React.CSSProperties => ({
    fontSize: theme.titleFontSize,
    fontWeight: "bolder",
    color: theme.textColor,
    marginBottom: theme.spacing.titleBottom,
    textTransform: "uppercase",
    letterSpacing: "0.075em",
    textAlign: "center",
    textWrap: "nowrap",
});

// Underline wrapper centered under the title
const getUnderlineStyle = (): React.CSSProperties => ({
    width: "60%",
    height: "4px",
    margin: "0.75rem auto 1rem auto",
    position: "relative",
    backgroundColor: "transparent",
});

const getListItemStyle = (theme: TextListTheme): React.CSSProperties => ({
    fontSize: theme.listItemFontSize,
    color: theme.textColor,
    display: "flex",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
    marginTop: "1.25rem",
});

const numberStyle: React.CSSProperties = {
    marginRight: "1rem",
    minWidth: "3rem",
};

const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
        "radial-gradient(ellipse at center, rgba(0,0,0,0) 65%, rgba(0,0,0,0.4) 100%)",
    pointerEvents: "none",
    zIndex: 10,
};

export const TextListAnimation: React.FC<TextListAnimationProps> = ({
    title,
    listItems,
    theme = "dark",
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const currentTheme = useMemo(() => themes[theme], [theme]);

    // 1) Title appears first (slide in + fade).
    const titleSpring = spring({ frame, fps, config: { damping: 200, stiffness: 120, mass: 1 } });


    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });


    // 2) After a brief delay, scale container and draw underline together.
    const scaleDelay = Math.round(fps * 0.4);
    console.log("scaleDelay", scaleDelay);

    const scaleSpring = spring({ frame: frame - scaleDelay, fps, config: { damping: 200, stiffness: 80, mass: 1.5 } });

    const scale = interpolate(scaleSpring, [0, 1], [0.7, 0.9], { easing: Easing.ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });


    const underlineProgress = interpolate(scaleSpring, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 3) List items appear sequentially with fade; brush removal starts only after all are visible.
    const timingBundles = useMemo(() => {
        const itemDuration = Math.round(fps * 0.2); // faster visibility
        const gapBetweenItems = Math.round(fps * 0.01);
        const visibilityStart = 30 + Math.round(fps * 0.5);

        const visibilityTimings = listItems.map((_, index) => ({
            startFrame: visibilityStart + (index * (itemDuration + gapBetweenItems)),
            endFrame: visibilityStart + (index * (itemDuration + gapBetweenItems)) + itemDuration,
        }));

        const allVisibleAt = visibilityTimings[visibilityTimings.length - 1].endFrame;
        const brushItemDuration = Math.round(fps * .8);
        const brushGap = Math.round(fps * 0.3);

        const brushTimings = listItems.map((_, index) => ({
            startFrame: allVisibleAt + (index * (brushItemDuration + brushGap)),
            endFrame: allVisibleAt + (index * (brushItemDuration + brushGap)) + brushItemDuration,
        }));

        return { visibilityTimings, brushTimings };
    }, [listItems, fps]);

    const strokeWidthPx = 1000;

    return (
        <AbsoluteFill style={{ backgroundColor: currentTheme.backgroundColor, fontFamily: currentTheme.fontFamily }}>
            <div style={{ ...containerStyle, transform: `translate(-50%, -50%) scale(${scale})` }}>

                <SlideIn from="top" distance={220} style={{ opacity: titleOpacity }}>
                    <TitleBlock title={title} titleStyle={getTitleStyle(currentTheme)} />
                </SlideIn>
                <div style={getUnderlineStyle()}>
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: `${Math.round(underlineProgress * 100)}%`,
                            backgroundColor: currentTheme.textColor,
                        }}
                    />
                </div>
                <ListItems
                    items={listItems}
                    itemStyle={getListItemStyle(currentTheme)}
                    numberStyle={numberStyle}
                    color={currentTheme.highlightColor}
                    fixedWidthPx={strokeWidthPx}
                    frame={frame}
                    visibilityTimings={timingBundles.visibilityTimings}
                    brushTimings={timingBundles.brushTimings}
                />
            </div>
            <div style={overlayStyle}></div>
        </AbsoluteFill>
    );
};
