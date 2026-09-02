import { create } from 'zustand';
import { trpcVanilla } from '@/shared/api';
import { TWorkstationEmployeeByBarcodeOutput } from '@repo/schemas';
import { ProcessMessages } from '@/shared/config';
import { TRPCClientError } from '@trpc/client';

interface EmployeeState {
  employee: TWorkstationEmployeeByBarcodeOutput | null;
  pending: boolean;
  error: string;
  getEmployeeByBarcode: (barcode: string) => Promise<void>;
  clearEmployee: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employee: null,
  pending: false,
  error: '',

  getEmployeeByBarcode: async (barcode: string) => {
    set({ pending: true, error: '' });
    try {
      const data = await trpcVanilla.workstation.employee.getEmployeeByBarcode.query({ barcode });
      if (!data) {
        set({ employee: null, error: ProcessMessages.USER_NOT_FOUND });
      } else if (!data.occupations) {
        set({ employee: data, error: 'Роль отсутствует или не прописана' });
      } else {
        set({ employee: data, error: '' });
      }
    } catch (err: unknown) {
      let errorMessage = 'Ошибка сети';
      if (err instanceof TRPCClientError) {
        errorMessage = err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ employee: null, error: errorMessage });
    } finally {
      set({ pending: false });
    }
  },

  clearEmployee: () => set({ employee: null, error: '' }),
}));
