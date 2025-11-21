import { useQuery } from "@tanstack/react-query";
import PicturesService from "./services/pictures-service";

export const usePictures = (productId: number | null) =>
  useQuery({
    queryKey: ["pictures", productId],
    queryFn: () => PicturesService.getPicturesByProductId(productId),
    enabled: !!productId,
  });
