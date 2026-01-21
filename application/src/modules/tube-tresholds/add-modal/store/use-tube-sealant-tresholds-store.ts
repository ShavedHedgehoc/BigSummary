import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ITubeConveyor } from "../../../../shared/api/services/tube-conveyors-service";
import { ITubeProduct } from "../../../../shared/api/services/tube-products-service";
import { ISealantTreshold } from "../../../../shared/api/services/tube-tresholds-service";

interface FormField {
  key: string;
  value: string;
  values?: number[];
}

interface SealantTresholds {
  product_id: number | null;
  conveyor_id: number | null;
  cap_machine_speed_min: string;
  cap_machine_speed_max: string;
  total_air_pressure_min: string;
  total_air_pressure_max: string;
  holders_forward_min: string;
  holders_forward_max: string;
  holders_opening_left_min: string;
  holders_opening_left_max: string;
  holders_opening_right_min: string;
  holders_opening_right_max: string;
  holders_closing_min: string;
  holders_closing_max: string;
  injection_a_start_min: string;
  injection_a_start_max: string;
  injection_b_start_min: string;
  injection_b_start_max: string;
  injection_a_end_min: string;
  injection_a_end_max: string;
  injection_b_end_min: string;
  injection_b_end_max: string;
  injection_tube_orientation_start_min: string;
  injection_tube_orientation_start_max: string;
  injection_tube_orientation_end_min: string;
  injection_tube_orientation_end_max: string;
  latex_ring_padding_min: string;
  latex_ring_padding_max: string;
  latex_ring_width_min: string;
  latex_ring_width_max: string;
  tube_rigidity_min: string;
  tube_rigidity_max: string;
  cap_unscrewing_torque_min: string;
  cap_unscrewing_torque_max: string;
}

interface TubeSealantTresholdsStore {
  tresholds: SealantTresholds;
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
  setTreshold: (value: ISealantTreshold) => void;
}

const initTresholdsValue: SealantTresholds = {
  product_id: null,
  conveyor_id: null,
  cap_machine_speed_min: "",
  cap_machine_speed_max: "",
  total_air_pressure_min: "",
  total_air_pressure_max: "",
  holders_forward_min: "",
  holders_forward_max: "",
  holders_opening_left_min: "",
  holders_opening_left_max: "",
  holders_opening_right_min: "",
  holders_opening_right_max: "",
  holders_closing_min: "",
  holders_closing_max: "",
  injection_a_start_min: "",
  injection_a_start_max: "",
  injection_b_start_min: "",
  injection_b_start_max: "",
  injection_a_end_min: "",
  injection_a_end_max: "",
  injection_b_end_min: "",
  injection_b_end_max: "",
  injection_tube_orientation_start_min: "",
  injection_tube_orientation_start_max: "",
  injection_tube_orientation_end_min: "",
  injection_tube_orientation_end_max: "",
  latex_ring_padding_min: "",
  latex_ring_padding_max: "",
  latex_ring_width_min: "",
  latex_ring_width_max: "",
  tube_rigidity_min: "",
  tube_rigidity_max: "",
  cap_unscrewing_torque_min: "",
  cap_unscrewing_torque_max: "",
};
export enum SealantTresholdsParams {
  PRODUCT_ID = "product_id",
  CONVEYOR_ID = "conveyor_id",
  CAP_MACHINE_SPEED_MIN = "cap_machine_speed_min",
  CAP_MACHINE_SPEED_MAX = "cap_machine_speed_max",
  TOTAL_AIR_PRESSURE_MIN = "total_air_pressure_min",
  TOTAL_AIR_PRESSURE_MAX = "total_air_pressure_max",
  HOLDERS_FORWARD_MIN = "holders_forward_min",
  HOLDERS_FORWARD_MAX = "holders_forward_max",
  HOLDERS_OPENING_LEFT_MIN = "holders_opening_left_min",
  HOLDERS_OPENING_LEFT_MAX = "holders_opening_left_max",
  HOLDERS_OPENING_RIGHT_MIN = "holders_opening_right_min",
  HOLDERS_OPENING_RIGHT_MAX = "holders_opening_right_max",
  HOLDERS_CLOSING_MIN = "holders_closing_min",
  HOLDERS_CLOSING_MAX = "holders_closing_max",
  INJECTION_A_START_MIN = "injection_a_start_min",
  INJECTION_A_START_MAX = "injection_a_start_max",
  INJECTION_B_START_MIN = "injection_b_start_min",
  INJECTION_B_START_MAX = "injection_b_start_max",
  INJECTION_A_END_MIN = "injection_a_end_min",
  INJECTION_A_END_MAX = "injection_a_end_max",
  INJECTION_B_END_MIN = "injection_b_end_min",
  INJECTION_B_END_MAX = "injection_b_end_max",
  INJECTION_TUBE_ORIENTATION_START_MIN = "injection_tube_orientation_start_min",
  INJECTION_TUBE_ORIENTATION_START_MAX = "injection_tube_orientation_start_max",
  INJECTION_TUBE_ORIENTATION_END_MIN = "injection_tube_orientation_end_min",
  INJECTION_TUBE_ORIENTATION_END_MAX = "injection_tube_orientation_end_max",
  LATEX_RING_PADDING_MIN = "latex_ring_padding_min",
  LATEX_RING_PADDING_MAX = "latex_ring_padding_max",
  LATEX_RING_WIDTH_MIN = "latex_ring_width_min",
  LATEX_RING_WIDTH_MAX = "latex_ring_width_max",
  TUBE_RIGIDITY_MIN = "tube_rigidity_min",
  TUBE_RIGIDITY_MAX = "tube_rigidity_max",
  CAP_UNSCREWING_TORQUE_MIN = "cap_unscrewing_torque_min",
  CAP_UNSCREWING_TORQUE_MAX = "cap_unscrewing_torque_max",
}

