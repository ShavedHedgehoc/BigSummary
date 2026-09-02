import { Box, Typography } from '@mui/joy';

interface NoSelectPlantComponentProps {
  msg: string;
}

export function NoSelectPlantComponent(props: NoSelectPlantComponentProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100dvh',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <Typography level="h1" color="warning">
        ¯\_(ツ)_/¯
      </Typography>
      <Typography level="h1" color="warning">
        {props.msg}
      </Typography>
    </Box>
  );
}
