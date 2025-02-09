import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import ConveyorsFilterClearButton from "./conveyors-filter-clear-button";
import ConveyorsFilterEmptyBarcodeSwitcher from "./conveyors-filter-empty-barcode-switcher";
import ConveyorsFilterValueInput from "./conveyors-filter-value-input";

export default function ConveyorsFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <ConveyorsFilterValueInput />
        <ConveyorsFilterEmptyBarcodeSwitcher />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <ConveyorsFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}
