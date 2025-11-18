import { AbsoluteCenter, Box, Icon, Text, VStack } from "@chakra-ui/react";
import { IoWarningOutline } from "react-icons/io5";

export default function NotFound({ message }: { message: string }) {
  return (
    <Box h="100%" w="100wv">
      <AbsoluteCenter>
        <VStack>
          <Icon size="2xl" color="tomato">
            <IoWarningOutline />
          </Icon>
          <Text>{message}</Text>
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
}
