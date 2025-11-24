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
  expectedValue?: string | null;
  stringDefaultValue?: string | null;
  variant: ParameterCardVariants;
}
export default function ParameterCard(props: ParameterCardProps) {
  return (
    // <Stat.Root w="full" h="full" px={6} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
    <Stat.Root w="full" h="full" px={4} py={4} backgroundColor="bg.panel" size="md" rounded="lg">
      <Stat.Label colorPalette="teal" fontSize="sm" justifyContent="center" textAlign="center">
        {props.title}
      </Stat.Label>
      <Stat.ValueText
        fontSize={props.variant === "boolean" ? "md" : "2xl"}
        justifyContent="center"
        alignItems="flex-end"
        pt={2}
      >
        {props.variant === "numeric" && !props.minValue && !props.maxValue && (
          <Text textStyle="md" color="fg.subtle">
            Внесение не требуется
          </Text>
        )}
        {props.variant === "numeric" &&
          typeof props.minValue === "number" &&
          typeof props.maxValue === "number" &&
          (props.value ?? "-")}
        {/* {props.variant === "numeric" && (props.minValue || props.maxValue) && (props.value ?? "-")} */}
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
                ? props.value && typeof props.maxValue === "number" && typeof props.minValue === "number"
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
            {!(props.variant === "numeric" && !props.maxValue && !props.minValue) && <Status.Indicator />}
          </Status.Root>
          <Stat.ValueUnit pl={2}>
            {/* {props.variant === "numeric" && props.minValue && props.maxValue && (props.unit ?? "-")} */}
            {props.variant === "numeric" && (props.minValue || props.maxValue) && (props.unit ?? "-")}
          </Stat.ValueUnit>
        </VStack>
      </Stat.ValueText>
      {/* Тут какой-то баг при minValue=0 */}

      {/* {props.variant === "numeric" && (props.minValue || props.maxValue) && ( */}
      {props.variant === "numeric" && typeof props.minValue === "number" && typeof props.maxValue === "number" && (
        <HStack justifyContent="center" pt={1} gap={6}>
          <VStack gap={0}>
            <Text color="fg.a" textStyle="sm">
              {props.minValue ?? "-"}
            </Text>
            <Text color="fg.subtle" textStyle="xs">
              Минимум
            </Text>
          </VStack>
          <Separator orientation="vertical" height="6" size="sm" colorPalette="white" />
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
