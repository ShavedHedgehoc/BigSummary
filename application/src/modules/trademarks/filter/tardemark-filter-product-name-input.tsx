import { useShallow } from "zustand/react/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTrademarksFilterStore } from "../store/use-trademarks-filter-store";
import { TrademarksFilterParams } from "./trademarks-filter-params";

export default function TrademarkFilterProductNameInput() {
  const filter = useTrademarksFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTrademarksFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps = {
    id: TrademarksFilterParams.PRODUCT_NAME,
    value: filter.product_name,
    disabled: filter.product_name === "",
    label: "Поиск по наименованию",
    placeholder: "Наименование",
    maxW: 200,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
