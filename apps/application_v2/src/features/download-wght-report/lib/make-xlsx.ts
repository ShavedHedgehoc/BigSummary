import ExcelJS from 'exceljs';
import type { TApplicationTraceBoilWghtReportResponse } from '@repo/schemas';
import MakeReportPage from './make-report-page';

export async function makeXLSX(data: TApplicationTraceBoilWghtReportResponse) {
  const workbook = new ExcelJS.Workbook();
  MakeReportPage({
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
  anchor.download = `Отчет_по взвешиваниям.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
