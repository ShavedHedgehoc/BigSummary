import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    keyframes: {
      colorChange: {
        "0%, 100%": { color: "var(--chakra-colors-fg)" },
        "50%": { color: "var(--chakra-colors-fg-error)" },
      },
    },
    tokens: {
      animations: {
        colorCycle: { value: `colorChange 1s  infinite` },
      },
      fonts: {
        body: { value: "Segoe UI, sans-serif" },
        heading: { value: "Segoe UI, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          value: { _dark: `{colors.orange.600}` },
        },

        brand_blue: {
          value: { base: `{colors.blue.50}`, _dark: `{colors.orange.600}` },
        },
        bg: {
          // value: { _dark: `{colors.gray.900}` },

          // success: {
          //   value: { _dark: `{colors.gray.900}` },
          // },
          // warning: {
          //   value: { _dark: `{colors.gray.900}` },
          // },
          // error: {
          //   value: { _dark: `{colors.gray.900}` },
          // },
          panel: {
            value: { _dark: `{colors.gray.900}` },
          },
          info: {
            value: { _dark: `{colors.gray.900}` },
          },
        },
        // fg: { value: { _dark: `{colors.teal.400}` } },
        border: {
          success: {
            value: { _light: `{colors.gray.200}` },
          },
          warning: {
            value: { _light: `{colors.gray.200}` },
          },
          error: {
            value: { _light: `{colors.gray.200}` },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
