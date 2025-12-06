import type { SopCaruselProps } from "@/shared/components/sop/sop-carusel";
import SopCarousel from "@/shared/components/sop/sop-carusel";
import { useSealantSop } from "../use-sealant-sop";

export default function SealantSopCarousel({ operationId }: { operationId: number | null }) {
  const { data, isPending } = useSealantSop(operationId);
  const items: string[] = data && data.pictures.length ? data.pictures.map((item) => item.src) : [];

  const caruselProps: SopCaruselProps = {
    isPending: isPending,
    items: items,
  };

  return <SopCarousel {...caruselProps} />;
}
