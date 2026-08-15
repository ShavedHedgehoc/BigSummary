import { SxProps } from "@mui/joy/styles/types";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { Box, Sheet, Typography, useColorScheme } from "@mui/joy";
import CanDashCard from "./cans-dash-card";
import { useCansDash } from "./use-cans-dash";

export default function CansDashView() {
  const { mode } = useColorScheme();
  const { isPending, data, isSuccess } = useCansDash();
  const sheetSxProps: SxProps = [
    {
      gap: 2,
      width: "100%",
      borderRadius: "sm",
      flexShrink: 1,
      overflow: "auto",
      minHeight: 0,
      height: "100%",
      backgroundColor: "background.body",
      "&::-webkit-scrollbar": {
        width: { xs: "0", sm: "0.5rem" },
        backgroundColor: mode === "light" ? "var(--joy-palette-common-white)" : "var(--joy-palette-common-black)",
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: "lg",
        backgroundColor: mode === "light" ? "var(--joy-palette-common-white)" : "var(--joy-palette-common-black)",
        border:
          mode === "light"
            ? "0.5px solid var(--joy-palette-neutral-300)"
            : "0.5px solid var(--joy-palette-neutral-700)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: mode === "light" ? "var(--joy-palette-neutral-300)" : "var(--joy-palette-neutral-700)",
        borderRadius: "lg",
      },
    },
  ];

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.length === 0) {
    return <TableNotFoundComponent />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            display: "flex",
            height: "100%",
            flexGrow: 1,
            flexDirection: "column",
            gap: 2,
            p: 2,
            borderRadius: "sm",
            backgroundColor: "background.body",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography level="body-lg">Колпино</Typography>
          </Box>
          <Sheet sx={sheetSxProps}>
            <Sheet
              sx={{
                borderRadius: "sm",
                display: "grid",
                gap: 1,
                backgroundColor: "background.body",
                gridTemplateColumns: `repeat(auto-fill, [col-start] minmax(80px, 1fr) [col-end])`,
              }}
            >
              {isSuccess &&
                data
                  .filter((item) => item.plant === "К" && !item.transit)
                  .map((row) => <CanDashCard key={`Card_${row.id}`} row={row} />)}
            </Sheet>
          </Sheet>
        </Sheet>

        {/* Транзит */}
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flexGrow: 1,
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              display: "flex",
              height: "100%",
              flexGrow: 1,
              flexShrink: 1,
              flexDirection: "column",
              gap: 2,
              p: 2,
              borderRadius: "sm",
              backgroundColor: "background.body",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography level="body-lg">Транзит КЛП-ПСК</Typography>
            </Box>
            <Sheet sx={sheetSxProps}>
              <Sheet
                sx={{
                  borderRadius: "sm",
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: `repeat(auto-fill, [col-start] minmax(80px, 1fr) [col-end])`,
                  backgroundColor: "background.body",
                }}
              >
                {isSuccess &&
                  data
                    .filter((item) => item.transit && item.plant === "К")
                    .map((row) => <CanDashCard key={`Card_${row.id}`} row={row} />)}
              </Sheet>
            </Sheet>
          </Sheet>
          <Sheet
            variant="outlined"
            sx={{
              display: "flex",
              height: "100%",
              flexGrow: 1,
              flexShrink: 1,
              flexDirection: "column",
              gap: 2,
              p: 2,
              borderRadius: "sm",
              backgroundColor: "background.body",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography level="body-lg">Транзит ПСК-КЛП</Typography>
            </Box>
            <Sheet sx={sheetSxProps}>
              <Sheet
                sx={{
                  borderRadius: "sm",
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: `repeat(auto-fill, [col-start] minmax(80px, 1fr) [col-end])`,
                  backgroundColor: "background.body",
                }}
              >
                {isSuccess &&
                  data
                    .filter((item) => item.transit && item.plant === "П")
                    .map((row) => <CanDashCard key={`Card_${row.id}`} row={row} />)}
              </Sheet>
            </Sheet>
          </Sheet>
        </Box>
        {/* Транзит */}
        <Sheet
          variant="outlined"
          sx={{
            display: "flex",
            height: "100%",
            flexGrow: 1,
            flexDirection: "column",
            gap: 2,
            p: 2,
            borderRadius: "sm",
            backgroundColor: "background.body",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography level="body-lg">Пискаревка</Typography>
          </Box>
          <Sheet sx={sheetSxProps}>
            <Sheet
              sx={{
                borderRadius: "sm",
                display: "grid",
                gap: 1,
                gridTemplateColumns: `repeat(auto-fill, [col-start] minmax(80px, 1fr) [col-end])`,
                backgroundColor: "background.body",
              }}
            >
              {isSuccess &&
                data
                  .filter((item) => item.plant === "П" && !item.transit)
                  .map((row) => <CanDashCard key={`Card_${row.id}`} row={row} />)}
            </Sheet>
          </Sheet>
        </Sheet>
      </Box>

      <Sheet
        variant="outlined"
        sx={{
          display: "flex",
          height: "20%",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
          borderRadius: "sm",
          backgroundColor: "background.body",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography level="body-lg">Нет записей</Typography>
        </Box>
        <Sheet sx={sheetSxProps}>
          <Sheet
            sx={{
              borderRadius: "sm",
              display: "grid",
              gap: 1,
              gridTemplateColumns: `repeat(auto-fill, [col-start] minmax(80px, 1fr) [col-end])`,
              backgroundColor: "background.body",
            }}
          >
            {isSuccess &&
              data
                .filter((item) => !item.plant && !item.transit)
                .map((row) => <CanDashCard key={`Card_${row.id}`} row={row} />)}
          </Sheet>
        </Sheet>
      </Sheet>
    </Box>
  );
}
