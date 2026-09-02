import * as React from 'react';
import { TWorkstationHistoryListResponse } from '@repo/schemas';
import { Sheet, Table, Typography } from '@mui/joy';
import { formatDateToString, formatTimeToString } from '@/shared/lib';

interface IInfoTableProps {
  data: TWorkstationHistoryListResponse;
}

export function InfoTable({ data }: IInfoTableProps) {
  const thead = [
    { width: 100, value: 'Дата' },
    { width: 80, value: 'Время' },
    { width: 80, value: 'Партия' },
    { width: 120, value: 'Артикул' },
    { width: 120, value: 'Статус' },
    { width: 120, value: 'Внес' },
  ];

  return (
    <React.Fragment>
      <Sheet
        className="CurrenSummaryTableContainer"
        variant="outlined"
        sx={{
          display: 'initial',
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          flexDirection: 'column',
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={[
            {
              '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
              '--Table-headerUnderlineThickness': '1px',
              '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
              '--TableCell-paddingY': '4px',
              '--TableCell-paddingX': '8px',
            },
          ]}
          variant="soft"
        >
          <thead>
            <tr>
              {thead.map((item, key) => (
                <th
                  key={key}
                  style={{ width: item.width, textAlign: 'center', padding: '12px 6px' }}
                >
                  <Typography color="warning">{item.value}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ width: 100, textAlign: 'center', padding: '12px 6px' }}>
                  {formatDateToString(item.createdAt)}
                </td>
                <td style={{ width: 100, textAlign: 'center', padding: '12px 6px' }}>
                  {formatTimeToString(item.createdAt)}
                </td>
                <td style={{ width: 80, textAlign: 'center', padding: '12px 6px' }}>{item.boil}</td>
                <td style={{ width: 120, textAlign: 'center', padding: '12px 6px' }}>
                  {item.product ? item.product : item.base ? item.base : '-'}
                </td>
                <td style={{ width: 120, textAlign: 'center', padding: '12px 6px' }}>
                  {item.historyType}
                </td>
                <td style={{ width: 120, textAlign: 'center', padding: '12px 6px' }}>
                  {item.employee}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
