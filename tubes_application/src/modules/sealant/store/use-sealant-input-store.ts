import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DataFormField {
  key: string;
  value: string;
  values?: string[];
}

interface ISealantParameterData {
  counter_value: string;
  cap_machine_speed: string;
  total_air_pressure: string;
  holders_forward: string;
  holders_opening_left: string;
  holders_opening_right: string;
  holders_closing: string;
  injection_a_start: string;
  injection_b_start: string;
  injection_a_end: string;
  injection_b_end: string;
  injection_tube_orientation_start: string;
  injection_tube_orientation_end: string;
  is_cap_surface_smooth: boolean;
  latex_ring_padding: string;
  latex_ring_width: string;
  tube_rigidity: string;
  cap_unscrewing_torque: string;
}

interface SealantInputStore {
  data: ISealantParameterData;
  initData: () => void;
  changeData: (value: DataFormField) => void;
  clearData: (value: Partial<DataFormField>) => void;
  sliceData: (value: Partial<DataFormField>) => void;
  roundData: (value: Partial<DataFormField>) => void;
}

export const initDataValue: ISealantParameterData = {
  counter_value: "0",
  cap_machine_speed: "0",
  total_air_pressure: "0",
  holders_forward: "0",
  holders_opening_left: "0",
  holders_opening_right: "0",
  holders_closing: "0",
  injection_a_start: "0",
  injection_b_start: "0",
  injection_a_end: "0",
  injection_b_end: "0",
  injection_tube_orientation_start: "0",
  injection_tube_orientation_end: "0",
  is_cap_surface_smooth: false,
  latex_ring_padding: "0",
  latex_ring_width: "0",
  tube_rigidity: "0",
  cap_unscrewing_torque: "0",
};

export enum SealantInputParams {
  COUNTER_VALUE = "counter_value",
  CAP_MACHINE_SPEED = "cap_machine_speed",
  TOTAL_AIR_PRESSURE = "total_air_pressure",
  HOLDERS_FORWARD = "holders_forward",
  HOLDERS_OPENING_LEFT = "holders_opening_left",
  HOLDERS_OPENING_RIGHT = "holders_opening_right",
  HOLDERS_CLOSING = "holders_closing",
  INJECTION_A_START = "injection_a_start",
  INJECTION_B_START = "injection_b_start",
  INJECTION_A_END = "injection_a_end",
  INJECTION_B_END = "injection_b_end",
  INJECTION_TUBE_ORIENTATION_START = "injection_tube_orientation_start",
  INJECTION_TUBE_ORIENTATION_END = "injection_tube_orientation_end",
  IS_CAP_SURFACE_SMOOTH = "is_cap_surface_smooth",
  LATEX_RING_PADDING = "latex_ring_padding",
  LATEX_RING_WIDTH = "latex_ring_width",
  TUBE_RIGIDITY = "tube_rigidity",
  CAP_UNSCREWING_TORQUE = "cap_unscrewing_torque",
}

