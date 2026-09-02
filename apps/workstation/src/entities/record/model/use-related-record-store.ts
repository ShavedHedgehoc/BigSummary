import { create } from 'zustand';
import { trpcVanilla } from '@/shared/api';
import {
  TWorkstationRelatedRecordItem,
  TWorkstationRelatedRecordListInput,
  TWorkstationRelatedRecordListResponse,
} from '@repo/schemas';

interface RelatedRecordsState {
  records: TWorkstationRelatedRecordItem[];
  pending: boolean;
  fetchRelatedRecords: (params: TWorkstationRelatedRecordListInput) => Promise<void>;
  setRecords: (records: TWorkstationRelatedRecordListResponse) => void;
  clearRelatedRecords: () => void;
}

export const useRelatedRecordsStore = create<RelatedRecordsState>((set) => ({
  records: [],
  pending: false,
  fetchRelatedRecords: async (params) => {
    set({ pending: true });
    try {
      const data = await trpcVanilla.workstation.record.getRelatedRecords.query(params);
      set({ records: data || [] });
    } catch {
      set({ records: [] });
    } finally {
      set({ pending: false });
    }
  },
  setRecords: (records) => set({ records }),
  clearRelatedRecords: () => set({ records: [] }),
}));
