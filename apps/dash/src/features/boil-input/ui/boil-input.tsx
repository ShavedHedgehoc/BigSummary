import { useBoilInputStore } from '@/entities/boil';
import { useShallow } from 'zustand/react/shallow';

export function BoilInput() {
  const value = useBoilInputStore(useShallow((state) => state.filter.boil));
  return (
    <div className="flex w-full items-center justify-center self-start mt-2">
      <div className="flex w-full h-16 rounded-lg items-center px-4 justify-start text-amber-600 bg-gray-950  text-4xl border1 border-slate-300">
        {value}
      </div>
    </div>
  );
}
