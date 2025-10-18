import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import TrademarkFilterProductNameInput from "./tardemark-filter-product-name-input";
import TrademarkFilterClearButton from "./trademark-filter-clear-button";
import TrademarkFilterProductCodeInput from "./trademark-filter-product-code-input";
import TrademarkFilterTrademarkInput from "./trademark-filter-trademark-input";

export default function TrademarksFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <TrademarkFilterTrademarkInput />
        <TrademarkFilterProductCodeInput />
        <TrademarkFilterProductNameInput />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <></>
        <TrademarkFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}
