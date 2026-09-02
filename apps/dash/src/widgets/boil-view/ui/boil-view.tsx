import { BoilPagination } from '@/entities/boil';
import { BoilTable } from '@/widgets/boil-table';
import { BoilInput, BoilKeyboard } from '@/features/boil-input';
import { BoilBarcodeModal } from '@/features/boil-barcode';

export function BoilView() {
  return (
    <div className="flex flex-col w-full h-full gap-4 px-4 py-2 bg-gray-900">
      <BoilBarcodeModal />
      <BoilInput />
      <BoilTable />
      <BoilPagination />
      <BoilKeyboard />
    </div>
  );
}
