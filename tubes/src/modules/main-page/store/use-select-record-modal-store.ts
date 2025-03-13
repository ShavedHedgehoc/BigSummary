import { create } from "zustand";
import { ActiveRecord } from "../../../shared/api/services/record-service";

interface SelectRecordModalStore {
  open: boolean;
  checkedId: ActiveRecord | null;
  conveyor: string | null;
  setOpen: (val: boolean) => void;
  setCheckedId: (val: ActiveRecord | null) => void;
  setConveyor: (val: string | null) => void;
}
export const useSelectRecordModalStore = create<SelectRecordModalStore>()((set) => ({
  open: false,
  checkedId: null,
  conveyor: null,
  setOpen: (val: boolean) => set(() => ({ open: val })),
  setCheckedId: (val: ActiveRecord | null) => set(() => ({ checkedId: val })),
  setConveyor: (val: string | null) => set(() => ({ conveyor: val })),
}));
