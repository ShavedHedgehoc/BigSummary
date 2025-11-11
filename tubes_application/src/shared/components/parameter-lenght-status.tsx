import { Status } from "@chakra-ui/react";

export default function ParameterLenghtStatus(len: number | undefined) {
  return (
    <Status.Root colorPalette={len ? "green" : "red"}>
      <Status.Indicator />
    </Status.Root>
  );
}
