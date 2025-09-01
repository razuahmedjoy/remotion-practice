import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { slideIn } from "../components";

export const imageAndTextSchema = z.object({
    image: z.string(),
    text: z.string().max(30, "Text must be less than 30 characters"),
    theme: z.enum(["theme1", "theme2", "theme3", "theme4"]).default("theme1"),
});

type ImageAndTextProps = z.infer<typeof imageAndTextSchema>;

// Theme configurations
const themes = {
    theme1: {
        background: "bg-black",
        textColor: "text-gray-300",
        fontFamily: "font-sans",
        borderColor: "#fafafa",
        name: "Dark Classic"
    },
    theme2: {
        background: "bg-white",
        textColor: "text-black",
        fontFamily: "font-serif",
        borderColor: "#1f2937",
        name: "Light Elegant"
    },
    theme3: {
        background: "bg-gradient-to-br from-blue-900 to-purple-900",
        textColor: "text-yellow-200",
        fontFamily: "font-mono",
        borderColor: "white",
        name: "Ocean Sunset"
    },
    theme4: {
        background: "bg-gradient-to-r from-green-800 to-teal-700",
        textColor: "text-white",
        fontFamily: "font-sans",
        borderColor: "white",
        name: "Nature Fresh"
    }
};

const AnimatedBorderImage: React.FC<{ src: string; frame: number; borderColor: string }> = ({ src, frame, borderColor }) => {
    // Calculate border animation progress (0 to 1)
    const borderProgress = interpolate(
        frame,
        [20, 60], // 2 seconds at 60fps
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Calculate the stroke-dasharray for the perimeter
    const totalLength = 2 * 1024 + 2 * 680; // 2 * width + 2 * height
    const strokeDasharray = totalLength;
    const strokeDashoffset = totalLength * (1 - borderProgress);

    return (
        <div className="relative">
            <Img
                src={src}
                alt="image"
                width={1024}
                style={{ objectFit: "cover" }}
                className=""
            />

            {/* SVG overlay for animated perimeter border */}
            <svg
                className="absolute inset-0 pointer-events-none"
                width="100%"
                height="100%"
                viewBox="0 0 1024 680"
                style={{ overflow: 'visible' }}
            >
                <rect
                    x="0"
                    y="0"
                    width="1024"
                    height="680"
                    fill="none"
                    stroke={borderColor}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="square"
                />
            </svg>
        </div>
    );
};

export const ImageAndText: React.FC<ImageAndTextProps> = ({ image, text, theme = "theme1" }) => {

    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideStyle = slideIn(frame - 50, fps, "bottom", 100);

    const opacityStyle = interpolate(
        frame - 50,
        [0, 40], // 2 seconds at 60fps
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const fadeInStyle = interpolate(
        frame,
        [0, 20],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // Dynamic font size calculation based on text length and available width
    const maxWidth = 1600;
    const baseFontSize = 64;
    const minFontSize = 26;

    // Calculate font size based on text length and available width
    const calculateFontSize = () => {
        const textLength = text?.length || 0;
        const availableWidth = maxWidth;

        // Estimate character width (approximate for most fonts)
        const estimatedCharWidth = 0.6; // Rough estimate: 1 character ≈ 0.6x font size

        // Calculate how many characters can fit in the available width
        const maxCharsPerLine = availableWidth / (baseFontSize * estimatedCharWidth);

        // If text is short, use base font size
        if (textLength <= maxCharsPerLine) {
            return baseFontSize;
        }

        // Calculate font size that would fit the text in the available width
        const calculatedSize = (availableWidth / textLength) / estimatedCharWidth;

        // Ensure font size is within reasonable bounds
        return Math.max(minFontSize, Math.min(baseFontSize, calculatedSize));
    };

    const dynamicFontSize = calculateFontSize();
    const currentTheme = themes[theme];

    return (
        <AbsoluteFill className={`w-full h-full ${currentTheme.background}`}>
            <div className="flex flex-col items-center justify-center w-full h-full gap-y-6" style={{ opacity: fadeInStyle }}>

                <AnimatedBorderImage src={image} frame={frame} borderColor={currentTheme.borderColor} />


                <p className={`font-bold mt-5 w-[1600px] text-center max-w-[1600px] ${currentTheme.textColor} ${currentTheme.fontFamily}`} style={{
                    ...slideStyle,
                    opacity: opacityStyle, fontSize: dynamicFontSize
                }}>{text?.length > 50 ? text.slice(0, 500) + "..." : text}</p>

            </div>

        </AbsoluteFill>
    );
}