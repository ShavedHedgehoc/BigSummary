import { TRecordDetailResponse } from '@repo/schemas';

type TStrictRegulation = NonNullable<TRecordDetailResponse['regulation']>;

export function RecordRegulationWidget({ regulation }: { regulation: TStrictRegulation }) {
  const isValidStr = (val: unknown): val is string =>
    typeof val === 'string' && val !== 'NaN' && val.trim() !== '' && val !== '0';

  const hasBoxData =
    regulation.per_box !== 0 || regulation.box_per_row !== 0 || regulation.row_on_pallet !== 0;

  return (
    <div className="flex flex-row gap-3 w-full">
      <div className="flex flex-col w-3/4 flex-grow gap-3">
        {(isValidStr(regulation.water_base_min_weight) ||
          isValidStr(regulation.water_base_max_weight)) && (
          <div className="flex flex-row flex-grow gap-3">
            {isValidStr(regulation.water_base_min_weight) && (
              <div className="flex flex-grow w-1/2 p-4 flex-col justify-between rounded-md bg-sky-700 text-slate-200">
                <div className="text-3xl">Мин. вес</div>
                <div className="text-5xl text-right">
                  {isValidStr(regulation.org_base_min_weight)
                    ? `${regulation.org_base_min_weight} + ${regulation.water_base_min_weight}`
                    : regulation.water_base_min_weight}
                </div>
              </div>
            )}
            {isValidStr(regulation.water_base_max_weight) && (
              <div className="flex flex-grow w-1/2 p-4 flex-col justify-between rounded-md bg-green-700 text-slate-200">
                <div className="text-3xl">Макс. вес</div>
                <div className="text-5xl text-right">
                  {isValidStr(regulation.org_base_max_weight)
                    ? `${regulation.org_base_max_weight} + ${regulation.water_base_max_weight}`
                    : regulation.water_base_max_weight}
                </div>
              </div>
            )}
          </div>
        )}

        {hasBoxData && (
          <div className="flex flex-row flex-grow gap-3">
            {regulation.per_box !== 0 && (
              <div className="flex flex-grow w-1/3 p-4 flex-col justify-between rounded-md bg-lime-700 text-slate-200">
                <div className="text-3xl">В коробе</div>
                <div className="text-5xl text-right">{regulation.per_box}</div>
              </div>
            )}
            {regulation.box_per_row !== 0 && (
              <div className="flex flex-grow w-1/3 p-4 flex-col justify-between rounded-md bg-pink-700 text-slate-200">
                <div className="text-3xl">Коробов в ряду</div>
                <div className="text-5xl text-right">{regulation.box_per_row}</div>
              </div>
            )}
            {regulation.row_on_pallet !== 0 && (
              <div className="flex flex-grow w-1/3 p-4 flex-col justify-between rounded-md bg-yellow-700 text-slate-200">
                <div className="text-3xl">Рядов на паллете</div>
                <div className="text-5xl text-right">{regulation.row_on_pallet}</div>
              </div>
            )}
          </div>
        )}

        {(regulation.gasket || regulation.seal) && (
          <div className="flex flex-row flex-grow gap-3">
            {regulation.gasket && (
              <div className="flex flex-grow w-1/2 p-4 flex-col gap-3 rounded-md bg-amber-700 text-slate-200">
                <div className="text-3xl">Прокладка:</div>
                <div className="text-2xl">{regulation.gasket}</div>
              </div>
            )}
            {regulation.seal && (
              <div className="flex w-1/2 p-4 flex-col justify-center animate-pulse rounded-md bg-cyan-700 text-slate-200">
                <div className="text-4xl text-center font-medium">Не запечатываем</div>
              </div>
            )}
          </div>
        )}

        {regulation.technician_note && (
          <div className="flex w-full p-4 flex-col gap-3 rounded-md bg-green-700 text-slate-200">
            <div className="text-3xl">Примечания для техников:</div>
            <div className="text-2xl">{regulation.technician_note}</div>
          </div>
        )}

        {regulation.packaging_note && (
          <div className="flex w-full p-4 flex-col gap-3 rounded-md bg-cyan-700 text-slate-200">
            <div className="text-3xl">Примечания для фасовки:</div>
            <div className="text-2xl">{regulation.packaging_note}</div>
          </div>
        )}
      </div>

      {regulation.marking_sample_value && (
        <div className="flex w-1/4 flex-col justify-between p-4 gap-4 rounded-md bg-orange-700 text-slate-200">
          <div>
            <div className="text-3xl mb-3">Маркировка</div>
            <div className="flex flex-col gap-2">
              {regulation.inc_color && (
                <div className="text-2xl">Цвет чернил: {regulation.inc_color}</div>
              )}
              {regulation.marking_feature && (
                <div className="text-xl opacity-90">{regulation.marking_feature}</div>
              )}
            </div>
          </div>
          <img
            className="object-fill rounded-md w-full mt-auto"
            alt={`Шаблон маркировки ${regulation.marking_sample_value}`}
            src={`http://ones-esb-vm:9000/manufacturing/templates/marking/${regulation.marking_sample_value}.jpg`}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
