import * as React from "react";
// import BoilsUploadHeader from "./boils-upload-header";
// import BoilsUploadForm from "./boils-upload-form";
// import BoilsUploadStepper from "./boils-upload-stepper";
// import BoilsUploadErrsModal from "./boils-upload-errs-modal";
// import BoilsUploadValidateModal from "./boils-upload-validate-modal";
// import BoilsUploadUploadModal from "./boils-upload-upload-modal";
// import BoilsUploadEndUploadModal from "./boils-upload-end-upload-modal";
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
