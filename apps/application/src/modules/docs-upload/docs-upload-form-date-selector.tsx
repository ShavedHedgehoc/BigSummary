import { useShallow } from "zustand/react/shallow";
import { DocsUploadFormParams } from "./docs-upload-form-params";
import { useDocsUploadFormStore } from "./store/use-docs-upload-form-store";
import FormrDateInput, { FormDateInputProps } from "../../shared/ui/form-date-input";

export default function DocsUploadFormdDateInput() {
  const formData = useDocsUploadFormStore(useShallow((state) => state.formData));
  const changeFilter = useDocsUploadFormStore(useShallow((state) => state.changeFilter));
  const endDateInputProps: FormDateInputProps = {
    id: DocsUploadFormParams.DATE,
    placeholder: "",
    label: "Дата",
    value: formData.dateForUpload,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };
  return <FormrDateInput {...endDateInputProps} />;
}
