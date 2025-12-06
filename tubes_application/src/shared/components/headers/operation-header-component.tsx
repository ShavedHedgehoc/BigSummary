import type { IOperation } from "@/shared/api/services/operation-service";
import { Center, Heading } from "@chakra-ui/react";

export default function OperationHeaderComponent({ operation }: { operation: IOperation | null }) {
  return (
    <Center h="full">
      <Heading size="2xl" color="fg.subtle">
        {operation?.description}
      </Heading>
    </Center>
  );
}
