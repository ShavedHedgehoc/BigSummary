import UiGroupLayout from "../../shared/layouts/ui-group-layout";
import TableButton from "../../shared/ui/table-button";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

import { TableIconButton } from "../../shared/ui/table-icon-button";

export default function TableButtons() {
  const str = "{000335#123A4#С/П ЭСТЕЛЬ 6%}{000338#523A4#С/П ЭСТЕЛЬ 9%}";

  interface parsedSemiProduct {
    code: string;
    batch: string;
    marking: string;
  }

  function parse(value: string): parsedSemiProduct[] | [] {
    let result: parsedSemiProduct[] = [];
    const re = /(?<={)([0-9]{6})#([0-9]{1,4}[A-L][0-9][X-Z,S,R]{0,1}[S]{0,1})#([^}]+)(?=})/g;
    const matchArr = [...value.matchAll(re)];
    if (matchArr.length > 0) {
      matchArr.map((item) => {
        result = [...result, { code: item[1], batch: item[2], marking: item[3] }];
      });
    }
    return result;
  }

  return (
    <UiGroupLayout>
      <UiGroupLayout.Header>Table buttons</UiGroupLayout.Header>
      <UiGroupLayout.Main>
        <TableButton
          variant={"success"}
          startDecorator={<CheckOutlinedIcon />}
          label="SUCCESS"
          // onClick={() => void 0}
          onClick={() => parse(str)}
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
