export function useModalState<
  T extends string,
  P extends Record<T, string | number | boolean | null | undefined>,
>(params: P, setParams: (val: Partial<P>) => void, key: T) {
  const isOpen = params[key] !== null && params[key] !== undefined && params[key] !== false;

  const data = (isOpen ? params[key] : null) as P[T] | null;

  const onOpenChange = (open: boolean) => {
    setParams({
      [key]: open ? true : null,
    } as unknown as Partial<P>);
  };

  const openWithData = (payload: P[T]) => {
    setParams({ [key]: payload } as unknown as Partial<P>);
  };

  return { isOpen, data, onOpenChange, openWithData };
}
