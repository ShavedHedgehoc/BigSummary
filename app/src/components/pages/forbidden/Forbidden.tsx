// import * as React from "react";
import SinglePageWrapper from "../../ui/singlePageWrapper/SinglePageWrapper";

export default function Forbidden() {
  return (
    <SinglePageWrapper errorElement={<></>}>
      <div>Forbidden</div>
    </SinglePageWrapper>
  );
}
