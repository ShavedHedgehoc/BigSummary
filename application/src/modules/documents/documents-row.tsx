import { Typography, Box } from "@mui/joy";

import { formatDateToString } from "../../shared/utils";
import { useNavigate } from "react-router-dom";
import { useDeleteDocument } from "./use-delete-document";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import TableButton from "../../shared/ui/table-button";

export default function DocumentsRow({ row }: { row: IDocumentRow }) {
  const { deleteDocument, deletePending } = useDeleteDocument();

  const navigate = useNavigate();

  const selClass = (item: IDocumentRow) => {
    if (Number(item.historiesCount) === 0) {
      return "list-group-item list-group-item-light";
    }
    return "success";
  };

  const StyledTypography = ({ text }: { text: string | number }) => {
    return (
      <Typography
        level="body-xs"
        sx={[
          {
            color: (theme) => theme.vars.palette.darkPalette.tableButtonSuccess,
          },
        ]}
      >
        {text}
      </Typography>
    );
  };

  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{formatDateToString(row.date)}</Typography>
      </td>
      <td style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.plant}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.recordsCount}</Typography>
      </td>
      <td style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
        {selClass(row) === "success" ? (
          <StyledTypography text={row.historiesCount} />
        ) : (
          <Typography level="body-xs">{row.historiesCount}</Typography>
        )}
      </td>

      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TableButton
            variant="danger"
            label="УДАЛИТЬ"
            onClick={() => deleteDocument(row.id)}
            startDecorator={<ClearOutlinedIcon />}
            disabled={Number(row.historiesCount) !== 0 || deletePending}
          />
          <TableButton
            variant="success"
            label="ПРОСМОТР"
            onClick={() => navigate(`/summary/` + `${row.id}`)}
            startDecorator={<RemoveRedEyeOutlinedIcon />}
          />
        </Box>
      </td>
    </tr>
  );
}
