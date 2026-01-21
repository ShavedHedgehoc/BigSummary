import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ITubeConveyor } from "../../../../shared/api/services/tube-conveyors-service";
import { ITubeProduct } from "../../../../shared/api/services/tube-products-service";
import { ITubeRondel } from "../../../../shared/api/services/tube-rondel-service";
import { IExtrusionTreshold } from "../../../../shared/api/services/tube-tresholds-service";

interface FormField {
  key: string;
  value: string;
  values?: number[];
}

interface ExtrusionTresholds {
  product_id: number | null;
  conveyor_id: number | null;
  press_speed_min: string;
  press_speed_max: string;
  blow_time_min: string;
  blow_time_max: string;
  turning_machine_speed_min: string;
  turning_machine_speed_max: string;
  annealing_furnace_temp_min: string;
  annealing_furnace_temp_max: string;
  rondel_id: number | null;
  tube_cilindrical_section_length_min: string;
  tube_cilindrical_section_length_max: string;
  membrane_thickness_min: string;
  membrane_thickness_max: string;
  tube_diameter_min: string;
  tube_diameter_max: string;
  tube_cilindrical_section_thickness_min: string;
  tube_cilindrical_section_thickness_max: string;
  tube_rigidity_min: string;
  tube_rigidity_max: string;
  external_thread_value: string;
}

interface TubeExtrusionTresholdsStore {
  tresholds: ExtrusionTresholds;
  conveyorSelectorOptions: ITubeConveyor[] | [];
  productSelectorOptions: ITubeProduct[] | [];
  rondelSelectorOptions: ITubeRondel[] | [];
  selectedConveyorOption: number | null;
  selectedRondelOption: number | null;
  selectedProductOption: number | null;
  clearTresholds: () => void;
  changeTresholds: (value: FormField) => void;
  fillConveyorSelectorOptions: (values: ITubeConveyor[]) => void;
  fillProductSelectorOptions: (values: ITubeProduct[]) => void;
  fillRondelSelectorOptions: (values: ITubeRondel[]) => void;
  setSelectedRondelOption: (value: number) => void;
  setSelectedConveyorOption: (value: number) => void;
  setSelectedProductOption: (value: number) => void;
  setTreshold: (value: IExtrusionTreshold) => void;
}

const initTresholdsValue: ExtrusionTresholds = {
  product_id: null,
  conveyor_id: null,
  press_speed_min: "",
  press_speed_max: "",
  blow_time_min: "",
  blow_time_max: "",
  turning_machine_speed_min: "",
  turning_machine_speed_max: "",
  annealing_furnace_temp_min: "",
  annealing_furnace_temp_max: "",
  rondel_id: null,
  tube_cilindrical_section_length_min: "",
  tube_cilindrical_section_length_max: "",
  membrane_thickness_min: "",
  membrane_thickness_max: "",
  tube_diameter_min: "",
  tube_diameter_max: "",
  tube_cilindrical_section_thickness_min: "",
  tube_cilindrical_section_thickness_max: "",
  tube_rigidity_min: "",
  tube_rigidity_max: "",
  external_thread_value: "М11х1.5",
};
export enum ExtrusionTresholdsParams {
  PRODUCT_ID = "product_id",
  CONVEYOR_ID = "conveyor_id",
  PRESS_SPEED_MIN = "press_speed_min",
  PRESS_SPEED_MAX = "press_speed_max",
  BLOW_TIME_MIN = "blow_time_min",
  BLOW_TIME_MAX = "blow_time_max",
  TURNING_MACHINE_SPEED_MIN = "turning_machine_speed_min",
  TURNING_MACHINE_SPEED_MAX = "turning_machine_speed_max",
  ANNEALING_FURNACE_TEMP_MIN = "annealing_furnace_temp_min",
  ANNEALING_FURNACE_TEMP_MAX = "annealing_furnace_temp_max",
  RONDEL_ID = "rondel_id",
  TUBE_CILINDRICAL_SECTION_LENGTH_MIN = "tube_cilindrical_section_length_min",
  TUBE_CILINDRICAL_SECTION_LENGTH_MAX = "tube_cilindrical_section_length_max",
  MEMBRANE_THICKNESS_MIN = "membrane_thickness_min",
  MEMBRANE_THICKNESS_MAX = "membrane_thickness_max",
  TUBE_DIAMETER_MIN = "tube_diameter_min",
  TUBE_DIAMETER_MAX = "tube_diameter_max",
  TUBE_CILINDRICAL_SECTION_THICKNESS_MIN = "tube_cilindrical_section_thickness_min",
  TUBE_CILINDRICAL_SECTION_THICKNESS_MAX = "tube_cilindrical_section_thickness_max",
  TUBE_RIGIDITY_MIN = "tube_rigidity_min",
  TUBE_RIGIDITY_MAX = "tube_rigidity_max",
  EXTERNAL_THREAD_VALUE = "external_thread_value",
}

