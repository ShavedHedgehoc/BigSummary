import { useShallow } from "zustand/shallow";
import { useOffsetBooleanEntryModalStore } from "../store/use-offset-boolean-entry-modal-store";
import { useOffsetNumericEntryModalStore } from "../store/use-offset-numeric-entry-modal-store";
import { useOffsetIntegerEntryModalStore } from "../store/use-offset-integer-entry-modal-store";

export default function useOffsetEntriesHandleCardsClick() {
  const setKey = useOffsetNumericEntryModalStore(useShallow((state) => state.setKey));
  const setTitle = useOffsetNumericEntryModalStore(useShallow((state) => state.setTitle));
  const setMinValue = useOffsetNumericEntryModalStore(useShallow((state) => state.setMinValue));
  const setMaxValue = useOffsetNumericEntryModalStore(useShallow((state) => state.setMaxValue));
  const setUnit = useOffsetNumericEntryModalStore(useShallow((state) => state.setUnit));
  const setOpen = useOffsetNumericEntryModalStore(useShallow((state) => state.setOpen));

  const setKeyInteger = useOffsetIntegerEntryModalStore(useShallow((state) => state.setKey));
  const setTitleInteger = useOffsetIntegerEntryModalStore(useShallow((state) => state.setTitle));
  const setMinValueInteger = useOffsetIntegerEntryModalStore(useShallow((state) => state.setMinValue));
  const setMaxValueInteger = useOffsetIntegerEntryModalStore(useShallow((state) => state.setMaxValue));
  const setUnitInteger = useOffsetIntegerEntryModalStore(useShallow((state) => state.setUnit));
  const setOpenInteger = useOffsetIntegerEntryModalStore(useShallow((state) => state.setOpen));

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

  const handleIntegerCardClick = ({
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
    setMinValueInteger(minValue);
    setMaxValueInteger(maxValue);
    setUnitInteger(unit);
    setKeyInteger(id);
    setTitleInteger(title);
    setOpenInteger(true);
  };

  const handleBooleanCardClick = ({ id, title }: { id: string; title: string }) => {
    setBooleanKey(id);
    setBooleanTitle(title);
    setBooleanOpen(true);
  };

  return { handleCardClick, handleIntegerCardClick, handleBooleanCardClick };
}
