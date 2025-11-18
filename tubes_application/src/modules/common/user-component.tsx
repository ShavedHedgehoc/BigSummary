import type { IEmployee } from "@/shared/api/services/employee-service";
import { HStack, Text } from "@chakra-ui/react";

export default function UserComponent({ employee }: { employee: IEmployee | null }) {
  return (
    <HStack justify="end" h="full" pr={2}>
      <Text color="fg.subtle" fontStyle="lg" animation={employee ? "none" : "colorCycle"}>
        {employee ? employee.name : "Не авторизован"}
      </Text>
    </HStack>
  );
}
