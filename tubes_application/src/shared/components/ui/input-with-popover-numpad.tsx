import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Icon,
  Popover,
  Text,
  type MenuOpenChangeDetails,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegKeyboard } from "react-icons/fa";

export interface InputWithPopoverNumpadProps {
  id: string;
  value: string;
  title: string;
  maxValue: number;
  minValue: number;
  isNotReglament?: boolean;
  unit: string;
  changeData: ({ key, value }: { key: string; value: string }) => void;
  clearData: ({ key }: { key: string }) => void;
  sliceData: ({ key }: { key: string }) => void;
  roundData: ({ key }: { key: string }) => void;
}

interface PopoverNumpadValueButtonProps {
  value: string;
  onClick: (val: string) => void;
}

function PopoverNumpadValueButtom({ props }: { props: PopoverNumpadValueButtonProps }) {
  return (
    <Button
      size="2xl"
      width="full"
      variant="outline"
      bg="brand"
      rounded="md"
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </Button>
  );
}

export default function InputWithPopoverNumpad({ props }: { props: InputWithPopoverNumpadProps }) {
  const [openPopover, setOpenPopover] = useState(false);
  const handleOpenchange = (e: MenuOpenChangeDetails) => {
    setOpenPopover(e.open);
    props.roundData({ key: props.id });
  };

  return (
    <Box>
      <Stack justify="space-between" gap={4}>
        <Heading size="xl" pl={0}>
          {props.title}
        </Heading>
        <Box
          px="4"
          py="2"
          borderWidth="2px"
          borderRadius="md"
          height="60px"
          width="350px"
          backgroundColor={
            props.value === "0"
              ? "bg.warning"
              : Number(props.value) < props.minValue || Number(props.value) > props.maxValue
              ? "bg.error"
              : "bg.success"
          }
          borderColor={
            props.value === "0"
              ? "border.warning"
              : Number(props.value) < props.minValue || Number(props.value) > props.maxValue
              ? "border.error"
              : "border.success"
          }
          color="fg.disabled"
        >
          <Center h="100%">
            <HStack justify="space-between" w="full">
              <Popover.Root
                open={openPopover}
                onOpenChange={(e) => handleOpenchange(e)}
                positioning={{ placement: "bottom-end", offset: { crossAxis: 20, mainAxis: 80 } }}
              >
                <Popover.Trigger onClick={(e) => e.currentTarget.blur()} w="full">
                  <HStack justify="space-between" w="full">
                    <Text height="full" textStyle="4xl" py="1" px="2">
                      {props.value}
                    </Text>
                    <Icon
                      size="2xl"
                      color={
                        props.value === "0"
                          ? "border.warning"
                          : Number(props.value) < props.minValue || Number(props.value) > props.maxValue
                          ? "border.error"
                          : "border.success"
                      }
                    >
                      <FaRegKeyboard />
                    </Icon>
                  </HStack>
                </Popover.Trigger>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Arrow />
                    <Popover.Body>
                      <Grid
                        maxH="100%"
                        w="100%"
                        templateRows="repeat(15, 1fr)"
                        templateColumns="repeat(12, 1fr)"
                        gap={2}
                      >
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "C", onClick: () => props.clearData({ key: props.id }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={8} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "<<", onClick: () => props.sliceData({ key: props.id }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "7", onClick: () => props.changeData({ key: props.id, value: "7" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "8", onClick: () => props.changeData({ key: props.id, value: "8" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "9", onClick: () => props.changeData({ key: props.id, value: "9" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "4", onClick: () => props.changeData({ key: props.id, value: "4" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "5", onClick: () => props.changeData({ key: props.id, value: "5" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "6", onClick: () => props.changeData({ key: props.id, value: "6" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "1", onClick: () => props.changeData({ key: props.id, value: "1" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "2", onClick: () => props.changeData({ key: props.id, value: "2" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "3", onClick: () => props.changeData({ key: props.id, value: "3" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: ".", onClick: () => props.changeData({ key: props.id, value: "." }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{ value: "0", onClick: () => props.changeData({ key: props.id, value: "0" }) }}
                          />
                        </GridItem>
                        <GridItem colSpan={4} rowSpan={3}>
                          <PopoverNumpadValueButtom
                            props={{
                              value: "Ok",
                              onClick: () => setOpenPopover(false),
                            }}
                          />
                        </GridItem>
                      </Grid>
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Popover.Root>
            </HStack>
          </Center>
        </Box>
        <Stack gap={1}>
          <Text pl={2}>{props.isNotReglament ? "Допустимые значения" : "Регламентные значения"}</Text>
          <Text pl={2}>{`${props.minValue} - ${props.maxValue} ${props.unit}`}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}
