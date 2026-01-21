import type { ISummary } from "@/shared/api/services/summary-service";
import { formatTimeOnly } from "@/shared/helpers/date-time-formatters";
import { getStatusCountersData } from "@/shared/helpers/summary-data-parsers";
import { Chart, useChart } from "@chakra-ui/charts";
import { Box, VStack, Text } from "@chakra-ui/react";
import { CartesianGrid, XAxis, YAxis, LineChart, Line, Legend } from "recharts";

export default function ProductionLineChart({ summaryData, postId }: { summaryData: ISummary | null; postId: number }) {
  const data = getStatusCountersData(postId, summaryData);
  const maxCounterValue = data.length > 0 ? data[data.length - 1].counter_value : 0;
  const minCounterValue = data.length > 0 ? data[0].counter_value : 0;
  const chartData: { val: number; idle: number; time: Date }[] = data.map((item) => ({
    val: item.counter_value,
    idle: item.idle ? maxCounterValue : minCounterValue,
    time: item.createdAt,
  }));

  const lineChart = useChart({
    data: chartData,
    series: [
      { name: "val", color: "teal.solid", label: "Выработка" },
      { name: "idle", color: "orange.solid", label: "Простой" },
    ],
  });

  if (!summaryData?.extrusionTresholds && postId === 1) return;
  if (summaryData && !summaryData.varnishTresholds && postId === 2) return;
  if (!summaryData?.offsetTresholds && postId === 3) return;
  if (!summaryData?.sealantTresholds && postId === 4) return;

  return (
    <Box backgroundColor="bg.panel" w="full" h="full" rounded="lg" p={4} alignItems="center" justifyContent="center">
      <VStack h="full" w="full" justify="center">
        {chartData.length ? (
          <Chart.Root boxSize="full" chart={lineChart} animation={"none"}>
            <LineChart data={lineChart.data} margin={{ top: 25, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={lineChart.color("border")} vertical={true} />
              <XAxis
                axisLine={false}
                dataKey={lineChart.key("time")}
                tickFormatter={formatTimeOnly}
                stroke={lineChart.color("border")}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                yAxisId="left"
                dataKey={lineChart.key("val")}
                stroke={lineChart.color("border")}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                yAxisId="right"
                orientation="right"
                dataKey={lineChart.key("val")}
                stroke={lineChart.color("border")}
              />

              <Legend content={<Chart.Legend />} />

              {lineChart.series.map((item) => (
                <Line
                  dot={false}
                  activeDot={false}
                  type={item.name === "idle" ? "stepAfter" : "basis"}
                  key={item.name}
                  connectNulls={true}
                  // type="natural"
                  isAnimationActive={false}
                  dataKey={lineChart.key(item.name)}
                  // fill={`url(#${item.name}-gradient)`}
                  stroke={lineChart.color(item.color)}
                  strokeWidth={2}
                  // stackId="a"
                />
              ))}
            </LineChart>
          </Chart.Root>
        ) : (
          <Text color="fg.subtle" textStyle="md">
            Записи не найдены
          </Text>
        )}
      </VStack>
    </Box>
  );
}
