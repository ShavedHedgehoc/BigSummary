import {
  AbsoluteCenter,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  DataList,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  IconButton,
  Popover,
  Portal,
  ScrollArea,
  Separator,
  Stack,
  Stat,
  Status,
  Table,
  Text,
  Theme,
  VStack,
} from "@chakra-ui/react";

// ... then use Bar or other chart components
import { loremIpsum } from "lorem-ipsum";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TbInfoCircle, TbSearch } from "react-icons/tb";
import { useState } from "react";

export default function Test() {
  const [open, setOpen] = useState(false);
  const formatTimeOnly = (tickItem: Date) => {
    const date = new Date(tickItem);
    // Use toLocaleTimeString() with explicit options for 24-hour format
    return date.toLocaleTimeString("en-GB", {
      // 'en-GB' locale often defaults to 24hr format
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23", // Explicitly force 24-hour cycle
    });
  };
  const chart = useChart({
    data: [
      { name: "Рондоль 45 галтованная", value: 1, color: "green.solid", label: "rrrr" },
      { name: "Стеарат цинка", value: 1, color: "red.solid" },
      { name: "Рондоль 45 галтованная", value: 1, color: "green.solid", label: "rrrr" },
      { name: "Стеарат цинка", value: 1, color: "red.solid" },
      { name: "Рондоль 45 галтованная", value: 1, color: "green.solid", label: "rrrr" },
      { name: "Стеарат цинка", value: 1, color: "red.solid" },
    ],
  });
  const lineChart = useChart({
    data: [
      { val: 1000, time: 1672531200000 },
      { val: 1300, time: 1672534800000 },
      { val: 5000, time: 1672537800000 },
      { val: 7000, time: "2024-01-01T10:00:00" },
      //   { val: 12000, time: new Date(new Date().setHours(14)) },
      //   { val: 15000, time: new Date(new Date().setHours(15)) },
    ],
    series: [{ name: "val", color: "teal.solid" }],
  });
  return (
    <Theme appearance="dark" colorPalette="teal">
      <Grid h="100vh" w="100wv" templateRows="repeat(28, 1fr)" templateColumns="repeat(24, 1fr)" gap={2}>
        {/* Date-time */}
        <GridItem rowSpan={1} colSpan={24}>
          <HStack justify="end" h="full" pr={2}>
            <Text color="fg.subtle" fontStyle="lg">
              12/08/2025 18:00:01
            </Text>
          </HStack>
        </GridItem>
        {/* Header */}
        <GridItem rowSpan={2} colSpan={24}>
          <Center h="full">
            <Heading size="2xl" color="fg.subtle">{`Конвейер 201. Экструзия и токарный автомат (Пост 1)`}</Heading>
          </Center>
        </GridItem>
        {/* align */}
        <GridItem rowSpan={1} colSpan={24}></GridItem>
        {/* Parameter */}
        <GridItem rowSpan={12} colSpan={24}>
          <VStack gap={2} h="full" w="full">
            <HStack gap={2} h="full" w="full">
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
            </HStack>
            <HStack gap={2} h="full" w="full">
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
            </HStack>
            <HStack gap={2} h="full" w="full">
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
              <Stat.Root w="full" h="full" px={12} py={8} backgroundColor="bg.panel" size="lg" rounded="lg">
                <Stat.Label colorPalette="teal" fontSize="lg" justifyContent="center">
                  Скорость пресса
                </Stat.Label>
                <Stat.ValueText fontSize="4xl" justifyContent="center" alignItems="flex-end" pt={4}>
                  78
                  <VStack alignItems="flex-end">
                    <Status.Root colorPalette="red" alignItems="end">
                      <Status.Indicator />
                    </Status.Root>
                    <Stat.ValueUnit>шт/мин</Stat.ValueUnit>
                  </VStack>
                </Stat.ValueText>
                <HStack justifyContent="center" pt={2} gap={6}>
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                  <Separator orientation="vertical" height="8" size="sm" colorPalette="white" />
                  <VStack gap={0}>
                    <Text color="fg.a" textStyle="sm">
                      123
                    </Text>
                    <Text color="fg.subtle" textStyle="xs">
                      Минимум
                    </Text>
                  </VStack>
                </HStack>
              </Stat.Root>
            </HStack>
          </VStack>
        </GridItem>

        {/* Material Chart */}
        <GridItem rowSpan={8} colSpan={8}>
          {/* <HStack px={2} pb={0}>
            <Text flexShrink="0" fontSize="lg">
              Комплектующие
            </Text>
            <Separator flex="1" />
          </HStack> */}
          <Box
            backgroundColor="bg.panel"
            w="full"
            h="full"
            // m={2}
            rounded="lg"
            p={8}
            alignItems="center"
            justifyContent="center"
          >
            <VStack h="full" justify="center">
              <Chart.Root boxSize="200px" chart={chart}>
                <PieChart>
                  {/* <Tooltip cursor={false} animationDuration={100} content={<Chart.Tooltip hideLabel />} /> */}

                  <Pie
                    innerRadius={80}
                    outerRadius={100}
                    isAnimationActive={false}
                    paddingAngle={8}
                    data={chart.data}
                    dataKey={chart.key("value")}
                    nameKey="name"
                    labelLine={false}
                    //   labelLine={{ strokeWidth: 1 }}
                    //   label={{
                    //     fill: chart.color("fg.muted"),
                    //   }}
                    label={({ name }) => `${name}`}
                  >
                    <Label
                      content={({ viewBox }) => (
                        <Chart.RadialText viewBox={viewBox} title={"OK"} description="Комплектующие" />
                      )}
                    />

                    {chart.data.map((item) => (
                      <Cell key={item.name} strokeWidth={0} fill={chart.color(item.color)}></Cell>
                    ))}
                    {/* <LabelList dataKey="name" position="outside" /> */}
                  </Pie>
                </PieChart>
              </Chart.Root>
            </VStack>
          </Box>
        </GridItem>
        {/* Production Chart */}
        <GridItem rowSpan={8} colSpan={8}>
          {/* <HStack px={2} pb={0}>
            <Text flexShrink="0" fontSize="lg">
              Выработка поста
            </Text>
            <Separator flex="1" />
          </HStack> */}
          <Box
            backgroundColor="bg.panel"
            w="full"
            h="full"
            // m={2}
            rounded="lg"
            p={8}
            alignItems="center"
            justifyContent="center"
          >
            <VStack h="full" w="full" justify="center">
              <Chart.Root boxSize="full" chart={lineChart}>
                <AreaChart data={lineChart.data} margin={{ top: 5, right: 0, left: -15, bottom: 5 }}>
                  {/* <CartesianGrid stroke={chart.color("border")} vertical={false} strokeDasharray="3 3" /> */}
                  <CartesianGrid stroke={lineChart.color("border")} vertical={true} />

                  <XAxis
                    axisLine={true}
                    dataKey={lineChart.key("time")}
                    tickFormatter={formatTimeOnly}
                    stroke={lineChart.color("border")}
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip cursor={false} animationDuration={100} content={<Chart.Tooltip />} />

                  {lineChart.series.map((item) => (
                    <defs key={item.name}>
                      <Chart.Gradient
                        id={`${item.name}-gradient`}
                        stops={[
                          { offset: "0%", color: item.color, opacity: 0.3 },
                          { offset: "100%", color: item.color, opacity: 0.05 },
                        ]}
                      />
                    </defs>
                  ))}

                  {lineChart.series.map((item) => (
                    <Area
                      key={item.name}
                      type="natural"
                      isAnimationActive={false}
                      dataKey={lineChart.key(item.name)}
                      fill={`url(#${item.name}-gradient)`}
                      stroke={chart.color(item.color)}
                      strokeWidth={2}
                      stackId="a"
                    />
                  ))}
                </AreaChart>
                {/* <LineChart data={lineChart.data}>
                  <CartesianGrid stroke={lineChart.color("border")} vertical={true} />
                  <XAxis
                    axisLine={true}
                    dataKey={lineChart.key("time")}
                    tickFormatter={formatTimeOnly}
                    stroke={lineChart.color("border")}
                  />
                  <YAxis axisLine={false} tickLine={false} tickMargin={10} stroke={lineChart.color("border")} />
                
                  {lineChart.series.map((item) => (
                    <Line
                      key={item.name}
                      isAnimationActive={false}
                      dataKey={lineChart.key(item.name)}
                      stroke={lineChart.color(item.color)}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </LineChart> */}
              </Chart.Root>
            </VStack>
          </Box>
        </GridItem>
        {/* Production Chart */}
        <GridItem rowSpan={8} colSpan={8}>
          <Box
            backgroundColor="bg.panel"
            w="full"
            h="full"
            // m={2}
            rounded="lg"
            p={8}
            alignItems="center"
            justifyContent="center"
          >
            <Stack justify="space-between" h="full" w="full">
              <Stack gap="4">
                <DataList.Root size="lg">
                  <DataList.Item>
                    <DataList.ItemLabel>Продукт</DataList.ItemLabel>
                    <DataList.ItemValue>067895 Туба Альфа металлическая 30х146 мм</DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
                <HStack>
                  <DataList.Root size="lg">
                    <DataList.Item>
                      <DataList.ItemLabel>Партия</DataList.ItemLabel>
                      <DataList.ItemValue>123А5</DataList.ItemValue>
                    </DataList.Item>
                  </DataList.Root>
                  <DataList.Root size="lg">
                    <DataList.Item>
                      <DataList.ItemLabel>План</DataList.ItemLabel>
                      <DataList.ItemValue>40 000</DataList.ItemValue>
                    </DataList.Item>
                  </DataList.Root>
                </HStack>
                <DataList.Root size="lg">
                  <DataList.Item>
                    <DataList.ItemLabel>Примечание:</DataList.ItemLabel>
                    <DataList.ItemValue>
                      длфаофд оа длыовалыо ыоалдыодлаоыо ылваоыдлодаыдо олаовыддлаы оалыоладыо оыдлвоаылов аолыоваыо
                    </DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
              </Stack>
              <HStack justify="end" alignItems="end">
                <Text color="fg.subtle" textStyle="xl">
                  Выработка поста:
                </Text>
                <Text color="fg.a" textStyle="4xl">
                  13 000
                </Text>
              </HStack>
            </Stack>

            {/* <VStack h="full" w="full" justify="center">
              <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Popover.Trigger asChild>
                  <IconButton size="2xl" variant="ghost" colorPalette="yellow">
                    <TbInfoCircle />
                  </IconButton>
                </Popover.Trigger>
                <Portal>
                  <Popover.Positioner>
                    <Popover.Content>
                      <Popover.Arrow />
                      <Popover.Body>This is a popover with the same width as the trigger button</Popover.Body>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>
            </VStack> */}
          </Box>
        </GridItem>
        {/* align */}
        <GridItem rowSpan={1} colSpan={24}></GridItem>
        {/* menu */}
        <GridItem rowSpan={2} colSpan={24}>
          <Box w="full" h="full" rounded="lg" alignItems="center" justifyContent="center">
            <HStack h="full" justify="center" gap={2}>
              <Button variant="subtle" px={12} py={12} backgroundColor="bg">
                <VStack>
                  <Icon size="2xl" color="fg">
                    <TbSearch />
                  </Icon>
                  <Text textStyle="md" color="fg.subtle">
                    Просмотр
                  </Text>
                </VStack>
              </Button>
              <Button variant="subtle" px={12} py={12} backgroundColor="bg">
                <VStack>
                  <Icon size="2xl" color="fg">
                    <TbSearch />
                  </Icon>
                  <Text textStyle="md" color="fg.subtle">
                    Просмотр
                  </Text>
                </VStack>
              </Button>
              <Button variant="subtle" px={12} py={12} backgroundColor="bg">
                <VStack>
                  <Icon size="2xl" color="fg">
                    <TbSearch />
                  </Icon>
                  <Text textStyle="md" color="fg.subtle">
                    Просмотр
                  </Text>
                </VStack>
              </Button>
            </HStack>
          </Box>
        </GridItem>
        {/* user */}
        <GridItem rowSpan={1} colSpan={24}>
          <HStack justify="end" h="full" pr={2}>
            <Text color="fg.subtle" fontStyle="lg">
              Скрипковский М.Ю
            </Text>
          </HStack>
        </GridItem>
      </Grid>
    </Theme>
  );
}
