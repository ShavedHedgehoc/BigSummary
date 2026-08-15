import * as React from "react";
const BoilsUploadHeader = React.lazy(() => import("./boils-upload-header"));
const BoilsUploadForm = React.lazy(() => import("./boils-upload-form"));
const BoilsUploadStepper = React.lazy(() => import("./boils-upload-stepper"));
const BoilsUploadErrsModal = React.lazy(() => import("./boils-upload-errs-modal"));
const BoilsUploadValidateModal = React.lazy(() => import("./boils-upload-validate-modal"));
const BoilsUploadUploadModal = React.lazy(() => import("./boils-upload-upload-modal"));
const BoilsUploadEndUploadModal = React.lazy(() => import("./boils-upload-end-upload-modal"));

export default function BoilsUpload() {
  return (
    <React.Fragment>
      <BoilsUploadHeader />
      <BoilsUploadForm />
      <BoilsUploadStepper />
      <BoilsUploadErrsModal />
      <BoilsUploadValidateModal />
      <BoilsUploadUploadModal />
      <BoilsUploadEndUploadModal />
    </React.Fragment>
  );
}
