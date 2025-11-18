import { useActiveSummaryCounters } from "@/shared/api/use-active-summary-counters";
import { formatTimeOnly } from "@/shared/helpers/date-time-formatters";
import { Chart, useChart } from "@chakra-ui/charts";
import { Box, Spinner, VStack, Text } from "@chakra-ui/react";
import { AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";

export default function ProductionLineChart({ summaryId, postId }: { summaryId: number | undefined; postId: number }) {
  const { data, isLoading } = useActiveSummaryCounters(summaryId ?? null);

  const chartData: { val: number; time: Date }[] = data
    ? postId === 1
      ? data.extrusion_params.map((item) => ({
          val: item.counter_value,
          time: item.createdAt,
        }))
      : postId === 2
      ? []
      : postId === 3
      ? []
      : postId === 4
      ? []
      : []
    : [];

  const lineChart = useChart({ data: chartData, series: [{ name: "val", color: "teal.solid" }] });
  return (
    <Box backgroundColor="bg.panel" w="full" h="full" rounded="lg" p={8} alignItems="center" justifyContent="center">
      <VStack h="full" w="full" justify="center">
        {chartData.length ? (
          <Chart.Root boxSize="full" chart={lineChart} animation={"none"}>
            <AreaChart data={lineChart.data} margin={{ top: 5, right: 0, left: -15, bottom: 5 }}>
              <CartesianGrid stroke={lineChart.color("border")} vertical={true} />
              <XAxis
                axisLine={false}
                dataKey={lineChart.key("time")}
                tickFormatter={formatTimeOnly}
                stroke={lineChart.color("border")}
              />
              <YAxis tickLine={false} axisLine={false} />
              {/* <Tooltip cursor={false} animationDuration={100} content={<Chart.Tooltip />} /> */}

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
                  stroke={lineChart.color(item.color)}
                  strokeWidth={2}
                  stackId="a"
                />
              ))}
            </AreaChart>
          </Chart.Root>
        ) : isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Text color="fg.subtle" textStyle="md">
            Записи не найдены
          </Text>
        )}
      </VStack>
    </Box>
  );
}
