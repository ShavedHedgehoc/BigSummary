import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ITubeConveyor } from "../../../../shared/api/services/tube-conveyors-service";
import { ITubeProduct } from "../../../../shared/api/services/tube-products-service";
import { IVarnishTreshold } from "../../../../shared/api/services/tube-tresholds-service";

interface FormField {
  key: string;
  value: string;
  values?: number[];
}

interface VarnishTresholds {
  product_id: number | null;
  conveyor_id: number | null;
  varnish_machine_speed_min: string;
  varnish_machine_speed_max: string;
  total_air_pressure_min: string;
  total_air_pressure_max: string;
  feed_can_air_pressure_min: string;
  feed_can_air_pressure_max: string;
  nozzle_regulator_air_pressure_min: string;
  nozzle_regulator_air_pressure_max: string;
  cells_speed_min: string;
  cells_speed_max: string;
  injection_a_start_position_min: string;
  injection_a_start_position_max: string;
  injection_b_start_position_min: string;
  injection_b_start_position_max: string;
  injection_c_start_position_min: string;
  injection_c_start_position_max: string;
  injection_d_start_position_min: string;
  injection_d_start_position_max: string;
  injection_a_end_position_min: string;
  injection_a_end_position_max: string;
  injection_b_end_position_min: string;
  injection_b_end_position_max: string;
  injection_c_end_position_min: string;
  injection_c_end_position_max: string;
  injection_d_end_position_min: string;
  injection_d_end_position_max: string;
  tube_molding_start_position_min: string;
  tube_molding_start_position_max: string;
  tube_molding_end_position_min: string;
  tube_molding_end_position_max: string;
  polimerization_furnace_temp_min: string;
  polimerization_furnace_temp_max: string;
  internal_varnish_porosity_min: string;
  internal_varnish_porosity_max: string;
}

interface TubeVarnishTresholdsStore {
  tresholds: VarnishTresholds;
  conveyorSelectorOptions: ITubeConveyor[] | [];
  productSelectorOptions: ITubeProduct[] | [];
  selectedConveyorOption: number | null;
  selectedProductOption: number | null;
  clearTresholds: () => void;
  changeTresholds: (value: FormField) => void;
  fillConveyorSelectorOptions: (values: ITubeConveyor[]) => void;
  fillProductSelectorOptions: (values: ITubeProduct[]) => void;
  setSelectedConveyorOption: (value: number) => void;
  setSelectedProductOption: (value: number) => void;
  setTreshold: (value: IVarnishTreshold) => void;
}

