import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ITubeConveyor } from "../../../../shared/api/services/tube-conveyors-service";
import { ITubeProduct } from "../../../../shared/api/services/tube-products-service";
import { IOffsetTreshold } from "../../../../shared/api/services/tube-tresholds-service";

interface FormField {
  key: string;
  value: string;
  values?: number[];
}

interface OffsetTresholds {
  product_id: number | null;
  conveyor_id: number | null;
  printing_machine_speed_min: string;
  printing_machine_speed_max: string;
  total_air_pressure_min: string;
  total_air_pressure_max: string;
  padding_furnace_temp_min: string;
  padding_furnace_temp_max: string;
  offset_furnace_temp_min: string;
  offset_furnace_temp_max: string;
  printer_motor_min: string;
  printer_motor_max: string;
  base_covers_holders_motor_min: string;
  base_covers_holders_motor_max: string;
  base_covers_station_motor_min: string;
  base_covers_station_motor_max: string;
  imprint_quantity_printed_box_1_min: string;
  imprint_quantity_printed_box_1_max: string;
  imprint_quantity_printed_box_2_min: string;
  imprint_quantity_printed_box_2_max: string;
  imprint_quantity_printed_box_3_min: string;
  imprint_quantity_printed_box_3_max: string;
  imprint_quantity_printed_box_4_min: string;
  imprint_quantity_printed_box_4_max: string;
  imprint_quantity_printed_box_5_min: string;
  imprint_quantity_printed_box_5_max: string;
  imprint_quantity_printed_box_6_min: string;
  imprint_quantity_printed_box_6_max: string;
  ink_supply_time_min: string;
  ink_supply_time_max: string;
}

interface TubeOffsetTresholdsStore {
  tresholds: OffsetTresholds;
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
  setTreshold: (value: IOffsetTreshold) => void;
}

const initTresholdsValue: OffsetTresholds = {
  product_id: null,
  conveyor_id: null,
  printing_machine_speed_min: "",
  printing_machine_speed_max: "",
  total_air_pressure_min: "",
  total_air_pressure_max: "",
  padding_furnace_temp_min: "",
  padding_furnace_temp_max: "",
  offset_furnace_temp_min: "",
  offset_furnace_temp_max: "",
  printer_motor_min: "",
  printer_motor_max: "",
  base_covers_holders_motor_min: "",
  base_covers_holders_motor_max: "",
  base_covers_station_motor_min: "",
  base_covers_station_motor_max: "",
  imprint_quantity_printed_box_1_min: "",
  imprint_quantity_printed_box_1_max: "",
  imprint_quantity_printed_box_2_min: "",
  imprint_quantity_printed_box_2_max: "",
  imprint_quantity_printed_box_3_min: "",
  imprint_quantity_printed_box_3_max: "",
  imprint_quantity_printed_box_4_min: "",
  imprint_quantity_printed_box_4_max: "",
  imprint_quantity_printed_box_5_min: "",
  imprint_quantity_printed_box_5_max: "",
  imprint_quantity_printed_box_6_min: "",
  imprint_quantity_printed_box_6_max: "",
  ink_supply_time_min: "",
  ink_supply_time_max: "",
};

