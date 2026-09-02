import { TRecordDetailResponse } from '@repo/schemas';

const STATE_STYLES: Record<string, { bg: string; text: string }> = {
  product_pass: { bg: 'bg-green-700', text: 'text-slate-200' },
  product_check: { bg: 'bg-yellow-700', text: 'text-slate-200' },
  product_correct: { bg: 'bg-yellow-700', text: 'text-slate-200' },
  product_fail: { bg: 'bg-red-700', text: 'text-slate-200' },
  product_finished: { bg: 'bg-fuchsia-700', text: 'text-slate-200' },
  product_in_progress: { bg: 'bg-sky-700', text: 'text-slate-200' },
  base_check: { bg: 'bg-slate-600', text: 'text-yellow-500' },
  base_correct: { bg: 'bg-slate-600', text: 'text-yellow-500' },
  base_continue: { bg: 'bg-slate-600', text: 'text-yellow-500' },
  base_fail: { bg: 'bg-slate-600', text: 'text-red-500' },
  plug_pass: { bg: 'bg-slate-600', text: 'text-green-500' },
};
const DEFAULT_STYLE = { bg: 'bg-slate-600', text: 'text-slate-200' };

export function RecordDetailWidget({ record }: { record: TRecordDetailResponse }) {
  const currentStyle = STATE_STYLES[record.stateValue ?? ''] || DEFAULT_STYLE;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full p-4 flex flex-col  justify-between rounded-md bg-orange-700 text-slate-200">
        <div className="flex justify-start text-3xl ">Конвейер</div>
        <div className="flex justify-end text-6xl">{record.conveyor}</div>
      </div>
      <div className="flex flex-row gap-3">
        <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-green-700 text-slate-200">
          <div className="flex justify-start text-3xl ">Продукт</div>
          <div className="flex justify-end text-5xl">{record.product}</div>
        </div>
        <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-sky-700 text-slate-200">
          <div className="flex justify-start text-3xl ">Код 1С</div>
          <div className="flex justify-end text-5xl">{record.productId}</div>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className=" flex w-1/3 p-4 flex-col justify-between rounded-md bg-yellow-700 text-slate-200">
          <div className="flex justify-start text-3xl ">Партия</div>
          <div className="flex justify-end text-5xl">{record.boil}</div>
        </div>
        <div className=" flex w-1/3 p-4 flex-col justify-between rounded-md bg-pink-700 text-slate-200">
          <div className="flex justify-start text-3xl ">План</div>
          <div className="flex justify-end text-5xl">{record.plan}</div>
        </div>
        <div className=" flex w-1/3 p-4 flex-col justify-between rounded-md bg-lime-700 text-slate-200">
          <div className="flex justify-start text-3xl ">Годен до</div>
          <div className="flex justify-end text-5xl">{record.bbf}</div>
        </div>
      </div>
      {(record.apparatus !== '-' || record.can !== '-') && (
        <div className="flex flex-row gap-3">
          <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-cyan-700 text-slate-200">
            <div className="flex justify-start text-3xl ">Аппарат</div>
            <div className="flex justify-end text-5xl">{record.apparatus}</div>
          </div>
          <div className=" flex w-1/2 p-4 flex-col justify-between rounded-md bg-amber-700 text-slate-200">
            <div className="flex justify-start text-3xl ">Емкость</div>
            <div className="flex justify-end text-5xl">{record.can}</div>
          </div>
        </div>
      )}
      <div className=" flex w-full p-4 flex-col gap-3 justify-between rounded-md bg-teal-700 text-slate-200">
        <div className="flex justify-start text-3xl ">Комментарий:</div>
        <div className="flex justify-start text-2xl">{record.note}</div>
      </div>
      <div
        className={`flex w-full p-4 flex-col justify-center items-center rounded-md ${currentStyle.bg}`}
      >
        <div className={`font-ultralight text-5xl pl-3 p-4 ${currentStyle.text}`}>
          {record.state}
        </div>
        {record.history_note &&
          (record.stateValue === 'product_correct' || record.stateValue === 'base_correct') && (
            <div className="font-ultralight text-xl pl-3 p-4 text-slate-200">
              ({record.history_note})
            </div>
          )}
      </div>
      {record.semiProducts.length > 0 && (
        <div className=" flex  flex-grow w-full p-4 gap-5 flex-col justify-between rounded-md bg-orange-700 text-slate-200">
          <div className="flex justify-start text-3xl">Полупродукты:</div>
          <div className="flex flex-col gap-3">
            {record.semiProducts.map((item) => (
              <div className="flex justify-start text-2xl" key={item.code}>
                {item.code} {item.marking} {item.boil_value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
