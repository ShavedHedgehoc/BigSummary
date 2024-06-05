import * as React from "react";
import classes from "./singlePageWrapper.module.css";

interface wrapperProps {
  errorElement: React.JSX.Element;
  children: React.JSX.Element;
}
export default function SinglePageWrapper({ errorElement, children }: wrapperProps) {
  return (
    <>
      <div className={classes.single_page_wrapper_content}>
        {children}
        {errorElement}
      </div>
    </>
  );
}