export enum OffsetTresholdsParams {
  PRODUCT_ID = "product_id",
  CONVEYOR_ID = "conveyor_id",
  PRINTING_MACHINE_SPEED_MIN = "printing_machine_speed_min",
  PRINTING_MACHINE_SPEED_MAX = "printing_machine_speed_max",
  TOTAL_AIR_PRESSURE_MIN = "total_air_pressure_min",
  TOTAL_AIR_PRESSURE_MAX = "total_air_pressure_max",
  PADDING_FURNACE_TEMP_MIN = "padding_furnace_temp_min",
  PADDING_FURNACE_TEMP_MAX = "padding_furnace_temp_max",
  OFFSET_FURNACE_TEMP_MIN = "offset_furnace_temp_min",
  OFFSET_FURNACE_TEMP_MAX = "offset_furnace_temp_max",
  PRINTER_MOTOR_MIN = "printer_motor_min",
  PRINTER_MOTOR_MAX = "printer_motor_max",
  BASE_COVERS_HOLDERS_MOTOR_MIN = "base_covers_holders_motor_min",
  BASE_COVERS_HOLDERS_MOTOR_MAX = "base_covers_holders_motor_max",
  BASE_COVERS_STATION_MOTOR_MIN = "base_covers_station_motor_min",
  BASE_COVERS_STATION_MOTOR_MAX = "base_covers_station_motor_max",
  IMPRINT_QUANTITY_PRINTED_BOX_1_MIN = "imprint_quantity_printed_box_1_min",
  IMPRINT_QUANTITY_PRINTED_BOX_1_MAX = "imprint_quantity_printed_box_1_max",
  IMPRINT_QUANTITY_PRINTED_BOX_2_MIN = "imprint_quantity_printed_box_2_min",
  IMPRINT_QUANTITY_PRINTED_BOX_2_MAX = "imprint_quantity_printed_box_2_max",
  IMPRINT_QUANTITY_PRINTED_BOX_3_MIN = "imprint_quantity_printed_box_3_min",
  IMPRINT_QUANTITY_PRINTED_BOX_3_MAX = "imprint_quantity_printed_box_3_max",
  IMPRINT_QUANTITY_PRINTED_BOX_4_MIN = "imprint_quantity_printed_box_4_min",
  IMPRINT_QUANTITY_PRINTED_BOX_4_MAX = "imprint_quantity_printed_box_4_max",
  IMPRINT_QUANTITY_PRINTED_BOX_5_MIN = "imprint_quantity_printed_box_5_min",
  IMPRINT_QUANTITY_PRINTED_BOX_5_MAX = "imprint_quantity_printed_box_5_max",
  IMPRINT_QUANTITY_PRINTED_BOX_6_MIN = "imprint_quantity_printed_box_6_min",
  IMPRINT_QUANTITY_PRINTED_BOX_6_MAX = "imprint_quantity_printed_box_6_max",
  INK_SUPPLY_TIME_MIN = "ink_supply_time_min",
  INK_SUPPLY_TIME_MAX = "ink_supply_time_max",
}

