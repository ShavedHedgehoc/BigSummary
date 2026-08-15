import { utils, writeFile } from "xlsx-js-style";
import { TimeReportRowData } from "../../shared/api/services/record-service";
import { formatDateToString, formatTimeToString } from "../../shared/helpers/date-time-formatters";

export default function makeXLSXFile(data: TimeReportRowData[], title: string) {
  const workbook = utils.book_new();
  const headers = [
    "Конвейер",
    "Код 1С",
    "Артикул",
    "Партия",
    "План",
    "Основа на пробе",
    "Допуск на подключение",
    "Продукт на пробе",
    "Допуск на фасовку",
    "Фасуется",
    "Фасовка завершена",
  ];

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
  worksheet["!cols"] = [
    { wch: 10 },
    { wch: 10 },
    { wch: 25 },
    { wch: 10 },
    { wch: 10 },
    { wch: 20 },
    { wch: 25 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
  ];

  const rows = data.map((row) => [
    {
      v: row.conveyor,
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
      v: row.productId,
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
      v: row.product,
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
      v: row.boil,
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
      v: row.plan,
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
      v: row.lastBaseCheck ? `${formatDateToString(row.lastBaseCheck)} ${formatTimeToString(row.lastBaseCheck)}` : "-",
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
      v: row.lastPlugPass ? `${formatDateToString(row.lastPlugPass)} ${formatTimeToString(row.lastPlugPass)}` : "-",
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
      v: row.lastProductCheck ? formatTimeToString(row.lastProductCheck) : "-",
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
      v: row.lastProductPass ? formatTimeToString(row.lastProductPass) : "-",
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
      v: row.lastProductInProgress ? formatTimeToString(row.lastProductInProgress) : "-",
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
      v: row.lastProductFinished ? formatTimeToString(row.lastProductFinished) : "-",
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
