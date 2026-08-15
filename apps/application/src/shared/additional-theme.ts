import { extendTheme } from "@mui/joy";

declare module "@mui/joy/styles" {
  interface Palette {
    darkPalette: {
      success: string;
      danger: string;
      body: string;
      buttonText: string;
      tableButtonSuccess: string;
      tableButtonHoverSuccess: string;
      tableButtonDanger: string;
      tableButtonHoverDanger: string;
      tableButtonWarning: string;
      tableButtonHoverWarning: string;
      tableButtonPrimary: string;
      tableButtonHoverPrimary: string;
    };
  }
}

export const additionalTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        darkPalette: {
          success: "#bbf7d0",
          tableButtonSuccess: "#86efac", //green-300
          // tableButtonSuccess: "#bef264", //lime-300
          tableButtonDanger: "#fca5a5",
          // tableButtonWarning: "#fde047", //yellow-300
          // tableButtonWarning: "#fdba74", //orange-300
          tableButtonPrimary: "#7dd3fc", //sky-300
          tableButtonWarning: "#fcd34d", //amber-300
          tableButtonHoverWarning: "#451a03", //amber-950
          tableButtonHoverSuccess: "#052e16", //green-950
          tableButtonHoverDanger: "#450a0a", //red-950
          tableButtonHoverPrimary: "#082f49", //sky-950
          danger: "#fecaca",
          buttonText: "#1e293b",
          body: "#000",
        },
      },
    },
    light: {
      palette: {
        darkPalette: {
          success: "#16a34a",
          tableButtonSuccess: "#16a34a", //green-600
          tableButtonDanger: "#dc2626", //red-600
          // tableButtonWarning: "#ca8a04", //yellow-600
          // tableButtonWarning: "#ea580c", //orange-600
          tableButtonWarning: "#d97706", //amber-600

          tableButtonPrimary: "#0284c7", //sky-600
          tableButtonHoverWarning: "#fef3c7", //amber-100
          tableButtonHoverSuccess: "#dcfce7", //green-100
          tableButtonHoverDanger: "#fee2e2", //red-100
          tableButtonHoverPrimary: "#e0f2fe", //sky-100
          danger: "#dc2626",
          body: "#FFF",
        },
      },
    },
  },
});
