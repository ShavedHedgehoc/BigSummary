// import * as XLSX from "xlsx-js-style";

import { utils, writeFile } from "xlsx-js-style";
import { formatDateToString, formatTimeToString } from "../../shared/helpers/date-time-formatters";
import { ITraceWeightingsSummaryData } from "../../shared/api/services/trace-batchs-service";

export default function makeXLSXFile(data: ITraceWeightingsSummaryData[], title: string) {
  const workbook = utils.book_new();
  const headers = ["№", "Сотрудник", "Строк всего", "Взвешено всего", "Первое взвешивание", "Последнее взвешивание"];

  const worksheet = utils.aoa_to_sheet([
    headers.map((cell) => ({
      v: cell,
      t: "s",
      s: {
        fill: { fgColor: { rgb: "d1fae5" } },
        alignment: { horizontal: "center" },
        font: { bold: true, italic: true },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    })),
  ]);

  utils.book_append_sheet(workbook, worksheet, "Отчет");
  worksheet["!cols"] = [{ wch: 10 }, { wch: 30 }, { wch: 20 }, { wch: 20 }, { wch: 30 }, { wch: 30 }];

  const rows = data.map((row, index) => [
    {
      v: index + 1,
      t: "s",
      s: {
        alignment: { horizontal: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.w_name,
      t: "s",
      s: {
        alignment: { horizontal: "left" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.w_rows,
      t: "s",
      s: {
        alignment: { horizontal: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.w_total.toFixed(3),
      t: "n",
      s: {
        alignment: { horizontal: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.w_start_date ? `${formatDateToString(row.w_start_date)} ${formatTimeToString(row.w_start_date)}` : "-",
      t: "s",
      s: {
        alignment: { horizontal: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.w_end_date ? `${formatDateToString(row.w_end_date)} ${formatTimeToString(row.w_end_date)}` : "-",
      t: "s",
      s: {
        alignment: { horizontal: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
  ]);

  utils.sheet_add_aoa(worksheet, rows, { origin: "A2" });
  writeFile(workbook, `${title}.xlsx`, { compression: true });
}
