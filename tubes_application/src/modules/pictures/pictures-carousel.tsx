import { usePictures } from "@/shared/api/use-pictures";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import { Carousel, Box, IconButton, Image, type IconButtonProps, AspectRatio } from "@chakra-ui/react";
import { forwardRef } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import Loader from "../../shared/components/info/loader";
import { AssestsFolderUrl } from "@/shared/helpers/assets-folder-url";

export default function PicturesCarousel({ productId }: { productId: number | null }) {
  const { data, isPending } = usePictures(productId);
  const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(function ActionButton(props, ref) {
    return (
      <IconButton
        {...props}
        ref={ref}
        size="xl"
        variant="outline"
        rounded="full"
        position="absolute"
        zIndex="1"
        bg="bg"
      />
    );
  });

  const items: string[] = data && data.pictures.length ? data.pictures.map((item) => item.src) : [];

  if (isPending) return <Loader />;
  return (
    <>
      {items.length ? (
        <Carousel.Root slideCount={items.length} maxW="6xl" mx="auto" gap="4" position="relative" colorPalette="white">
          <Carousel.Control gap="4" width="full" position="relative">
            <Carousel.PrevTrigger asChild>
              <ActionButton insetStart="4">
                <LuArrowLeft />
              </ActionButton>
            </Carousel.PrevTrigger>

            <Carousel.ItemGroup width="full">
              {items.map((name, index) => (
                <Carousel.Item key={index} index={index}>
                  <AspectRatio ratio={1.5 / 1} maxH="80vh" w="full">
                    <Image
                      src={new URL(`${AssestsFolderUrl}/${name}`, import.meta.url).href}
                      alt={`Product ${index + 1}`}
                      objectFit="contain"
                    />
                  </AspectRatio>
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>

            <Carousel.NextTrigger asChild>
              <ActionButton insetEnd="4">
                <LuArrowRight />
              </ActionButton>
            </Carousel.NextTrigger>

            <Box position="absolute" bottom="6" width="full">
              <Carousel.Indicators
                transition="width 0.2s ease-in-out"
                transformOrigin="center"
                opacity="0.5"
                boxSize="2"
                _current={{ width: "10", bg: "colorPalette.subtle", opacity: 1 }}
              />
            </Box>
          </Carousel.Control>
        </Carousel.Root>
      ) : (
        <NotFound message={AppMessages.PICTURES_NOT_FOUND} />
      )}
    </>
  );
}
