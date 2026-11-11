import type { TApplicationTraceBoilWghtReportResponse } from '@repo/schemas';
import { format } from 'date-fns';
import { Workbook } from 'exceljs';

export default function MakeReportPage({
  workbook,
  data,
  pageName,
}: {
  workbook: Workbook;
  data: TApplicationTraceBoilWghtReportResponse;
  pageName: string;
}) {
  const sheet = workbook.addWorksheet(pageName, {
    pageSetup: {
      orientation: 'portrait',
      paperSize: 9,
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: {
        left: 0.25,
        right: 0.25,
        top: 0.25,
        bottom: 0.25,
        header: 0.3,
        footer: 0.3,
      },
    },
    views: [{ state: 'normal' }],
  });

  sheet.mergeCells('A1:F1');
  const docCodeCell = sheet.getCell('A1');
  docCodeCell.value = `Отчет по взвешиваниям`;
  docCodeCell.font = { bold: true, size: 14 };
  docCodeCell.alignment = {
    horizontal: 'center',
    vertical: 'middle',
  };

  sheet.columns = [
    { key: 'date', width: 14 },
    { key: 'plantName', width: 14 },
    { key: 'batch', width: 14 },
    { key: 'productId', width: 14 },
    { key: 'productName', width: 54 },
    { key: 'planQuantity', width: 12 },
    { key: 'factQuantity', width: 12 },
  ];

  sheet.getRow(3).values = ['Дата', 'Площадка', 'Партия', 'Код 1С', 'Наименование', 'План', 'Факт'];

  sheet.getRow(3).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD1FAE5' },
    };
    cell.font = { bold: true, size: 10 };
    cell.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    };
    cell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  const rows = (data.rows ?? []).map((row) => {
    const dateObj = row.batchDate ? new Date(row.batchDate) : null;
    return {
      date: dateObj ? format(dateObj, 'dd/MM/yyyy') : '-',
      plantName: row.plantName ?? '-',
      batch: row.batchName ?? '-',
      productId: row.productId,
      productName: row.productName,
      planQuantity: row.planQuantity,
      factQuantity: row.factQuantity,
    };
  });

  const addedRows = sheet.addRows(rows);

  addedRows.forEach((newRow) => {
    newRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = {
        horizontal: colNumber === 5 ? 'left' : 'center',
        vertical: 'middle',
        wrapText: true,
        indent: colNumber === 5 ? 1 : 0,
      };
    });
  });
}
