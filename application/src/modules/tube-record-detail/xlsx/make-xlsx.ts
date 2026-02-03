import { utils, writeFile } from "xlsx-js-style";
import { formatTimeToString, msToTime } from "../../../shared/helpers/date-time-formatters";
import { TubeRecordDetail } from "../../../shared/api/services/tube-records-service";
// import { PostNames } from "../../../shared/helpers/post-names";
import makeExtrusionPage from "./make-extrusion-page";
import makeVarnishPage from "./make-varnish-page";

export default function makeXLSXFile(data: TubeRecordDetail) {
  const workbook = utils.book_new();
  makeExtrusionPage({ workbook: workbook, data: data });
  makeVarnishPage({ workbook: workbook, data: data });

  const worksheet2 = utils.aoa_to_sheet([]);
  const extrusionOperationsHeaders = [
    "код операции",
    "операция",
    "время начала",
    "время окончания",
    "длительность",
    "оператор",
  ];

  worksheet2["!cols"] = [{ wch: 10 }, { wch: 60 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 30 }];

  const styledExtrusionOerationsHeaders = extrusionOperationsHeaders.map((cell) => ({
    v: cell,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      font: { bold: true, italic: true, sz: 8 },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
    origin: "A2",
  }));

  const extrusionOperatoinsHeaderRow = {
    v: "ОТЧЕТ ОПЕРАТОРА",
    t: "s",
    s: {
      alignment: {
        horizontal: "left",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 14 },
    },
  };

  const mergeRangeA2F2 = { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } };

  worksheet2["A2"] = extrusionOperatoinsHeaderRow;
  worksheet2["!merges"] = [mergeRangeA2F2];

  const extrusionOperationsRows = data.extrusion.operations.map((row) => [
    {
      v: row.operation_value,
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
      v: row.operation_description,
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
      v: formatTimeToString(row.createdAt),
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
      v: formatTimeToString(new Date(new Date(row.createdAt).getTime() + row.idle_time)),
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
      v: msToTime(row.idle_time),
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
      v: row.employee,
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

  utils.book_append_sheet(workbook, worksheet2, "ОП Пост 1");
  utils.sheet_add_aoa(worksheet2, [styledExtrusionOerationsHeaders], { origin: "A4" });
  utils.sheet_add_aoa(worksheet2, extrusionOperationsRows, { origin: "A5" });

  // ####

  writeFile(workbook, `${data.data.batch_name}.xlsx`, { compression: true });
}
