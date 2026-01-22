import { Button } from "@mui/joy";

export interface TableButtonProps {
  variant?: CustomColorsVariants | null;
  startDecorator?: React.ReactNode;
  disabled?: boolean;
  label: string;
  minWidth?: number;
  onClick: () => void;
}

export default function TableButton(props: TableButtonProps) {
  return (
    <Button
      slotProps={{
        startDecorator: {
          sx: {
            color:
              (props.variant === "success" &&
                !props.disabled &&
                ((theme) => theme.vars.palette.darkPalette.tableButtonSuccess)) ||
              (props.variant === "danger" &&
                !props.disabled &&
                ((theme) => theme.vars.palette.darkPalette.tableButtonDanger)) ||
              (props.variant === "warning" &&
                !props.disabled &&
                ((theme) => theme.vars.palette.darkPalette.tableButtonWarning)) ||
              (props.variant === "primary" &&
                !props.disabled &&
                ((theme) => theme.vars.palette.darkPalette.tableButtonPrimary)) ||
              ((theme) => theme.vars.palette.neutral),
          },
        },
      }}
      startDecorator={props.startDecorator}
      disabled={props.disabled}
      variant="plain"
      sx={[
        {
          minWidth: props.minWidth ? props.minWidth : 0,
        },
        {
          borderRadius: "sm",
          border: "0.5px solid",
          px: 2,
          py: 0.5,
          fontSize: "xs",
          fontWeight: 100,
          color:
            (props.variant === "success" &&
              !props.disabled &&
              ((theme) => theme.vars.palette.darkPalette.tableButtonSuccess)) ||
            (props.variant === "danger" &&
              !props.disabled &&
              ((theme) => theme.vars.palette.darkPalette.tableButtonDanger)) ||
            (props.variant === "warning" &&
              !props.disabled &&
              ((theme) => theme.vars.palette.darkPalette.tableButtonWarning)) ||
            (props.variant === "primary" &&
              !props.disabled &&
              ((theme) => theme.vars.palette.darkPalette.tableButtonPrimary)) ||
            ((theme) => theme.vars.palette.neutral),
          ":hover": {
            backgroundColor:
              (props.variant === "success" &&
                !props.disabled &&
                ((theme) => theme.vars.palette.darkPalette.tableButtonHoverSuccess)) ||
              (props.variant === "danger" &&
                !props.disabled &&
                ((theme) => theme.vars.palette.darkPalette.tableButtonHoverDanger)) ||
              (props.variant === "warning" &&
                !props.disabled &&
                ((theme) => theme.vars.palette.darkPalette.tableButtonHoverWarning)) ||
              (props.variant === "primary" &&
                !props.disabled &&
                ((theme) => theme.vars.palette.darkPalette.tableButtonHoverPrimary)) ||
              ((theme) => theme.vars.palette.neutral),
          },
        },
      ]}
      size="sm"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
}
