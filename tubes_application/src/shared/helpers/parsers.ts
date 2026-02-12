export function parseBarcode(value: string): boolean {
  const re = /^[0-9]{13}$/;
  return re.test(value);
}

export function parseMaterial(value: string) {
  const re = /^998[0-9]{43}$/;
  const isMaterialBarcode = re.test(value);
  if (isMaterialBarcode) {
    const code = value.match(/^.{12}(.{6})/)?.[1];
    const lot = value.match(/^.{26}(.{20})/)?.[1];
    return [code, lot];
  }
  return [null, null];
}

export interface parsedBoxBarcode {
  uuid: string;
  summary_id: string;
  employee_id: string;
  quantity: string;
  createdAt: string;
  box_number: string;
  batch_id: string;
}

export function parseBoxBarcode(value: string) {
  let result: parsedBoxBarcode[] = [];
  const re =
    // /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})#([0-9]+)#([0-9]+)#([0-9]+)#([0-9]+)#(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[-+]\d\d:\d\d))/g;
    /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})#([0-9]+)#([0-9]+)#([0-9]+)#([0-9]+)#([0-9]+)#(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[-+]\d\d:\d\d))/g;
  const matchArr = [...value.matchAll(re)];
  if (matchArr.length > 0) {
    matchArr.map((item) => {
      result = [
        ...result,
        {
          // uuid: item[1],
          // box_number: item[2],
          // summary_id: item[3],
          // employee_id: item[4],
          // quantity: item[5],
          // createdAt: item[6],
          uuid: item[1],
          box_number: item[2],
          batch_id: item[3],
          summary_id: item[4],
          employee_id: item[5],
          quantity: item[6],
          createdAt: item[7],
        },
      ];
    });
  }

  return result.length
    ? result[0]
    : {
        uuid: null,
        box_number: null,
        batch_id: null,
        summary_id: null,
        employee_id: null,
        quantity: null,
        createdAt: null,
      };
}
