import UiGroupLayout from "../../shared/layouts/ui-group-layout";
import TableButton from "../../shared/ui/table-button";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

import { TableIconButton } from "../../shared/ui/table-icon-button";

export default function TableButtons() {
  return (
    <UiGroupLayout>
      <UiGroupLayout.Header>Table buttons</UiGroupLayout.Header>
      <UiGroupLayout.Main>
        <TableButton
          variant={"success"}
          startDecorator={<CheckOutlinedIcon />}
          label="SUCCESS"
          onClick={() => void 0}
        />
        <TableIconButton color="success" onClick={() => void 0}>
          <BlockOutlinedIcon />
        </TableIconButton>
        <TableButton
          variant={"warning"}
          startDecorator={<KeyboardDoubleArrowRightOutlinedIcon />}
          label="WARNING"
          onClick={() => void 0}
        />
        <TableIconButton color="warning" onClick={() => void 0}>
          <BlockOutlinedIcon />
        </TableIconButton>
        <TableButton variant={"danger"} startDecorator={<BlockOutlinedIcon />} label="DANGER" onClick={() => void 0} />
        <TableIconButton color="danger" onClick={() => void 0}>
          <BlockOutlinedIcon />
        </TableIconButton>
        <TableButton
          variant={"primary"}
          startDecorator={<KeyboardDoubleArrowRightOutlinedIcon />}
          label="PRIMARY"
          onClick={() => void 0}
        />
        <TableIconButton color="primary" onClick={() => void 0}>
          <BlockOutlinedIcon />
        </TableIconButton>
        <TableButton
          variant={"warning"}
          startDecorator={<KeyboardDoubleArrowRightOutlinedIcon />}
          disabled={true}
          label="DISABLED"
          onClick={() => void 0}
        />
        <TableIconButton color="danger" onClick={() => void 0} disabled={true}>
          <BlockOutlinedIcon />
        </TableIconButton>
      </UiGroupLayout.Main>
    </UiGroupLayout>
  );
}
