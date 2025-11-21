import { formatTimeToString } from "@/shared/helpers/date-time-formatters";
import { useDate } from "@/shared/helpers/use-date";
import { VStack, Heading } from "@chakra-ui/react";

export default function InputTimer({ date, checkInterval }: { date: Date | undefined; checkInterval: number }) {
  const { today } = useDate();
  const locale = "ru";
  const notFoundString = "Данных о внесении параметров не найдено";
  const firstString = "Время внесения параметров: ";
  const secondString = "Следующее внесение через: ";
  const thirdString = "ВНЕСИТЕ ПАРАМЕТРЫ!";
  if (!date)
    return (
      <VStack>
        <Heading size="md" color="fg.subtle">
          {notFoundString}
        </Heading>
      </VStack>
    );
  return (
    <VStack
      justify="space-betweens"
      animation={
        new Date(date).getTime() + checkInterval * 60 * 1000 > new Date(today).getTime() ? "none" : "colorCycle"
      }
    >
      <Heading size="md" w="full">{`${firstString} ${formatTimeToString(date)}`}</Heading>
      <Heading size="md" w="full">
        {new Date(date).getTime() + checkInterval * 60 * 1000 > new Date(today).getTime()
          ? `${secondString} 
                ${new Date(
                  new Date(date).getTime() + checkInterval * 60 * 1000 - new Date(today).getTime() - 3 * 3600 * 1000
                ).toLocaleTimeString(locale, {
                  hour: "numeric",
                  hour12: false,
                  minute: "numeric",
                  second: "numeric",
                })}`
          : thirdString}
      </Heading>
    </VStack>
  );
}
