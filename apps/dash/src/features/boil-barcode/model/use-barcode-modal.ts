import { useBoilBarcodeModalStore } from '@/entities/boil';
import { useShallow } from 'zustand/react/shallow';

export function useBarcodeModal() {
  const open = useBoilBarcodeModalStore(useShallow((state) => state.open));
  const boil = useBoilBarcodeModalStore(useShallow((state) => state.boil));
  const code = useBoilBarcodeModalStore(useShallow((state) => state.code));
  const marking = useBoilBarcodeModalStore(useShallow((state) => state.marking));
  const setOpen = useBoilBarcodeModalStore(useShallow((state) => state.setOpen));
  const setBoil = useBoilBarcodeModalStore(useShallow((state) => state.setBoil));
  const setCode = useBoilBarcodeModalStore(useShallow((state) => state.setCode));
  const setMarking = useBoilBarcodeModalStore(useShallow((state) => state.setMarking));

  const handleClose = () => {
    setOpen(false);
    setBoil('');
    setCode('');
    setMarking('');
  };
  return {
    open,
    boil,
    code,
    marking,
    handleClose,
  };
}
