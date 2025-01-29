import { create } from "zustand";

import { IPlant } from "../../../types";
import { devtools } from "zustand/middleware";

import { getTomorrowDate } from "../../../shared/helpers/date-time-formatters";
import { DocsUploadFormParams } from "../docs-upload-form-params";

interface DocsUploadFormData {
  plant: number | null;
  dateForUpload: string;
  update: boolean;
}

interface DocsUploadFormStore {
  formData: DocsUploadFormData;
  update: boolean;
  isValid: boolean;
  selectedPlant: number | null;
  plantSelectorOptions: IPlant[] | [];
  file: File | undefined;
  fileName: string;
  errs: string[] | [];
  dataForUpload: IXLSData[] | [];
  changeFilter: (value: DocsUploadFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
  setIsValid: (value: boolean) => void;
  setFile: (value: File | undefined) => void;
  setFileName: (value: string) => void;
  clearData: () => void;
  setErrs: (values: string[] | []) => void;
  addErrs: (value: string) => void;
  setDataForUpload: (arr: IXLSData[]) => void;
  setUpdate: (val: boolean) => void;
}

const initFilterValue: DocsUploadFormData = {
  plant: null,
  dateForUpload: getTomorrowDate(),
  update: false,
};

export const useDocsUploadFormStore = create<DocsUploadFormStore>()(
  devtools((set) => ({
    formData: initFilterValue,
    update: false,
    dataForUpload: [],
    isValid: false,
    file: undefined,
    fileName: "",
    errs: [],
    selectedPlant: null,
    plantSelectorOptions: [],
    setUpdate: (value) => set(() => ({ update: value })),

    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case DocsUploadFormParams.PLANT:
          set((state) => ({
            formData: { ...state.formData, plant: values?.length ? values[0] : state.formData.plant },
          }));
          break;

        case DocsUploadFormParams.DATE:
          set((state) => ({
            formData: { ...state.formData, dateForUpload: value },
          }));
          break;
        case DocsUploadFormParams.UPDATE:
          set((state) => ({
            formData: { ...state.formData, update: value === "true" ? true : false },
          }));
          break;
        default:
          break;
      }
    },
    setSelectedPlant: (value) => set(() => ({ selectedPlant: value })),
    fillPlantSelectorOptions: (values) => set(() => ({ plantSelectorOptions: [...values] })),
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
      })),
    setErrs: (values) => set(() => ({ errs: values })),
    addErrs: (value) => set((state) => ({ errs: [...state.errs, value] })),
    setDataForUpload: (arr) => set(() => ({ dataForUpload: [...arr] })),
  }))
);
