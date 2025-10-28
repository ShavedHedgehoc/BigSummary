import { utils, writeFile } from "xlsx-js-style";

import { formatDateToString } from "../../shared/helpers/date-time-formatters";
import { InventoryRowsData } from "../../shared/api/services/inventory-rows-service";

export default function makeXLSXFile(data: InventoryRowsData[], title: string) {
  const workbook = utils.book_new();
  const headers = ["Код 1С", "Наименование", "Партия", "Срок годности", "Остаток, дней", "Количество"];

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

  utils.book_append_sheet(workbook, worksheet, "Переучет");
  worksheet["!cols"] = [{ wch: 10 }, { wch: 50 }, { wch: 25 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];

  const rows = data.map((row) => [
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
      v: row.lot_name,
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
      v: row.exp_date ? `${formatDateToString(row.exp_date)} ` : "-",
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
      v: row.days_to_exp,
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
      v: row.quantity,
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
