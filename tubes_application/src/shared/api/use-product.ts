import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { usePictureProductStore } from "@/modules/pictures/store/use-picture-product-store";
import ProductService from "./services/product-service";

export const useProduct = (id: string | null) => {
  const setPictureProduct = usePictureProductStore(useShallow((state) => state.setPictureProduct));
  const clearPictureProduct = usePictureProductStore(useShallow((state) => state.clearPictureProduct));

  return useQuery({
    queryKey: ["conveyor"],
    queryFn: async () => {
      const data = await ProductService.getProductById(id);
      if (data) {
        setPictureProduct(data);
      } else {
        clearPictureProduct();
      }
      return data;
    },
    enabled: !!id,
  });
};