const initTresholdsValue: VarnishTresholds = {
  product_id: null,
  conveyor_id: null,
  varnish_machine_speed_min: "",
  varnish_machine_speed_max: "",
  total_air_pressure_min: "",
  total_air_pressure_max: "",
  feed_can_air_pressure_min: "",
  feed_can_air_pressure_max: "",
  nozzle_regulator_air_pressure_min: "",
  nozzle_regulator_air_pressure_max: "",
  cells_speed_min: "",
  cells_speed_max: "",
  injection_a_start_position_min: "",
  injection_a_start_position_max: "",
  injection_b_start_position_min: "",
  injection_b_start_position_max: "",
  injection_c_start_position_min: "",
  injection_c_start_position_max: "",
  injection_d_start_position_min: "",
  injection_d_start_position_max: "",
  injection_a_end_position_min: "",
  injection_a_end_position_max: "",
  injection_b_end_position_min: "",
  injection_b_end_position_max: "",
  injection_c_end_position_min: "",
  injection_c_end_position_max: "",
  injection_d_end_position_min: "",
  injection_d_end_position_max: "",
  tube_molding_start_position_min: "",
  tube_molding_start_position_max: "",
  tube_molding_end_position_min: "",
  tube_molding_end_position_max: "",
  polimerization_furnace_temp_min: "",
  polimerization_furnace_temp_max: "",
  internal_varnish_porosity_min: "",
  internal_varnish_porosity_max: "",
};
export enum VarnishTresholdsParams {
  PRODUCT_ID = "product_id",
  CONVEYOR_ID = "conveyor_id",
  VARNISH_MACHINE_SPEED_MIN = "varnish_machine_speed_min",
  TOTAL_AIR_PRESSURE_MIN = "total_air_pressure_min",
  FEED_CAN_AIR_PRESSURE_MIN = "feed_can_air_pressure_min",
  NOZZLE_REGULATOR_AIR_PRESSURE_MIN = "nozzle_regulator_air_pressure_min",
  CELLS_SPEED_MIN = "cells_speed_min",
  INJECTION_A_START_POSITION_MIN = "injection_a_start_position_min",
  INJECTION_B_START_POSITION_MIN = "injection_b_start_position_min",
  INJECTION_C_START_POSITION_MIN = "injection_c_start_position_min",
  INJECTION_D_START_POSITION_MIN = "injection_d_start_position_min",
  INJECTION_A_END_POSITION_MIN = "injection_a_end_position_min",
  INJECTION_B_END_POSITION_MIN = "injection_b_end_position_min",
  INJECTION_C_END_POSITION_MIN = "injection_c_end_position_min",
  INJECTION_D_END_POSITION_MIN = "injection_d_end_position_min",
  TUBE_MOLDING_START_POSITION_MIN = "tube_molding_start_position_min",
  TUBE_MOLDING_END_POSITION_MIN = "tube_molding_end_position_min",
  POLIMERIZATION_FURNACE_TEMP_MIN = "polimerization_furnace_temp_min",
  INTERNAL_VARNISH_POROSITY_MIN = "internal_varnish_porosity_min",
  VARNISH_MACHINE_SPEED_MAX = "varnish_machine_speed_max",
  TOTAL_AIR_PRESSURE_MAX = "total_air_pressure_max",
  FEED_CAN_AIR_PRESSURE_MAX = "feed_can_air_pressure_max",
  NOZZLE_REGULATOR_AIR_PRESSURE_MAX = "nozzle_regulator_air_pressure_max",
  CELLS_SPEED_MAX = "cells_speed_max",
  INJECTION_A_START_POSITION_MAX = "injection_a_start_position_max",
  INJECTION_B_START_POSITION_MAX = "injection_b_start_position_max",
  INJECTION_C_START_POSITION_MAX = "injection_c_start_position_max",
  INJECTION_D_START_POSITION_MAX = "injection_d_start_position_max",
  INJECTION_A_END_POSITION_MAX = "injection_a_end_position_max",
  INJECTION_B_END_POSITION_MAX = "injection_b_end_position_max",
  INJECTION_C_END_POSITION_MAX = "injection_c_end_position_max",
  INJECTION_D_END_POSITION_MAX = "injection_d_end_position_max",
  TUBE_MOLDING_START_POSITION_MAX = "tube_molding_start_position_max",
  TUBE_MOLDING_END_POSITION_MAX = "tube_molding_end_position_max",
  POLIMERIZATION_FURNACE_TEMP_MAX = "polimerization_furnace_temp_max",
  INTERNAL_VARNISH_POROSITY_MAX = "internal_varnish_porosity_max",
}

