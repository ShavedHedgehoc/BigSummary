import { utils, writeFile } from "xlsx-js-style";
import { formatDateToString } from "../../shared/helpers/date-time-formatters";
import { ITraceBatchWghtReportRowData } from "../../shared/api/services/trace-batchs-service";

export default function makeXLSXFile(data: ITraceBatchWghtReportRowData[], title: string) {
  const workbook = utils.book_new();
  const headers = ["Дата", "Площадка", "Партия", "Код 1С", "Наименование", "План", "Факт"];

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
  worksheet["!cols"] = [{ wch: 10 }, { wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 60 }, { wch: 10 }, { wch: 10 }];

  const rows = data.map((row) => [
    {
      v: formatDateToString(row.batch_date),
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
      v: row.plant,
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
      v: row.batch_name,
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
      v: row.product_id,
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
      v: row.product_name,
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
      v: row.plan_q,
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
      v: row.fact_q,
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
  ]);

  utils.sheet_add_aoa(worksheet, rows, { origin: "A2" });
  writeFile(workbook, `${title}.xlsx`, { compression: true });
}
