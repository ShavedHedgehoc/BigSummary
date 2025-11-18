import { Center, Heading } from "@chakra-ui/react";

export default function HeaderComponent({ conveyorName, postName }: { conveyorName: string; postName: string }) {
  return (
    <Center h="full">
      <Heading size="2xl" color="fg.subtle">{`Конвейер ${conveyorName}. ${postName}`}</Heading>
    </Center>
  );
}
