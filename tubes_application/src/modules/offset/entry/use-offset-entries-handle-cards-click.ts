import { useShallow } from "zustand/shallow";
import { useOffsetBooleanEntryModalStore } from "../store/use-offset-boolean-entry-modal-store";
import { useOffsetNumericEntryModalStore } from "../store/use-offset-numeric-entry-modal-store";

export default function useOffsetEntriesHandleCardsClick() {
  const setKey = useOffsetNumericEntryModalStore(useShallow((state) => state.setKey));
  const setTitle = useOffsetNumericEntryModalStore(useShallow((state) => state.setTitle));
  const setMinValue = useOffsetNumericEntryModalStore(useShallow((state) => state.setMinValue));
  const setMaxValue = useOffsetNumericEntryModalStore(useShallow((state) => state.setMaxValue));
  const setUnit = useOffsetNumericEntryModalStore(useShallow((state) => state.setUnit));
  const setOpen = useOffsetNumericEntryModalStore(useShallow((state) => state.setOpen));
  const setBooleanKey = useOffsetBooleanEntryModalStore(useShallow((state) => state.setKey));
  const setBooleanTitle = useOffsetBooleanEntryModalStore(useShallow((state) => state.setTitle));
  const setBooleanOpen = useOffsetBooleanEntryModalStore(useShallow((state) => state.setOpen));

  const handleCardClick = ({
    id,
    title,
    minValue,
    maxValue,
    unit,
  }: {
    id: string;
    title: string;
    minValue: number | null | undefined;
    maxValue: number | null | undefined;
    unit: string | null | undefined;
  }) => {
    setMinValue(minValue);
    setMaxValue(maxValue);
    setUnit(unit);
    setKey(id);
    setTitle(title);
    setOpen(true);
  };

  const handleBooleanCardClick = ({ id, title }: { id: string; title: string }) => {
    setBooleanKey(id);
    setBooleanTitle(title);
    setBooleanOpen(true);
  };

  return { handleCardClick, handleBooleanCardClick };
}
