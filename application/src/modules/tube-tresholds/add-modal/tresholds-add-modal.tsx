import { useShallow } from "zustand/react/shallow";

import { Box, Stack } from "@mui/joy";
import { useTubeTresholdsExtrusionFormModalStore } from "../store/use-form-modals-store";
import { useTubeTresholdsPostStore } from "../store/use-tube-tresholds-post-store";
import AddModalLayout, { AddModalLayoutProps } from "./shared/add-modal-layout";
import useTresholdsAddModalHandleSubmit from "./tresholds-add-modal-handle-submit";
import TresholdsExtrusionButtons from "./extrusion/tresholds-extrusion-buttons";
import TresholdsExtrusionHeadContent from "./extrusion/tresholds-extrusion-head-content";
import TresholdsExtrusionListContent from "./extrusion/tresholds-extrusion-list-content";
import TresholdsVarnishHeadContent from "./varnish/tresholds-varnish-head-content";
import TresholdsVarnishListContent from "./varnish/tresholds-varnish-list-content";
import TresholdsVarnishButtons from "./varnish/tresholds-varnish-buttons";
import TresholdsOffsetHeadContent from "./offset/tresholds-offset-head-content";
import TresholdsOffsetListContent from "./offset/tresholds-offset-list-content";
import TresholdsOffsetButtons from "./offset/tresholds-offset-buttons";
import TresholdsSealantHeadContent from "./sealant/tresholds-sealant-head-contetnt";
import TresholdsSealantListContent from "./sealant/tresholds-sealant-list-content";
import TresholdsSealantButtons from "./sealant/tresholds-sealant-buttons";

export default function TresholdsAddModal() {
  const open = useTubeTresholdsExtrusionFormModalStore(useShallow((state) => state.open));
  const post = useTubeTresholdsPostStore(useShallow((state) => state.post));

  const {
    handleExtrusionSubmit,
    handleVarnishSubmit,
    handleOffsetSubmit,
    handleSealantSubmit,
    handleExtrusionClose,
    handleVarnishClose,
    handleOffsetClose,
    handleSealantClose,
  } = useTresholdsAddModalHandleSubmit();

  const headerContent = {
    extrusion: <TresholdsExtrusionHeadContent />,
    varnish: <TresholdsVarnishHeadContent />,
    offset: <TresholdsOffsetHeadContent />,
    sealant: <TresholdsSealantHeadContent />,
  }[post];

  const listContent = {
    extrusion: <TresholdsExtrusionListContent />,
    varnish: <TresholdsVarnishListContent />,
    offset: <TresholdsOffsetListContent />,
    sealant: <TresholdsSealantListContent />,
  }[post];

  const buttonContent = {
    extrusion: <TresholdsExtrusionButtons />,
    varnish: <TresholdsVarnishButtons />,
    offset: <TresholdsOffsetButtons />,
    sealant: <TresholdsSealantButtons />,
  }[post];

  const title = {
    extrusion: "Пост 1. Экструзия и токарный автомат",
    varnish: "Пост 2. Нанесение внутреннего лака",
    offset: "Пост 3. Грунтование и печать",
    sealant: "Пост 4. Навинчивание колпачка, нанесение герметика",
  }[post];

  const handleSubmit = {
    extrusion: handleExtrusionSubmit,
    varnish: handleVarnishSubmit,
    offset: handleOffsetSubmit,
    sealant: handleSealantSubmit,
  }[post];

  const handleClose = {
    extrusion: handleExtrusionClose,
    varnish: handleVarnishClose,
    offset: handleOffsetClose,
    sealant: handleSealantClose,
  }[post];

  const modalProps: AddModalLayoutProps = {
    open: open,
    onClose: handleClose,
    title: title,
    height: 800,
    width: 600,
  };

  return (
    <AddModalLayout props={modalProps}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ height: `100%`, px: 1 }}>{headerContent}</Box>
          <Box sx={{ height: `${modalProps.height * 0.75}px`, overflow: "auto", px: 1, py: 1 }}>{listContent}</Box>
          <Box sx={{ height: "100%", px: 1 }}>{buttonContent}</Box>
        </Stack>
      </form>
    </AddModalLayout>
  );
}
