export function checkBarcode(value: string): boolean {
  const re = /^[0-9]{13}$/;
  return re.test(value);
}

export function parseBoilCard(value: string) {
  const re = /^\([0-9]{1,4}[A-L][0-9][X-Z,S,R]{0,1}[S]{0,1}\)\([0-9]{1,4}\)\([0-9]{1,5}[/]\)\([0-9]{6}\)$/;
  const isBoilCard = re.test(value);
  if (isBoilCard) {
    const re2 = /(?<=\()([^)]+)(?=\))/g;
    const result = value.match(re2);
    if (result) {
      return [result[0], result[3]];
    }
  }
  return [null, null];
}

export function parseProductCard(value: string) {
  const reGP =
    /^[0-9]{6}#[\w,/,\d,.,\s]+#[0-9]{1,4}[A-L][0-9][X-Z,S,R]{0,1}[S]{0,1}#\d{2}.\d{2}.\d{4}#\d{1,3}#\d+$|^[0-9]{6}##[0-9]{1,4}[A-L][0-9][X-Z,S,R]{0,1}[S]{0,1}#\d{2}.\d{2}.\d{4}#\d{1,3}#\d+$/;
  const reNZ = /^[0-9]{6}#NZ#[0-9]{1,4}[A-L][0-9][X-Z,S,R]{0,1}[S]{0,1}#\d{2}.\d{2}.\d{4}#\d+$/;
  const reCode = /\d+(?=#)/;
  const reBatch = /(?<=#)[0-9]{1,4}[A-L][0-9][X-Z,S,R]{0,1}[S]{0,1}(?=#)/;
  if (reGP.test(value) || reNZ.test(value)) {
    const code = value.match(reCode)?.[0];
    const batch = value.match(reBatch)?.[0];
    if (code && batch) {
      return [code, batch];
    }
  }
  return [null, null];
}
