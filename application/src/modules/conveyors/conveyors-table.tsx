import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../components/tables/TableLoaderComponent";
import TableNotFoundComponent from "../../components/tables/TableNotFoundComponent";

import { useConveyors } from "../../shared/api/use-conveyors";
import RowComponent from "./conveyors-row";

const commonThead: TheadProperties[] = [
  { width: 50, align: "center", value: "Конвейер" },
  { width: 80, align: "center", value: "Штрихкод" },
  { width: 110, align: "center", value: "Действия" },
];

export default function ConveyorsTable() {
  //   const filter = useRecordsFilterStore(useShallow((state) => state.filter));
  const { isPending, data, isSuccess } = useConveyors();

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.length === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.map((row) => <RowComponent row={row} key={row.id} />)}
    </TableLayout>
  );
}
