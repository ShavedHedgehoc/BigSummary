import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface IXLSRegulationsData {
  code: string;
  serie: string;
  marking: string;
  name: string;
  water_base_min_weight: number;
  water_base_max_weight: number;
  per_box: number;
  box_per_row: number;
  row_on_pallet: number;
  gasket: string;
  seal: boolean;
  technician_note: string;
  packaging_note: string;
  marking_sample: string;
}

interface RegulationsUpsertFormStore {
  file: File | undefined;
  fileName: string;
  isValid: boolean;
  errsModalShow: boolean;
  errs: string[] | [];
  dataForUpload: IXLSRegulationsData[] | [];
  setIsValid: (value: boolean) => void;
  setErrsModalShow: (value: boolean) => void;
  setFile: (value: File | undefined) => void;
  setFileName: (value: string) => void;
  clearData: () => void;
  setErrs: (values: string[] | []) => void;
  addErrs: (value: string) => void;
  setDataForUpload: (arr: IXLSRegulationsData[]) => void;
}

export const useRegulationsUpsertFormStore = create<RegulationsUpsertFormStore>()(
  devtools((set) => ({
    file: undefined,
    fileName: "",
    isValid: false,
    errs: [],
    dataForUpload: [],
    errsModalShow: false,
    setIsValid: (value) => set(() => ({ isValid: value })),
    setErrsModalShow: (value) => set(() => ({ errsModalShow: value })),
    setFile: (value) => set(() => ({ file: value })),
    setFileName: (value) => set(() => ({ fileName: value })),
    clearData: () =>
      set(() => ({
        isValid: false,
        file: undefined,
        fileName: "",
        errs: [],
        errsModalShow: false,
        dataForUpload: [],
      })),
    setErrs: (values) => set(() => ({ errs: values })),
    addErrs: (value) => set((state) => ({ errs: [...state.errs, value] })),
    setDataForUpload: (arr) => set(() => ({ dataForUpload: [...arr] })),
  }))
);
