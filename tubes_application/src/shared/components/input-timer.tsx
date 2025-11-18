import { formatTimeToString } from "@/shared/helpers/date-time-formatters";
import { useDate } from "@/shared/helpers/use-date";
import { VStack, Heading } from "@chakra-ui/react";

export default function InputTimer({
  date,
  isParameters,
  checkInterval,
}: {
  date: Date | undefined;
  isParameters: boolean;
  checkInterval: number;
}) {
  const { today } = useDate();
  const locale = "ru";
  const notFoundString = isParameters ? "Данных о внесении параметров не найдено" : "Данных о проверке не найдено";
  const firstString = isParameters ? "Время внесения параметров: " : "Время последней проверки:";
  const secondString = isParameters ? "Следующее внесение через: " : "Следующая проверка через: ";
  const thirdString = isParameters ? "ВНЕСИТЕ ПАРАМЕТРЫ!" : "ВНЕСИТЕ ДАННЫЕ!";
  if (!date)
    return (
      <VStack>
        <Heading size="md">{notFoundString}</Heading>
      </VStack>
    );
  return (
    <VStack
      justify="space-betweens"
      animation={
        new Date(date).getTime() + checkInterval * 60 * 1000 > new Date(today).getTime() ? "none" : "colorCycle"
      }
    >
      <Heading size="md">{`${firstString} ${formatTimeToString(date)}`}</Heading>
      <Heading size="md">
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
