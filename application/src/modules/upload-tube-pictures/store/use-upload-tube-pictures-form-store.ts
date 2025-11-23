import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UploadTubePicturesFormStore {
  file: File | undefined;
  fileName: string;
  setFile: (value: File | undefined) => void;
  setFileName: (value: string) => void;
  clearData: () => void;
}

export const useUploadTubePicturesFormStore = create<UploadTubePicturesFormStore>()(
  devtools((set) => ({
    file: undefined,
    fileName: "",
    setFile: (value) => set(() => ({ file: value })),
    setFileName: (value) => set(() => ({ fileName: value })),
    clearData: () =>
      set(() => ({
        file: undefined,
        fileName: "",
      })),
  }))
);
