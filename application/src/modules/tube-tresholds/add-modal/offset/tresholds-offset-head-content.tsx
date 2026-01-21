import { Stack, Typography } from "@mui/joy";
import { TresholdsConveyorEntry } from "../shared/tresholds-conveyor-entry";
import { TresholdsProductEntry } from "../shared/tresholds-product-entry";
import { OffsetTresholdsParams } from "../store/use-tube-offset-tresholds-store";
import { useOffsetTresholds } from "./use-offset-tresholds";

export default function TresholdsOffsetHeadContent() {
  const {
    selectedProductOption,
    productSelectorOptions,
    setSelectedProductOption,
    selectedConveyorOption,
    conveyorSelectorOptions,
    setSelectedConveyorOption,
    changeTresholds,
  } = useOffsetTresholds();

  return (
    <Stack gap={2}>
      <TresholdsProductEntry
        id={OffsetTresholdsParams.PRODUCT_ID}
        value={selectedProductOption}
        options={productSelectorOptions}
        setSelected={setSelectedProductOption}
        onChange={changeTresholds}
      />
      <TresholdsConveyorEntry
        id={OffsetTresholdsParams.CONVEYOR_ID}
        value={selectedConveyorOption}
        options={conveyorSelectorOptions}
        setSelected={setSelectedConveyorOption}
        onChange={changeTresholds}
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography level="title-lg">Параметры:</Typography>
      </Stack>
    </Stack>
  );
}
