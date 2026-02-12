import { utils, WorkBook } from "xlsx-js-style";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";
import { TubeRecordDetail } from "../../../shared/api/services/tube-records-service";
import { PostNames } from "../../../shared/helpers/post-names";

export default function makeExtrusionPage({ workbook, data }: { workbook: WorkBook; data: TubeRecordDetail }) {
  const extrusionHeaders = [
    "время", //1
    "показания счетчика", //2
    "скорость пресса", //3
    "время выдува", //4
    "скорость токарного автомата", //5
    "температура печи отжига", //6
    "тип рондоли", //7
    "высота тубы", //8
    "толщина мембраны", //9
    "диаметр тубы", //10
    "толщина цилиндрической части тубы", //11
    "жесткость тубы", //12
    "качество обрезки тубы", //13
    "герметичность", //14
    "резьба", //15
  ];

  const worksheet = utils.aoa_to_sheet([]);

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

  worksheet["A1"] = {
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

  worksheet["A2"] = {
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

  worksheet["A4"] = {
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

  worksheet["D4"] = {
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

  worksheet["F4"] = {
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

  worksheet["I4"] = {
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

  worksheet["P4"] = {
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

  worksheet["A6"] = {
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

  worksheet["P6"] = {
    v: `Конвейер: ${data.data.conveyor_name} (Смена: ${data.data.shift})`,
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

  worksheet["A8"] = {
    v: `1. Характеристики работы оборудования.`,
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

  worksheet["H8"] = {
    v: `2. Операционный контроль.`,
    t: "s",
    s: {},
  };

  worksheet["A8"].s = {
    fill: { fgColor: { rgb: "d1fae5" } },
    font: { bold: true, sz: 10 },
    alignment: {
      horizontal: "center",
      vertical: "center",
      wrapText: true,
    },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
    },
  };

  worksheet["B8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["C8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["D8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };
  worksheet["E8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };
  worksheet["F8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };
  worksheet["G8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["H8"].s = {
    fill: { fgColor: { rgb: "d1fae5" } },
    font: { bold: true, sz: 10 },
    alignment: {
      horizontal: "center",
      vertical: "center",
      wrapText: true,
    },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
    },
  };

  worksheet["I8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["J8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["K8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["L8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["M8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["N8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["O8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["P8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["A9"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["A10"] = {
    v: "",
    s: {
      border: {
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["A11"] = {
    v: "",
    s: {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["B9"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["B10"] = {
    v: "",
    s: {
      border: {
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["B11"] = {
    v: "",
    s: {
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["C10"] = {
    v: `${
      data.extrusion.tresholds
        ? `${data.extrusion.tresholds.press_speed_min}-${data.extrusion.tresholds.press_speed_max}`
        : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["C11"] = {
    v: `шт/мин`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["D10"] = {
    v: `${
      data.extrusion.tresholds
        ? `${data.extrusion.tresholds.blow_time_min}-${data.extrusion.tresholds.blow_time_max}`
        : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["D11"] = {
    v: `мс`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["E10"] = {
    v: `${
      data.extrusion.tresholds
        ? `${data.extrusion.tresholds.turning_machine_speed_min}-${data.extrusion.tresholds.turning_machine_speed_max}`
        : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["E11"] = {
    v: `шт/мин`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["F10"] = {
    v: `${
      data.extrusion.tresholds
        ? `${data.extrusion.tresholds.annealing_furnace_temp_min}-${data.extrusion.tresholds.annealing_furnace_temp_max}`
        : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["F11"] = {
    v: `C`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["G10"] = {
    v: `${
      data.extrusion.tresholds ? (data.extrusion.tresholds.rondel ? data.extrusion.tresholds.rondel.value : "-") : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["G11"] = {
    v: ``,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["H10"] = {
    v: `${
      data.extrusion.tresholds
        ? `${data.extrusion.tresholds.tube_cilindrical_section_length_min}-${data.extrusion.tresholds.tube_cilindrical_section_length_max}`
        : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["H11"] = {
    v: `мм`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["I10"] = {
    v: `${
      data.extrusion.tresholds
        ? `${data.extrusion.tresholds.membrane_thickness_min}-${data.extrusion.tresholds.membrane_thickness_max}`
        : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["I11"] = {
    v: `мм`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["J10"] = {
    v: `${
      data.extrusion.tresholds
        ? `${data.extrusion.tresholds.tube_diameter_min}-${data.extrusion.tresholds.tube_diameter_max}`
        : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["J11"] = {
    v: `мм`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["K10"] = {
    v: `${
      data.extrusion.tresholds
        ? `${data.extrusion.tresholds.tube_cilindrical_section_thickness_min}-${data.extrusion.tresholds.tube_cilindrical_section_thickness_max}`
        : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["K11"] = {
    v: `мм`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["L10"] = {
    v: `${
      data.extrusion.tresholds
        ? `${data.extrusion.tresholds.tube_rigidity_min}-${data.extrusion.tresholds.tube_rigidity_max}`
        : "-"
    }`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["L11"] = {
    v: `мм`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["M10"] = {
    v: `Ok/nOk`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["M11"] = {
    v: ``,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["N10"] = {
    v: `Ok/nOk`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["N11"] = {
    v: ``,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["O10"] = {
    v: `Ok/nOk`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["O11"] = {
    v: ``,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["P8"] = {
    v: `оператор`,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      font: { bold: true, italic: true, sz: 8 },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["P9"] = {
    v: ``,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      border: {
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["P10"] = {
    v: ``,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      border: {
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["P11"] = {
    v: ``,
    t: "s",
    s: {
      fill: { fgColor: { rgb: "d1fae5" } },
      border: {
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  const rowsShift = data.extrusion.params.length ? data.extrusion.params.length : 0;
  const shiftAddress = () => {
    return utils.encode_cell({ c: 0, r: 12 + rowsShift });
  };

  const addr = shiftAddress();

  const mergeRangeA1P1 = { s: { r: 0, c: 0 }, e: { r: 0, c: 15 } };
  const mergeRangeA2P2 = { s: { r: 1, c: 0 }, e: { r: 1, c: 15 } };
  const mergeRangeA4C4 = { s: { r: 3, c: 0 }, e: { r: 3, c: 2 } };
  const mergeRangeD4E4 = { s: { r: 3, c: 3 }, e: { r: 3, c: 4 } };
  const mergeRangeF4H4 = { s: { r: 3, c: 5 }, e: { r: 3, c: 7 } };
  const mergeRangeI4O4 = { s: { r: 3, c: 8 }, e: { r: 3, c: 14 } };
  const mergeRangeA6G6 = { s: { r: 5, c: 0 }, e: { r: 5, c: 6 } };
  const mergeRangeA8G8 = { s: { r: 7, c: 0 }, e: { r: 7, c: 6 } };
  const mergeRangeH8O8 = { s: { r: 7, c: 7 }, e: { r: 7, c: 14 } };
  const mergeRangeA9A11 = { s: { r: 8, c: 0 }, e: { r: 10, c: 0 } };
  const mergeRangeB9B11 = { s: { r: 8, c: 1 }, e: { r: 10, c: 1 } };
  const mergeRangeG10G11 = { s: { r: 9, c: 6 }, e: { r: 10, c: 6 } };
  const mergeRangeM10M11 = { s: { r: 9, c: 12 }, e: { r: 10, c: 12 } };
  const mergeRangeN10N11 = { s: { r: 9, c: 13 }, e: { r: 10, c: 13 } };
  const mergeRangeO10O11 = { s: { r: 9, c: 14 }, e: { r: 10, c: 14 } };
  const mergeRangeP8P11 = { s: { r: 7, c: 15 }, e: { r: 10, c: 15 } };
  const mergeRange = { s: { r: 12 + rowsShift, c: 0 }, e: { r: 12 + rowsShift, c: 4 } };

  worksheet["!merges"] = [
    mergeRangeA1P1,
    mergeRangeA2P2,
    mergeRangeA4C4,
    mergeRangeD4E4,
    mergeRangeF4H4,
    mergeRangeI4O4,
    mergeRangeA6G6,
    mergeRangeA8G8,
    mergeRangeH8O8,
    mergeRangeA9A11,
    mergeRangeB9B11,
    mergeRangeG10G11,
    mergeRangeM10M11,
    mergeRangeN10N11,
    mergeRangeO10O11,
    mergeRangeP8P11,
    mergeRange,
  ];

  utils.book_append_sheet(workbook, worksheet, "ТК Пост 1");
  utils.sheet_add_aoa(worksheet, [extrusionStyledHeaders], { origin: "A9" });
  utils.sheet_add_aoa(worksheet, extrusionRows, { origin: "A12" });
  utils.sheet_add_aoa(worksheet, [[defectString]], { origin: addr });
}
