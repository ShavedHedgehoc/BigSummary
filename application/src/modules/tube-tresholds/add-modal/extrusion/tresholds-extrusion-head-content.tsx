import { Stack, Typography } from "@mui/joy";
import { ExtrusionTresholdsParams } from "../store/use-tube-extrusion-tresholds-store";
import { TresholdsConveyorEntry } from "../shared/tresholds-conveyor-entry";
import { TresholdsProductEntry } from "../shared/tresholds-product-entry";
import { useExtrusionTresholds } from "./use-extrusion-tresholds";

export default function TresholdsExtrusionHeadContent() {
  const {
    selectedProductOption,
    productSelectorOptions,
    setSelectedProductOption,
    selectedConveyorOption,
    conveyorSelectorOptions,
    setSelectedConveyorOption,
    changeTresholds,
  } = useExtrusionTresholds();

  return (
    <Stack gap={2}>
      <TresholdsProductEntry
        id={ExtrusionTresholdsParams.PRODUCT_ID}
        value={selectedProductOption}
        options={productSelectorOptions}
        setSelected={setSelectedProductOption}
        onChange={changeTresholds}
      />
      <TresholdsConveyorEntry
        id={ExtrusionTresholdsParams.CONVEYOR_ID}
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