export const useTubeOffsetTresholdsStore = create<TubeOffsetTresholdsStore>()(
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
        case OffsetTresholdsParams.PRODUCT_ID:
          set((state) => ({
            tresholds: { ...state.tresholds, product_id: values?.length ? values[0] : state.tresholds.product_id },
          }));
          break;
        case OffsetTresholdsParams.CONVEYOR_ID:
          set((state) => ({
            tresholds: { ...state.tresholds, conveyor_id: values?.length ? values[0] : state.tresholds.conveyor_id },
          }));
          break;
        case OffsetTresholdsParams.PRINTING_MACHINE_SPEED_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, printing_machine_speed_min: value } }));
          break;
        case OffsetTresholdsParams.PRINTING_MACHINE_SPEED_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, printing_machine_speed_max: value } }));
          break;
        case OffsetTresholdsParams.TOTAL_AIR_PRESSURE_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, total_air_pressure_min: value } }));
          break;
        case OffsetTresholdsParams.TOTAL_AIR_PRESSURE_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, total_air_pressure_max: value } }));
          break;
        case OffsetTresholdsParams.PADDING_FURNACE_TEMP_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, padding_furnace_temp_min: value } }));
          break;
        case OffsetTresholdsParams.PADDING_FURNACE_TEMP_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, padding_furnace_temp_max: value } }));
          break;
        case OffsetTresholdsParams.OFFSET_FURNACE_TEMP_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, offset_furnace_temp_min: value } }));
          break;
        case OffsetTresholdsParams.OFFSET_FURNACE_TEMP_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, offset_furnace_temp_max: value } }));
          break;
        case OffsetTresholdsParams.PRINTER_MOTOR_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, printer_motor_min: value } }));
          break;
        case OffsetTresholdsParams.PRINTER_MOTOR_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, printer_motor_max: value } }));
          break;
        case OffsetTresholdsParams.BASE_COVERS_HOLDERS_MOTOR_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, base_covers_holders_motor_min: value } }));
          break;
        case OffsetTresholdsParams.BASE_COVERS_HOLDERS_MOTOR_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, base_covers_holders_motor_max: value } }));
          break;
        case OffsetTresholdsParams.BASE_COVERS_STATION_MOTOR_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, base_covers_station_motor_min: value } }));
          break;
        case OffsetTresholdsParams.BASE_COVERS_STATION_MOTOR_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, base_covers_station_motor_max: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_1_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_1_min: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_1_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_1_max: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_2_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_2_min: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_2_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_2_max: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_3_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_3_min: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_3_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_3_max: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_4_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_4_min: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_4_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_4_max: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_5_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_5_min: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_5_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_5_max: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_6_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_6_min: value } }));
          break;
        case OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_6_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, imprint_quantity_printed_box_6_max: value } }));
          break;
        case OffsetTresholdsParams.INK_SUPPLY_TIME_MIN:
          set((state) => ({ tresholds: { ...state.tresholds, ink_supply_time_min: value } }));
          break;
        case OffsetTresholdsParams.INK_SUPPLY_TIME_MAX:
          set((state) => ({ tresholds: { ...state.tresholds, ink_supply_time_max: value } }));
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
          printing_machine_speed_min: value.printing_machine_speed_min,
          printing_machine_speed_max: value.printing_machine_speed_max,
          total_air_pressure_min: value.total_air_pressure_min,
          total_air_pressure_max: value.total_air_pressure_max,
          padding_furnace_temp_min: value.padding_furnace_temp_min,
          padding_furnace_temp_max: value.padding_furnace_temp_max,
          offset_furnace_temp_min: value.offset_furnace_temp_min,
          offset_furnace_temp_max: value.offset_furnace_temp_max,
          printer_motor_min: value.printer_motor_min,
          printer_motor_max: value.printer_motor_max,
          base_covers_holders_motor_min: value.base_covers_holders_motor_min,
          base_covers_holders_motor_max: value.base_covers_holders_motor_max,
          base_covers_station_motor_min: value.base_covers_station_motor_min,
          base_covers_station_motor_max: value.base_covers_station_motor_max,
          imprint_quantity_printed_box_1_min: value.imprint_quantity_printed_box_1_min ?? "",
          imprint_quantity_printed_box_1_max: value.imprint_quantity_printed_box_1_max ?? "",
          imprint_quantity_printed_box_2_min: value.imprint_quantity_printed_box_2_min ?? "",
          imprint_quantity_printed_box_2_max: value.imprint_quantity_printed_box_2_max ?? "",
          imprint_quantity_printed_box_3_min: value.imprint_quantity_printed_box_3_min ?? "",
          imprint_quantity_printed_box_3_max: value.imprint_quantity_printed_box_3_max ?? "",
          imprint_quantity_printed_box_4_min: value.imprint_quantity_printed_box_4_min ?? "",
          imprint_quantity_printed_box_4_max: value.imprint_quantity_printed_box_4_max ?? "",
          imprint_quantity_printed_box_5_min: value.imprint_quantity_printed_box_5_min ?? "",
          imprint_quantity_printed_box_5_max: value.imprint_quantity_printed_box_5_max ?? "",
          imprint_quantity_printed_box_6_min: value.imprint_quantity_printed_box_6_min ?? "",
          imprint_quantity_printed_box_6_max: value.imprint_quantity_printed_box_6_max ?? "",
          ink_supply_time_min: value.ink_supply_time_min,
          ink_supply_time_max: value.ink_supply_time_max,
        },
        selectedProductOption: value.product_id,
        selectedConveyorOption: value.conveyor_id,
      })),
  }))
);
