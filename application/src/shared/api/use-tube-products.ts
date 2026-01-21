import { useQuery } from "@tanstack/react-query";
import TubeProductsService from "./services/tube-products-service";
import { useTubeExtrusionTresholdsStore } from "../../modules/tube-tresholds/add-modal/store/use-tube-extrusion-tresholds-store";
import { useTubeVarnishTresholdsStore } from "../../modules/tube-tresholds/add-modal/store/use-tube-varnish-tresholds-store";
import { useTubeOffsetTresholdsStore } from "../../modules/tube-tresholds/add-modal/store/use-tube-offset-tresholds-store";
import { useTubeSealantTresholdsStore } from "../../modules/tube-tresholds/add-modal/store/use-tube-sealant-tresholds-store";

export const useTubeProducts = () => {
  const { fillProductSelectorOptions: fillExtrusionProductSelectorOptions } = useTubeExtrusionTresholdsStore();
  const { fillProductSelectorOptions: fillVarnishProductSelectorOptions } = useTubeVarnishTresholdsStore();
  const { fillProductSelectorOptions: fillOffsetProductSelectorOptions } = useTubeOffsetTresholdsStore();
  const { fillProductSelectorOptions: fillSealantProductSelectorOptions } = useTubeSealantTresholdsStore();

  return useQuery({
    queryKey: ["tube_products"],
    queryFn: async () => {
      const data = await TubeProductsService.getProducts();
      if (data) {
        fillExtrusionProductSelectorOptions(data.products);
        fillVarnishProductSelectorOptions(data.products);
        fillOffsetProductSelectorOptions(data.products);
        fillSealantProductSelectorOptions(data.products);
      }
      return data;
    },
  });
};
