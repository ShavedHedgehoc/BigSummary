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
