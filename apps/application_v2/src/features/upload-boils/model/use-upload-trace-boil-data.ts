import { trpc } from '@/shared/api';

export function useUploadTraceBoilData() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.trace.boil.uploadTraceBoils.useMutation({
    onSuccess: () => {
      utils.application.trace.boil.getWghtReport.invalidate();
    },
  });
  return {
    uploadTRaceBoilData: mutation.mutate,
    uploadTRaceBoilDataAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
