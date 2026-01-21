import { Sheet, Stack } from "@mui/joy";

export default function TubeDetailViewLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sheet
      sx={[
        {
          display: { xs: "none", xl: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
          pr: 2,
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, Opera
          },
        },
        (theme) => ({
          backgroundColor: theme.palette.background.body,
        }),
      ]}
    >
      <Stack gap={2} sx={{ mt: 2 }}>
        {children}
      </Stack>
    </Sheet>
  );
}
