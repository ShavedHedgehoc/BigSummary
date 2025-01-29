import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface IXLSBasesData {
  code: string;
  marking: string;
}

interface BasesUploadFormStore {
  file: File | undefined;
  fileName: string;
  isValid: boolean;
  errsModalShow: boolean;
  errs: string[] | [];
  dataForUpload: IXLSBasesData[] | [];
  setIsValid: (value: boolean) => void;
  setErrsModalShow: (value: boolean) => void;
  setFile: (value: File | undefined) => void;
  setFileName: (value: string) => void;
  clearData: () => void;
  setErrs: (values: string[] | []) => void;
  addErrs: (value: string) => void;
  setDataForUpload: (arr: IXLSBasesData[]) => void;
}

export const useBasesUploadFormStore = create<BasesUploadFormStore>()(
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
