import * as React from 'react';
import { Box, Sheet, Typography } from '@mui/joy';
import { TPlantByValueOutput } from '@repo/schemas';

interface FooterComponentProps {
  plant: TPlantByValueOutput;
}

export function FooterComponent({ plant }: FooterComponentProps) {
  return (
    <React.Fragment>
      <Sheet
        className="Header"
        variant="soft"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '10px',
          height: 'var(--Footer-height)',
          width: 'calc(100% - 2 * var(--Global-margin))',
          position: 'fixed',
          bottom: 'var(--Global-margin)',
          left: 0,
          mx: 'var(--Global-margin)',
          px: 'var(--Global-margin)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',

                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography level="body-xs">Площадка:</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {plant?.value ?? '-'}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '180px',
            }}
          >
            <Box
              sx={{
                display: 'flex',

                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography level="body-xs">Здоровье сервера:</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography level="body-xs" color="warning">
                В порядке
              </Typography>
            </Box>
          </Box>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}
