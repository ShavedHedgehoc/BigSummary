import { useShallow } from 'zustand/react/shallow';
import { useBoilsUploadUploadComponentStore } from '../model/store';
import { Loader2 } from 'lucide-react';

export default function LoaderComponent() {
  const { processed, toProcess, fail } = useBoilsUploadUploadComponentStore(
    useShallow((state) => ({
      processed: state.processed,
      toProcess: state.toProcess,
      fail: state.fail,
    })),
  );

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full text-xs text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin text-emerald-600 dark:text-emerald-400" />
      <div className="flex flex-col gap-0.5 items-center justify-center">
        <div>
          Обработано {processed} партий из {toProcess}
        </div>
        <div>Ошибок: {fail}</div>
      </div>
    </div>
  );
}
