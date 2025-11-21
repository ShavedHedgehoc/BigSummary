import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DataFormField {
  key: string;
  value: string;
  values?: string[];
}

interface IOffsetParameterData {
  counter_value: string;
  printing_machine_speed: string;
  total_air_pressure: string;
  padding_furnace_temp: string;
  offset_furnace_temp: string;
  printer_motor: string;
  base_covers_holders_motor: string;
  base_covers_station_motor: string;
  imprint_quantity_printed_box_1: string | null;
  imprint_quantity_printed_box_2: string | null;
  imprint_quantity_printed_box_3: string | null;
  imprint_quantity_printed_box_4: string | null;
  imprint_quantity_printed_box_5: string | null;
  imprint_quantity_printed_box_6: string | null;
  ink_supply_time: string;
  design_match: boolean;
  tube_apperarance: boolean;
  tube_edge_deformation_lack: boolean;
  aluminium_clearance_lack: boolean;
  drips_lack: boolean;
}

interface OffsetInputStore {
  data: IOffsetParameterData;

  initData: () => void;
  changeData: (value: DataFormField) => void;
  clearData: (value: Partial<DataFormField>) => void;
  sliceData: (value: Partial<DataFormField>) => void;
  roundData: (value: Partial<DataFormField>) => void;
}

export const initDataValue: IOffsetParameterData = {
  counter_value: "0",
  printing_machine_speed: "0",
  total_air_pressure: "0",
  padding_furnace_temp: "0",
  offset_furnace_temp: "0",
  printer_motor: "0",
  base_covers_holders_motor: "0",
  base_covers_station_motor: "0",
  imprint_quantity_printed_box_1: null,
  imprint_quantity_printed_box_2: null,
  imprint_quantity_printed_box_3: null,
  imprint_quantity_printed_box_4: null,
  imprint_quantity_printed_box_5: null,
  imprint_quantity_printed_box_6: null,
  ink_supply_time: "0",
  design_match: false,
  tube_apperarance: false,
  tube_edge_deformation_lack: false,
  aluminium_clearance_lack: false,
  drips_lack: false,
};

export enum OffsetInputParams {
  COUNTER_VALUE = "counter_value",
  PRINTING_MACHINE_SPEED = "printing_machine_speed",
  TOTAL_AIR_PRESSURE = "total_air_pressure",
  PADDING_FURNACE_TEMP = "padding_furnace_temp",
  OFFSET_FURNACE_TEMP = "offset_furnace_temp",
  PRINTER_MOTOR = "printer_motor",
  BASE_COVERS_HOLDERS_MOTOR = "base_covers_holder_motor",
  BASE_COVERS_STATION_MOTOR = "base_covers_station_motor",
  IMPRINT_QUANTITY_PRINTED_BOX_1 = "imprint_quantity_printed_box_1",
  IMPRINT_QUANTITY_PRINTED_BOX_2 = "imprint_quantity_printed_box_2",
  IMPRINT_QUANTITY_PRINTED_BOX_3 = "imprint_quantity_printed_box_3",
  IMPRINT_QUANTITY_PRINTED_BOX_4 = "imprint_quantity_printed_box_4",
  IMPRINT_QUANTITY_PRINTED_BOX_5 = "imprint_quantity_printed_box_5",
  IMPRINT_QUANTITY_PRINTED_BOX_6 = "imprint_quantity_printed_box_6",
  INK_SUPPLY_TIME = "ink_supply_time",
  DESIGN_MATCH = "design_match",
  TUBE_APPEARANCE = "tube_appearance",
  TUBE_EDGE_DEFORMATION_LACK = "tube_edge_deformation_lack",
  ALUMINIUM_CLEARANCE_LACK = "aluminium_clearance_lack",
  DRIPS_LACK = "drips_lack",
}

