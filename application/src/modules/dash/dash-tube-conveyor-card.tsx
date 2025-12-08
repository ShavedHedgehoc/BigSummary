import { Box, Sheet } from "@mui/joy";
import { IConveyor } from "../../shared/api/services/tube-conveyors-service";

export default function DashTubeConveyorCard({ conveyor }: { conveyor: IConveyor }) {
  return (
    <Sheet
      variant="outlined"
      sx={[
        {
          borderRadius: "sm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
          px: 2,
          py: 2,
        },

        () => ({
          bgcolor: "neutral.softBg",
        }),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
          justifyContent: "flex-start",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            fontSize: "1.125rem",
          }}
        >
          Конвейер {conveyor.name}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            fontSize: "1rem",
            color: "var(--joy-palette-text-secondary)",
          }}
        >
          {conveyor.summaries.length === 0 ? "Нет активной записи сводки" : "0002767 Туба Looks"}
        </Box>
        {conveyor.summaries.length !== 0 && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              fontSize: "1rem",
              color: "var(--joy-palette-text-secondary)",
            }}
          >
            Партия: {conveyor.summaries[0].batch.name}
          </Box>
        )}
      </Box>
      <Box
        id="posts"
        sx={{
          display: "flex",
          height: "40%",
          width: "100%",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "sm",

            display: "flex",
            flexGrow: 1,
            width: "25%",
            flexDirection: "column",
            justifyContent: "space-between",

            gap: 1,
            px: 2,
            py: 2,
          }}
        >
          <Box>Пост 1: Работает</Box>

          <Box>15000</Box>
          <Box>Иванов А.В.</Box>
        </Sheet>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "sm",

            display: "flex",
            flexGrow: 1,
            width: "25%",
            flexDirection: "column",
            justifyContent: "space-between",

            gap: 1,
            px: 2,
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 1 }}>
            <Box>Пост 2</Box>
            <Box>Статус: Работает</Box>
          </Box>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", fontSize: "2rem" }}>15000</Box>
          <Box>Иванов А.В.</Box>
        </Sheet>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "sm",

            display: "flex",
            flexGrow: 1,
            width: "25%",
            flexDirection: "column",
            justifyContent: "space-between",

            gap: 1,
            px: 2,
            py: 2,
          }}
        >
          <Box>
            <Box>Пост 3</Box>
            <Box>Статус: Работает</Box>
          </Box>
          <Box sx={{}}>15000</Box>
          <Box>Иванов А.В.</Box>
        </Sheet>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "sm",
            bgcolor: "neutral.softBg",
            display: "flex",
            flexGrow: 1,
            width: "25%",
            flexDirection: "column",
            justifyContent: "space-between",

            gap: 1,
            px: 2,
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 1 }}>
            <Box>Пост 4</Box>
            <Box></Box>
          </Box>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", fontSize: "1rem" }}>Нет данных</Box>
          <Box></Box>
        </Sheet>
      </Box>
    </Sheet>
  );
}