export const useSealantInputStore = create<SealantInputStore>()(
  devtools((set) => ({
    data: initDataValue,
    initData: () => set(() => ({ data: initDataValue, selectedRondelType: undefined })),
    clearData: ({ key }) => {
      switch (key) {
        case SealantInputParams.COUNTER_VALUE:
          set((state) => ({ data: { ...state.data, counter_value: "0" } }));
          break;
        case SealantInputParams.CAP_MACHINE_SPEED:
          set((state) => ({ data: { ...state.data, cap_machine_speed: "0" } }));
          break;
        case SealantInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({ data: { ...state.data, total_air_pressure: "0" } }));
          break;
        case SealantInputParams.HOLDERS_FORWARD:
          set((state) => ({ data: { ...state.data, holders_forward: "0" } }));
          break;
        case SealantInputParams.HOLDERS_OPENING_LEFT:
          set((state) => ({ data: { ...state.data, holders_opening_left: "0" } }));
          break;
        case SealantInputParams.HOLDERS_OPENING_RIGHT:
          set((state) => ({ data: { ...state.data, holders_opening_right: "0" } }));
          break;
        case SealantInputParams.HOLDERS_CLOSING:
          set((state) => ({ data: { ...state.data, holders_closing: "0" } }));
          break;
        case SealantInputParams.INJECTION_A_START:
          set((state) => ({ data: { ...state.data, injection_a_start: "0" } }));
          break;
        case SealantInputParams.INJECTION_B_START:
          set((state) => ({ data: { ...state.data, injection_b_start: "0" } }));
          break;
        case SealantInputParams.INJECTION_A_END:
          set((state) => ({ data: { ...state.data, injection_a_end: "0" } }));
          break;
        case SealantInputParams.INJECTION_B_END:
          set((state) => ({ data: { ...state.data, injection_b_end: "0" } }));
          break;
        case SealantInputParams.INJECTION_TUBE_ORIENTATION_START:
          set((state) => ({ data: { ...state.data, injection_tube_orientation_start: "0" } }));
          break;
        case SealantInputParams.INJECTION_TUBE_ORIENTATION_END:
          set((state) => ({ data: { ...state.data, injection_tube_orientation_end: "0" } }));
          break;
        case SealantInputParams.IS_CAP_SURFACE_SMOOTH:
          set((state) => ({ data: { ...state.data, is_cap_surface_smooth: false } }));
          break;
        case SealantInputParams.LATEX_RING_PADDING:
          set((state) => ({ data: { ...state.data, latex_ring_padding: "0" } }));
          break;
        case SealantInputParams.LATEX_RING_WIDTH:
          set((state) => ({ data: { ...state.data, latex_ring_width: "0" } }));
          break;
        case SealantInputParams.TUBE_RIGIDITY:
          set((state) => ({ data: { ...state.data, tube_rigidity: "0" } }));
          break;
        case SealantInputParams.CAP_UNSCREWING_TORQUE:
          set((state) => ({ data: { ...state.data, cap_unscrewing_torque: "0" } }));
          break;
        default:
          break;
      }
    },
    sliceData: ({ key }) => {
      switch (key) {
        case SealantInputParams.COUNTER_VALUE:
          set((state) => ({
            data: {
              ...state.data,
              counter_value: state.data.counter_value.length < 2 ? "0" : state.data.counter_value.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.CAP_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              cap_machine_speed:
                state.data.cap_machine_speed.length < 2 ? "0" : state.data.cap_machine_speed.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({
            data: {
              ...state.data,
              total_air_pressure:
                state.data.total_air_pressure.length < 2 ? "0" : state.data.total_air_pressure.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.HOLDERS_FORWARD:
          set((state) => ({
            data: {
              ...state.data,
              holders_forward: state.data.holders_forward.length < 2 ? "0" : state.data.holders_forward.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.HOLDERS_OPENING_LEFT:
          set((state) => ({
            data: {
              ...state.data,
              holders_opening_left:
                state.data.holders_opening_left.length < 2 ? "0" : state.data.holders_opening_left.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.HOLDERS_OPENING_RIGHT:
          set((state) => ({
            data: {
              ...state.data,
              holders_opening_right:
                state.data.holders_opening_right.length < 2 ? "0" : state.data.holders_opening_right.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.HOLDERS_CLOSING:
          set((state) => ({
            data: {
              ...state.data,
              holders_closing: state.data.holders_closing.length < 2 ? "0" : state.data.holders_closing.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.INJECTION_A_START:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_start:
                state.data.injection_a_start.length < 2 ? "0" : state.data.injection_a_start.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.INJECTION_B_START:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_start:
                state.data.injection_b_start.length < 2 ? "0" : state.data.injection_b_start.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.INJECTION_A_END:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_end: state.data.injection_a_end.length < 2 ? "0" : state.data.injection_a_end.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.INJECTION_B_END:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_end: state.data.injection_b_end.length < 2 ? "0" : state.data.injection_b_end.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.INJECTION_TUBE_ORIENTATION_START:
          set((state) => ({
            data: {
              ...state.data,
              injection_tube_orientation_start:
                state.data.injection_tube_orientation_start.length < 2
                  ? "0"
                  : state.data.injection_tube_orientation_start.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.INJECTION_TUBE_ORIENTATION_END:
          set((state) => ({
            data: {
              ...state.data,
              injection_tube_orientation_end:
                state.data.injection_tube_orientation_end.length < 2
                  ? "0"
                  : state.data.injection_tube_orientation_end.slice(0, -1),
            },
          }));
          break;

        case SealantInputParams.LATEX_RING_PADDING:
          set((state) => ({
            data: {
              ...state.data,
              latex_ring_padding:
                state.data.latex_ring_padding.length < 2 ? "0" : state.data.latex_ring_padding.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.LATEX_RING_WIDTH:
          set((state) => ({
            data: {
              ...state.data,
              latex_ring_width: state.data.latex_ring_width.length < 2 ? "0" : state.data.latex_ring_width.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.TUBE_RIGIDITY:
          set((state) => ({
            data: {
              ...state.data,
              tube_rigidity: state.data.tube_rigidity.length < 2 ? "0" : state.data.tube_rigidity.slice(0, -1),
            },
          }));
          break;
        case SealantInputParams.CAP_UNSCREWING_TORQUE:
          set((state) => ({
            data: {
              ...state.data,
              cap_unscrewing_torque:
                state.data.cap_unscrewing_torque.length < 2 ? "0" : state.data.cap_unscrewing_torque.slice(0, -1),
            },
          }));
          break;

        default:
          break;
      }
    },
    changeData: ({ key, value }) => {
      switch (key) {
        case SealantInputParams.COUNTER_VALUE:
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

        case SealantInputParams.CAP_MACHINE_SPEED:
          set((state) => ({
            data: {
              ...state.data,
              cap_machine_speed:
                (state.data.cap_machine_speed.includes(".") && value == ".") || state.data.cap_machine_speed.length >= 8
                  ? state.data.cap_machine_speed
                  : value == "."
                  ? state.data.cap_machine_speed + value
                  : value === "0" &&
                    Number(state.data.cap_machine_speed + value) === 0 &&
                    state.data.cap_machine_speed.includes(".")
                  ? state.data.cap_machine_speed + value
                  : value === "0" && Number(state.data.cap_machine_speed + value) !== 0
                  ? state.data.cap_machine_speed + value
                  : Number(state.data.cap_machine_speed + value).toString(),
            },
          }));
          break;
        case SealantInputParams.TOTAL_AIR_PRESSURE:
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
        case SealantInputParams.HOLDERS_FORWARD:
          set((state) => ({
            data: {
              ...state.data,
              holders_forward:
                (state.data.holders_forward.includes(".") && value == ".") || state.data.holders_forward.length >= 8
                  ? state.data.holders_forward
                  : value == "."
                  ? state.data.holders_forward + value
                  : value === "0" &&
                    Number(state.data.holders_forward + value) === 0 &&
                    state.data.holders_forward.includes(".")
                  ? state.data.holders_forward + value
                  : value === "0" && Number(state.data.holders_forward + value) !== 0
                  ? state.data.holders_forward + value
                  : Number(state.data.holders_forward + value).toString(),
            },
          }));
          break;
        case SealantInputParams.HOLDERS_OPENING_LEFT:
          set((state) => ({
            data: {
              ...state.data,
              holders_opening_left:
                (state.data.holders_opening_left.includes(".") && value == ".") ||
                state.data.holders_opening_left.length >= 8
                  ? state.data.holders_opening_left
                  : value == "."
                  ? state.data.holders_opening_left + value
                  : value === "0" &&
                    Number(state.data.holders_opening_left + value) === 0 &&
                    state.data.holders_opening_left.includes(".")
                  ? state.data.holders_opening_left + value
                  : value === "0" && Number(state.data.holders_opening_left + value) !== 0
                  ? state.data.holders_opening_left + value
                  : Number(state.data.holders_opening_left + value).toString(),
            },
          }));
          break;
        case SealantInputParams.HOLDERS_OPENING_RIGHT:
          set((state) => ({
            data: {
              ...state.data,
              holders_opening_right:
                (state.data.holders_opening_right.includes(".") && value == ".") ||
                state.data.holders_opening_right.length >= 8
                  ? state.data.holders_opening_right
                  : value == "."
                  ? state.data.holders_opening_right + value
                  : value === "0" &&
                    Number(state.data.holders_opening_right + value) === 0 &&
                    state.data.holders_opening_right.includes(".")
                  ? state.data.holders_opening_right + value
                  : value === "0" && Number(state.data.holders_opening_right + value) !== 0
                  ? state.data.holders_opening_right + value
                  : Number(state.data.holders_opening_right + value).toString(),
            },
          }));
          break;
        case SealantInputParams.HOLDERS_CLOSING:
          set((state) => ({
            data: {
              ...state.data,
              holders_closing:
                (state.data.holders_closing.includes(".") && value == ".") || state.data.holders_closing.length >= 8
                  ? state.data.holders_closing
                  : value == "."
                  ? state.data.holders_closing + value
                  : value === "0" &&
                    Number(state.data.holders_closing + value) === 0 &&
                    state.data.holders_closing.includes(".")
                  ? state.data.holders_closing + value
                  : value === "0" && Number(state.data.holders_closing + value) !== 0
                  ? state.data.holders_closing + value
                  : Number(state.data.holders_closing + value).toString(),
            },
          }));
          break;
        case SealantInputParams.INJECTION_A_START:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_start:
                (state.data.injection_a_start.includes(".") && value == ".") || state.data.injection_a_start.length >= 8
                  ? state.data.injection_a_start
                  : value == "."
                  ? state.data.injection_a_start + value
                  : value === "0" &&
                    Number(state.data.injection_a_start + value) === 0 &&
                    state.data.injection_a_start.includes(".")
                  ? state.data.injection_a_start + value
                  : value === "0" && Number(state.data.injection_a_start + value) !== 0
                  ? state.data.injection_a_start + value
                  : Number(state.data.injection_a_start + value).toString(),
            },
          }));
          break;
        case SealantInputParams.INJECTION_B_START:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_start:
                (state.data.injection_b_start.includes(".") && value == ".") || state.data.injection_b_start.length >= 8
                  ? state.data.injection_b_start
                  : value == "."
                  ? state.data.injection_b_start + value
                  : value === "0" &&
                    Number(state.data.injection_b_start + value) === 0 &&
                    state.data.injection_b_start.includes(".")
                  ? state.data.injection_b_start + value
                  : value === "0" && Number(state.data.injection_b_start + value) !== 0
                  ? state.data.injection_b_start + value
                  : Number(state.data.injection_b_start + value).toString(),
            },
          }));
          break;
        case SealantInputParams.INJECTION_A_END:
          set((state) => ({
            data: {
              ...state.data,
              injection_a_end:
                (state.data.injection_a_end.includes(".") && value == ".") || state.data.injection_a_end.length >= 8
                  ? state.data.injection_a_end
                  : value == "."
                  ? state.data.injection_a_end + value
                  : value === "0" &&
                    Number(state.data.injection_a_end + value) === 0 &&
                    state.data.injection_a_end.includes(".")
                  ? state.data.injection_a_end + value
                  : value === "0" && Number(state.data.injection_a_end + value) !== 0
                  ? state.data.injection_a_end + value
                  : Number(state.data.injection_a_end + value).toString(),
            },
          }));
          break;
        case SealantInputParams.INJECTION_B_END:
          set((state) => ({
            data: {
              ...state.data,
              injection_b_end:
                (state.data.injection_b_end.includes(".") && value == ".") || state.data.injection_b_end.length >= 8
                  ? state.data.injection_b_end
                  : value == "."
                  ? state.data.injection_b_end + value
                  : value === "0" &&
                    Number(state.data.injection_b_end + value) === 0 &&
                    state.data.injection_b_end.includes(".")
                  ? state.data.injection_b_end + value
                  : value === "0" && Number(state.data.injection_b_end + value) !== 0
                  ? state.data.injection_b_end + value
                  : Number(state.data.injection_b_end + value).toString(),
            },
          }));
          break;
        case SealantInputParams.INJECTION_TUBE_ORIENTATION_START:
          set((state) => ({
            data: {
              ...state.data,
              injection_tube_orientation_start:
                (state.data.injection_tube_orientation_start.includes(".") && value == ".") ||
                state.data.injection_tube_orientation_start.length >= 8
                  ? state.data.injection_tube_orientation_start
                  : value == "."
                  ? state.data.injection_tube_orientation_start + value
                  : value === "0" &&
                    Number(state.data.injection_tube_orientation_start + value) === 0 &&
                    state.data.injection_tube_orientation_start.includes(".")
                  ? state.data.injection_tube_orientation_start + value
                  : value === "0" && Number(state.data.injection_tube_orientation_start + value) !== 0
                  ? state.data.injection_tube_orientation_start + value
                  : Number(state.data.injection_tube_orientation_start + value).toString(),
            },
          }));
          break;
        case SealantInputParams.INJECTION_TUBE_ORIENTATION_END:
          set((state) => ({
            data: {
              ...state.data,
              injection_tube_orientation_end:
                (state.data.injection_tube_orientation_end.includes(".") && value == ".") ||
                state.data.injection_tube_orientation_end.length >= 8
                  ? state.data.injection_tube_orientation_end
                  : value == "."
                  ? state.data.injection_tube_orientation_end + value
                  : value === "0" &&
                    Number(state.data.injection_tube_orientation_end + value) === 0 &&
                    state.data.injection_tube_orientation_end.includes(".")
                  ? state.data.injection_tube_orientation_end + value
                  : value === "0" && Number(state.data.injection_tube_orientation_end + value) !== 0
                  ? state.data.injection_tube_orientation_end + value
                  : Number(state.data.injection_tube_orientation_end + value).toString(),
            },
          }));
          break;
        case SealantInputParams.IS_CAP_SURFACE_SMOOTH:
          set((state) => ({
            data: {
              ...state.data,
              is_cap_surface_smooth: value === "true" ? true : false,
            },
          }));
          break;
        case SealantInputParams.LATEX_RING_PADDING:
          set((state) => ({
            data: {
              ...state.data,
              latex_ring_padding:
                (state.data.latex_ring_padding.includes(".") && value == ".") ||
                state.data.latex_ring_padding.length >= 8
                  ? state.data.latex_ring_padding
                  : value == "."
                  ? state.data.latex_ring_padding + value
                  : value === "0" &&
                    Number(state.data.latex_ring_padding + value) === 0 &&
                    state.data.latex_ring_padding.includes(".")
                  ? state.data.latex_ring_padding + value
                  : value === "0" && Number(state.data.latex_ring_padding + value) !== 0
                  ? state.data.latex_ring_padding + value
                  : Number(state.data.latex_ring_padding + value).toString(),
            },
          }));
          break;
        case SealantInputParams.LATEX_RING_WIDTH:
          set((state) => ({
            data: {
              ...state.data,
              latex_ring_width:
                (state.data.latex_ring_width.includes(".") && value == ".") || state.data.latex_ring_width.length >= 8
                  ? state.data.latex_ring_width
                  : value == "."
                  ? state.data.latex_ring_width + value
                  : value === "0" &&
                    Number(state.data.latex_ring_width + value) === 0 &&
                    state.data.latex_ring_width.includes(".")
                  ? state.data.latex_ring_width + value
                  : value === "0" && Number(state.data.latex_ring_width + value) !== 0
                  ? state.data.latex_ring_width + value
                  : Number(state.data.latex_ring_width + value).toString(),
            },
          }));
          break;
        case SealantInputParams.TUBE_RIGIDITY:
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
        case SealantInputParams.CAP_UNSCREWING_TORQUE:
          set((state) => ({
            data: {
              ...state.data,
              cap_unscrewing_torque:
                (state.data.cap_unscrewing_torque.includes(".") && value == ".") ||
                state.data.cap_unscrewing_torque.length >= 8
                  ? state.data.cap_unscrewing_torque
                  : value == "."
                  ? state.data.cap_unscrewing_torque + value
                  : value === "0" &&
                    Number(state.data.cap_unscrewing_torque + value) === 0 &&
                    state.data.cap_unscrewing_torque.includes(".")
                  ? state.data.cap_unscrewing_torque + value
                  : value === "0" && Number(state.data.cap_unscrewing_torque + value) !== 0
                  ? state.data.cap_unscrewing_torque + value
                  : Number(state.data.cap_unscrewing_torque + value).toString(),
            },
          }));
          break;
        default:
          break;
      }
    },
    roundData: ({ key }) => {
      switch (key) {
        case SealantInputParams.CAP_MACHINE_SPEED:
          set((state) => ({
            data: { ...state.data, cap_machine_speed: Number(state.data.cap_machine_speed).toString() },
          }));
          break;
        case SealantInputParams.TOTAL_AIR_PRESSURE:
          set((state) => ({
            data: { ...state.data, total_air_pressure: Number(state.data.total_air_pressure).toString() },
          }));
          break;
        case SealantInputParams.HOLDERS_FORWARD:
          set((state) => ({ data: { ...state.data, holders_forward: Number(state.data.holders_forward).toString() } }));
          break;
        case SealantInputParams.HOLDERS_OPENING_LEFT:
          set((state) => ({
            data: { ...state.data, holders_opening_left: Number(state.data.holders_opening_left).toString() },
          }));
          break;
        case SealantInputParams.HOLDERS_OPENING_RIGHT:
          set((state) => ({
            data: { ...state.data, holders_opening_right: Number(state.data.holders_opening_right).toString() },
          }));
          break;
        case SealantInputParams.HOLDERS_CLOSING:
          set((state) => ({ data: { ...state.data, holders_closing: Number(state.data.holders_closing).toString() } }));
          break;
        case SealantInputParams.INJECTION_A_START:
          set((state) => ({
            data: { ...state.data, injection_a_start: Number(state.data.injection_a_start).toString() },
          }));
          break;
        case SealantInputParams.INJECTION_B_START:
          set((state) => ({
            data: { ...state.data, injection_b_start: Number(state.data.injection_b_start).toString() },
          }));
          break;
        case SealantInputParams.INJECTION_A_END:
          set((state) => ({ data: { ...state.data, injection_a_end: Number(state.data.injection_a_end).toString() } }));
          break;
        case SealantInputParams.INJECTION_B_END:
          set((state) => ({ data: { ...state.data, injection_b_end: Number(state.data.injection_b_end).toString() } }));
          break;
        case SealantInputParams.INJECTION_TUBE_ORIENTATION_START:
          set((state) => ({
            data: {
              ...state.data,
              injection_tube_orientation_start: Number(state.data.injection_tube_orientation_start).toString(),
            },
          }));
          break;
        case SealantInputParams.INJECTION_TUBE_ORIENTATION_END:
          set((state) => ({
            data: {
              ...state.data,
              injection_tube_orientation_end: Number(state.data.injection_tube_orientation_end).toString(),
            },
          }));
          break;
        case SealantInputParams.LATEX_RING_PADDING:
          set((state) => ({
            data: { ...state.data, latex_ring_padding: Number(state.data.latex_ring_padding).toString() },
          }));
          break;
        case SealantInputParams.LATEX_RING_WIDTH:
          set((state) => ({
            data: { ...state.data, latex_ring_width: Number(state.data.latex_ring_width).toString() },
          }));
          break;
        case SealantInputParams.TUBE_RIGIDITY:
          set((state) => ({ data: { ...state.data, tube_rigidity: Number(state.data.tube_rigidity).toString() } }));
          break;
        case SealantInputParams.CAP_UNSCREWING_TORQUE:
          set((state) => ({
            data: { ...state.data, cap_unscrewing_torque: Number(state.data.cap_unscrewing_torque).toString() },
          }));
          break;
        default:
          break;
      }
    },
  }))
);
