import { Stack, Typography } from "@mui/joy";
import { TresholdsConveyorEntry } from "../shared/tresholds-conveyor-entry";
import { TresholdsProductEntry } from "../shared/tresholds-product-entry";
import { useVarnishTresholds } from "./use-varnish-tresholds";
import { VarnishTresholdsParams } from "../store/use-tube-varnish-tresholds-store";

export default function TresholdsVarnishHeadContent() {
  const {
    selectedProductOption,
    productSelectorOptions,
    setSelectedProductOption,
    selectedConveyorOption,
    conveyorSelectorOptions,
    setSelectedConveyorOption,
    changeTresholds,
  } = useVarnishTresholds();

  return (
    <Stack gap={2}>
      <TresholdsProductEntry
        id={VarnishTresholdsParams.PRODUCT_ID}
        value={selectedProductOption}
        options={productSelectorOptions}
        setSelected={setSelectedProductOption}
        onChange={changeTresholds}
      />
      <TresholdsConveyorEntry
        id={VarnishTresholdsParams.CONVEYOR_ID}
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
