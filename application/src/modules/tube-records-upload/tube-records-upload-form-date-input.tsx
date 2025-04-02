import { useShallow } from "zustand/shallow";
import FormrDateInput, { FormDateInputProps } from "../../shared/ui/form-date-input";
import { useTubeRecordsUploadFormStore } from "./store/use-records-upload-form-store";
import { TubeRecordsUploadFormParams } from "./tube-records-upload-form-params";

export default function TubeRecordsUploadFormDateInput() {
  const formData = useTubeRecordsUploadFormStore(useShallow((state) => state.formData));
  const changeFilter = useTubeRecordsUploadFormStore(useShallow((state) => state.changeFilter));
  const endDateInputProps: FormDateInputProps = {
    id: TubeRecordsUploadFormParams.DATE,
    placeholder: "",
    label: "Дата",
    value: formData.dateForUpload,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };
  return <FormrDateInput {...endDateInputProps} />;
}
