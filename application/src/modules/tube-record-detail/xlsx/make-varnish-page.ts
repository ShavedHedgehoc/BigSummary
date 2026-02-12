import { utils, WorkBook } from "xlsx-js-style";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";
import { TubeRecordDetail } from "../../../shared/api/services/tube-records-service";
import { PostNames } from "../../../shared/helpers/post-names";

export default function makeVarnishPage({ workbook, data }: { workbook: WorkBook; data: TubeRecordDetail }) {
  const varnishHeaders = [
    "время",
    "показания счетчика",
    "скорость лаковой машины",
    "давление воздуха общее",
    "давление воздуха в загрузочной камере",
    "давление воздуха на регуляторах форсунок",
    "скорость ячеек",
    "впрыск А,В начальное положение",
    "впрыск C,D начальное положение",
    "впрыск А,В,C,D конечное положение",
    "вдув тубы, начальное положение",
    "вдув тубы, конечное положение",
    "температура печи полимеризации",
    "пористость внутреннего покрытия",
    "внутренний вид тубы в разрезе",
    "отсутствие просветов алюминия",
    "отсутствие непрокрасов и пятен",
  ];

  const worksheet = utils.aoa_to_sheet([]);

  worksheet["!cols"] = [
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 12 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 20 },
  ];

  const varnishStyledHeaders = varnishHeaders.map((cell) => ({
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

  const varnishRows = data.varnish.params.map((row) => [
    {
      v: formatTimeToString(row.createdAt),
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

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
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.varnish_machine_speed,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.total_air_pressure,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.feed_can_air_pressure,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.nozzle_regulator_air_pressure,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.cells_speed,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: `${row.injection_a_start_position}/${row.injection_b_start_position}`,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: `${row.injection_c_start_position}/${row.injection_d_start_position}`,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: `${[
        [row.injection_a_end_position, row.injection_b_end_position].join("/"),
        [row.injection_a_end_position, row.injection_b_end_position].join("/"),
      ].join("\n")}`,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        font: { sz: 8 },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.tube_molding_start_position,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.tube_molding_end_position,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.polimerization_furnace_temp,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: row.internal_varnish_porosity,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: `${row.internal_sectional_view === true ? "Ok" : "nOk"}`,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: `${row.aluminium_clearance_lack === true ? "Ok" : "nOk"}`,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      },
    },
    {
      v: `${row.unpainting_lack === true ? "Ok" : "nOk"}`,
      t: "s",
      s: {
        alignment: { horizontal: "center", vertical: "center" },

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
        alignment: { horizontal: "center", vertical: "center" },

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
    v: `${data.varnish.defect ? `Брак: ${data.varnish.defect}кг` : `Брак: нет данных`}`,
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
  // header
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
  worksheet["R4"] = {
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
    v: `Пост №2. ${PostNames.VARNISH}`,
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

  worksheet["R6"] = {
    v: `Конвейер: ${data.data.conveyor_name} (${data.data.shift === 1 ? "День" : "Ночь"})`,
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
  //
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

  worksheet["N8"] = {
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
      },
    },
  };
  worksheet["H8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
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
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["N8"].s = {
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

  worksheet["O8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["P8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["Q8"] = {
    v: "",
    s: {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
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
      data.varnish.tresholds
        ? `${data.varnish.tresholds.varnish_machine_speed_min}-${data.varnish.tresholds.varnish_machine_speed_max}`
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
      data.varnish.tresholds
        ? `${data.varnish.tresholds.total_air_pressure_min}-${data.varnish.tresholds.total_air_pressure_max}`
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
    v: `Бар`,
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
      data.varnish.tresholds
        ? `${data.varnish.tresholds.feed_can_air_pressure_min}-${data.varnish.tresholds.feed_can_air_pressure_max}`
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
    v: `Бар`,
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
      data.varnish.tresholds
        ? `${data.varnish.tresholds.nozzle_regulator_air_pressure_min}-${data.varnish.tresholds.nozzle_regulator_air_pressure_max}`
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
    v: `Бар`,
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
      data.varnish.tresholds
        ? `${data.varnish.tresholds.cells_speed_min}-${data.varnish.tresholds.cells_speed_max}`
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

  worksheet["G11"] = {
    v: `Rpm`,
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

  worksheet["H10"] = {
    v: `${
      data.varnish.tresholds
        ? `${data.varnish.tresholds.injection_a_start_position_min}-${data.varnish.tresholds.injection_a_start_position_max}`
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
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["H11"] = {
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

  worksheet["I10"] = {
    v: `${
      data.varnish.tresholds
        ? `${data.varnish.tresholds.injection_c_end_position_min}-${data.varnish.tresholds.injection_c_end_position_max}`
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
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["I11"] = {
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

  worksheet["J10"] = {
    v: `${
      data.varnish.tresholds
        ? `${data.varnish.tresholds.injection_a_end_position_min}-${data.varnish.tresholds.injection_a_end_position_max}`
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
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["J11"] = {
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

  worksheet["K10"] = {
    v: `${
      data.varnish.tresholds
        ? `${data.varnish.tresholds.tube_molding_start_position_min}-${data.varnish.tresholds.tube_molding_start_position_max}`
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
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["K11"] = {
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

  worksheet["L10"] = {
    v: `${
      data.varnish.tresholds
        ? `${data.varnish.tresholds.tube_molding_end_position_min}-${data.varnish.tresholds.tube_molding_end_position_max}`
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
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  worksheet["L11"] = {
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

  worksheet["M10"] = {
    v: `${
      data.varnish.tresholds
        ? `${data.varnish.tresholds.polimerization_furnace_temp_min}-${data.varnish.tresholds.polimerization_furnace_temp_max}`
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

  worksheet["M11"] = {
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

  worksheet["N10"] = {
    v: `${
      data.varnish.tresholds
        ? `${data.varnish.tresholds.internal_varnish_porosity_min}-${data.varnish.tresholds.internal_varnish_porosity_max}`
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

  worksheet["P10"] = {
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

  worksheet["Q10"] = {
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

  worksheet["Q11"] = {
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

  worksheet["R8"] = {
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

  worksheet["R9"] = {
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

  worksheet["R10"] = {
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

  worksheet["R11"] = {
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

  const rowsShift = data.varnish.params.length ? data.varnish.params.length : 0;
  const shiftAddress = () => {
    return utils.encode_cell({ c: 0, r: 12 + rowsShift });
  };

  const addr = shiftAddress();

  const mergeRangeA1R1 = { s: { r: 0, c: 0 }, e: { r: 0, c: 17 } };
  const mergeRangeA2R2 = { s: { r: 1, c: 0 }, e: { r: 1, c: 17 } };
  const mergeRangeA4C4 = { s: { r: 3, c: 0 }, e: { r: 3, c: 2 } };
  const mergeRangeD4E4 = { s: { r: 3, c: 3 }, e: { r: 3, c: 4 } };
  const mergeRangeF4H4 = { s: { r: 3, c: 5 }, e: { r: 3, c: 7 } };
  const mergeRangeI4O4 = { s: { r: 3, c: 8 }, e: { r: 3, c: 14 } };
  const mergeRangeA6G6 = { s: { r: 5, c: 0 }, e: { r: 5, c: 6 } };
  const mergeRangeA8M8 = { s: { r: 7, c: 0 }, e: { r: 7, c: 12 } };
  const mergeRangeA9A11 = { s: { r: 8, c: 0 }, e: { r: 10, c: 0 } };
  const mergeRangeB9B11 = { s: { r: 8, c: 1 }, e: { r: 10, c: 1 } };
  const mergeRangeN8Q8 = { s: { r: 7, c: 13 }, e: { r: 7, c: 16 } };
  const mergeRangeH10H11 = { s: { r: 9, c: 7 }, e: { r: 10, c: 7 } };
  const mergeRangeI10I11 = { s: { r: 9, c: 8 }, e: { r: 10, c: 8 } };
  const mergeRangeJ10J11 = { s: { r: 9, c: 9 }, e: { r: 10, c: 9 } };
  const mergeRangeK10K11 = { s: { r: 9, c: 10 }, e: { r: 10, c: 10 } };
  const mergeRangeL10L11 = { s: { r: 9, c: 11 }, e: { r: 10, c: 11 } };

  const mergeRangeN10N11 = { s: { r: 9, c: 13 }, e: { r: 10, c: 13 } };
  const mergeRangeO10O11 = { s: { r: 9, c: 14 }, e: { r: 10, c: 14 } };
  const mergeRangeP10P11 = { s: { r: 9, c: 15 }, e: { r: 10, c: 15 } };
  const mergeRangeQ10Q11 = { s: { r: 9, c: 16 }, e: { r: 10, c: 16 } };

  const mergeRangeR8R11 = { s: { r: 7, c: 17 }, e: { r: 10, c: 17 } };
  const mergeRange = { s: { r: 12 + rowsShift, c: 0 }, e: { r: 12 + rowsShift, c: 4 } };

  worksheet["!merges"] = [
    mergeRangeA1R1,
    mergeRangeA2R2,
    mergeRangeA4C4,
    mergeRangeD4E4,
    mergeRangeF4H4,
    mergeRangeI4O4,
    mergeRangeA6G6,
    mergeRangeA8M8,
    mergeRangeN8Q8,
    mergeRangeA9A11,
    mergeRangeB9B11,
    mergeRangeR8R11,
    mergeRangeH10H11,
    mergeRangeI10I11,
    mergeRangeJ10J11,
    mergeRangeK10K11,
    mergeRangeL10L11,
    mergeRangeN10N11,
    mergeRangeO10O11,
    mergeRangeP10P11,
    mergeRangeQ10Q11,
    mergeRange,
  ];
  utils.book_append_sheet(workbook, worksheet, "ТК Пост 2");
  utils.sheet_add_aoa(worksheet, [varnishStyledHeaders], { origin: "A9" });
  utils.sheet_add_aoa(worksheet, varnishRows, { origin: "A12" });
  utils.sheet_add_aoa(worksheet, [[defectString]], { origin: addr });
}
