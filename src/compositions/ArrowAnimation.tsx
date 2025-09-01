import { AbsoluteFill, Img, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { SlideIn } from "../components";


export const arrowAnimationSchema = z.object({
    backgroundImage: z.string(),
    leftImage: z.string(),
    rightImage: z.string(),
});

type ArrowAnimationProps = z.infer<typeof arrowAnimationSchema>;

const PolaroidCard: React.FC<{ imageUrl: string; rotationDeg?: number }> = ({ imageUrl, rotationDeg = 0 }) => {
    return (
        <div
            style={{
                transform: `rotate(${rotationDeg}deg)`,
                width: "450px",
                height: "500px",
                backgroundColor: "#ffffff",
                padding: 16,
            }}
        >
            <div
                style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#000",
                }}
            >
                <Img
                    src={imageUrl}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />
            </div>
        </div>
    );
};

export const ArrowAnimation: React.FC<ArrowAnimationProps> = ({ backgroundImage, leftImage, rightImage }) => {

    const { durationInFrames } = useVideoConfig();
    const frame = useCurrentFrame();



    const progress = spring({
        frame,
        fps: 60,
        config: {
            damping: 50,
            stiffness: 100,
        },
    });

    const value = interpolate(progress, [0, 1], [0, 500]);

    const leftImageTransform = `translateX(-${value}px)`;

    const lineProgress = spring({
        frame: frame - 20,
        fps: 60,
        config: {
            damping: 50,
            stiffness: 100,
        },
    });
    const lineWidth = interpolate(lineProgress, [0, 1], [0, 45]);

    const scaleProgress = spring({
        frame: frame - 60,
        fps: 60,
        config: {
            damping: 50,
            stiffness: 100,
        },
    });

    const opacityProgress = spring({
        frame: frame-20,
        fps: 60,
        config: {
            damping: 50,
            stiffness: 100,
        },
    });
    const scale = interpolate(scaleProgress, [0, 1], [1, 1.15]);
    const opacityValue = interpolate(opacityProgress, [0, 1], [0, 1]);
    // console.log(value);
    console.log(lineWidth);
    console.log(scale, "scale value");
    return (
        <AbsoluteFill
            style={{
                background: `url(${backgroundImage}) center center / cover no-repeat`,
                width: "100%",
                height: "100%",
            }}
        >

            {/* Center dashed line */}

            {/* add a dark overlay */}
            <AbsoluteFill style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }} />



            <Sequence durationInFrames={durationInFrames}>
                <AbsoluteFill style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", transform: leftImageTransform, scale: scale }}>
                    <PolaroidCard imageUrl={leftImage} rotationDeg={-3} />
                </AbsoluteFill>
            </Sequence>

            <Sequence from={20} durationInFrames={durationInFrames}>
                <div
                    style={{
                        position: "absolute",
                        width: `${lineWidth}%`,
                        top: "50%",
                        left: "25%",
                        transform: "translateY(-50%)",
                        borderTop: "6px dashed rgba(255,255,255,0.85)",
                        zIndex: 0,
                    }}
                />
            </Sequence>
            <Sequence from={40} durationInFrames={durationInFrames}>
                <AbsoluteFill style={{ position: "relative", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", transform: 'translateX(500px)', scale: scale, opacity: opacityValue }}>
                    <SlideIn from="bottom">
                        <PolaroidCard imageUrl={rightImage} rotationDeg={3} />
                    </SlideIn>


                </AbsoluteFill>
            </Sequence>



        </AbsoluteFill>
    );
}