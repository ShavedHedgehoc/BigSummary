import { Typography, Box } from "@mui/joy";

export interface FormCardProps {
  title: string;
  grow: boolean;
  width?: number;
  centerTitle?: boolean;
}

export default function FormCard({ props, children }: { props: FormCardProps; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: 5,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        px: 2,
        py: 2,
        flexGrow: props.grow ? 1 : 0,
        width: props.width && `${props.width}px`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: props.centerTitle && props.centerTitle ? "center" : "flex-start",
        }}
      >
        <Typography color="neutral" level="h4">
          {props.title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
