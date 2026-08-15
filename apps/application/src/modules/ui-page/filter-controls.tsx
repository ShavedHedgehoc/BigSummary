import UiGroupLayout from "../../shared/layouts/ui-group-layout";
import FilterButton from "../../shared/ui/filter-button";
import FilterDateInput from "../../shared/ui/filter-date-input";
import FilterInput from "../../shared/ui/filter-input";
import FilterInputWithSort from "../../shared/ui/filter-input-with-sort";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";

export default function FilterControls() {
  const filterSelectorOptions = (
    <>
      <FilterSelectorOption key={"sel_opt_1"} id={999} value={"Все"} />
      <FilterSelectorOption key={"sel_opt_2"} id={1} value={"Пискаревка"} />
      <FilterSelectorOption key={"sel_opt_3"} id={2} value={"Колпино"} />
    </>
  );

  const filterSelectorProps: FilterSelectorProps = {
    id: "filterSelector",
    selectedOption: 1,
    placeholder: "Выберите площадку",
    label: "Выбор площадки",
    options: filterSelectorOptions,
    setSelectedOption: () => void 0,

    changeFilter: () => void 0,
  };
  return (
    <UiGroupLayout>
      <UiGroupLayout.Header>Filter controls</UiGroupLayout.Header>
      <UiGroupLayout.Main>
        <FilterDateInput
          id={"filter_date_input"}
          value={new Date().toJSON().slice(0, 10)}
          placeholder="Выбор даты"
          label="Выбор даты"
          changeFilter={() => void 0}
        />
        <FilterInputWithSort
          id={"filter_input_with_sort"}
          value={""}
          sortAscValue={true}
          sortKey={"sortKey"}
          disabled={false}
          placeholder={"Партия"}
          label={"Поиск по партии"}
          changeFilter={() => void 0}
        />
        <FilterInput
          id={"filter_input_with_sort"}
          value={""}
          disabled={false}
          placeholder={"Артикул"}
          label={"Поиск по артикулу"}
          changeFilter={() => void 0}
        />
        <FilterSelector {...filterSelectorProps} />
        <FilterButton
          label={"Сбросить"}
          disabled={false}
          startDecorator={<DeleteOutlineIcon />}
          onClick={() => void 0}
        />
      </UiGroupLayout.Main>
    </UiGroupLayout>
  );
}
