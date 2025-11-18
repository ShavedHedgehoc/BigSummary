import { Box, HStack } from "@chakra-ui/react";

export default function Menu({ children }: { children: React.ReactNode }) {
  return (
    <Box w="full" h="full" rounded="lg" alignItems="center" justifyContent="center">
      <HStack h="full" justify="center" gap={2}>
        {children}
      </HStack>
    </Box>
  );
}
