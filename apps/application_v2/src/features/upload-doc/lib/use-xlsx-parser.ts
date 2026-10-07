import { useState } from 'react';
import { read, utils } from 'xlsx';
import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import { summaryValidationSchema } from '@/features/upload-doc/model/schema';
import { TApplicationUploadDocRecordRowInput } from '@repo/schemas';
import { type TApplicationUploadDocRecordRowValError as ValError } from '@repo/schemas';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);
const parse = ajv.compile(summaryValidationSchema);

export function useXlsxParser() {
  const [errors, setErrors] = useState<ValError[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState<TApplicationUploadDocRecordRowInput[]>([]);
  const [isPending, setIsPending] = useState(false);

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
          const json = utils.sheet_to_json<TApplicationUploadDocRecordRowInput>(ws, {
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
            setIsPending(false);
            setErrors([]);
            setIsValid(true);
            setData(json);
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
