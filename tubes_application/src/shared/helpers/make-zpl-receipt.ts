import { formatDateToString, formatTimeToString } from "./date-time-formatters";
import { Receiptconstants } from "./receipt-constants";

function parseCyrillicToURLEncoded(val: string) {
  const encodeURI = encodeURIComponent(val);
  const parsedEncodedURI = encodeURI.replaceAll("%", "_");
  console.log(parsedEncodedURI);
  return parsedEncodedURI;
}

export function makeBoxReceipt({
  name,
  code,
  batch,
  boxNumber,
  quantity,
  employee,
}: {
  name: string;
  code: string;
  batch: string;
  boxNumber: number;
  quantity: number;
  employee: string;
}) {
  const date = new Date();
  const parsedBrand = parseCyrillicToURLEncoded(Receiptconstants.BRAND);
  const parsedName = parseCyrillicToURLEncoded(name);
  const parsedBatch = parseCyrillicToURLEncoded(`Партия: ${batch}`);
  const parsedQuantity = parseCyrillicToURLEncoded(`Количество: ${quantity}`);
  const parsedBoxNumber = parseCyrillicToURLEncoded(`Номер короба: ${boxNumber}`);
  const parsedEmployee = parseCyrillicToURLEncoded(`Оператор: ${employee}`);
  const parsedDate = parseCyrillicToURLEncoded(`Дата: ${formatDateToString(date)}`);
  const parsedTime = parseCyrillicToURLEncoded(`Время: ${formatTimeToString(date)}`);

  return `^XA^CI28^FO 20,20^GB760,560,1,B,0^FS^FO40,40 ^FB700,1,,C^A0N,20,20^FH^FD${parsedBrand}^FS\
  ^FO40,80 ^FB700,3,,C^A0N,50,50^FH^FD${code}^FS^FO40,150 ^FB700,3,6,L^A0N,30,30^FH^FD${parsedName}^FS
  ^FO40,280 ^FB700,1,,L^A0N,40,40^FH^FD${parsedBatch}^FS\
  ^FO40,350 ^FB700,1,,L^A0N,40,40^FH^FD${parsedQuantity}^FS\
  ^FO40,440 ^FB700,1,,L^A0N,20,20^FH^FD${parsedBoxNumber}^FS\
  ^FO40,470 ^FB700,1,,L^A0N,20,20^FH^FD${parsedEmployee}^FS\
  ^FO40,500 ^FB700,1,,L^A0N,20,20^FH^FD${parsedDate}^FS\
  ^FO40,530 ^FB700,1,,L^A0N,20,20^FH^FD${parsedTime}^FS\
  ^FO600,390^BQ,2,4^FDQA,${code}#${batch}#${boxNumber}#${formatDateToString(date)}#${formatTimeToString(
    date
  )}#b26bf567-2a37-43b1-a242-c5bb59cbe1ba^FS\
  ^PQ1^XZ`;
}
