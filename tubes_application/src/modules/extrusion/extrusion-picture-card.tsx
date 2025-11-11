import { AbsoluteCenter, Card, Image } from "@chakra-ui/react";
import { useExtrusionConveyorStore } from "./store/use-extrusion-conveyor-store";
import { useActiveSummary } from "./use-active-summary";
import { useShallow } from "zustand/react/shallow";

export default function ExtrusionPictureCard() {
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const { data, isPending, isSuccess } = useActiveSummary(extrusionConveyor ? extrusionConveyor.id : null);

  if (isPending) return <></>;

  // const imgUrl = new URL(`../../assets/62625.jpg`, import.meta.url).href;
  return (
    <Card.Root h="100%" variant="elevated" padding={0} direction="row" overflow="hidden" borderWidth="1px">
      <Card.Body padding={0}>
        {data && isSuccess ? (
          <Image
            rounded="md"
            src={new URL(`../../assets/${data.production.code}.jpg`, import.meta.url).href}
            alt="picture"
            objectFit="cover"
          />
        ) : (
          <AbsoluteCenter>....</AbsoluteCenter>
        )}
      </Card.Body>
    </Card.Root>
  );
}