export const useTubeVarnishTresholdsStore = create<TubeVarnishTresholdsStore>()(
  devtools((set) => ({
    tresholds: initTresholdsValue,
    selectedProductOption: null,
    productSelectorOptions: [],
    selectedConveyorOption: null,
    conveyorSelectorOptions: [],

    clearTresholds: () =>
      set(() => ({
        tresholds: initTresholdsValue,
        selectedConveyorOption: null,
        selectedProductOption: null,
      })),
    changeTresholds: ({ key, value, values }) => {
      switch (key) {
        case VarnishTresholdsParams.PRODUCT_ID:
          set((state) => ({
            tresholds: { ...state.tresholds, product_id: values?.length ? values[0] : state.tresholds.product_id },
          }));
          break;
        case VarnishTresholdsParams.CONVEYOR_ID:
          set((state) => ({
            tresholds: { ...state.tresholds, conveyor_id: values?.length ? values[0] : state.tresholds.conveyor_id },
          }));
          break;
        case VarnishTresholdsParams.VARNISH_MACHINE_SPEED_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, varnish_machine_speed_min: value } }));
          break;
        case VarnishTresholdsParams.VARNISH_MACHINE_SPEED_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, varnish_machine_speed_max: value } }));
          break;
        case VarnishTresholdsParams.TOTAL_AIR_PRESSURE_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, total_air_pressure_min: value } }));
          break;
        case VarnishTresholdsParams.TOTAL_AIR_PRESSURE_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, total_air_pressure_max: value } }));
          break;
        case VarnishTresholdsParams.FEED_CAN_AIR_PRESSURE_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, feed_can_air_pressure_min: value } }));
          break;
        case VarnishTresholdsParams.FEED_CAN_AIR_PRESSURE_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, feed_can_air_pressure_max: value } }));
          break;
        case VarnishTresholdsParams.NOZZLE_REGULATOR_AIR_PRESSURE_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, nozzle_regulator_air_pressure_min: value } }));
          break;
        case VarnishTresholdsParams.NOZZLE_REGULATOR_AIR_PRESSURE_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, nozzle_regulator_air_pressure_max: value } }));
          break;
        case VarnishTresholdsParams.CELLS_SPEED_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, cells_speed_min: value } }));
          break;
        case VarnishTresholdsParams.CELLS_SPEED_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, cells_speed_max: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_A_START_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_a_start_position_min: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_A_START_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_a_start_position_max: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_B_START_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_b_start_position_min: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_B_START_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_b_start_position_max: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_C_START_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_c_start_position_min: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_C_START_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_c_start_position_max: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_D_START_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_d_start_position_min: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_D_START_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_d_start_position_max: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_A_END_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_a_end_position_min: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_A_END_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_a_end_position_max: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_B_END_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_b_end_position_min: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_B_END_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_b_end_position_max: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_C_END_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_c_end_position_min: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_C_END_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_c_end_position_max: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_D_END_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_d_end_position_min: value } }));
          break;
        case VarnishTresholdsParams.INJECTION_D_END_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_d_end_position_max: value } }));
          break;
        case VarnishTresholdsParams.TUBE_MOLDING_START_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, tube_molding_start_position_min: value } }));
          break;
        case VarnishTresholdsParams.TUBE_MOLDING_START_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, tube_molding_start_position_max: value } }));
          break;
        case VarnishTresholdsParams.TUBE_MOLDING_END_POSITION_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, tube_molding_end_position_min: value } }));
          break;
        case VarnishTresholdsParams.TUBE_MOLDING_END_POSITION_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, tube_molding_end_position_max: value } }));
          break;
        case VarnishTresholdsParams.POLIMERIZATION_FURNACE_TEMP_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, polimerization_furnace_temp_min: value } }));
          break;
        case VarnishTresholdsParams.POLIMERIZATION_FURNACE_TEMP_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, polimerization_furnace_temp_max: value } }));
          break;
        case VarnishTresholdsParams.INTERNAL_VARNISH_POROSITY_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, internal_varnish_porosity_min: value } }));
          break;
        case VarnishTresholdsParams.INTERNAL_VARNISH_POROSITY_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, internal_varnish_porosity_max: value } }));
          break;
        default:
          break;
      }
    },
    fillConveyorSelectorOptions: (values) => set(() => ({ conveyorSelectorOptions: [...values] })),
    setSelectedConveyorOption: (value) => set(() => ({ selectedConveyorOption: value })),
    fillProductSelectorOptions: (values) => set(() => ({ productSelectorOptions: [...values] })),
    setSelectedProductOption: (value) => set(() => ({ selectedProductOption: value })),

    setTreshold: (value) =>
      set((state) => ({
        tresholds: {
          ...state.tresholds,
          product_id: value.product_id,
          conveyor_id: value.conveyor_id,
          varnish_machine_speed_min: value.varnish_machine_speed_min,
          varnish_machine_speed_max: value.varnish_machine_speed_max,
          total_air_pressure_min: value.total_air_pressure_min,
          total_air_pressure_max: value.total_air_pressure_max,
          feed_can_air_pressure_min: value.feed_can_air_pressure_min,
          feed_can_air_pressure_max: value.feed_can_air_pressure_max,
          nozzle_regulator_air_pressure_min: value.nozzle_regulator_air_pressure_min,
          nozzle_regulator_air_pressure_max: value.nozzle_regulator_air_pressure_max,
          cells_speed_min: value.cells_speed_min,
          cells_speed_max: value.cells_speed_max,
          injection_a_start_position_min: value.injection_a_start_position_min,
          injection_a_start_position_max: value.injection_a_start_position_max,
          injection_b_start_position_min: value.injection_b_start_position_min,
          injection_b_start_position_max: value.injection_b_start_position_max,
          injection_c_start_position_min: value.injection_c_start_position_min,
          injection_c_start_position_max: value.injection_c_start_position_max,
          injection_d_start_position_min: value.injection_d_start_position_min,
          injection_d_start_position_max: value.injection_d_start_position_max,
          injection_a_end_position_min: value.injection_a_end_position_min,
          injection_a_end_position_max: value.injection_a_end_position_max,
          injection_b_end_position_min: value.injection_b_end_position_min,
          injection_b_end_position_max: value.injection_b_end_position_max,
          injection_c_end_position_min: value.injection_c_end_position_min,
          injection_c_end_position_max: value.injection_c_end_position_max,
          injection_d_end_position_min: value.injection_d_end_position_min,
          injection_d_end_position_max: value.injection_d_end_position_max,
          tube_molding_start_position_min: value.tube_molding_start_position_min,
          tube_molding_start_position_max: value.tube_molding_start_position_max,
          tube_molding_end_position_min: value.tube_molding_end_position_min,
          tube_molding_end_position_max: value.tube_molding_end_position_max,
          polimerization_furnace_temp_min: value.polimerization_furnace_temp_min,
          polimerization_furnace_temp_max: value.polimerization_furnace_temp_max,
          internal_varnish_porosity_min: value.internal_varnish_porosity_min,
          internal_varnish_porosity_max: value.internal_varnish_porosity_max,
        },
        selectedProductOption: value.product_id,
        selectedConveyorOption: value.conveyor_id,
      })),
  }))
);
