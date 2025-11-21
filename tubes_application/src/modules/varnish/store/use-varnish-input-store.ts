import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DataFormField {
  key: string;
  value: string;
  values?: string[];
}

interface IVarnishParameterData {
  counter_value: string;
  varnish_machine_speed: string;
  total_air_pressure: string;
  feed_can_air_pressure: string;
  nozzle_regulator_air_pressure: string;
  cells_speed: string;
  injection_a_start_position: string;
  injection_b_start_position: string;
  injection_c_start_position: string;
  injection_d_start_position: string;
  injection_a_end_position: string;
  injection_b_end_position: string;
  injection_c_end_position: string;
  injection_d_end_position: string;
  tube_molding_start_position: string;
  tube_molding_end_position: string;
  polimerization_furnace_temp: string;
  internal_varnish_porosity: string;
  internal_sectional_view: boolean;
  aluminium_clearance_lack: boolean;
  unpainting_lack: boolean;
}

interface VarnishInputStore {
  data: IVarnishParameterData;
  initData: () => void;
  changeData: (value: DataFormField) => void;
  clearData: (value: Partial<DataFormField>) => void;
  sliceData: (value: Partial<DataFormField>) => void;
  roundData: (value: Partial<DataFormField>) => void;
}

export const initDataValue: IVarnishParameterData = {
  counter_value: "0",
  varnish_machine_speed: "0",
  total_air_pressure: "0",
  feed_can_air_pressure: "0",
  nozzle_regulator_air_pressure: "0",
  cells_speed: "0",
  injection_a_start_position: "0",
  injection_b_start_position: "0",
  injection_c_start_position: "0",
  injection_d_start_position: "0",
  injection_a_end_position: "0",
  injection_b_end_position: "0",
  injection_c_end_position: "0",
  injection_d_end_position: "0",
  tube_molding_start_position: "0",
  tube_molding_end_position: "0",
  polimerization_furnace_temp: "0",
  internal_varnish_porosity: "0",
  internal_sectional_view: false,
  aluminium_clearance_lack: false,
  unpainting_lack: false,
};

export enum VarnishInputParams {
  COUNTER_VALUE = "counter_value",
  VARNISH_MACHINE_SPEED = "varnish_machine_speed",
  TOTAL_AIR_PRESSURE = "total_air_pressure",
  FEED_CAN_AIR_PRESSURE = "feed_can_air_pressure",
  NOZZLE_REGULATOR_AIR_PRESSURE = "nozzle_regulator_air_pressure",
  CELLS_SPEED = "cells_speed",
  INJECTION_A_START_POSITION = "injection_a_start_position",
  INJECTION_B_START_POSITION = "injection_b_start_position",
  INJECTION_C_START_POSITION = "injection_c_start_position",
  INJECTION_D_START_POSITION = "injection_d_start_position",
  INJECTION_A_END_POSITION = "injection_a_end_position",
  INJECTION_B_END_POSITION = "injection_b_end_position",
  INJECTION_C_END_POSITION = "injection_c_end_position",
  INJECTION_D_END_POSITION = "injection_d_end_position",
  TUBE_MOLDING_START_POSITION = "tube_molding_start_position",
  TUBE_MOLDING_END_POSITION = "tube_molding_end_position",
  POLIMERIZATION_FURNACE_TEMP = "polimerization_furnace_temp",
  INTERNAL_VARNISH_POROSITY = "internal_varnish_porosity",
  INTERNAL_SECTIONAL_VIEW = "internal_sectional_view",
  ALUMINIUM_CLEARANCE_LACK = "aluminium_clearance_lack",
  UNPAINTING_LACK = "unpainting_lack",
}

