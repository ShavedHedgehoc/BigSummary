import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IXLSBoilsRowData } from "../../../shared/api/services/direct-trace-service";

export interface ValError {
  row: number;
  field: string;
  error: string;
}

interface BoilsUploadFormStore {
  isValid: boolean;
  errsModalShow: boolean;
  file: File | undefined;
  fileName: string;
  errs: ValError[];
  dataForUpload: IXLSBoilsRowData[] | [];
  setIsValid: (value: boolean) => void;
  setErrsModalShow: (value: boolean) => void;
  setFile: (value: File | undefined) => void;
  setFileName: (value: string) => void;
  clearData: () => void;
  addErrs: (value: ValError) => void;
  setDataForUpload: (arr: IXLSBoilsRowData[]) => void;
}

export const useBoilsUploadFormStore = create<BoilsUploadFormStore>()(
  devtools((set) => ({
    dataForUpload: [],
    errsModalShow: false,
    isValid: false,
    file: undefined,
    fileName: "",
    errs: [],
    setErrsModalShow: (value) => set(() => ({ errsModalShow: value })),
    setIsValid: (value) => set(() => ({ isValid: value })),
    setFile: (value) => set(() => ({ file: value })),
    setFileName: (value) => set(() => ({ fileName: value })),
    clearData: () =>
      set(() => ({
        isValid: false,
        file: undefined,
        fileName: "",
        errs: [],
        dataForUpload: [],
        errsModalShow: false,
      })),
    addErrs: (value) => {
      set((state) => ({
        errs: [...state.errs, value],
      }));
    },
    setDataForUpload: (arr) => set(() => ({ dataForUpload: [...arr] })),
  }))
);
