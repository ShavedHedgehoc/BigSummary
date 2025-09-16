import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useShallow } from "zustand/shallow";
import { useParams } from "react-router-dom";
import { Params } from "../../../shared/router/params";
import { useInventoryDetailFilterStore } from "../store/inventory-detail-filter-store";
import { useInventoryRows } from "../use-inventory-rows";
import makeXLSXFile from "../make-xlsx";
import { useInventory } from "../use-inventory";
import { formatDateToString } from "../../../shared/helpers/date-time-formatters";

export default function InventoryDetailToXLSXButton() {
  const params = useParams<Params.INVENTORY_PARAMS>();
  const inventory_id: string | undefined = params.inventory_id;
  const filter = useInventoryDetailFilterStore(useShallow((state) => state.filter));
  const { data: dataRows } = useInventoryRows({ inventoryId: inventory_id, filter: filter });
  const { data: dataInventory } = useInventory(inventory_id);

  const handleClick = () => {
    if (dataRows && dataRows.length) {
      const title = `Данные переучета ${dataInventory ? dataInventory.plant_name : "<Нет данных>"} от ${
        dataInventory ? formatDateToString(dataInventory.date) : "<Нет данных>"
      }`;
      makeXLSXFile(dataRows, title);
    }
  };

  const disableButtonCondition = !(dataRows && dataRows.length);

  const downloadButtonProps: FilterButtonProps = {
    label: "Скачать",
    disabled: disableButtonCondition,
    startDecorator: <FileDownloadOutlinedIcon />,
    onClick: () => handleClick(),
  };

  return <FilterButton {...downloadButtonProps} />;
}
