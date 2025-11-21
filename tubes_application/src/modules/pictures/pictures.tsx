import { ColorModeProvider } from "@/components/ui/color-mode";
import type { CarouselPageLayoutProps } from "../../shared/components/layouts/carousel-page-layout";
import CarouselPageLayout from "../../shared/components/layouts/carousel-page-layout";
import Loader from "../../shared/components/info/loader";
import TimeComponent from "../../shared/components/lines/time-component";
import { Theme } from "@chakra-ui/react";
import PicturesCarousel from "./pictures-carousel";
import PicturesMenu from "./pictures-menu";
import { useParams } from "react-router-dom";
import type { Params } from "@/shared/router/params";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import { useProduct } from "@/shared/api/use-product";
import { usePictureProductStore } from "./store/use-picture-product-store";
import { useShallow } from "zustand/shallow";
import ProductHeaderComponent from "../../shared/components/headers/product-header-component";

export default function Pictures() {
  const params = useParams<Params.PRODUCT_ID>();

  const { isPending } = useProduct(params.product_id ?? null);
  const product = usePictureProductStore(useShallow((state) => state.pictureProduct));

  if (isPending) return <Loader />;
  if (!product) return <NotFound message={AppMessages.PRODUCT_NOT_EXISTS} />;

  const pageLayoutProps: CarouselPageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: <ProductHeaderComponent product={product ?? null} />,
    carouselComponent: <PicturesCarousel productId={product.id ?? null} />,
    menuComponent: <PicturesMenu />,
    userComponent: undefined,
    loaderComponent: <Loader />,
    notFoundComponent: undefined,
    isLoading: false,
    isNotFound: false,
  };

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <CarouselPageLayout {...pageLayoutProps} />
      </Theme>
    </ColorModeProvider>
  );
}
