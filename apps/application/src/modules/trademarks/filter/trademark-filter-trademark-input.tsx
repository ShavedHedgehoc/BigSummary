import { useShallow } from "zustand/react/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTrademarksFilterStore } from "../store/use-trademarks-filter-store";
import { TrademarksFilterParams } from "./trademarks-filter-params";

export default function TrademarkFilterTrademarkInput() {
  const filter = useTrademarksFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTrademarksFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps = {
    id: TrademarksFilterParams.TRADEMARK,
    value: filter.trademark,
    disabled: filter.trademark === "",
    label: "Поиск по торговому названию",
    placeholder: "Торговое название",
    maxW: 220,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
