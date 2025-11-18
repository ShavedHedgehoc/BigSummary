import { AbsoluteCenter, Icon, Text, VStack } from "@chakra-ui/react";
import { IoWarningOutline } from "react-icons/io5";

export default function Info({ message }: { message: string }) {
  return (
    <AbsoluteCenter h="full" w="full">
      <VStack>
        <Icon size="2xl" color="tomato">
          <IoWarningOutline />
        </Icon>
        <Text>{message}</Text>
      </VStack>
    </AbsoluteCenter>
  );
}
