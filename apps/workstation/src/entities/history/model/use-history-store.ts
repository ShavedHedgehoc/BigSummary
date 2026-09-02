import { create } from 'zustand';
import { trpcVanilla } from '@/shared/api';
import { TCreateWorkstationHistoryInput } from '@repo/schemas';
import { TRPCClientError } from '@trpc/client';

interface HistoriesState {
  pending: boolean;
  isError: boolean;
  error: string;
  addHistories: (payload: TCreateWorkstationHistoryInput) => Promise<boolean>;
}

export const useHistoriesStore = create<HistoriesState>((set) => ({
  pending: false,
  isError: false,
  error: '',

  addHistories: async (payload) => {
    set({ pending: true, isError: false, error: '' });
    try {
      await trpcVanilla.workstation.history.createHistory.mutate(payload);
      return true;
    } catch (err: unknown) {
      let errorMessage = 'Не удалось сохранить запись';
      if (err instanceof TRPCClientError) {
        errorMessage = err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ isError: true, error: errorMessage });
      return false;
    } finally {
      set({ pending: false });
    }
  },
}));
