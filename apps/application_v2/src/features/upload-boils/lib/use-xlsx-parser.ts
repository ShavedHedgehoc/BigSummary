import { useState } from 'react';
import { read, utils } from 'xlsx';
import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

import {
  TApplicationUploadTraceBoilRowInput,
  TBatchRecord,
  type TApplicationUploadTraceBoilRowValError as ValError,
} from '@repo/schemas';
import { boilValidationSchema } from '../model/schema';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);
const parse = ajv.compile(boilValidationSchema);

export function useXlsxParser() {
  const [errors, setErrors] = useState<ValError[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState<TBatchRecord[]>([]);
  const [isPending, setIsPending] = useState(false);

  const convertToIsoDateString = (dateString: string) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  };

  const validate = async (file: File) => {
    return new Promise<boolean>((resolve) => {
      setIsPending(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (!result) return;
        const currentErrors: ValError[] = [];
        try {
          const wb = read(result);
          const ws = wb.Sheets[wb.SheetNames[0]];
          const json = utils.sheet_to_json<TApplicationUploadTraceBoilRowInput>(ws, {
            raw: false,
          });
          if (json.length === 0) {
            setErrors([
              {
                row: 0,
                field: 'file',
                error: 'Файл не содержит данных или заполнен неверно',
              },
            ]);
            setIsValid(false);
            setIsPending(false);
            return resolve(false);
          }
          json.forEach((row, i) => {
            const isRowValid = parse(row);
            if (!isRowValid) {
              parse.errors?.forEach((err) => {
                currentErrors.push({
                  row: i + 2,
                  field: err.instancePath.substring(1),
                  error: err.message || 'Ошибка',
                });
              });
            }
          });

          if (currentErrors.length > 0) {
            setIsPending(false);
            setErrors(currentErrors);
            setIsValid(false);
            setData([]);
            resolve(false);
          } else {
            const groupedRecordsMap = json.reduce<Record<string, TBatchRecord>>(
              (acc, item: TApplicationUploadTraceBoilRowInput) => {
                const batchKey = item.batch;

                const productRow = {
                  productid: item.productid,
                  productname: item.productname,
                  quantity: item.quantity,
                };

                const existingRecord = acc[batchKey];

                if (existingRecord) {
                  // TypeScript теперь знает, что у existingRecord есть массив row
                  existingRecord.row.push(productRow);
                } else {
                  // И строго проверяет соответствие структуры TBatchRecord
                  acc[batchKey] = {
                    _attributes: {
                      apparatus: item.apparatus,
                      batch: item.batch,
                      date: convertToIsoDateString(item.date),
                      fin_productid: item.fin_productid,
                      marking: item.marking,
                      plan: item.plan,
                      plant: item.plant,
                    },
                    row: [productRow],
                  };
                }

                return acc;
              },
              {}, // Инициализируем пустым объектом, тип выведется автоматически из дженерика reduce
            );
            const processedData: TBatchRecord[] = Object.values(groupedRecordsMap);
            setIsPending(false);
            setErrors([]);
            setIsValid(true);
            setData(processedData);
            resolve(true);
          }
        } catch (e) {
          console.error('XLSX Read Error', e);
          setIsValid(false);
          setIsPending(false);
          resolve(false);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const reset = () => {
    setErrors([]);
    setIsValid(false);
    setData([]);
  };

  return { validate, errors, isValid, data, reset, isPending };
}
