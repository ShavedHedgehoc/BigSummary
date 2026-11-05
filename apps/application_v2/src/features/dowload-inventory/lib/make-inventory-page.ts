import type { TApplicationTraceInventoryDetailResponse } from '@repo/schemas';
import { format } from 'date-fns';
import { Workbook } from 'exceljs';

export default function MakeInventoryPage({
  workbook,
  data,
  pageName,
}: {
  workbook: Workbook;
  data: TApplicationTraceInventoryDetailResponse;
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
  docCodeCell.value = `Переучет на площадке ${data.header?.plant ?? 'Неизвестно'} от ${data.header?.date ? format(data.header.date, 'dd-MM-yyyy') : 'Неизвестно'}`;
  docCodeCell.font = { bold: true, size: 14 };
  docCodeCell.alignment = {
    horizontal: 'center',
    vertical: 'middle',
  };

  sheet.columns = [
    { key: 'productId', width: 14 },
    { key: 'productName', width: 54 },
    { key: 'lot', width: 24 },
    { key: 'expDate', width: 18 },
    { key: 'expDateRest', width: 12 },
    { key: 'quantity', width: 12 },
  ];

  sheet.getRow(3).values = [
    'Код 1С',
    'Наименование',
    'Партия',
    'Срок годности, дней',
    'Остаток, дней',
    'Количество',
  ];

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
    const dateObj = row.expDate ? new Date(row.expDate) : null;
    return {
      productId: row.productId,
      productName: row.productName,
      lot: row.lotName,
      expDate: dateObj ? format(dateObj, 'dd/MM/yyyy') : '-',
      expDateRest: row.daysToExp,
      quantity: row.quantity,
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
        horizontal: colNumber === 2 ? 'left' : 'center',
        vertical: 'middle',
        wrapText: true,
        indent: colNumber === 2 ? 1 : 0,
      };
    });
  });
}
