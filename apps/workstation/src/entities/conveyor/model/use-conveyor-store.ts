import { create } from 'zustand';
import { trpcVanilla } from '@/shared/api';

import { ProcessMessages } from '@/shared/config';
import { TRPCClientError } from '@trpc/client';
import { TWorkstationConveyorByBarcodeOutput } from '@repo/schemas';

interface ConveyorState {
  conveyor: TWorkstationConveyorByBarcodeOutput | null;
  pending: boolean;
  error: string;
  getConveyorByBarcode: (barcode: string) => Promise<void>;
  clearConveyor: () => void;
}

export const useConveyorStore = create<ConveyorState>((set) => ({
  conveyor: null,
  pending: false,
  error: '',

  getConveyorByBarcode: async (barcode: string) => {
    set({ pending: true, error: '' });
    try {
      const data = await trpcVanilla.workstation.conveyor.getConveyorByBarcode.query({ barcode });
      if (!data) {
        set({ conveyor: null, error: ProcessMessages.CONVEYOR_NOT_FOUND });
      } else {
        set({ conveyor: data, error: '' });
      }
    } catch (err: unknown) {
      let errorMessage = 'Ошибка сети';
      if (err instanceof TRPCClientError) {
        errorMessage = err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ conveyor: null, error: errorMessage });
    } finally {
      set({ pending: false });
    }
  },
  clearConveyor: () => set({ conveyor: null, error: '' }),
}));
