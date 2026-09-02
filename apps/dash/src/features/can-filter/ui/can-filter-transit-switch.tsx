import { useShallow } from 'zustand/react/shallow';
import { useCanFilterStore } from '../model/use-can-filter-store';
import { Field, Switch } from '@headlessui/react';
import { CanFilterParams } from '../model/can-filter-params';

export function CanFilterTransitSwitch() {
  const filter = useCanFilterStore(useShallow((state) => state.filter));
  const changeFilter = useCanFilterStore(useShallow((state) => state.changeFilter));

  const handleChange = (value: boolean) => {
    changeFilter({ key: CanFilterParams.TRANSIT, value: value.toString() });
  };
  return (
    <div className="flex justify-end">
      <Field>
        <Switch
          checked={filter.transit}
          onChange={(checked) => handleChange(checked)}
          className="group inline-flex h-8 w-16 items-center rounded-full bg-gray-900 transition data-[checked]:bg-amber-600"
        >
          <span className="size-6 translate-x-1 rounded-full bg-slate-300 transition group-data-[checked]:translate-x-9" />
        </Switch>
      </Field>
    </div>
  );
}
