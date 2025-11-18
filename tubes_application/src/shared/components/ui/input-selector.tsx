import { Box, Heading, Select, Stack, Text, createListCollection } from "@chakra-ui/react";
import type { ValueChangeDetails } from "@zag-js/select";

export interface InputSelectorProps {
  id: string;
  selectedOption: string[] | undefined;
  title: string;
  placeholder: string;
  defaultValue?: string;
  defaultId?: number;
  options: { label: string; value: string }[];
  setSelectedOption: (value: string[] | undefined) => void;
  changeData: ({ key, value, values }: { key: string; value: string; values: string[] | [] }) => void;
}

export default function InputSelector(props: InputSelectorProps) {
  const collection = createListCollection({ items: [...props.options] });

  const handleChange = (e: ValueChangeDetails<{ label: string; value: string }>) => {
    props.setSelectedOption(e.value);
    props.changeData({ key: props.id, value: "", values: e.value });
  };

  return (
    <Box alignSelf="flex-start">
      <Stack justify="space-between" gap={4}>
        <Heading size="xl" pl={0}>
          {props.title}
        </Heading>
        <Box
          borderWidth="2px"
          borderRadius="md"
          height="60px"
          width="350px"
          backgroundColor={
            props.selectedOption === undefined
              ? "bg.warning"
              : props.defaultId && Number(props.selectedOption[0]) !== props.defaultId
              ? "bg.error"
              : "bg.success"
          }
          borderColor={
            props.selectedOption === undefined
              ? "border.warning"
              : props.defaultId && Number(props.selectedOption[0]) !== props.defaultId
              ? "border.error"
              : "border.success"
          }
          color="fg.disabled"
        >
          <Select.Root
            size="lg"
            collection={collection}
            width="full"
            value={props.selectedOption}
            onValueChange={(e) => handleChange(e)}
          >
            <Select.HiddenSelect />
            <Select.Control height="56px" width="full">
              <Select.Trigger fontSize="xl" height="full" borderWidth="0px">
                <Select.ValueText height="full" width="full" alignContent="center" placeholder={props.placeholder} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator
                  color={
                    props.selectedOption === undefined
                      ? "border.warning"
                      : props.defaultId && Number(props.selectedOption[0]) !== props.defaultId
                      ? "border.error"
                      : "border.success"
                  }
                />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content color="a" fontSize="xl" paddingY={0}>
                {collection.items.map((item) => (
                  <Select.Item item={item} key={item.value} px={2} py={4}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>

          {props.defaultValue && (
            <Stack gap={1} paddingTop={4}>
              <Text pl={2}>Регламентное значение</Text>
              <Text pl={2}>{props.defaultValue}</Text>
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
