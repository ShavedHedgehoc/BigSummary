import type { SopCaruselProps } from "@/shared/components/sop/sop-carusel";
import SopCarousel from "@/shared/components/sop/sop-carusel";
import { useOffsetSop } from "../use-offset-sop";

export default function OffsetSopCarousel({ operationId }: { operationId: number | null }) {
  const { data, isPending } = useOffsetSop(operationId);
  const items: string[] = data && data.pictures.length ? data.pictures.map((item) => item.src) : [];

  const caruselProps: SopCaruselProps = {
    isPending: isPending,
    items: items,
  };

  return <SopCarousel {...caruselProps} />;
}
