import { Status, type ConditionalValue, type ColorPalette } from "@chakra-ui/react";

export default function ParameterColorStatus({ palette }: { palette: ConditionalValue<ColorPalette> }) {
  return (
    <Status.Root colorPalette={palette}>
      <Status.Indicator />
    </Status.Root>
  );
}
