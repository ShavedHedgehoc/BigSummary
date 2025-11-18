import { Box } from "@chakra-ui/react";
import ParameterCard, { type ParameterCardProps } from "./parameter-card";

export interface AddParameterCardProps extends ParameterCardProps {
  id: string;
  onClick: ({
    id,
    title,
    minValue,
    maxValue,
    unit,
  }: {
    id: string;
    title: string;
    minValue: number | null | undefined;
    maxValue: number | null | undefined;
    unit: string | null | undefined;
  }) => void;
}

export default function AddParameterCard(props: AddParameterCardProps) {
  return (
    <Box
      w="full"
      h="full"
      onClick={() =>
        props.onClick({
          id: props.id,
          title: props.title,
          minValue: props.minValue,
          maxValue: props.maxValue,
          unit: props.unit,
        })
      }
      id={props.id}
    >
      <ParameterCard {...props} />
    </Box>
  );
}
