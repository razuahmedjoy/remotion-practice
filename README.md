# Remotion Tutorial Project

A comprehensive React project showcasing **Remotion** - a framework for creating videos programmatically using React. This project demonstrates best practices, reusable components, and various animation techniques.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start Remotion Studio
npm run dev
```

This will open Remotion Studio in your browser where you can preview and edit your video compositions.

## 📁 Project Structure

```
src/
├── components/           # Reusable video components
│   ├── animations/      # Animation wrapper components
│   │   ├── SlideIn.tsx
│   │   └── ScaleIn.tsx
│   ├── effects/         # Visual effects
│   │   ├── GradientBackground.tsx
│   │   └── PulsingElement.tsx
│   ├── layouts/         # Layout components
│   │   ├── CenteredLayout.tsx
│   │   └── SplitLayout.tsx
│   └── text/           # Text-related components
│       ├── AnimatedText.tsx
│       └── CounterText.tsx
├── compositions/        # Video compositions (scenes)
│   ├── TextAnimations.tsx
│   ├── LayoutShowcase.tsx
│   └── AnimationShowcase.tsx
├── utils/              # Utility functions
│   ├── animations.ts   # Animation helpers
│   └── colors.ts       # Color utilities
├── HelloWorld/         # Original template components
├── Root.tsx           # Main composition registry
└── index.ts           # Entry point
```

## 🎬 Available Compositions

### 1. HelloWorld
The original template composition featuring the Remotion logo with smooth animations.

### 2. TextAnimations
Demonstrates various text animation techniques:
- **Fade-in animations** with timing control
- **Typewriter effects** with configurable speed
- **Counter animations** with number interpolation

### 3. LayoutShowcase
Shows different layout patterns:
- **Split layouts** (horizontal/vertical)
- **Centered layouts** with background options
- **Responsive grid systems**

### 4. AnimationShowcase
Features complex animation combinations:
- **Multi-directional slide animations**
- **Scale and rotation effects**
- **Pulsing animations**
- **Combined animation sequences**

## 🛠️ Component Library

### Animation Components

#### `SlideIn`
Creates smooth slide-in animations from any direction.

```tsx
<SlideIn from="left" distance={100} delay={30}>
  <YourContent />
</SlideIn>
```

**Props:**
- `from`: Direction (`"left"` | `"right"` | `"top"` | `"bottom"`)
- `distance`: Slide distance in pixels
- `delay`: Animation delay in frames
- `config`: Spring animation configuration

#### `ScaleIn`
Provides zoom-in animations with spring physics.

```tsx
<ScaleIn delay={20} config={{ damping: 150 }}>
  <YourContent />
</ScaleIn>
```

### Text Components

#### `AnimatedText`
Versatile text component with multiple animation types.

```tsx
<AnimatedText
  text="Hello World"
  fontSize={48}
  color="#3B82F6"
  animationType="typewriter"
  charactersPerSecond={10}
/>
```

**Animation Types:**
- `"fade"`: Fade-in effect
- `"typewriter"`: Character-by-character reveal
- `"both"`: Combined fade and typewriter

#### `CounterText`
Animated number counter with customizable formatting.

```tsx
<CounterText
  from={0}
  to={100}
  duration={60}
  suffix="%"
  decimalPlaces={1}
/>
```

### Layout Components

#### `CenteredLayout`
Centers content with optional background styling.

```tsx
<CenteredLayout backgroundColor="#F8FAFC">
  <YourContent />
</CenteredLayout>
```

#### `SplitLayout`
Creates split-screen layouts with configurable ratios.

```tsx
<SplitLayout
  leftContent={<LeftComponent />}
  rightContent={<RightComponent />}
  splitRatio={0.6}
  direction="horizontal"
/>
```

### Effect Components

#### `GradientBackground`
Creates beautiful gradient backgrounds.

```tsx
<GradientBackground
  color1="#3B82F6"
  color2="#8B5CF6"
  direction="diagonal"
/>
```

#### `PulsingElement`
Adds pulsing animation to any element.

```tsx
<PulsingElement minScale={0.95} maxScale={1.05}>
  <YourContent />
</PulsingElement>
```

## 🎨 Design System

### Color Palettes

The project includes predefined color palettes in `src/utils/colors.ts`:

```tsx
import { colorPalettes, getPalette } from './utils/colors';

// Available palettes: modern, vibrant, nature, monochrome, sunset
const palette = getPalette('modern');
```

### Animation Utilities

Common animation functions in `src/utils/animations.ts`:

```tsx
import { slideIn, fadeIn, scaleIn, pulse } from './utils/animations';

// Use in your components
const style = fadeIn(frame, startFrame, duration);
```

## 🎥 Remotion Studio Features

### Preview and Edit
- Real-time preview of your compositions
- Interactive timeline scrubbing
- Component property editing
- Live code updates

### Rendering
```bash
# Render a specific composition
npx remotion render src/index.ts HelloWorld output.mp4

# Render with custom props
npx remotion render src/index.ts TextAnimations output.mp4 --props='{"title":"Custom Title"}'

# Render with different format
npx remotion render src/index.ts AnimationShowcase output.gif
```

## 🔧 Configuration

### Remotion Config (`remotion.config.ts`)
Customize rendering settings, webpack configuration, and more.

### TypeScript
Full TypeScript support with strict type checking and prop validation using Zod schemas.

### TailwindCSS
Pre-configured with TailwindCSS v4 for rapid styling:

```tsx
<div className="flex items-center justify-center bg-blue-500 text-white p-4">
  Content
</div>
```

## 📖 Best Practices

### 1. Component Organization
- Keep components small and focused
- Use proper TypeScript interfaces
- Implement Zod schemas for props validation

### 2. Animation Timing
- Use `useCurrentFrame()` for frame-based animations
- Leverage `Sequence` components for timing control
- Implement spring animations for natural motion

```tsx
import { Sequence, useCurrentFrame, spring } from 'remotion';

const MyComponent = () => {
  const frame = useCurrentFrame();
  
  return (
    <>
      <Sequence from={0} durationInFrames={60}>
        <FirstAnimation />
      </Sequence>
      <Sequence from={40} durationInFrames={80}>
        <SecondAnimation />
      </Sequence>
    </>
  );
};
```

### 3. Performance Optimization
- Use `AbsoluteFill` for full-screen layouts
- Minimize re-renders with proper React patterns
- Optimize heavy animations for GPU acceleration

### 4. Responsive Design
- Design for standard video resolutions (1920x1080, 1280x720)
- Use relative units where appropriate
- Test on different aspect ratios

## 🚀 Advanced Usage

### Custom Hooks
Create reusable animation hooks:

```tsx
const useSlideAnimation = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return slideIn(frame, fps, 'left', 100, { damping: 100 });
};
```

### Complex Compositions
Combine multiple sequences for sophisticated storytelling:

```tsx
const StoryComposition = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={90}>
      <IntroScene />
    </Sequence>
    <Sequence from={75} durationInFrames={120}>
      <MainContent />
    </Sequence>
    <Sequence from={180} durationInFrames={60}>
      <OutroScene />
    </Sequence>
  </AbsoluteFill>
);
```

### Data-Driven Videos
Use external data to generate dynamic content:

```tsx
const DataVideo = ({ data }: { data: ChartData[] }) => (
  <AbsoluteFill>
    {data.map((item, index) => (
      <Sequence 
        key={item.id}
        from={index * 30}
        durationInFrames={60}
      >
        <ChartElement data={item} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
```

## 📚 Learning Resources

- [Remotion Documentation](https://www.remotion.dev/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add examples for new components
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy video creating with Remotion! 🎬✨**