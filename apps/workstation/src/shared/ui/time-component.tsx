import * as React from 'react';

import { Box, Typography } from '@mui/joy';
import { useDate } from '@/shared/lib';

export function TimeComponent() {
  const { time } = useDate();
  return (
    <React.Fragment>
      <Box>
        <Typography color="warning" level="h2">
          {time}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
