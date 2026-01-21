import { Stack, Typography } from "@mui/joy";
import { TubeRecordDetailData } from "../../shared/api/services/tube-records-service";
import TubeRecordDetailXLSXButton from "./tube-record-detail-xlsx-button";

export default function TubeRecordDetailProduct({ productData }: { productData: TubeRecordDetailData }) {
  return (
    <Stack direction="row" justifyContent="space-between" gap={1}>
      <Stack>
        <Typography>{`${productData.product_code} ${productData.product_name}`}</Typography>
        <Typography>{`Партия: ${productData.batch_name}`}</Typography>
        <Typography>{`Конвейер: ${productData.conveyor_name}`}</Typography>
        <Typography>{`План: ${productData.plan}`}</Typography>
      </Stack>
      <Stack justifyContent="space-between">
        <Typography level="h3">
          {productData.isFinished ? "Завершена" : productData.isActive ? "В работе" : ""}
        </Typography>
        <TubeRecordDetailXLSXButton summary_id={String(productData.id)} />
      </Stack>
    </Stack>
  );
}
