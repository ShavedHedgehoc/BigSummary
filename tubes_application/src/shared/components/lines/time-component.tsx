import { useDate } from "@/shared/helpers/use-date";
import { HStack, Text } from "@chakra-ui/react";

export default function TimeComponent() {
  const { time, date } = useDate();
  return (
    <HStack justify="end" h="full" pr={2} gap={2}>
      <Text color="fg.subtle" fontStyle="lg">
        {date}
      </Text>
      <Text color="fg.subtle" fontStyle="lg">
        {time}
      </Text>
    </HStack>
  );
}
