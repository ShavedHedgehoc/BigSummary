import type { IProduct } from "@/shared/api/services/product-service";
import { Center, Heading } from "@chakra-ui/react";

export default function ProductHeaderComponent({ product }: { product: IProduct | null }) {
  return (
    <Center h="full">
      <Heading size="2xl" color="fg.subtle">{`${product?.code} ${product?.name}`}</Heading>
    </Center>
  );
}
