import { useCreateHistory } from "../../shared/api/use-create-history";
import { useAddBoilModalStore } from "./store/use-add-boil-modal-store";
import { useShallow } from "zustand/react/shallow";

export default function UseBoilsRowActions({ row }: { row: IBoilRow }) {
  const setOpen = useAddBoilModalStore(useShallow((state) => state.setOpen));
  const setTitle = useAddBoilModalStore(useShallow((state) => state.setTitle));
  const setBoilValue = useAddBoilModalStore(useShallow((state) => state.setBoilValue));
  const setState = useAddBoilModalStore(useShallow((state) => state.setState));
  const setNoteRequired = useAddBoilModalStore(useShallow((state) => state.setNoteRequired));

  const { isPending } = useCreateHistory();


  const handleContinueButtonClick = () => {
    setBoilValue(row.value);
    setTitle(`Партия - ${row.value}, статус - "Продолжение варки"`);
    setState("base_continue");
    setNoteRequired(false);
    setOpen(true);
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
