import * as React from 'react';
import { Box, Typography } from '@mui/joy';

interface IMessageWindowProps {
  severity: 'fail' | 'success';
  infoMessage: string;
}

export function MessageWindow(props: IMessageWindowProps) {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography level="h1" color="warning">
          {props.severity === 'fail' ? 'Ошибка' : 'Успех'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 10, mr: 10 }}>
        <Typography level="h3" color="warning" textAlign={'center'}>
          {props.infoMessage}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
