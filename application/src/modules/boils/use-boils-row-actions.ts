import * as React from "react";
import { Context } from "../../main";
import { useCreateHistory } from "../../shared/api/use-create-history";
import { useAddBoilModalStore } from "./store/use-add-boil-modal-store";
import { useShallow } from "zustand/shallow";

export default function UseBoilsRowActions({ row }: { row: IBoilRow }) {
  const { store } = React.useContext(Context);
  const setOpen = useAddBoilModalStore(useShallow((state) => state.setOpen));
  const setTitle = useAddBoilModalStore(useShallow((state) => state.setTitle));
  const setBoilValue = useAddBoilModalStore(useShallow((state) => state.setBoilValue));
  const setState = useAddBoilModalStore(useShallow((state) => state.setState));
  const setNoteRequired = useAddBoilModalStore(useShallow((state) => state.setNoteRequired));

  const { addHistory, isPending } = useCreateHistory();

  const handleContinueButtonClick = () => {
    const data: AddHistoryDto = {
      record_id: null,
      boil_value: row.value,
      historyType: "base_continue",
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
      history_note: null,
    };
    addHistory(data);
  };

  const handleCorrectButtonClick = () => {
    setBoilValue(row.value);
    setTitle(`Партия - ${row.value}, статус - "Требуется корректировка"`);
    setState("base_correct");
    setNoteRequired(true);
    setOpen(true);
  };
  const handlePassButtonClick = () => {
    setBoilValue(row.value);
    setTitle(`Партия - ${row.value}, статус - "Допуск на подключение"`);
    setState("plug_pass");
    setNoteRequired(false);
    setOpen(true);
  };

  const handleFailButtonClick = () => {
    setBoilValue(row.value);
    setTitle(`Партия - ${row.value}, статус - "Брак основы"`);
    setState("base_fail");
    setNoteRequired(true);
    setOpen(true);
  };

  return {
    handleContinueButtonClick,
    handleCorrectButtonClick,
    handlePassButtonClick,
    handleFailButtonClick,
    isPending,
  };
}
