import { useShallow } from "zustand/shallow";
import { useVarnishNumericEntryModalStore } from "../store/use-varnish-numeric-entry-modal-store";
import { useVarnishBooleanEntryModalStore } from "../store/use-varnish-boolean-entry-modal-store";

export default function useVarnishEntriesHandleCardsClick() {
  const setKey = useVarnishNumericEntryModalStore(useShallow((state) => state.setKey));
  const setTitle = useVarnishNumericEntryModalStore(useShallow((state) => state.setTitle));
  const setMinValue = useVarnishNumericEntryModalStore(useShallow((state) => state.setMinValue));
  const setMaxValue = useVarnishNumericEntryModalStore(useShallow((state) => state.setMaxValue));
  const setUnit = useVarnishNumericEntryModalStore(useShallow((state) => state.setUnit));
  const setOpen = useVarnishNumericEntryModalStore(useShallow((state) => state.setOpen));
  const setBooleanKey = useVarnishBooleanEntryModalStore(useShallow((state) => state.setKey));
  const setBooleanTitle = useVarnishBooleanEntryModalStore(useShallow((state) => state.setTitle));
  const setBooleanOpen = useVarnishBooleanEntryModalStore(useShallow((state) => state.setOpen));

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
