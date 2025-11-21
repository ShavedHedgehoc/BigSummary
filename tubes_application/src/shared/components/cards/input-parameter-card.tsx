import { Box, VStack, HStack, Separator, Text, Status } from "@chakra-ui/react";
type ParameterCardVariants = "numeric" | "boolean" | "string";
export interface AddParameterCardProps {
  id: string;
  title: string;
  value?: number | null;
  booleanValue?: boolean | null;
  stringValue?: string | null;
  unit?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  stringDefaultValue?: string | null;
  variant: ParameterCardVariants;
  onClick: ({ id, title }: { id: string; title: string }) => void;
}
export default function AddParameterCard(props: AddParameterCardProps) {
  return (
    <Box
      w="full"
      h="full"
      px={12}
      py={8}
      backgroundColor="bg.panel"
      rounded="lg"
      alignItems="center"
      justifyContent="center"
      onClick={() => props.onClick({ id: props.id, title: props.title })}
    >
      <VStack h="full" gap={2} justify="center">
        <Text color="fg.muted" textStyle="xl">
          {props.title}
        </Text>
        <Text color="fg.a" textStyle="3xl">
          {props.variant === "numeric" && (props.value ?? "-")}
          {props.variant === "boolean" && (props.booleanValue === null ? "-" : props.booleanValue ? "OK" : "nOK")}
          {props.variant === "string" && (props.stringValue ?? "-")}
        </Text>
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
        <Text>{props.variant === "numeric" && (props.unit ?? "-")}</Text>

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
        <Text color="fg.subtle" textStyle="sm">
          Нажмите для внесения
        </Text>
      </VStack>
    </Box>
  );
}
