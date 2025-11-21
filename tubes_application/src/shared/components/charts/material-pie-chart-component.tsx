import { Box, Text, VStack } from "@chakra-ui/react";
import { Chart, useChart } from "@chakra-ui/charts";
import { Cell, Label, Pie, PieChart } from "recharts";
import type { ISummary } from "@/shared/api/services/summary-service";
import { getMaterialsData } from "@/shared/helpers/summary-data-parsers";

export default function MaterialPieChartComponent({
  summaryData,
  postId,
}: {
  summaryData: ISummary | null;
  postId: number;
}) {
  const data = getMaterialsData(postId, summaryData);

  const chartData: { name: string; value: number; color: string; label?: string }[] = data.map((item) => ({
    name: item.code + item.name,
    value: 1,
    color: item.scanned ? "green.solid" : "red.solid",
  }));

  const chart = useChart({ data: chartData });

  const isAllScanned = data.length && !data.map((item) => item.scanned).includes(false);

  return (
    <Box backgroundColor="bg.panel" w="full" h="full" rounded="lg" p={8} alignItems="center" justifyContent="center">
      <VStack h="full" justify="center">
        {chartData.length ? (
          <Chart.Root boxSize="200px" chart={chart}>
            <PieChart>
              <Pie
                innerRadius={80}
                outerRadius={100}
                isAnimationActive={false}
                paddingAngle={8}
                data={chart.data}
                dataKey={chart.key("value")}
                nameKey="name"
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(midAngle ? -midAngle * RADIAN : 0);
                  const y = cy + radius * Math.sin(midAngle ? -midAngle * RADIAN : 0);

                  return (
                    <>
                      <text
                        x={x}
                        y={y - 10}
                        fill="#a1a1aa"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {`${chart.data[index].name.slice(0, 6)}`}
                      </text>
                      <text
                        x={x}
                        y={y + 10}
                        fill="#a1a1aa"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {`${chart.data[index].name.slice(6, 51)}`}
                      </text>
                      <text
                        x={x}
                        y={y + 30}
                        fill="#a1a1aa"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {`${chart.data[index].name.slice(51)}`}
                      </text>
                    </>
                  );
                }}
              >
                <Label
                  content={({ viewBox }) => (
                    <Chart.RadialText
                      viewBox={viewBox}
                      title={isAllScanned ? "OK" : "!"}
                      description={isAllScanned ? "Комплектующие" : "Отсканируйте"}
                    />
                  )}
                />

                {chart.data.map((item) => (
                  <Cell key={item.name} strokeWidth={0} fill={chart.color(item.color)}></Cell>
                ))}
              </Pie>
            </PieChart>
          </Chart.Root>
        ) : (
          <Text color="fg.subtle" textStyle="md">
            Спецификация не найдена
          </Text>
        )}
      </VStack>
    </Box>
  );
}
