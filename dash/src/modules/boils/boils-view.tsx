import BoilsBarcodeModal from "./boils-barcode-modal";
import BoilsInput from "./boils-input";
import BoilsKeyboard from "./boils-keyboard";
import BoilsPagination from "./boils-pagination";
import BoilsTable from "./boils-table";

export default function BoilsView() {
  return (
    <div className="flex flex-col w-full h-full gap-4 px-4 py-2 bg-gray-900">
      <BoilsBarcodeModal />
      <BoilsInput />
      <BoilsTable />
      <BoilsPagination />
      <BoilsKeyboard />
    </div>
  );
}
