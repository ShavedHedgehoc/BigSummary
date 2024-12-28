import Typography from "@mui/joy/Typography";
import { useColorScheme } from "@mui/joy";
import { rowScope } from "../helpers/status-conditions";

export function StyledTypography({ state, text }: { state: string; text: string | number }) {
  const { mode } = useColorScheme();
  const scope = rowScope(state);
  return (
    <Typography
      level="body-xs"
      sx={() => ({
        color:
          mode === "dark"
            ? scope === "fail"
              ? "danger.plainColor"
              : scope === "success"
              ? "success.plainColor"
              : scope === "wait"
              ? "warning.plainColor"
              : "neutral"
            : "neutral",
      })}
    >
      {text}
    </Typography>
  );
}
