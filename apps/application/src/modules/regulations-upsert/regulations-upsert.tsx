import * as React from "react";
import RegulationsUpsertHeader from "./regulations-upsert-header";
import RegulationsUpsertForm from "./regulations-upsert-form";
import RegulationsUpsertStepper from "./regulations-upsert-stepper";
import RegulationsUpsertErrsModal from "./regulations-upsert-errs-modal";

export default function RegulationsUpsert() {
  return (
    <React.Fragment>
      <RegulationsUpsertHeader />
      <RegulationsUpsertForm />
      <RegulationsUpsertStepper />
      <RegulationsUpsertErrsModal />
    </React.Fragment>
  );
}
