import ExcelJS from 'exceljs';
import type { TApplicationTraceInventoryDetailResponse } from '@repo/schemas';
import MakeInventoryPage from './make-inventory-page';
import { format } from 'date-fns';

export async function makeXLSX(data: TApplicationTraceInventoryDetailResponse) {
  const workbook = new ExcelJS.Workbook();
  MakeInventoryPage({
    workbook,
    data: data,
    pageName: `Переучет`,
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Переучет_${data.header?.plant ?? 'Неизвестно'}_${data.header?.date ? format(data.header.date, 'dd_MM_yyyy') : 'Неизвестно'}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
