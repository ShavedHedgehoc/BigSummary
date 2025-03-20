import { useProduct } from "./use-product";

export default function Product({ conveyor }: { conveyor: string }) {
  const { data, isSuccess } = useProduct(conveyor);
  if (isSuccess && !data) {
    return (
      <div className="flex flex-col w-full">
        <div className="text-slate-300 text-2xl">Продукт не выбран</div>
      </div>
    );
  }
  return (
    <>
      {isSuccess && data && (
        <div className="text-slate-300 text-2xl flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <div>{data.id}</div>
            <div>{data.product_id}</div>
            <div>{data.product_name}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Партия: </div>
            <div>{data.boil_value}</div>
          </div>
        </div>
      )}
    </>
  );
}
