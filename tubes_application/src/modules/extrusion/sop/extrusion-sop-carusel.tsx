import { useExtrusionSop } from "../use-extrusion-sop";
import type { SopCaruselProps } from "@/shared/components/sop/sop-carusel";
import SopCarousel from "@/shared/components/sop/sop-carusel";

export default function ExtrusionSopCarousel({ operationId }: { operationId: number | null }) {
  const { data, isPending } = useExtrusionSop(operationId);
  const items: string[] = data && data.pictures.length ? data.pictures.map((item) => item.src) : [];

  const caruselProps: SopCaruselProps = {
    isPending: isPending,
    items: items,
  };

  return <SopCarousel {...caruselProps} />;
}
