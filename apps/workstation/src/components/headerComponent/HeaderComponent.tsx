import { Box, Sheet, Typography } from "@mui/joy";

export default function HeaderComponent() {
  return (
    <Sheet
      className="Header"
      variant="soft"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        height: "var(--Header-height)",
        width: "calc(100% - 2 * var(--Global-margin))",
        position: "fixed",
        top: "var(--Global-margin)",
        left: 0,
        mx: "var(--Global-margin)",
      }}
    >
      <Box>
        <Typography level="h1">Фиксация времени подачи проб</Typography>
      </Box>
    </Sheet>
  );
}
