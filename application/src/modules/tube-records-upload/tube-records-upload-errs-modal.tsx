import { useShallow } from "zustand/shallow";
import ModalLayout, { ModalLayoutProps } from "../../shared/layouts/modal-layout";
import TableLayout from "../../shared/layouts/table-layout";
import { Typography } from "@mui/joy";
import { useTubeRecordsUploadFormStore } from "./store/use-records-upload-form-store";

export default function TubeRecordsUploadErrsModal() {
  const errs = useTubeRecordsUploadFormStore(useShallow((state) => state.errs));
  const setErrsModalShow = useTubeRecordsUploadFormStore(useShallow((state) => state.setErrsModalShow));
  const errsModalShow = useTubeRecordsUploadFormStore(useShallow((state) => state.errsModalShow));

  const modalProps: ModalLayoutProps = {
    open: errsModalShow,
    onClose: () => setErrsModalShow(false),
    title: "Ошибки валидации",
    height: 300,
    minHeight: 300,
    width: 800,
    onlyCloseButton: true,
  };

  const commonThead: TheadProperties[] = [
    { width: 50, padding: "18px 6px", value: "№" },
    { width: 100, padding: "18px 6px", value: "Строка" },
    { width: 150, padding: "18px 6px", value: "Поле", align: "left" },
    { width: 300, padding: "18px 6px", value: "Ошибка", align: "left" },
  ];

  // const commonThead: TheadProperties[] = [
  //   { width: 200, align: "left", value: "Сообщение" },
  //   { width: 200, align: "left", value: "Сообщение" },
  // ];

  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <TableLayout thead={commonThead}>
        {errs.length &&
          errs.map((err, index) => (
            <tr key={index}>
              <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
                <Typography level="body-xs">{index + 1}</Typography>
              </td>
              <td style={{ width: 100, textAlign: "center", padding: "18px 6px" }}>
                <Typography level="body-xs">{err.row}</Typography>
              </td>
              <td style={{ width: 150, textAlign: "left", padding: "18px 6px" }}>
                <Typography level="body-xs">{err.field}</Typography>
              </td>
              <td style={{ width: 300, textAlign: "left", padding: "18px 6px" }}>
                <Typography level="body-xs">{err.error}</Typography>
              </td>
            </tr>
          ))}
      </TableLayout>
    </ModalLayout>
  );
}
