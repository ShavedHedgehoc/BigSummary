import { ColorModeProvider } from "@/components/ui/color-mode";
import { AbsoluteCenter, Box, Spinner, Theme } from "@chakra-ui/react";

export default function FullScreenLoader() {
  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <Box h="100vh" w="100wv">
          <AbsoluteCenter>
            <Spinner size="xl" />
          </AbsoluteCenter>
        </Box>
      </Theme>
    </ColorModeProvider>
  );
}