//offsetParamsStore
export const useOffsetInputStore = create<OffsetInputStore>()(
  devtools((set) => ({
    data: initDataValue,
    initData: () => set(() => ({ data: initDataValue })),
    clearData: ({ key }) => {
      switch (key) {
        case OffsetInputParams.COUNTER_VALUE:
          set((state) => ({ data: { ...state.data, counter_value: "0" } }));
          break;
        case OffsetInputParams.PRINTING_MACHINE_SPEED:
          set((state) => ({ data: { ...state.data, printing_machine_speed: "0" } }));
          break;
        case OffsetInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({ data: { ...state.data, total_air_pressure: "0" } }));
          break;
        case OffsetInputParams.PADDING_FURNACE_TEMP:
          set((state) => ({ data: { ...state.data, padding_furnace_temp: "0" } }));
          break;
        case OffsetInputParams.OFFSET_FURNACE_TEMP:
          set((state) => ({ data: { ...state.data, offset_furnace_temp: "0" } }));
          break;
        case OffsetInputParams.BASE_COVERS_HOLDERS_MOTOR:
          set((state) => ({ data: { ...state.data, base_covers_holders_motor: "0" } }));
          break;
        case OffsetInputParams.BASE_COVERS_STATION_MOTOR:
          set((state) => ({ data: { ...state.data, base_covers_station_motor: "0" } }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_1:
          set((state) => ({ data: { ...state.data, imprint_quantity_printed_box_1: "0" } }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_2:
          set((state) => ({ data: { ...state.data, imprint_quantity_printed_box_2: "0" } }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_3:
          set((state) => ({ data: { ...state.data, imprint_quantity_printed_box_3: "0" } }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_4:
          set((state) => ({ data: { ...state.data, imprint_quantity_printed_box_4: "0" } }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_5:
          set((state) => ({ data: { ...state.data, imprint_quantity_printed_box_5: "0" } }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_6:
          set((state) => ({ data: { ...state.data, imprint_quantity_printed_box_6: "0" } }));
          break;
        case OffsetInputParams.INK_SUPPLY_TIME:
          set((state) => ({ data: { ...state.data, ink_supply_time: "0" } }));
          break;
        case OffsetInputParams.DESIGN_MATCH:
          set((state) => ({ data: { ...state.data, design_match: false } }));
          break;
        case OffsetInputParams.TUBE_APPEARANCE:
          set((state) => ({ data: { ...state.data, tube_apperarance: false } }));
          break;
        case OffsetInputParams.TUBE_EDGE_DEFORMATION_LACK:
          set((state) => ({ data: { ...state.data, tube_edge_deformation_lack: false } }));
          break;
        case OffsetInputParams.ALUMINIUM_CLEARANCE_LACK:
          set((state) => ({ data: { ...state.data, aluminium_clearance_lack: false } }));
          break;
        case OffsetInputParams.DRIPS_LACK:
          set((state) => ({ data: { ...state.data, drips_lack: false } }));
          break;
        default:
          break;
      }
    },
    sliceData: ({ key }) => {
      switch (key) {
        case OffsetInputParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value: state.data.counter_value.length < 2 ? "0" : state.data.counter_value.slice(0, -1),
            },
          }));
          break;
        case OffsetInputParams.PRINTING_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              printing_machine_speed:
                state.data.printing_machine_speed.length < 2 ? "0" : state.data.printing_machine_speed.slice(0, -1),
            },
          }));
          break;
        case OffsetInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              total_air_pressure:
                state.data.total_air_pressure.length < 2 ? "0" : state.data.total_air_pressure.slice(0, -1),
            },
          }));
          break;
        case OffsetInputParams.PADDING_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              padding_furnace_temp:
                state.data.padding_furnace_temp.length < 2 ? "0" : state.data.padding_furnace_temp.slice(0, -1),
            },
          }));
          break;
        case OffsetInputParams.OFFSET_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              offset_furnace_temp:
                state.data.offset_furnace_temp.length < 2 ? "0" : state.data.offset_furnace_temp.slice(0, -1),
            },
          }));
          break;
        case OffsetInputParams.PRINTER_MOTOR:
          set((state) => ({
            data: {
              ...state.data,
              printer_motor: state.data.printer_motor.length < 2 ? "0" : state.data.printer_motor.slice(0, -1),
            },
          }));
          break;
        case OffsetInputParams.BASE_COVERS_HOLDERS_MOTOR:
          set((state) => ({
            data: {
              ...state.data,
              base_covers_holders_motor:
                state.data.base_covers_holders_motor.length < 2
                  ? "0"
                  : state.data.base_covers_holders_motor.slice(0, -1),
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_1:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_1: state.data.imprint_quantity_printed_box_1
                ? state.data.imprint_quantity_printed_box_1.length < 2
                  ? "0"
                  : state.data.imprint_quantity_printed_box_1.slice(0, -1)
                : "0",
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_2:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_2: state.data.imprint_quantity_printed_box_2
                ? state.data.imprint_quantity_printed_box_2.length < 2
                  ? "0"
                  : state.data.imprint_quantity_printed_box_2.slice(0, -1)
                : "0",
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_3:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_3: state.data.imprint_quantity_printed_box_3
                ? state.data.imprint_quantity_printed_box_3.length < 2
                  ? "0"
                  : state.data.imprint_quantity_printed_box_3.slice(0, -1)
                : "0",
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_4:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_4: state.data.imprint_quantity_printed_box_4
                ? state.data.imprint_quantity_printed_box_4.length < 2
                  ? "0"
                  : state.data.imprint_quantity_printed_box_4.slice(0, -1)
                : "0",
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_5:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_5: state.data.imprint_quantity_printed_box_5
                ? state.data.imprint_quantity_printed_box_5.length < 2
                  ? "0"
                  : state.data.imprint_quantity_printed_box_5.slice(0, -1)
                : "0",
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_6:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_6: state.data.imprint_quantity_printed_box_6
                ? state.data.imprint_quantity_printed_box_6.length < 2
                  ? "0"
                  : state.data.imprint_quantity_printed_box_6.slice(0, -1)
                : "0",
            },
          }));
          break;
        case OffsetInputParams.INK_SUPPLY_TIME:
          set((state) => ({
            data: {
              ...state.data,
              ink_supply_time: state.data.ink_supply_time.length < 2 ? "0" : state.data.ink_supply_time.slice(0, -1),
            },
          }));
          break;
        default:
          break;
      }
    },
    changeData: ({ key, value }) => {
      switch (key) {
        case OffsetInputParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value:
                (state.data.counter_value.includes(".") && value === ".") || state.data.counter_value.length >= 8
                  ? state.data.counter_value
                  : value === "."
                  ? state.data.counter_value + value
                  : value === "0" &&
                    Number(state.data.counter_value + value) === 0 &&
                    state.data.counter_value.includes(".")
                  ? state.data.counter_value + value
                  : value === "0" && Number(state.data.counter_value + value) !== 0
                  ? state.data.counter_value + value
                  : Number(state.data.counter_value + value).toString(),
            },
          }));
          break;
        case OffsetInputParams.PRINTING_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              printing_machine_speed:
                (state.data.printing_machine_speed.includes(".") && value === ".") ||
                state.data.printing_machine_speed.length >= 8
                  ? state.data.printing_machine_speed
                  : value === "."
                  ? state.data.printing_machine_speed + value
                  : value === "0" &&
                    Number(state.data.printing_machine_speed + value) === 0 &&
                    state.data.printing_machine_speed.includes(".")
                  ? state.data.printing_machine_speed + value
                  : value === "0" && Number(state.data.printing_machine_speed + value) !== 0
                  ? state.data.printing_machine_speed + value
                  : Number(state.data.printing_machine_speed + value).toString(),
            },
          }));
          break;
        case OffsetInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              total_air_pressure:
                (state.data.total_air_pressure.includes(".") && value === ".") ||
                state.data.total_air_pressure.length >= 8
                  ? state.data.total_air_pressure
                  : value === "."
                  ? state.data.total_air_pressure + value
                  : value === "0" &&
                    Number(state.data.total_air_pressure + value) === 0 &&
                    state.data.total_air_pressure.includes(".")
                  ? state.data.total_air_pressure + value
                  : value === "0" && Number(state.data.total_air_pressure + value) !== 0
                  ? state.data.total_air_pressure + value
                  : Number(state.data.total_air_pressure + value).toString(),
            },
          }));
          break;
        case OffsetInputParams.PADDING_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              padding_furnace_temp:
                (state.data.padding_furnace_temp.includes(".") && value === ".") ||
                state.data.padding_furnace_temp.length >= 8
                  ? state.data.padding_furnace_temp
                  : value === "."
                  ? state.data.padding_furnace_temp + value
                  : value === "0" &&
                    Number(state.data.padding_furnace_temp + value) === 0 &&
                    state.data.padding_furnace_temp.includes(".")
                  ? state.data.padding_furnace_temp + value
                  : value === "0" && Number(state.data.padding_furnace_temp + value) !== 0
                  ? state.data.padding_furnace_temp + value
                  : Number(state.data.padding_furnace_temp + value).toString(),
            },
          }));
          break;
        case OffsetInputParams.OFFSET_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              offset_furnace_temp:
                (state.data.offset_furnace_temp.includes(".") && value === ".") ||
                state.data.offset_furnace_temp.length >= 8
                  ? state.data.offset_furnace_temp
                  : value === "."
                  ? state.data.offset_furnace_temp + value
                  : value === "0" &&
                    Number(state.data.offset_furnace_temp + value) === 0 &&
                    state.data.offset_furnace_temp.includes(".")
                  ? state.data.offset_furnace_temp + value
                  : value === "0" && Number(state.data.offset_furnace_temp + value) !== 0
                  ? state.data.offset_furnace_temp + value
                  : Number(state.data.offset_furnace_temp + value).toString(),
            },
          }));
          break;
        case OffsetInputParams.PRINTER_MOTOR:
          set((state) => ({
            data: {
              ...state.data,
              printer_motor:
                (state.data.printer_motor.includes(".") && value === ".") || state.data.printer_motor.length >= 8
                  ? state.data.printer_motor
                  : value === "."
                  ? state.data.printer_motor + value
                  : value === "0" &&
                    Number(state.data.printer_motor + value) === 0 &&
                    state.data.printer_motor.includes(".")
                  ? state.data.printer_motor + value
                  : value === "0" && Number(state.data.printer_motor + value) !== 0
                  ? state.data.printer_motor + value
                  : Number(state.data.printer_motor + value).toString(),
            },
          }));
          break;
        case OffsetInputParams.BASE_COVERS_HOLDERS_MOTOR:
          set((state) => ({
            data: {
              ...state.data,
              base_covers_holders_motor:
                (state.data.base_covers_holders_motor.includes(".") && value === ".") ||
                state.data.base_covers_holders_motor.length >= 8
                  ? state.data.base_covers_holders_motor
                  : value === "."
                  ? state.data.base_covers_holders_motor + value
                  : value === "0" &&
                    Number(state.data.base_covers_holders_motor + value) === 0 &&
                    state.data.base_covers_holders_motor.includes(".")
                  ? state.data.base_covers_holders_motor + value
                  : value === "0" && Number(state.data.base_covers_holders_motor + value) !== 0
                  ? state.data.base_covers_holders_motor + value
                  : Number(state.data.base_covers_holders_motor + value).toString(),
            },
          }));
          break;
        case OffsetInputParams.BASE_COVERS_STATION_MOTOR:
          set((state) => ({
            data: {
              ...state.data,
              base_covers_station_motor:
                (state.data.base_covers_station_motor.includes(".") && value === ".") ||
                state.data.base_covers_station_motor.length >= 8
                  ? state.data.base_covers_station_motor
                  : value === "."
                  ? state.data.base_covers_station_motor + value
                  : value === "0" &&
                    Number(state.data.base_covers_station_motor + value) === 0 &&
                    state.data.base_covers_station_motor.includes(".")
                  ? state.data.base_covers_station_motor + value
                  : value === "0" && Number(state.data.base_covers_station_motor + value) !== 0
                  ? state.data.base_covers_station_motor + value
                  : Number(state.data.base_covers_station_motor + value).toString(),
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_1:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_1: state.data.imprint_quantity_printed_box_1
                ? (state.data.imprint_quantity_printed_box_1.includes(".") && value === ".") ||
                  state.data.imprint_quantity_printed_box_1.length >= 8
                  ? state.data.imprint_quantity_printed_box_1
                  : value === "."
                  ? state.data.imprint_quantity_printed_box_1 + value
                  : value === "0" &&
                    Number(state.data.imprint_quantity_printed_box_1 + value) === 0 &&
                    state.data.imprint_quantity_printed_box_1.includes(".")
                  ? state.data.imprint_quantity_printed_box_1 + value
                  : value === "0" && Number(state.data.imprint_quantity_printed_box_1 + value) !== 0
                  ? state.data.imprint_quantity_printed_box_1 + value
                  : Number(state.data.imprint_quantity_printed_box_1 + value).toString()
                : value === "."
                ? "0."
                : value,
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_2:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_2: state.data.imprint_quantity_printed_box_2
                ? (state.data.imprint_quantity_printed_box_2.includes(".") && value === ".") ||
                  state.data.imprint_quantity_printed_box_2.length >= 8
                  ? state.data.imprint_quantity_printed_box_2
                  : value === "."
                  ? state.data.imprint_quantity_printed_box_2 + value
                  : value === "0" &&
                    Number(state.data.imprint_quantity_printed_box_2 + value) === 0 &&
                    state.data.imprint_quantity_printed_box_2.includes(".")
                  ? state.data.imprint_quantity_printed_box_2 + value
                  : value === "0" && Number(state.data.imprint_quantity_printed_box_2 + value) !== 0
                  ? state.data.imprint_quantity_printed_box_2 + value
                  : Number(state.data.imprint_quantity_printed_box_2 + value).toString()
                : value === "."
                ? "0."
                : value,
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_3:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_3: state.data.imprint_quantity_printed_box_3
                ? (state.data.imprint_quantity_printed_box_3.includes(".") && value === ".") ||
                  state.data.imprint_quantity_printed_box_3.length >= 8
                  ? state.data.imprint_quantity_printed_box_3
                  : value === "."
                  ? state.data.imprint_quantity_printed_box_3 + value
                  : value === "0" &&
                    Number(state.data.imprint_quantity_printed_box_3 + value) === 0 &&
                    state.data.imprint_quantity_printed_box_3.includes(".")
                  ? state.data.imprint_quantity_printed_box_3 + value
                  : value === "0" && Number(state.data.imprint_quantity_printed_box_3 + value) !== 0
                  ? state.data.imprint_quantity_printed_box_3 + value
                  : Number(state.data.imprint_quantity_printed_box_3 + value).toString()
                : value === "."
                ? "0."
                : value,
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_4:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_4: state.data.imprint_quantity_printed_box_4
                ? (state.data.imprint_quantity_printed_box_4.includes(".") && value === ".") ||
                  state.data.imprint_quantity_printed_box_4.length >= 8
                  ? state.data.imprint_quantity_printed_box_4
                  : value === "."
                  ? state.data.imprint_quantity_printed_box_4 + value
                  : value === "0" &&
                    Number(state.data.imprint_quantity_printed_box_4 + value) === 0 &&
                    state.data.imprint_quantity_printed_box_4.includes(".")
                  ? state.data.imprint_quantity_printed_box_4 + value
                  : value === "0" && Number(state.data.imprint_quantity_printed_box_4 + value) !== 0
                  ? state.data.imprint_quantity_printed_box_4 + value
                  : Number(state.data.imprint_quantity_printed_box_4 + value).toString()
                : value === "."
                ? "0."
                : value,
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_5:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_5: state.data.imprint_quantity_printed_box_5
                ? (state.data.imprint_quantity_printed_box_5.includes(".") && value === ".") ||
                  state.data.imprint_quantity_printed_box_5.length >= 8
                  ? state.data.imprint_quantity_printed_box_5
                  : value === "."
                  ? state.data.imprint_quantity_printed_box_5 + value
                  : value === "0" &&
                    Number(state.data.imprint_quantity_printed_box_5 + value) === 0 &&
                    state.data.imprint_quantity_printed_box_5.includes(".")
                  ? state.data.imprint_quantity_printed_box_5 + value
                  : value === "0" && Number(state.data.imprint_quantity_printed_box_5 + value) !== 0
                  ? state.data.imprint_quantity_printed_box_5 + value
                  : Number(state.data.imprint_quantity_printed_box_5 + value).toString()
                : value === "."
                ? "0."
                : value,
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_6:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_6: state.data.imprint_quantity_printed_box_6
                ? (state.data.imprint_quantity_printed_box_6.includes(".") && value === ".") ||
                  state.data.imprint_quantity_printed_box_6.length >= 8
                  ? state.data.imprint_quantity_printed_box_6
                  : value === "."
                  ? state.data.imprint_quantity_printed_box_6 + value
                  : value === "0" &&
                    Number(state.data.imprint_quantity_printed_box_6 + value) === 0 &&
                    state.data.imprint_quantity_printed_box_6.includes(".")
                  ? state.data.imprint_quantity_printed_box_6 + value
                  : value === "0" && Number(state.data.imprint_quantity_printed_box_6 + value) !== 0
                  ? state.data.imprint_quantity_printed_box_6 + value
                  : Number(state.data.imprint_quantity_printed_box_6 + value).toString()
                : value === "."
                ? "0."
                : value,
            },
          }));
          break;

        case OffsetInputParams.INK_SUPPLY_TIME:
          set((state) => ({
            data: {
              ...state.data,
              ink_supply_time:
                (state.data.ink_supply_time.includes(".") && value === ".") || state.data.ink_supply_time.length >= 8
                  ? state.data.ink_supply_time
                  : value === "."
                  ? state.data.ink_supply_time + value
                  : value === "0" &&
                    Number(state.data.ink_supply_time + value) === 0 &&
                    state.data.ink_supply_time.includes(".")
                  ? state.data.ink_supply_time + value
                  : value === "0" && Number(state.data.ink_supply_time + value) !== 0
                  ? state.data.ink_supply_time + value
                  : Number(state.data.ink_supply_time + value).toString(),
            },
          }));
          break;
        case OffsetInputParams.DESIGN_MATCH:
          set((state) => ({
            data: {
              ...state.data,
              design_match: value === "true" ? true : false,
            },
          }));
          break;
        case OffsetInputParams.TUBE_APPEARANCE:
          set((state) => ({
            data: {
              ...state.data,
              tube_apperarance: value === "true" ? true : false,
            },
          }));
          break;
        case OffsetInputParams.TUBE_EDGE_DEFORMATION_LACK:
          set((state) => ({
            data: {
              ...state.data,
              tube_edge_deformation_lack: value === "true" ? true : false,
            },
          }));
          break;
        case OffsetInputParams.ALUMINIUM_CLEARANCE_LACK:
          set((state) => ({
            data: {
              ...state.data,
              aluminium_clearance_lack: value === "true" ? true : false,
            },
          }));
          break;
        case OffsetInputParams.DRIPS_LACK:
          set((state) => ({
            data: {
              ...state.data,
              drips_lack: value === "true" ? true : false,
            },
          }));
          break;

        default:
          break;
      }
    },
    roundData: ({ key }) => {
      switch (key) {
        case OffsetInputParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value: Number(state.data.counter_value).toString(),
            },
          }));
          break;
        case OffsetInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              total_air_pressure: Number(state.data.total_air_pressure).toString(),
            },
          }));
          break;
        case OffsetInputParams.PADDING_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              padding_furnace_temp: Number(state.data.padding_furnace_temp).toString(),
            },
          }));
          break;
        case OffsetInputParams.OFFSET_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              offset_furnace_temp: Number(state.data.offset_furnace_temp).toString(),
            },
          }));
          break;
        case OffsetInputParams.PRINTER_MOTOR:
          set((state) => ({
            data: {
              ...state.data,
              printer_motor: Number(state.data.printer_motor).toString(),
            },
          }));
          break;
        case OffsetInputParams.BASE_COVERS_HOLDERS_MOTOR:
          set((state) => ({
            data: {
              ...state.data,
              base_covers_holders_motor: Number(state.data.base_covers_holders_motor).toString(),
            },
          }));
          break;
        case OffsetInputParams.BASE_COVERS_STATION_MOTOR:
          set((state) => ({
            data: {
              ...state.data,
              base_covers_station_motor: Number(state.data.base_covers_station_motor).toString(),
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_1:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_1: Number(state.data.imprint_quantity_printed_box_1).toString(),
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_2:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_2: Number(state.data.imprint_quantity_printed_box_2).toString(),
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_3:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_3: Number(state.data.imprint_quantity_printed_box_3).toString(),
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_4:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_4: Number(state.data.imprint_quantity_printed_box_4).toString(),
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_5:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_5: Number(state.data.imprint_quantity_printed_box_5).toString(),
            },
          }));
          break;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_6:
          set((state) => ({
            data: {
              ...state.data,
              imprint_quantity_printed_box_6: Number(state.data.imprint_quantity_printed_box_6).toString(),
            },
          }));
          break;
        case OffsetInputParams.INK_SUPPLY_TIME:
          set((state) => ({
            data: {
              ...state.data,
              ink_supply_time: Number(state.data.ink_supply_time).toString(),
            },
          }));
          break;

        default:
          break;
      }
    },
  }))
);
