import type { IRondelType } from "@/shared/api/services/rondel-type-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DataFormField {
  key: string;
  value: string;
  values?: string[];
}

interface ICurrentParametersInputData {
  counter_value: string;
  press_speed: string;
  blow_time: string;
  turning_machine_speed: string;
  annealing_furnace_temp: string;
  rondel_type_id: string | null;
}

interface ExtrusionInputCurrentParametersStore {
  data: ICurrentParametersInputData;
  selectedRondelType: string[] | undefined;
  rondelTypeSelectorOptions: IRondelType[] | [];
  initData: () => void;
  changeData: (value: DataFormField) => void;
  clearData: (value: Partial<DataFormField>) => void;
  sliceData: (value: Partial<DataFormField>) => void;
  roundData: (value: Partial<DataFormField>) => void;
  fillRondelTypeSelectorOptions: (values: IRondelType[]) => void;
  setSelectedRondelType: (value: string[] | undefined) => void;
}

const initDataValue: ICurrentParametersInputData = {
  counter_value: "0",
  press_speed: "0",
  blow_time: "0",
  turning_machine_speed: "0",
  annealing_furnace_temp: "0",
  rondel_type_id: null,
};

export enum CurrentParametersInputDataParams {
  RONDEL_TYPE = "rondel_type_id",
  COUNTER_VALUE = "counter_value",
  PRESS_SPEED = "press_speed",
  BLOW_TIME = "blow_time",
  TURNING_MACHINE_SPEED = "turning_machine_speed",
  ANNEALING_FURNACE_TEMP = "annealing_furnace_temp",
}

export const useExtrusionInputCurrentParametersStore = create<ExtrusionInputCurrentParametersStore>()(
  devtools((set) => ({
    data: initDataValue,
    selectedRondelType: undefined,
    rondelTypeSelectorOptions: [],
    initData: () => set(() => ({ data: initDataValue, selectedRondelType: undefined })),
    clearData: ({ key }) => {
      switch (key) {
        case CurrentParametersInputDataParams.COUNTER_VALUE:
          set((state) => ({ data: { ...state.data, counter_value: "0" } }));
          break;
        case CurrentParametersInputDataParams.PRESS_SPEED:
          set((state) => ({ data: { ...state.data, press_speed: "0" } }));
          break;
        case CurrentParametersInputDataParams.BLOW_TIME:
          set((state) => ({ data: { ...state.data, blow_time: "0" } }));
          break;
        case CurrentParametersInputDataParams.TURNING_MACHINE_SPEED:
          set((state) => ({ data: { ...state.data, turning_machine_speed: "0" } }));
          break;
        case CurrentParametersInputDataParams.ANNEALING_FURNACE_TEMP:
          set((state) => ({ data: { ...state.data, annealing_furnace_temp: "0" } }));
          break;
        default:
          break;
      }
    },
    sliceData: ({ key }) => {
      switch (key) {
        case CurrentParametersInputDataParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              press_speed: state.data.counter_value.length < 2 ? "0" : state.data.counter_value.slice(0, -1),
            },
          }));
          break;
        case CurrentParametersInputDataParams.PRESS_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              press_speed: state.data.press_speed.length < 2 ? "0" : state.data.press_speed.slice(0, -1),
            },
          }));
          break;
        case CurrentParametersInputDataParams.BLOW_TIME:
          set((state) => ({
            data: {
              ...state.data,
              blow_time: state.data.blow_time.length < 2 ? "0" : state.data.blow_time.slice(0, -1),
            },
          }));
          break;
        case CurrentParametersInputDataParams.TURNING_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              turning_machine_speed:
                state.data.turning_machine_speed.length < 2 ? "0" : state.data.turning_machine_speed.slice(0, -1),
            },
          }));
          break;
        case CurrentParametersInputDataParams.ANNEALING_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              annealing_furnace_temp:
                state.data.annealing_furnace_temp.length < 2 ? "0" : state.data.annealing_furnace_temp.slice(0, -1),
            },
          }));
          break;
        default:
          break;
      }
    },
    changeData: ({ key, value, values }) => {
      switch (key) {
        case CurrentParametersInputDataParams.COUNTER_VALUE:
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
        case CurrentParametersInputDataParams.PRESS_SPEED:
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
        case CurrentParametersInputDataParams.BLOW_TIME:
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
        case CurrentParametersInputDataParams.TURNING_MACHINE_SPEED:
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
        case CurrentParametersInputDataParams.ANNEALING_FURNACE_TEMP:
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
        case CurrentParametersInputDataParams.RONDEL_TYPE:
          set((state) => ({
            data: {
              ...state.data,
              rondel_type_id: values ? values[0] : state.data.rondel_type_id,
            },
          }));
          break;

        default:
          break;
      }
    },
    roundData: ({ key }) => {
      switch (key) {
        case CurrentParametersInputDataParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value: Number(state.data.counter_value).toString(),
            },
          }));
          break;
        case CurrentParametersInputDataParams.PRESS_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              press_speed: Number(state.data.press_speed).toString(),
            },
          }));
          break;
        case CurrentParametersInputDataParams.BLOW_TIME:
          set((state) => ({
            data: {
              ...state.data,
              blow_time: Number(state.data.blow_time).toString(),
            },
          }));
          break;
        case CurrentParametersInputDataParams.TURNING_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              turning_machine_speed: Number(state.data.turning_machine_speed).toString(),
            },
          }));
          break;
        case CurrentParametersInputDataParams.ANNEALING_FURNACE_TEMP:
          set((state) => ({
            data: {
              ...state.data,
              annealing_furnace_temp: Number(state.data.annealing_furnace_temp).toString(),
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
