import { useShallow } from "zustand/react/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTrademarksFilterStore } from "../store/use-trademarks-filter-store";
import { TrademarksFilterParams } from "./trademarks-filter-params";

export default function TrademarkFilterProductCodeInput() {
  const filter = useTrademarksFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTrademarksFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps = {
    id: TrademarksFilterParams.PRODUCT_CODE,
    value: filter.product_code,
    disabled: filter.product_code === "",
    label: "Поиск по коду 1С",
    placeholder: "Код 1С",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
