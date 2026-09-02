import * as React from 'react';

import { Box, Typography } from '@mui/joy';
import { useDate } from '@/shared/lib';

export function DateComponent() {
  const { date } = useDate();
  return (
    <React.Fragment>
      <Box>
        <Typography color="warning" level="h2">
          {date}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
