import { useShallow } from "zustand/react/shallow";
import { useCansFilterStore } from "../store/use-cans-filter-store";
import { Field, Switch } from "@headlessui/react";
import { CansFilterParams } from "./cans-filter-params";

export default function CansFilterTransitSwitch() {
  const filter = useCansFilterStore(useShallow((state) => state.filter));
  const changeFilter = useCansFilterStore(useShallow((state) => state.changeFilter));

  const handleChange = (value: boolean) => {
    changeFilter({ key: CansFilterParams.TRANSIT, value: value.toString() });
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
