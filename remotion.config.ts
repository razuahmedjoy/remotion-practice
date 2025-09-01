// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

// Video quality settings
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Studio and rendering optimizations
Config.setStudioPort(3000);
Config.setConcurrency(1); // Adjust based on your machine capabilities
Config.setChromiumOpenGlRenderer("egl"); // Better performance on Linux/Windows

// TailwindCSS integration
Config.overrideWebpackConfig(enableTailwind);
