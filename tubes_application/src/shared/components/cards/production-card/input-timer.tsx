import { formatTimeToString } from "@/shared/helpers/date-time-formatters";
import { useDate } from "@/shared/helpers/use-date";
import { VStack, Heading } from "@chakra-ui/react";

export default function InputTimer({
  date,
  idleTime,
  checkInterval,
}: {
  date: Date | undefined;
  idleTime: number;
  checkInterval: number;
}) {
  const { today } = useDate();
  const locale = "ru";
  const notFoundString = "Данных о внесении параметров не найдено";
  const firstString = "Время внесения параметров: ";
  const secondString = "Следующее внесение через: ";
  const thirdString = "ВНЕСИТЕ ПАРАМЕТРЫ!";
  const fourthString = "Время простоя с последнего внесения: ";
  const offset = 3;

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
      // animation={
      //   new Date(date).getTime() + checkInterval * 60 * 1000 + idleTime > new Date(today).getTime()
      //     ? "none"
      //     : "colorCycle"
      // }
    >
      <Heading size="sm" w="full">{`${firstString} ${formatTimeToString(date)}`}</Heading>
      <Heading size="sm" w="full">
        {`${fourthString} 
                ${new Date(idleTime - offset * 3600 * 1000).toLocaleTimeString(locale, {
                  hour: "numeric",
                  hour12: false,
                  minute: "numeric",
                  second: "numeric",
                })}`}
      </Heading>
      <Heading
        size="sm"
        w="full"
        animation={
          new Date(date).getTime() + checkInterval * 60 * 1000 + idleTime > new Date(today).getTime()
            ? "none"
            : "colorCycle"
        }
      >
        {new Date(date).getTime() + checkInterval * 60 * 1000 + idleTime > new Date(today).getTime()
          ? `${secondString} 
                ${new Date(
                  new Date(date).getTime() +
                    checkInterval * 60 * 1000 -
                    new Date(today).getTime() -
                    offset * 3600 * 1000 +
                    idleTime
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
