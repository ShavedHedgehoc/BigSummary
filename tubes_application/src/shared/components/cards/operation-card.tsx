import type { IOperation } from "@/shared/api/services/summary-service";
import { Box, Stack, HStack, Text } from "@chakra-ui/react";

interface OperationCardProps {
  operation: IOperation;
  disabled: boolean;
  selected: boolean;
  onClick: (operation: IOperation) => void;
}

export default function OperationCard(props: OperationCardProps) {
  return (
    <Box
      backgroundColor={props.disabled ? "red.muted" : props.selected ? "green.muted" : "bg.panel"}
      w="full"
      minH="120px"
      rounded="lg"
      py={4}
      px={6}
      alignItems="center"
      justifyContent="center"
      onClick={() => (props.disabled ? undefined : props.onClick(props.operation))}
    >
      <Stack h="full" justify="space-between">
        <Text textStyle="md" color={props.disabled ? "fg.subtle" : "fg.a"} w="full">
          {props.operation.description}
        </Text>
        <HStack justify="center">
          {props.disabled && (
            <Text textStyle="sm" color="fg.a" alignItems="flex-end">
              {props.disabled ? "Вашей квалификации недостаточно!" : " "}
            </Text>
          )}
        </HStack>
        <HStack justify="space-between">
          <Text textStyle="lg" color={props.disabled ? "fg.subtle" : "fg.muted"} alignItems="flex-end">
            {`Разряд: ${props.operation.min_rank}`}
          </Text>

          <Text textStyle="lg" color={props.disabled ? "fg.subtle" : "fg.muted"} alignItems="flex-end">
            {`Код: ${props.operation.value}`}
          </Text>
        </HStack>
      </Stack>
    </Box>
  );
}
