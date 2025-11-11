import { useDate } from "@/shared/helpers/use-date";
import { Card, Heading } from "@chakra-ui/react";
export default function ExtrusionTimeCard() {
  const { time } = useDate();
  return (
    <Card.Root h="100%" variant="elevated">
      <Card.Body display="flex" alignItems="center" justifyContent="center">
        <Heading size="2xl">{time}</Heading>
      </Card.Body>
    </Card.Root>
  );
}
