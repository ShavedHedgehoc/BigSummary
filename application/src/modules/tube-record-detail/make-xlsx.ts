import { utils, writeFile } from "xlsx-js-style";
import { formatDateToString, formatTimeToString, msToTime } from "../../shared/helpers/date-time-formatters";
import { TubeRecordDetail } from "../../shared/api/services/tube-records-service";
import { PostNames } from "../../shared/helpers/post-names";

export default function makeXLSXFile(data: TubeRecordDetail) {
  const workbook = utils.book_new();
  const extrusionHeaders = [
    "время",
    "показания счетчика",
    "скорость пресса",
    "время выдува",
    "скорость токарного автомата",
    "температура печи отжига",
    "тип рондоли",
    // "материалы",
    "высота тубы",
    "толщина мембраны",
    "диаметр тубы",
    "толщина цилиндрической части тубы",
    "жесткость тубы",
    "качество обрезки тубы",
    "герметичность",
    "резьба",
    "оператор",
  ];

  const worksheet = utils.aoa_to_sheet([]);
  utils.book_append_sheet(workbook, worksheet, "ТК Пост 1");

  worksheet["!cols"] = [
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 11 },
    { wch: 12 },
    { wch: 12 },
    { wch: 10 },
    { wch: 10 },
    { wch: 12 },
    { wch: 10 },
    { wch: 10 },
    { wch: 12 },
    { wch: 8 },
    { wch: 20 },
  ];

  const extrusionStyledHeaders = extrusionHeaders.map((cell) => ({
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

  const extrusionRows = data.extrusion.params.map((row) => [
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
      v: row.counter_value,
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
      v: row.press_speed,
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
      v: row.blow_time,
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
      v: row.turning_machine_speed,
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
      v: row.annealing_furnace_temp,
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
      v: row.rondel,
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
    // {
    //   v: row.consumed_materials.map((item) => `${item.code} ${item.name} ${item.lot}`).join("\n"),
    //   t: "s",
    //   s: {
    //     alignment: { horizontal: "center", wrapText: true },
    //     font: { sz: 8 },

    //     border: {
    //       top: { style: "thin", color: { rgb: "000000" } },
    //       bottom: { style: "thin", color: { rgb: "000000" } },
    //       left: { style: "thin", color: { rgb: "000000" } },
    //       right: { style: "thin", color: { rgb: "000000" } },
    //     },
    //   },
    // },
    {
      v: row.tube_cilindrical_section_length,
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
      v: row.membrane_thickness,
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
      v: row.tube_diameter,
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
      v: row.tube_cilindrical_section_thickness,
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
      v: row.tube_rigidity,
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
      v: `${row.tube_cutting_quality === true ? "Ok" : "nOk"}`,
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
      v: `${row.tightness === true ? "Ok" : "nOk"}`,
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
      v: `${row.external_thread_quality === true ? "Ok" : "nOk"}`,
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

  const firstHeaderRow = {
    v: "ЮК.ПР.Ф.ХХХХ",
    t: "s",
    s: {
      alignment: {
        horizontal: "right",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 8 },
    },
  };

  const secondHeaderRow = {
    v: "ТЕХНОЛОГИЧЕСКАЯ КАРТА НА ПРОИЗВОДСТВО ТУБЫ",
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

  const dateString = {
    v: `Дата: ${formatDateToString(data.data.date)}`,
    t: "s",
    s: {
      alignment: {
        horizontal: "left",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 10 },
    },
  };

  const batchString = {
    v: `Партия: ${data.data.batch_name}`,
    t: "s",
    s: {
      alignment: {
        horizontal: "left",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 10 },
    },
  };

  const markingString = {
    v: `Артикул: ${data.data.marking}`,
    t: "s",
    s: {
      alignment: {
        horizontal: "left",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 10 },
    },
  };

  const nameString = {
    v: `${data.data.product_name}`,
    t: "s",
    s: {
      alignment: {
        horizontal: "left",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 10 },
    },
  };

  const planString = {
    v: `План (шт): ${data.data.plan}`,
    t: "s",
    s: {
      alignment: {
        horizontal: "right",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 10 },
    },
  };

  const postString = {
    v: `Пост №1. ${PostNames.EXTRUSION}`,
    t: "s",
    s: {
      alignment: {
        horizontal: "left",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 10 },
    },
  };

  const conveyerString = {
    v: `Конвейер: ${data.data.conveyor_name}`,
    t: "s",
    s: {
      alignment: {
        horizontal: "right",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 10 },
    },
  };

  const defectString = {
    v: `${data.extrusion.defect ? `Брак: ${data.extrusion.defect}кг` : `Брак: нет данных`}`,
    t: "s",
    s: {
      alignment: {
        horizontal: "left",
        vertical: "center",
        wrapText: true,
      },
      font: { bold: true, sz: 12 },
    },
  };

  worksheet["A1"] = firstHeaderRow;
  worksheet["A2"] = secondHeaderRow;
  worksheet["A4"] = dateString;
  worksheet["D4"] = batchString;
  worksheet["F4"] = markingString;
  worksheet["I4"] = nameString;
  worksheet["P4"] = planString;
  worksheet["A6"] = postString;
  worksheet["P6"] = conveyerString;

  const rowsShift = data.extrusion.params.length ? data.extrusion.params.length : 0;
  const shiftAddress = () => {
    return utils.encode_cell({ c: 0, r: 9 + rowsShift });
  };

  const addr = shiftAddress();

  const mergeRangeA1P1 = { s: { r: 0, c: 0 }, e: { r: 0, c: 15 } };
  const mergeRangeA2P2 = { s: { r: 1, c: 0 }, e: { r: 1, c: 15 } };
  const mergeRangeA4C4 = { s: { r: 3, c: 0 }, e: { r: 3, c: 2 } };
  const mergeRangeD4E4 = { s: { r: 3, c: 3 }, e: { r: 3, c: 4 } };
  const mergeRangeF4H4 = { s: { r: 3, c: 5 }, e: { r: 3, c: 7 } };
  const mergeRangeI4O4 = { s: { r: 3, c: 8 }, e: { r: 3, c: 14 } };
  const mergeRangeA6G6 = { s: { r: 5, c: 0 }, e: { r: 5, c: 6 } };
  const mergeRange = { s: { r: 9 + rowsShift, c: 0 }, e: { r: 9 + rowsShift, c: 4 } };

  worksheet["!merges"] = [
    mergeRangeA1P1,
    mergeRangeA2P2,
    mergeRangeA4C4,
    mergeRangeD4E4,
    mergeRangeF4H4,
    mergeRangeI4O4,
    mergeRangeA6G6,
    mergeRange,
  ];

  utils.sheet_add_aoa(worksheet, [extrusionStyledHeaders], { origin: "A8" });
  utils.sheet_add_aoa(worksheet, extrusionRows, { origin: "A9" });
  utils.sheet_add_aoa(worksheet, [[defectString]], { origin: addr });

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

  writeFile(workbook, `${data.data.batch_name}.xlsx`, { compression: true });
}
