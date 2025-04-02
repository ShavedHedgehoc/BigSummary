import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getTomorrowDate } from "../../../shared/helpers/date-time-formatters";
import { TubeRecordsUploadFormParams } from "../tube-records-upload-form-params";
import { IXLSXTubeRecordRowData } from "../../../shared/api/services/tube-records-service";

interface TubeRecordsUploadFormData {
  dateForUpload: string;
  update: boolean;
}
export interface ValError {
  row: number;
  field: string;
  error: string;
}

interface TubeRecordsUploadFormStore {
  formData: TubeRecordsUploadFormData;
  update: boolean;
  isValid: boolean;
  errsModalShow: boolean;
  file: File | undefined;
  fileName: string;
  errs: ValError[];
  dataForUpload: IXLSXTubeRecordRowData[] | [];
  changeFilter: (value: DocsUploadFormField) => void;

  setIsValid: (value: boolean) => void;
  setErrsModalShow: (value: boolean) => void;
  setFile: (value: File | undefined) => void;
  setFileName: (value: string) => void;
  clearData: () => void;
  // setErrs: (values: string[] | []) => void;
  addErrs: (value: ValError) => void;
  setDataForUpload: (arr: IXLSXTubeRecordRowData[]) => void;
  setUpdate: (val: boolean) => void;
}

const initFilterValue: TubeRecordsUploadFormData = {
  dateForUpload: getTomorrowDate(),
  update: false,
};

export const useTubeRecordsUploadFormStore = create<TubeRecordsUploadFormStore>()(
  devtools((set) => ({
    formData: initFilterValue,
    update: false,
    dataForUpload: [],
    errsModalShow: false,
    isValid: false,
    file: undefined,
    fileName: "",
    errs: [],

    setUpdate: (value) => set(() => ({ update: value })),
    setErrsModalShow: (value) => set(() => ({ errsModalShow: value })),
    changeFilter: ({ key, value }) => {
      switch (key) {
        case TubeRecordsUploadFormParams.DATE:
          set((state) => ({
            formData: { ...state.formData, dateForUpload: value },
          }));
          break;
        case TubeRecordsUploadFormParams.UPDATE:
          set((state) => ({
            formData: { ...state.formData, update: value === "true" ? true : false },
          }));
          break;
        default:
          break;
      }
    },

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
    // setErrs: (values) => set(() => ({ errs: values })),
    addErrs: (value) => {
      set((state) => ({
        errs: [...state.errs, value],
      }));
    },
    setDataForUpload: (arr) => set(() => ({ dataForUpload: [...arr] })),
  }))
);
