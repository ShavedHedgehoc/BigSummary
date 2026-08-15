export interface parsedAssembly {
  code: string;
  name: string;
  post: string;
}

export function parseAssemblies(value: string): parsedAssembly[] | [] {
  let result: parsedAssembly[] = [];
  const re = /(?<={)([0-9]{6})#([^}]+)#([1-4]{1})(?=})/g;
  const matchArr = [...value.matchAll(re)];
  if (matchArr.length > 0) {
    matchArr.map((item) => {
      result = [...result, { code: item[1], name: item[2], post: item[3] }];
    });
  }
  return result;
}
