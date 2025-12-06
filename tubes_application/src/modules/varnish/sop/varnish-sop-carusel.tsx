import type { SopCaruselProps } from "@/shared/components/sop/sop-carusel";
import SopCarousel from "@/shared/components/sop/sop-carusel";
import { useVarnishSop } from "../use-varnish-sop";

export default function VarnishSopCarousel({ operationId }: { operationId: number | null }) {
  const { data, isPending } = useVarnishSop(operationId);
  const items: string[] = data && data.pictures.length ? data.pictures.map((item) => item.src) : [];

  const caruselProps: SopCaruselProps = {
    isPending: isPending,
    items: items,
  };

  return <SopCarousel {...caruselProps} />;
}
