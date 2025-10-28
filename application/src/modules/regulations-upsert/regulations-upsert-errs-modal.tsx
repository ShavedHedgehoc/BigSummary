import { useShallow } from "zustand/react/shallow";

import ModalLayout, { ModalLayoutProps } from "../../shared/layouts/modal-layout";
import TableLayout from "../../shared/layouts/table-layout";
import { Typography } from "@mui/joy";
import { useRegulationsUpsertFormStore } from "./store/use-regulations-upsert-form-store";

export default function RegulationsUpsertErrsModal() {
  const errs = useRegulationsUpsertFormStore(useShallow((state) => state.errs));
  const setErrsModalShow = useRegulationsUpsertFormStore(useShallow((state) => state.setErrsModalShow));
  const errsModalShow = useRegulationsUpsertFormStore(useShallow((state) => state.errsModalShow));

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