export const useVarnishInputStore = create<VarnishInputStore>()(
  devtools((set) => ({
    data: initDataValue,
    initData: () => set(() => ({ data: initDataValue, selectedRondelType: undefined })),
    clearData: ({ key }) => {
      switch (key) {
        case VarnishInputParams.COUNTER_VALUE:
          set((state) => ({ data: { ...state.data, counter_value: "0" } }));
          break;
        case VarnishInputParams.VARNISH_MACHINE_SPEED:
          set((state) => ({ data: { ...state.data, varnish_machine_speed: "0" } }));
          break;
        case VarnishInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({ data: { ...state.data, total_air_pressure: "0" } }));
          break;
        case VarnishInputParams.FEED_CAN_AIR_PRESSURE:
          set((state) => ({ data: { ...state.data, feed_can_air_pressure: "0" } }));
          break;
        case VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE:
          set((state) => ({ data: { ...state.data, nozzle_regulator_air_pressure: "0" } }));
          break;
        case VarnishInputParams.CELLS_SPEED:
          set((state) => ({ data: { ...state.data, cells_speed: "0" } }));
          break;
        case VarnishInputParams.INJECTION_A_START_POSITION:
          set((state) => ({ data: { ...state.data, injection_a_start_position: "0" } }));
          break;
        case VarnishInputParams.INJECTION_B_START_POSITION:
          set((state) => ({ data: { ...state.data, injection_b_start_position: "0" } }));
          break;
        case VarnishInputParams.INJECTION_C_START_POSITION:
          set((state) => ({ data: { ...state.data, injection_c_start_position: "0" } }));
          break;
        case VarnishInputParams.INJECTION_D_START_POSITION:
          set((state) => ({ data: { ...state.data, injection_d_start_position: "0" } }));
          break;
        case VarnishInputParams.INJECTION_A_END_POSITION:
          set((state) => ({ data: { ...state.data, injection_a_end_position: "0" } }));
          break;
        case VarnishInputParams.INJECTION_B_END_POSITION:
          set((state) => ({ data: { ...state.data, injection_b_end_position: "0" } }));
          break;
        case VarnishInputParams.INJECTION_C_END_POSITION:
          set((state) => ({ data: { ...state.data, injection_c_end_position: "0" } }));
          break;
        case VarnishInputParams.INJECTION_D_END_POSITION:
          set((state) => ({ data: { ...state.data, injection_d_end_position: "0" } }));
          break;
        case VarnishInputParams.TUBE_MOLDING_START_POSITION:
          set((state) => ({ data: { ...state.data, tube_molding_start_position: "0" } }));
          break;
        case VarnishInputParams.TUBE_MOLDING_END_POSITION:
          set((state) => ({ data: { ...state.data, tube_molding_end_position: "0" } }));
          break;
        case VarnishInputParams.POLIMERIZATION_FURNACE_TEMP:
          set((state) => ({ data: { ...state.data, polimerization_furnace_temp: "0" } }));
          break;
        case VarnishInputParams.INTERNAL_VARNISH_POROSITY:
          set((state) => ({ data: { ...state.data, internal_varnish_porosity: "0" } }));
          break;
        case VarnishInputParams.INTERNAL_SECTIONAL_VIEW:
          set((state) => ({ data: { ...state.data, internal_sectional_view: false } }));
          break;
        case VarnishInputParams.ALUMINIUM_CLEARANCE_LACK:
          set((state) => ({ data: { ...state.data, aluminium_clearance_lack: false } }));
          break;
        case VarnishInputParams.UNPAINTING_LACK:
          set((state) => ({ data: { ...state.data, unpainting_lack: false } }));
          break;
        default:
          break;
      }
    },
    sliceData: ({ key }) => {
      switch (key) {
        case VarnishInputParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value: state.data.counter_value.length < 2 ? "0" : state.data.counter_value.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.VARNISH_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              varnish_machine_speed:
                state.data.varnish_machine_speed.length < 2 ? "0" : state.data.varnish_machine_speed.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              total_air_pressure:
                state.data.total_air_pressure.length < 2 ? "0" : state.data.total_air_pressure.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.FEED_CAN_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              feed_can_air_pressure:
                state.data.feed_can_air_pressure.length < 2 ? "0" : state.data.feed_can_air_pressure.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              nozzle_regulator_air_pressure:
                state.data.nozzle_regulator_air_pressure.length < 2
                  ? "0"
                  : state.data.nozzle_regulator_air_pressure.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.CELLS_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              cells_speed: state.data.cells_speed.length < 2 ? "0" : state.data.cells_speed.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_A_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_start_position:
                state.data.injection_a_start_position.length < 2
                  ? "0"
                  : state.data.injection_a_start_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_B_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_start_position:
                state.data.injection_b_start_position.length < 2
                  ? "0"
                  : state.data.injection_b_start_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_C_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_c_start_position:
                state.data.injection_c_start_position.length < 2
                  ? "0"
                  : state.data.injection_c_start_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_D_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_d_start_position:
                state.data.injection_d_start_position.length < 2
                  ? "0"
                  : state.data.injection_d_start_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_A_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_end_position:
                state.data.injection_a_end_position.length < 2 ? "0" : state.data.injection_a_end_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_B_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_end_position:
                state.data.injection_b_end_position.length < 2 ? "0" : state.data.injection_b_end_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_C_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_c_end_position:
                state.data.injection_c_end_position.length < 2 ? "0" : state.data.injection_c_end_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_D_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_d_end_position:
                state.data.injection_d_end_position.length < 2 ? "0" : state.data.injection_d_end_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.TUBE_MOLDING_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              tube_molding_start_position:
                state.data.tube_molding_start_position.length < 2
                  ? "0"
                  : state.data.tube_molding_start_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.TUBE_MOLDING_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              tube_molding_end_position:
                state.data.tube_molding_end_position.length < 2
                  ? "0"
                  : state.data.tube_molding_end_position.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.POLIMERIZATION_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              polimerization_furnace_temp:
                state.data.polimerization_furnace_temp.length < 2
                  ? "0"
                  : state.data.polimerization_furnace_temp.slice(0, -1),
            },
          }));
          break;
        case VarnishInputParams.INTERNAL_VARNISH_POROSITY:
          set((state) => ({
            data: {
              ...state.data,
              internal_varnish_porosity:
                state.data.internal_varnish_porosity.length < 2
                  ? "0"
                  : state.data.internal_varnish_porosity.slice(0, -1),
            },
          }));
          break;
        default:
          break;
      }
    },
    changeData: ({ key, value }) => {
      switch (key) {
        case VarnishInputParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value:
                (state.data.counter_value.includes(".") && value == ".") || state.data.counter_value.length >= 8
                  ? state.data.counter_value
                  : value == "."
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
        case VarnishInputParams.VARNISH_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              varnish_machine_speed:
                (state.data.varnish_machine_speed.includes(".") && value == ".") ||
                state.data.varnish_machine_speed.length >= 8
                  ? state.data.varnish_machine_speed
                  : value == "."
                  ? state.data.varnish_machine_speed + value
                  : value === "0" &&
                    Number(state.data.varnish_machine_speed + value) === 0 &&
                    state.data.varnish_machine_speed.includes(".")
                  ? state.data.varnish_machine_speed + value
                  : value === "0" && Number(state.data.varnish_machine_speed + value) !== 0
                  ? state.data.varnish_machine_speed + value
                  : Number(state.data.varnish_machine_speed + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              total_air_pressure:
                (state.data.total_air_pressure.includes(".") && value == ".") ||
                state.data.total_air_pressure.length >= 8
                  ? state.data.total_air_pressure
                  : value == "."
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
        case VarnishInputParams.FEED_CAN_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              feed_can_air_pressure:
                (state.data.feed_can_air_pressure.includes(".") && value == ".") ||
                state.data.feed_can_air_pressure.length >= 8
                  ? state.data.feed_can_air_pressure
                  : value == "."
                  ? state.data.feed_can_air_pressure + value
                  : value === "0" &&
                    Number(state.data.feed_can_air_pressure + value) === 0 &&
                    state.data.feed_can_air_pressure.includes(".")
                  ? state.data.feed_can_air_pressure + value
                  : value === "0" && Number(state.data.feed_can_air_pressure + value) !== 0
                  ? state.data.feed_can_air_pressure + value
                  : Number(state.data.feed_can_air_pressure + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              nozzle_regulator_air_pressure:
                (state.data.nozzle_regulator_air_pressure.includes(".") && value == ".") ||
                state.data.nozzle_regulator_air_pressure.length >= 8
                  ? state.data.nozzle_regulator_air_pressure
                  : value == "."
                  ? state.data.nozzle_regulator_air_pressure + value
                  : value === "0" &&
                    Number(state.data.nozzle_regulator_air_pressure + value) === 0 &&
                    state.data.nozzle_regulator_air_pressure.includes(".")
                  ? state.data.nozzle_regulator_air_pressure + value
                  : value === "0" && Number(state.data.nozzle_regulator_air_pressure + value) !== 0
                  ? state.data.nozzle_regulator_air_pressure + value
                  : Number(state.data.nozzle_regulator_air_pressure + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.CELLS_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              cells_speed:
                (state.data.cells_speed.includes(".") && value == ".") || state.data.cells_speed.length >= 8
                  ? state.data.cells_speed
                  : value == "."
                  ? state.data.cells_speed + value
                  : value === "0" &&
                    Number(state.data.cells_speed + value) === 0 &&
                    state.data.cells_speed.includes(".")
                  ? state.data.cells_speed + value
                  : value === "0" && Number(state.data.cells_speed + value) !== 0
                  ? state.data.cells_speed + value
                  : Number(state.data.cells_speed + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_A_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_start_position:
                (state.data.injection_a_start_position.includes(".") && value == ".") ||
                state.data.injection_a_start_position.length >= 8
                  ? state.data.injection_a_start_position
                  : value == "."
                  ? state.data.injection_a_start_position + value
                  : value === "0" &&
                    Number(state.data.injection_a_start_position + value) === 0 &&
                    state.data.injection_a_start_position.includes(".")
                  ? state.data.injection_a_start_position + value
                  : value === "0" && Number(state.data.injection_a_start_position + value) !== 0
                  ? state.data.injection_a_start_position + value
                  : Number(state.data.injection_a_start_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_B_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_start_position:
                (state.data.injection_b_start_position.includes(".") && value == ".") ||
                state.data.injection_b_start_position.length >= 8
                  ? state.data.injection_b_start_position
                  : value == "."
                  ? state.data.injection_b_start_position + value
                  : value === "0" &&
                    Number(state.data.injection_b_start_position + value) === 0 &&
                    state.data.injection_b_start_position.includes(".")
                  ? state.data.injection_b_start_position + value
                  : value === "0" && Number(state.data.injection_b_start_position + value) !== 0
                  ? state.data.injection_b_start_position + value
                  : Number(state.data.injection_b_start_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_C_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_c_start_position:
                (state.data.injection_c_start_position.includes(".") && value == ".") ||
                state.data.injection_c_start_position.length >= 8
                  ? state.data.injection_c_start_position
                  : value == "."
                  ? state.data.injection_c_start_position + value
                  : value === "0" &&
                    Number(state.data.injection_c_start_position + value) === 0 &&
                    state.data.injection_c_start_position.includes(".")
                  ? state.data.injection_c_start_position + value
                  : value === "0" && Number(state.data.injection_c_start_position + value) !== 0
                  ? state.data.injection_c_start_position + value
                  : Number(state.data.injection_c_start_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_D_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_d_start_position:
                (state.data.injection_d_start_position.includes(".") && value == ".") ||
                state.data.injection_d_start_position.length >= 8
                  ? state.data.injection_d_start_position
                  : value == "."
                  ? state.data.injection_d_start_position + value
                  : value === "0" &&
                    Number(state.data.injection_d_start_position + value) === 0 &&
                    state.data.injection_d_start_position.includes(".")
                  ? state.data.injection_d_start_position + value
                  : value === "0" && Number(state.data.injection_d_start_position + value) !== 0
                  ? state.data.injection_d_start_position + value
                  : Number(state.data.injection_d_start_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_A_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_end_position:
                (state.data.injection_a_end_position.includes(".") && value == ".") ||
                state.data.injection_a_end_position.length >= 8
                  ? state.data.injection_a_end_position
                  : value == "."
                  ? state.data.injection_a_end_position + value
                  : value === "0" &&
                    Number(state.data.injection_a_end_position + value) === 0 &&
                    state.data.injection_a_end_position.includes(".")
                  ? state.data.injection_a_end_position + value
                  : value === "0" && Number(state.data.injection_a_end_position + value) !== 0
                  ? state.data.injection_a_end_position + value
                  : Number(state.data.injection_a_end_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_B_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_end_position:
                (state.data.injection_b_end_position.includes(".") && value == ".") ||
                state.data.injection_b_end_position.length >= 8
                  ? state.data.injection_b_end_position
                  : value == "."
                  ? state.data.injection_b_end_position + value
                  : value === "0" &&
                    Number(state.data.injection_b_end_position + value) === 0 &&
                    state.data.injection_b_end_position.includes(".")
                  ? state.data.injection_b_end_position + value
                  : value === "0" && Number(state.data.injection_b_end_position + value) !== 0
                  ? state.data.injection_b_end_position + value
                  : Number(state.data.injection_b_end_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_C_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_c_end_position:
                (state.data.injection_c_end_position.includes(".") && value == ".") ||
                state.data.injection_c_end_position.length >= 8
                  ? state.data.injection_c_end_position
                  : value == "."
                  ? state.data.injection_c_end_position + value
                  : value === "0" &&
                    Number(state.data.injection_c_end_position + value) === 0 &&
                    state.data.injection_c_end_position.includes(".")
                  ? state.data.injection_c_end_position + value
                  : value === "0" && Number(state.data.injection_c_end_position + value) !== 0
                  ? state.data.injection_c_end_position + value
                  : Number(state.data.injection_c_end_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_D_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_d_end_position:
                (state.data.injection_d_end_position.includes(".") && value == ".") ||
                state.data.injection_d_end_position.length >= 8
                  ? state.data.injection_d_end_position
                  : value == "."
                  ? state.data.injection_d_end_position + value
                  : value === "0" &&
                    Number(state.data.injection_d_end_position + value) === 0 &&
                    state.data.injection_d_end_position.includes(".")
                  ? state.data.injection_d_end_position + value
                  : value === "0" && Number(state.data.injection_d_end_position + value) !== 0
                  ? state.data.injection_d_end_position + value
                  : Number(state.data.injection_d_end_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.TUBE_MOLDING_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              tube_molding_start_position:
                (state.data.tube_molding_start_position.includes(".") && value == ".") ||
                state.data.tube_molding_start_position.length >= 8
                  ? state.data.tube_molding_start_position
                  : value == "."
                  ? state.data.tube_molding_start_position + value
                  : value === "0" &&
                    Number(state.data.tube_molding_start_position + value) === 0 &&
                    state.data.tube_molding_start_position.includes(".")
                  ? state.data.tube_molding_start_position + value
                  : value === "0" && Number(state.data.tube_molding_start_position + value) !== 0
                  ? state.data.tube_molding_start_position + value
                  : Number(state.data.tube_molding_start_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.TUBE_MOLDING_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              tube_molding_end_position:
                (state.data.tube_molding_end_position.includes(".") && value == ".") ||
                state.data.tube_molding_end_position.length >= 8
                  ? state.data.tube_molding_end_position
                  : value == "."
                  ? state.data.tube_molding_end_position + value
                  : value === "0" &&
                    Number(state.data.tube_molding_end_position + value) === 0 &&
                    state.data.tube_molding_end_position.includes(".")
                  ? state.data.tube_molding_end_position + value
                  : value === "0" && Number(state.data.tube_molding_end_position + value) !== 0
                  ? state.data.tube_molding_end_position + value
                  : Number(state.data.tube_molding_end_position + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.POLIMERIZATION_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              polimerization_furnace_temp:
                (state.data.polimerization_furnace_temp.includes(".") && value == ".") ||
                state.data.polimerization_furnace_temp.length >= 8
                  ? state.data.polimerization_furnace_temp
                  : value == "."
                  ? state.data.polimerization_furnace_temp + value
                  : value === "0" &&
                    Number(state.data.polimerization_furnace_temp + value) === 0 &&
                    state.data.polimerization_furnace_temp.includes(".")
                  ? state.data.polimerization_furnace_temp + value
                  : value === "0" && Number(state.data.polimerization_furnace_temp + value) !== 0
                  ? state.data.polimerization_furnace_temp + value
                  : Number(state.data.polimerization_furnace_temp + value).toString(),
            },
          }));
          break;
        case VarnishInputParams.INTERNAL_VARNISH_POROSITY:
          set((state) => ({
            data: {
              ...state.data,
              internal_varnish_porosity:
                (state.data.internal_varnish_porosity.includes(".") && value == ".") ||
                state.data.internal_varnish_porosity.length >= 8
                  ? state.data.internal_varnish_porosity
                  : value == "."
                  ? state.data.internal_varnish_porosity + value
                  : value === "0" &&
                    Number(state.data.internal_varnish_porosity + value) === 0 &&
                    state.data.internal_varnish_porosity.includes(".")
                  ? state.data.internal_varnish_porosity + value
                  : value === "0" && Number(state.data.internal_varnish_porosity + value) !== 0
                  ? state.data.internal_varnish_porosity + value
                  : Number(state.data.internal_varnish_porosity + value).toString(),
            },
          }));
          break;

        case VarnishInputParams.INTERNAL_SECTIONAL_VIEW:
          set((state) => ({
            data: {
              ...state.data,
              internal_sectional_view: value === "true" ? true : false,
            },
          }));

          break;
        case VarnishInputParams.ALUMINIUM_CLEARANCE_LACK:
          set((state) => ({
            data: {
              ...state.data,
              aluminium_clearance_lack: value === "true" ? true : false,
            },
          }));

          break;
        case VarnishInputParams.UNPAINTING_LACK:
          set((state) => ({
            data: {
              ...state.data,
              unpainting_lack: value === "true" ? true : false,
            },
          }));
          break;
        default:
          break;
      }
    },
    roundData: ({ key }) => {
      switch (key) {
        case VarnishInputParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value: Number(state.data.counter_value).toString(),
            },
          }));
          break;
        case VarnishInputParams.VARNISH_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              varnish_machine_speed: Number(state.data.varnish_machine_speed).toString(),
            },
          }));
          break;
        case VarnishInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              total_air_pressure: Number(state.data.total_air_pressure).toString(),
            },
          }));
          break;
        case VarnishInputParams.FEED_CAN_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              feed_can_air_pressure: Number(state.data.feed_can_air_pressure).toString(),
            },
          }));
          break;
        case VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              nozzle_regulator_air_pressure: Number(state.data.nozzle_regulator_air_pressure).toString(),
            },
          }));
          break;
        case VarnishInputParams.CELLS_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              cells_speed: Number(state.data.cells_speed).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_A_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_start_position: Number(state.data.injection_a_start_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_B_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_start_position: Number(state.data.injection_b_start_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_C_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_c_start_position: Number(state.data.injection_c_start_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_D_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_d_start_position: Number(state.data.injection_d_start_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_A_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_end_position: Number(state.data.injection_a_end_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_B_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_end_position: Number(state.data.injection_b_end_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_C_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_c_end_position: Number(state.data.injection_c_end_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.INJECTION_D_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              injection_d_end_position: Number(state.data.injection_d_end_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.TUBE_MOLDING_START_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              tube_molding_start_position: Number(state.data.tube_molding_start_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.TUBE_MOLDING_END_POSITION:
          set((state) => ({
            data: {
              ...state.data,
              tube_molding_end_position: Number(state.data.tube_molding_end_position).toString(),
            },
          }));
          break;
        case VarnishInputParams.POLIMERIZATION_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              polimerization_furnace_temp: Number(state.data.polimerization_furnace_temp).toString(),
            },
          }));
          break;
        case VarnishInputParams.INTERNAL_VARNISH_POROSITY:
          set((state) => ({
            data: {
              ...state.data,
              internal_varnish_porosity: Number(state.data.internal_varnish_porosity).toString(),
            },
          }));
          break;
        default:
          break;
      }
    },
  }))
);
