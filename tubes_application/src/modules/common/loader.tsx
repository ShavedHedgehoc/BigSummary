import { AbsoluteCenter, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <AbsoluteCenter h="full" w="full">
      <Spinner size="xl" />
    </AbsoluteCenter>
  );
}
