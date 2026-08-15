import { useShallow } from "zustand/react/shallow";
import { useBasesUploadFormStore } from "./store/use-bases-upload-form-store";
import ModalLayout, { ModalLayoutProps } from "../../shared/layouts/modal-layout";
import TableLayout from "../../shared/layouts/table-layout";
import { Typography } from "@mui/joy";

export default function BasesUploadErrsModal() {
  const errs = useBasesUploadFormStore(useShallow((state) => state.errs));
  const setErrsModalShow = useBasesUploadFormStore(useShallow((state) => state.setErrsModalShow));
  const errsModalShow = useBasesUploadFormStore(useShallow((state) => state.errsModalShow));

  const modalProps: ModalLayoutProps = {
    open: errsModalShow,
    onClose: () => setErrsModalShow(false),
    title: "Ошибки валидации",
    height: 300,
    minHeight: 300,
    width: 500,
    onlyCloseButton: true,
  };

  const commonThead: TheadProperties[] = [{ width: 280, align: "left", value: "Сообщение" }];
  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <TableLayout thead={commonThead}>
        {errs.length > 0 &&
          errs.map((err, index) => (
            <tr key={index}>
              <td style={{ width: 50, textAlign: "left", padding: "18px 6px" }}>
                <Typography level="body-xs">{err}</Typography>
              </td>
            </tr>
          ))}
      </TableLayout>
    </ModalLayout>
  );
}
