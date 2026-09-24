import { TApplicationParsedSemiproductItem } from '@repo/schemas';

export function parseSemiproducts(value: string): TApplicationParsedSemiproductItem[] | [] {
  let result: TApplicationParsedSemiproductItem[] = [];
  const re = /(?<={)([0-9]{6})#([0-9]{1,4}[A-L][0-9][X-Z,S,R]{0,1}[S]{0,1})#([^}]+)(?=})/g;
  // const matchArr = [...value.matchAll(re)];
  const matchArr = Array.from(value.matchAll(re));
  if (matchArr.length > 0) {
    matchArr.map((item) => {
      result = [...result, { code: item[1], boil: item[2], marking: item[3] }];
    });
  }
  return result;
}
