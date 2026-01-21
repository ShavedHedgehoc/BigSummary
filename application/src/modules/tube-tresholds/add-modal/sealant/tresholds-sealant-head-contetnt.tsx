import { Stack, Typography } from "@mui/joy";
import { TresholdsConveyorEntry } from "../shared/tresholds-conveyor-entry";
import { TresholdsProductEntry } from "../shared/tresholds-product-entry";
import { useSealantTresholds } from "./use-sealant-tresholds";
import { SealantTresholdsParams } from "../store/use-tube-sealant-tresholds-store";

export default function TresholdsSealantHeadContent() {
  const {
    selectedProductOption,
    productSelectorOptions,
    setSelectedProductOption,
    selectedConveyorOption,
    conveyorSelectorOptions,
    setSelectedConveyorOption,
    changeTresholds,
  } = useSealantTresholds();

  return (
    <Stack gap={2}>
      <TresholdsProductEntry
        id={SealantTresholdsParams.PRODUCT_ID}
        value={selectedProductOption}
        options={productSelectorOptions}
        setSelected={setSelectedProductOption}
        onChange={changeTresholds}
      />
      <TresholdsConveyorEntry
        id={SealantTresholdsParams.CONVEYOR_ID}
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
