import type { IRondel } from "@/shared/api/services/rondel-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DataFormField {
  key: string;
  value: string;
  values?: string[];
}

interface IExtrusionParameterData {
  counter_value: string;
  press_speed: string;
  blow_time: string;
  turning_machine_speed: string;
  annealing_furnace_temp: string;
  tube_cilindrical_section_length: string;
  membrane_thickness: string;
  tube_diameter: string;
  tube_cilindrical_thikness: string;
  tube_rigidity: string;
  tube_cutting_quality: boolean;
  tightness: boolean;
  external_thread_quality: boolean;
  // rondel_type_id: string | null;
  // rondel_type: number | null;
  rondel_type_id: number | null;
  rondel_type: string | null;
}

interface ExtrusionInputStore {
  data: IExtrusionParameterData;
  selectedRondelType: string[] | undefined;
  rondelTypeSelectorOptions: IRondel[] | [];
  initData: () => void;
  changeData: (value: DataFormField) => void;
  clearData: (value: Partial<DataFormField>) => void;
  sliceData: (value: Partial<DataFormField>) => void;
  roundData: (value: Partial<DataFormField>) => void;
  fillRondelTypeSelectorOptions: (values: IRondel[]) => void;
  setSelectedRondelType: (value: string[] | undefined) => void;
}

export const initDataValue: IExtrusionParameterData = {
  counter_value: "0",
  press_speed: "0",
  blow_time: "0",
  turning_machine_speed: "0",
  annealing_furnace_temp: "0",
  tube_cilindrical_section_length: "0", //+
  membrane_thickness: "0",
  tube_diameter: "0",
  tube_cilindrical_thikness: "0",
  tube_rigidity: "0",
  tube_cutting_quality: false,
  tightness: false,
  external_thread_quality: false,
  rondel_type_id: null,
  rondel_type: null,
};

export enum ExtrusionInputParams {
  COUNTER_VALUE = "counter_value",
  PRESS_SPEED = "press_speed",
  BLOW_TIME = "blow_time",
  TURNING_MACHINE_SPEED = "turning_machine_speed",
  ANNEALING_FURNACE_TEMP = "annealing_furnace_temp",
  TUBE_CILINDRICAL_SECTION_LENGTH = "tube_cilindrical_section_length",
  MEMBRANE_THICKNESS = "membrane_thickness",
  TUBE_DIAMETER = "tube_diameter",
  TUBE_CILINDRICAL_THICKNESS = "tube_cilindrical_thikness",
  TUBE_RIGIDITY = "tube_rigidity",
  TUBE_CUTTING_QUALITY = "tube_cutting_quality",
  TIGHTNESS = "tightness",
  EXTERNAL_THREAD_QUALITY = "external_thread_quality",
  RONDEL_TYPE = "rondel_type_id",
}

