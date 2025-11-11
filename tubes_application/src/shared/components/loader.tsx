import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Box h="100vh" w="100wv">
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    </Box>
  );
}