export const useTubeExtrusionTresholdsStore = create<TubeExtrusionTresholdsStore>()(
  devtools((set) => ({
    tresholds: initTresholdsValue,
    selectedProductOption: null,
    productSelectorOptions: [],
    selectedConveyorOption: null,
    conveyorSelectorOptions: [],
    selectedRondelOption: null,
    rondelSelectorOptions: [],

    clearTresholds: () =>
      set(() => ({
        tresholds: initTresholdsValue,
        selectedRondelOption: null,
        selectedConveyorOption: null,
        selectedProductOption: null,
      })),
    changeTresholds: ({ key, value, values }) => {
      switch (key) {
        case ExtrusionTresholdsParams.PRODUCT_ID:
          set((state) => ({
            tresholds: { ...state.tresholds, product_id: values?.length ? values[0] : state.tresholds.product_id },
          }));
          break;
        case ExtrusionTresholdsParams.CONVEYOR_ID:
          set((state) => ({
            tresholds: { ...state.tresholds, conveyor_id: values?.length ? values[0] : state.tresholds.conveyor_id },
          }));
          break;
        case ExtrusionTresholdsParams.RONDEL_ID:
          set((state) => ({
            tresholds: { ...state.tresholds, rondel_id: values?.length ? values[0] : state.tresholds.rondel_id },
          }));
          break;
        case ExtrusionTresholdsParams.PRESS_SPEED_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, press_speed_min: value } }));
          break;
        case ExtrusionTresholdsParams.PRESS_SPEED_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, press_speed_max: value } }));
          break;
        case ExtrusionTresholdsParams.BLOW_TIME_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, blow_time_min: value } }));
          break;
        case ExtrusionTresholdsParams.BLOW_TIME_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, blow_time_max: value } }));
          break;
        case ExtrusionTresholdsParams.TURNING_MACHINE_SPEED_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, turning_machine_speed_min: value } }));
          break;
        case ExtrusionTresholdsParams.TURNING_MACHINE_SPEED_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, turning_machine_speed_max: value } }));
          break;
        case ExtrusionTresholdsParams.ANNEALING_FURNACE_TEMP_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, annealing_furnace_temp_min: value } }));
          break;
        case ExtrusionTresholdsParams.ANNEALING_FURNACE_TEMP_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, annealing_furnace_temp_max: value } }));
          break;
        case ExtrusionTresholdsParams.TUBE_CILINDRICAL_SECTION_LENGTH_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, tube_cilindrical_section_length_min: value } }));
          break;
        case ExtrusionTresholdsParams.TUBE_CILINDRICAL_SECTION_LENGTH_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, tube_cilindrical_section_length_max: value } }));
          break;
        case ExtrusionTresholdsParams.MEMBRANE_THICKNESS_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, membrane_thickness_min: value } }));
          break;
        case ExtrusionTresholdsParams.MEMBRANE_THICKNESS_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, membrane_thickness_max: value } }));
          break;
        case ExtrusionTresholdsParams.TUBE_DIAMETER_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, tube_diameter_min: value } }));
          break;
        case ExtrusionTresholdsParams.TUBE_DIAMETER_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, tube_diameter_max: value } }));
          break;
        case ExtrusionTresholdsParams.TUBE_CILINDRICAL_SECTION_THICKNESS_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, tube_cilindrical_section_thickness_min: value } }));
          break;
        case ExtrusionTresholdsParams.TUBE_CILINDRICAL_SECTION_THICKNESS_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, tube_cilindrical_section_thickness_max: value } }));
          break;
        case ExtrusionTresholdsParams.TUBE_RIGIDITY_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, tube_rigidity_min: value } }));
          break;
        case ExtrusionTresholdsParams.TUBE_RIGIDITY_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, tube_rigidity_max: value } }));
          break;
        case ExtrusionTresholdsParams.EXTERNAL_THREAD_VALUE:
          set((state) => ({ tresholds: { ...state.tresholds, external_thread_value: value } }));
          break;
        default:
          break;
      }
    },
    fillConveyorSelectorOptions: (values) => set(() => ({ conveyorSelectorOptions: [...values] })),
    setSelectedConveyorOption: (value) => set(() => ({ selectedConveyorOption: value })),
    fillProductSelectorOptions: (values) => set(() => ({ productSelectorOptions: [...values] })),
    setSelectedProductOption: (value) => set(() => ({ selectedProductOption: value })),
    fillRondelSelectorOptions: (values) => set(() => ({ rondelSelectorOptions: [...values] })),
    setSelectedRondelOption: (value) => set(() => ({ selectedRondelOption: value })),
    setTreshold: (value) =>
      set((state) => ({
        tresholds: {
          ...state.tresholds,
          product_id: value.product_id,
          conveyor_id: value.conveyor_id,
          press_speed_min: value.press_speed_min,
          press_speed_max: value.press_speed_max,
          blow_time_min: value.blow_time_min,
          blow_time_max: value.blow_time_max,
          turning_machine_speed_min: value.turning_machine_speed_min,
          turning_machine_speed_max: value.turning_machine_speed_max,
          annealing_furnace_temp_min: value.annealing_furnace_temp_min,
          annealing_furnace_temp_max: value.annealing_furnace_temp_max,
          rondel_id: value.rondel_id,
          tube_cilindrical_section_length_min: value.tube_cilindrical_section_length_min,
          tube_cilindrical_section_length_max: value.tube_cilindrical_section_length_max,
          membrane_thickness_min: value.membrane_thickness_min,
          membrane_thickness_max: value.membrane_thickness_max,
          tube_diameter_min: value.tube_diameter_min,
          tube_diameter_max: value.tube_diameter_max,
          tube_cilindrical_section_thickness_min: value.tube_cilindrical_section_thickness_min,
          tube_cilindrical_section_thickness_max: value.tube_cilindrical_section_thickness_max,
          tube_rigidity_min: value.tube_rigidity_min,
          tube_rigidity_max: value.tube_rigidity_max,
          external_thread_value: value.external_thread_value,
        },
        selectedProductOption: value.product_id,
        selectedConveyorOption: value.conveyor_id,
        selectedRondelOption: value.rondel_id,
      })),
  }))
);