//extrusionParamsStore
export const useExtrusionInputStore = create<ExtrusionInputStore>()(
  devtools((set) => ({
    data: initDataValue,
    selectedRondelType: undefined,
    rondelTypeSelectorOptions: [],
    initData: () => set(() => ({ data: initDataValue, selectedRondelType: undefined })),
    clearData: ({ key }) => {
      switch (key) {
        case ExtrusionInputParams.COUNTER_VALUE:
          set((state) => ({ data: { ...state.data, counter_value: "0" } }));
          break;
        case ExtrusionInputParams.PRESS_SPEED:
          set((state) => ({ data: { ...state.data, press_speed: "0" } }));
          break;
        case ExtrusionInputParams.BLOW_TIME:
          set((state) => ({ data: { ...state.data, blow_time: "0" } }));
          break;
        case ExtrusionInputParams.TURNING_MACHINE_SPEED:
          set((state) => ({ data: { ...state.data, turning_machine_speed: "0" } }));
          break;
        case ExtrusionInputParams.ANNEALING_FURNACE_TEMP:
          set((state) => ({ data: { ...state.data, annealing_furnace_temp: "0" } }));
          break;
        case ExtrusionInputParams.TUBE_CILINDRICAL_SECTION_LENGTH:
          set((state) => ({ data: { ...state.data, tube_cilindrical_section_length: "0" } }));
          break;
        case ExtrusionInputParams.MEMBRANE_THICKNESS:
          set((state) => ({ data: { ...state.data, membrane_thickness: "0" } }));
          break;
        case ExtrusionInputParams.TUBE_DIAMETER:
          set((state) => ({ data: { ...state.data, tube_diameter: "0" } }));
          break;
        case ExtrusionInputParams.TUBE_CILINDRICAL_THICKNESS:
          set((state) => ({ data: { ...state.data, tube_cilindrical_thikness: "0" } }));
          break;
        case ExtrusionInputParams.TUBE_RIGIDITY:
          set((state) => ({ data: { ...state.data, tube_rigidity: "0" } }));
          break;
        case ExtrusionInputParams.TUBE_CUTTING_QUALITY:
          set((state) => ({ data: { ...state.data, tube_cutting_quality: false } }));
          break;
        case ExtrusionInputParams.TIGHTNESS:
          set((state) => ({ data: { ...state.data, tightness: false } }));
          break;
        case ExtrusionInputParams.EXTERNAL_THREAD_QUALITY:
          set((state) => ({ data: { ...state.data, external_thread_quality: false } }));
          break;
        case ExtrusionInputParams.RONDEL_TYPE:
          set((state) => ({ data: { ...state.data, rondel_type_id: null } }));
          break;
        default:
          break;
      }
    },
    sliceData: ({ key }) => {
      switch (key) {
        case ExtrusionInputParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value: state.data.counter_value.length < 2 ? "0" : state.data.counter_value.slice(0, -1),
            },
          }));
          break;
        case ExtrusionInputParams.PRESS_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              press_speed: state.data.press_speed.length < 2 ? "0" : state.data.press_speed.slice(0, -1),
            },
          }));
          break;
        case ExtrusionInputParams.BLOW_TIME:
          set((state) => ({
            data: {
              ...state.data,
              blow_time: state.data.blow_time.length < 2 ? "0" : state.data.blow_time.slice(0, -1),
            },
          }));
          break;
        case ExtrusionInputParams.TURNING_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              turning_machine_speed:
                state.data.turning_machine_speed.length < 2 ? "0" : state.data.turning_machine_speed.slice(0, -1),
            },
          }));
          break;
        case ExtrusionInputParams.ANNEALING_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              annealing_furnace_temp:
                state.data.annealing_furnace_temp.length < 2 ? "0" : state.data.annealing_furnace_temp.slice(0, -1),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_CILINDRICAL_SECTION_LENGTH:
          set((state) => ({
            data: {
              ...state.data,
              tube_cilindrical_section_length:
                state.data.tube_cilindrical_section_length.length < 2
                  ? "0"
                  : state.data.tube_cilindrical_section_length.slice(0, -1),
            },
          }));
          break;
        case ExtrusionInputParams.MEMBRANE_THICKNESS:
          set((state) => ({
            data: {
              ...state.data,
              membrane_thickness:
                state.data.membrane_thickness.length < 2 ? "0" : state.data.membrane_thickness.slice(0, -1),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_DIAMETER:
          set((state) => ({
            data: {
              ...state.data,
              tube_diameter: state.data.tube_diameter.length < 2 ? "0" : state.data.tube_diameter.slice(0, -1),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_CILINDRICAL_THICKNESS:
          set((state) => ({
            data: {
              ...state.data,
              tube_cilindrical_thikness:
                state.data.tube_cilindrical_thikness.length < 2
                  ? "0"
                  : state.data.tube_cilindrical_thikness.slice(0, -1),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_RIGIDITY:
          set((state) => ({
            data: {
              ...state.data,
              tube_rigidity: state.data.tube_rigidity.length < 2 ? "0" : state.data.tube_rigidity.slice(0, -1),
            },
          }));
          break;
        default:
          break;
      }
    },
    changeData: ({ key, value }) => {
      switch (key) {
        case ExtrusionInputParams.COUNTER_VALUE:
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
        case ExtrusionInputParams.PRESS_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              press_speed:
                (state.data.press_speed.includes(".") && value == ".") || state.data.press_speed.length >= 8
                  ? state.data.press_speed
                  : value == "."
                  ? state.data.press_speed + value
                  : value === "0" &&
                    Number(state.data.press_speed + value) === 0 &&
                    state.data.press_speed.includes(".")
                  ? state.data.press_speed + value
                  : value === "0" && Number(state.data.press_speed + value) !== 0
                  ? state.data.press_speed + value
                  : Number(state.data.press_speed + value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.BLOW_TIME:
          set((state) => ({
            data: {
              ...state.data,
              blow_time:
                (state.data.blow_time.includes(".") && value == ".") || state.data.blow_time.length >= 8
                  ? state.data.blow_time
                  : value == "."
                  ? state.data.blow_time + value
                  : value === "0" && Number(state.data.blow_time + value) === 0 && state.data.blow_time.includes(".")
                  ? state.data.blow_time + value
                  : value === "0" && Number(state.data.blow_time + value) !== 0
                  ? state.data.blow_time + value
                  : Number(state.data.blow_time + value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TURNING_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              turning_machine_speed:
                (state.data.turning_machine_speed.includes(".") && value == ".") ||
                state.data.turning_machine_speed.length >= 8
                  ? state.data.turning_machine_speed
                  : value == "."
                  ? state.data.turning_machine_speed + value
                  : value === "0" &&
                    Number(state.data.turning_machine_speed + value) === 0 &&
                    state.data.turning_machine_speed.includes(".")
                  ? state.data.turning_machine_speed + value
                  : value === "0" && Number(state.data.turning_machine_speed + value) !== 0
                  ? state.data.turning_machine_speed + value
                  : Number(state.data.turning_machine_speed + value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.ANNEALING_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              annealing_furnace_temp:
                (state.data.annealing_furnace_temp.includes(".") && value == ".") ||
                state.data.annealing_furnace_temp.length >= 8
                  ? state.data.annealing_furnace_temp
                  : value == "."
                  ? state.data.annealing_furnace_temp + value
                  : value === "0" &&
                    Number(state.data.annealing_furnace_temp + value) === 0 &&
                    state.data.annealing_furnace_temp.includes(".")
                  ? state.data.annealing_furnace_temp + value
                  : value === "0" && Number(state.data.annealing_furnace_temp + value) !== 0
                  ? state.data.annealing_furnace_temp + value
                  : Number(state.data.annealing_furnace_temp + value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_CILINDRICAL_SECTION_LENGTH:
          set((state) => ({
            data: {
              ...state.data,
              tube_cilindrical_section_length:
                (state.data.tube_cilindrical_section_length.includes(".") && value == ".") ||
                state.data.tube_cilindrical_section_length.length >= 8
                  ? state.data.tube_cilindrical_section_length
                  : value == "."
                  ? state.data.tube_cilindrical_section_length + value
                  : value === "0" &&
                    Number(state.data.tube_cilindrical_section_length + value) === 0 &&
                    state.data.tube_cilindrical_section_length.includes(".")
                  ? state.data.tube_cilindrical_section_length + value
                  : value === "0" && Number(state.data.tube_cilindrical_section_length + value) !== 0
                  ? state.data.tube_cilindrical_section_length + value
                  : Number(state.data.tube_cilindrical_section_length + value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.MEMBRANE_THICKNESS:
          set((state) => ({
            data: {
              ...state.data,
              membrane_thickness:
                (state.data.membrane_thickness.includes(".") && value == ".") ||
                state.data.membrane_thickness.length >= 8
                  ? state.data.membrane_thickness
                  : value == "."
                  ? state.data.membrane_thickness + value
                  : value === "0" &&
                    Number(state.data.membrane_thickness + value) === 0 &&
                    state.data.membrane_thickness.includes(".")
                  ? state.data.membrane_thickness + value
                  : value === "0" && Number(state.data.membrane_thickness + value) !== 0
                  ? state.data.membrane_thickness + value
                  : Number(state.data.membrane_thickness + value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_DIAMETER:
          set((state) => ({
            data: {
              ...state.data,
              tube_diameter:
                (state.data.tube_diameter.includes(".") && value == ".") || state.data.tube_diameter.length >= 8
                  ? state.data.tube_diameter
                  : value == "."
                  ? state.data.tube_diameter + value
                  : value === "0" &&
                    Number(state.data.tube_diameter + value) === 0 &&
                    state.data.tube_diameter.includes(".")
                  ? state.data.tube_diameter + value
                  : value === "0" && Number(state.data.tube_diameter + value) !== 0
                  ? state.data.tube_diameter + value
                  : Number(state.data.tube_diameter + value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_CILINDRICAL_THICKNESS:
          set((state) => ({
            data: {
              ...state.data,
              tube_cilindrical_thikness:
                (state.data.tube_cilindrical_thikness.includes(".") && value == ".") ||
                state.data.tube_cilindrical_thikness.length >= 8
                  ? state.data.tube_cilindrical_thikness
                  : value == "."
                  ? state.data.tube_cilindrical_thikness + value
                  : value === "0" &&
                    Number(state.data.tube_cilindrical_thikness + value) === 0 &&
                    state.data.tube_cilindrical_thikness.includes(".")
                  ? state.data.tube_cilindrical_thikness + value
                  : value === "0" && Number(state.data.tube_cilindrical_thikness + value) !== 0
                  ? state.data.tube_cilindrical_thikness + value
                  : Number(state.data.tube_cilindrical_thikness + value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_RIGIDITY:
          set((state) => ({
            data: {
              ...state.data,
              tube_rigidity:
                (state.data.tube_rigidity.includes(".") && value == ".") || state.data.tube_rigidity.length >= 8
                  ? state.data.tube_rigidity
                  : value == "."
                  ? state.data.tube_rigidity + value
                  : value === "0" &&
                    Number(state.data.tube_rigidity + value) === 0 &&
                    state.data.tube_rigidity.includes(".")
                  ? state.data.tube_rigidity + value
                  : value === "0" && Number(state.data.tube_rigidity + value) !== 0
                  ? state.data.tube_rigidity + value
                  : Number(state.data.tube_rigidity + value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_CUTTING_QUALITY:
          set((state) => ({
            data: {
              ...state.data,
              tube_cutting_quality: value === "true" ? true : false,
            },
          }));
          break;
        case ExtrusionInputParams.TIGHTNESS:
          set((state) => ({
            data: {
              ...state.data,
              tightness: value === "true" ? true : false,
            },
          }));
          break;
        case ExtrusionInputParams.EXTERNAL_THREAD_QUALITY:
          set((state) => ({
            data: {
              ...state.data,
              external_thread_quality: value === "true" ? true : false,
            },
          }));
          break;
        case ExtrusionInputParams.RONDEL_TYPE:
          set((state) => ({
            data: {
              ...state.data,
              // rondel_type_id: value,
              // rondel_type: state.rondelTypeSelectorOptions.filter((x) => x.value === value).length
              //   ? state.rondelTypeSelectorOptions.filter((x) => x.value === value)[0].id
              //   : state.data.rondel_type,
              rondel_type: value,
              rondel_type_id: state.rondelTypeSelectorOptions.filter((x) => x.value === value).length
                ? state.rondelTypeSelectorOptions.filter((x) => x.value === value)[0].id
                : state.data.rondel_type_id,
              // rondel_type_id: values ? values[0] : state.data.rondel_type_id,
            },
          }));
          break;
        default:
          break;
      }
    },
    roundData: ({ key }) => {
      switch (key) {
        case ExtrusionInputParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value: Number(state.data.counter_value).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.PRESS_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              press_speed: Number(state.data.press_speed).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.BLOW_TIME:
          set((state) => ({
            data: {
              ...state.data,
              blow_time: Number(state.data.blow_time).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TURNING_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              turning_machine_speed: Number(state.data.turning_machine_speed).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.ANNEALING_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              annealing_furnace_temp: Number(state.data.annealing_furnace_temp).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_CILINDRICAL_SECTION_LENGTH:
          set((state) => ({
            data: {
              ...state.data,
              tube_cilindrical_section_length: Number(state.data.tube_cilindrical_section_length).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.MEMBRANE_THICKNESS:
          set((state) => ({
            data: {
              ...state.data,
              membrane_thickness: Number(state.data.membrane_thickness).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_DIAMETER:
          set((state) => ({
            data: {
              ...state.data,
              tube_diameter: Number(state.data.tube_diameter).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_CILINDRICAL_THICKNESS:
          set((state) => ({
            data: {
              ...state.data,
              tube_cilindrical_thikness: Number(state.data.tube_cilindrical_thikness).toString(),
            },
          }));
          break;
        case ExtrusionInputParams.TUBE_RIGIDITY:
          set((state) => ({
            data: {
              ...state.data,
              tube_rigidity: Number(state.data.tube_rigidity).toString(),
            },
          }));
          break;
        default:
          break;
      }
    },
    fillRondelTypeSelectorOptions: (values) => set(() => ({ rondelTypeSelectorOptions: [...values] })),
    setSelectedRondelType: (value) => set(() => ({ selectedRondelType: value })),
  }))
);
