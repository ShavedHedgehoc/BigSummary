import { useShallow } from "zustand/shallow";
import { useSealantNumericEntryModalStore } from "../store/use-sealant-numeric-entry-modal-store";
import { useSealantBooleanEntryModalStore } from "../store/use-sealant-boolean-entry-modal-store";
import { useSealantIntegerEntryModalStore } from "@/modules/sealant/store/use-sealant-integer-entry-modal-store";

export default function useSealantEntriesHandleCardsClick() {
  const setKey = useSealantNumericEntryModalStore(useShallow((state) => state.setKey));
  const setTitle = useSealantNumericEntryModalStore(useShallow((state) => state.setTitle));
  const setMinValue = useSealantNumericEntryModalStore(useShallow((state) => state.setMinValue));
  const setMaxValue = useSealantNumericEntryModalStore(useShallow((state) => state.setMaxValue));
  const setUnit = useSealantNumericEntryModalStore(useShallow((state) => state.setUnit));
  const setOpen = useSealantNumericEntryModalStore(useShallow((state) => state.setOpen));

  const setKeyInteger = useSealantIntegerEntryModalStore(useShallow((state) => state.setKey));
  const setTitleInteger = useSealantIntegerEntryModalStore(useShallow((state) => state.setTitle));
  const setMinValueInteger = useSealantIntegerEntryModalStore(useShallow((state) => state.setMinValue));
  const setMaxValueInteger = useSealantIntegerEntryModalStore(useShallow((state) => state.setMaxValue));
  const setUnitInteger = useSealantIntegerEntryModalStore(useShallow((state) => state.setUnit));
  const setOpenInteger = useSealantIntegerEntryModalStore(useShallow((state) => state.setOpen));

  const setBooleanKey = useSealantBooleanEntryModalStore(useShallow((state) => state.setKey));
  const setBooleanTitle = useSealantBooleanEntryModalStore(useShallow((state) => state.setTitle));
  const setBooleanOpen = useSealantBooleanEntryModalStore(useShallow((state) => state.setOpen));

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
