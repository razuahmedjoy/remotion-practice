import { Composition } from "remotion";
import { TextListAnimation, textListAnimationSchema } from "./TextListAnimation";

export const TextListComposition: React.FC = () => {
    return (
        <Composition
            id="TextListAnimation"
            component={TextListAnimation}
            durationInFrames={300}
            fps={30}
            width={1920}
            height={1080}
            schema={textListAnimationSchema}
            defaultProps={{
                title: "TOP TECH TRENDS 2024",
                listItems: [
                    "ARTIFICIAL INTELLIGENCE",
                    "QUANTUM COMPUTING", 
                    "SUSTAINABLE TECHNOLOGY",
                    "CYBERSECURITY",
                    "METAVERSE"
                ],
                theme: "dark"
            }}
        />
    );
};
