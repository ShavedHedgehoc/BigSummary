import { Stat, VStack, Status, HStack, Separator, Text } from "@chakra-ui/react";
type ParameterCardVariants = "numeric" | "boolean" | "string";
export interface ParameterCardProps {
  title: string;
  value?: number | null;
  booleanValue?: boolean | null;
  stringValue?: string | null;
  unit?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  stringDefaultValue?: string | null;
  variant: ParameterCardVariants;
}
export default function ParameterCard(props: ParameterCardProps) {
  return (
    <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
      <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
        {props.title}
      </Stat.Label>
      <Stat.ValueText
        fontSize={props.variant === "boolean" ? "xl" : "4xl"}
        justifyContent="center"
        alignItems="flex-end"
        pt={4}
      >
        {props.variant === "numeric" && (props.value ?? "-")}
        {props.variant === "boolean" &&
          (props.booleanValue === null ? "-" : props.booleanValue ? "Соответствует" : "Не соответствует")}
        {props.variant === "string" && (props.stringValue ?? "-")}
        <VStack
          alignItems="flex-end"
          h="full"
          justifyContent={props.variant === "numeric" ? "space-between" : "flex-start"}
        >
          <Status.Root
            colorPalette={
              props.variant === "numeric"
                ? props.value && props.maxValue && props.minValue
                  ? props.value > props.maxValue || props.value < props.minValue
                    ? "red"
                    : "green"
                  : props.value
                  ? "gray"
                  : "yellow"
                : props.variant === "boolean"
                ? props.booleanValue === null
                  ? "yellow"
                  : props.booleanValue
                  ? "green"
                  : "red"
                : props.stringValue && props.stringDefaultValue
                ? props.stringValue !== props.stringDefaultValue
                  ? "red"
                  : "green"
                : props.stringValue
                ? "gray"
                : "yellow"
            }
            alignItems="end"
          >
            <Status.Indicator />
          </Status.Root>
          <Stat.ValueUnit>{props.variant === "numeric" && (props.unit ?? "-")}</Stat.ValueUnit>
        </VStack>
      </Stat.ValueText>
      {props.variant === "numeric" && (
        <HStack justifyContent="center" pt={2} gap={6}>
          <VStack gap={0}>
            <Text color="fg.a" textStyle="sm">
              {props.minValue ?? "-"}
            </Text>
            <Text color="fg.subtle" textStyle="xs">
              Минимум
            </Text>
          </VStack>
          <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
          <VStack gap={0}>
            <Text color="fg.a" textStyle="sm">
              {props.maxValue ?? "-"}
            </Text>
            <Text color="fg.subtle" textStyle="xs">
              Максимум
            </Text>
          </VStack>
        </HStack>
      )}
      {props.variant === "string" && (
        <HStack justifyContent="center" pt={2} gap={6}>
          <Text color="fg.a" textStyle="sm">
            {props.stringDefaultValue ?? "-"}
          </Text>
        </HStack>
      )}
      {props.variant === "boolean" && props.stringDefaultValue && (
        <HStack justifyContent="center" pt={2} gap={6}>
          <Text color="fg.a" textStyle="sm">
            {props.stringDefaultValue}
          </Text>
        </HStack>
      )}
    </Stat.Root>
  );
}