export const useTubeSealantTresholdsStore = create<TubeSealantTresholdsStore>()(
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
        case SealantTresholdsParams.PRODUCT_ID:
          set((state) => ({
            tresholds: { ...state.tresholds, product_id: values?.length ? values[0] : state.tresholds.product_id },
          }));
          break;
        case SealantTresholdsParams.CONVEYOR_ID:
          set((state) => ({
            tresholds: { ...state.tresholds, conveyor_id: values?.length ? values[0] : state.tresholds.conveyor_id },
          }));
          break;
        case SealantTresholdsParams.CAP_MACHINE_SPEED_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, cap_machine_speed_min: value } }));
          break;
        case SealantTresholdsParams.CAP_MACHINE_SPEED_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, cap_machine_speed_max: value } }));
          break;
        case SealantTresholdsParams.TOTAL_AIR_PRESSURE_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, total_air_pressure_min: value } }));
          break;
        case SealantTresholdsParams.TOTAL_AIR_PRESSURE_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, total_air_pressure_max: value } }));
          break;
        case SealantTresholdsParams.HOLDERS_FORWARD_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, holders_forward_min: value } }));
          break;
        case SealantTresholdsParams.HOLDERS_FORWARD_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, holders_forward_max: value } }));
          break;
        case SealantTresholdsParams.HOLDERS_OPENING_LEFT_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, holders_opening_left_min: value } }));
          break;
        case SealantTresholdsParams.HOLDERS_OPENING_LEFT_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, holders_opening_left_max: value } }));
          break;
        case SealantTresholdsParams.HOLDERS_OPENING_RIGHT_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, holders_opening_right_min: value } }));
          break;
        case SealantTresholdsParams.HOLDERS_OPENING_RIGHT_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, holders_opening_right_max: value } }));
          break;
        case SealantTresholdsParams.HOLDERS_CLOSING_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, holders_closing_min: value } }));
          break;
        case SealantTresholdsParams.HOLDERS_CLOSING_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, holders_closing_max: value } }));
          break;
        case SealantTresholdsParams.INJECTION_A_START_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_a_start_min: value } }));
          break;
        case SealantTresholdsParams.INJECTION_A_START_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_a_start_max: value } }));
          break;
        case SealantTresholdsParams.INJECTION_B_START_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_b_start_min: value } }));
          break;
        case SealantTresholdsParams.INJECTION_B_START_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_b_start_max: value } }));
          break;
        case SealantTresholdsParams.INJECTION_A_END_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_a_end_min: value } }));
          break;
        case SealantTresholdsParams.INJECTION_A_END_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_a_end_max: value } }));
          break;
        case SealantTresholdsParams.INJECTION_B_END_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_b_end_min: value } }));
          break;
        case SealantTresholdsParams.INJECTION_B_END_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_b_end_max: value } }));
          break;
        case SealantTresholdsParams.INJECTION_TUBE_ORIENTATION_START_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_tube_orientation_start_min: value } }));
          break;
        case SealantTresholdsParams.INJECTION_TUBE_ORIENTATION_START_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_tube_orientation_start_max: value } }));
          break;
        case SealantTresholdsParams.INJECTION_TUBE_ORIENTATION_END_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, injection_tube_orientation_end_min: value } }));
          break;
        case SealantTresholdsParams.INJECTION_TUBE_ORIENTATION_END_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, injection_tube_orientation_end_max: value } }));
          break;
        case SealantTresholdsParams.LATEX_RING_PADDING_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, latex_ring_padding_min: value } }));
          break;
        case SealantTresholdsParams.LATEX_RING_PADDING_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, latex_ring_padding_max: value } }));
          break;
        case SealantTresholdsParams.LATEX_RING_WIDTH_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, latex_ring_width_min: value } }));
          break;
        case SealantTresholdsParams.LATEX_RING_WIDTH_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, latex_ring_width_max: value } }));
          break;
        case SealantTresholdsParams.TUBE_RIGIDITY_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, tube_rigidity_min: value } }));
          break;
        case SealantTresholdsParams.TUBE_RIGIDITY_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, tube_rigidity_max: value } }));
          break;
        case SealantTresholdsParams.CAP_UNSCREWING_TORQUE_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, cap_unscrewing_torque_min: value } }));
          break;
        case SealantTresholdsParams.CAP_UNSCREWING_TORQUE_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, cap_unscrewing_torque_max: value } }));
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
          cap_machine_speed_min: value.cap_machine_speed_min,
          cap_machine_speed_max: value.cap_machine_speed_max,
          total_air_pressure_min: value.total_air_pressure_min,
          total_air_pressure_max: value.total_air_pressure_max,
          holders_forward_min: value.holders_forward_min,
          holders_forward_max: value.holders_forward_max,
          holders_opening_left_min: value.holders_opening_left_min,
          holders_opening_left_max: value.holders_opening_left_max,
          holders_opening_right_min: value.holders_opening_right_min,
          holders_opening_right_max: value.holders_opening_right_max,
          holders_closing_min: value.holders_closing_min,
          holders_closing_max: value.holders_closing_max,
          injection_a_start_min: value.injection_a_start_min,
          injection_a_start_max: value.injection_a_start_max,
          injection_b_start_min: value.injection_b_start_min,
          injection_b_start_max: value.injection_b_start_max,
          injection_a_end_min: value.injection_a_end_min,
          injection_a_end_max: value.injection_a_end_max,
          injection_b_end_min: value.injection_b_end_min,
          injection_b_end_max: value.injection_b_end_max,
          injection_tube_orientation_start_min: value.injection_tube_orientation_start_min,
          injection_tube_orientation_start_max: value.injection_tube_orientation_start_max,
          injection_tube_orientation_end_min: value.injection_tube_orientation_end_min,
          injection_tube_orientation_end_max: value.injection_tube_orientation_end_max,
          latex_ring_padding_min: value.latex_ring_padding_min,
          latex_ring_padding_max: value.latex_ring_padding_max,
          latex_ring_width_min: value.latex_ring_width_min,
          latex_ring_width_max: value.latex_ring_width_max,
          tube_rigidity_min: value.tube_rigidity_min,
          tube_rigidity_max: value.tube_rigidity_max,
          cap_unscrewing_torque_min: value.cap_unscrewing_torque_min,
          cap_unscrewing_torque_max: value.cap_unscrewing_torque_max,
        },
        selectedProductOption: value.product_id,
        selectedConveyorOption: value.conveyor_id,
      })),
  }))
);
