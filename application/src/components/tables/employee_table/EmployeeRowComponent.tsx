import * as React from "react";
import { observer } from "mobx-react-lite";
import { Button, Typography, useColorScheme } from "@mui/joy";
import { Context } from "../../../main";

import { statusCondition } from "../../../utils";
import { AddHistoryDto } from "../../../services/HistoryService";
import IconButton from "@mui/joy/IconButton";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IEmployee } from "../../../types";

const EmployeeRowComponent = ({ row }: { row: IEmployee }) => {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  const { store } = React.useContext(Context);

  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.name}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.barcode}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.occupation.description}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        {/* <Typography level="body-xs">{row.value}</Typography> */}
      </td>
    </tr>
  );
};

export default observer(EmployeeRowComponent);
