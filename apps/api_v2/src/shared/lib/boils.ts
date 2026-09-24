function parseBoilValue(val: string) {
  if (!val) return null;

  const lastSymbol = val.substring(val.length - 1);
  const lastTwoSymbols = val.substring(val.length - 2);

  let offset = 0;
  if (lastTwoSymbols === 'RS' || lastTwoSymbols === 'SR') {
    offset = 2;
  } else if (['Z', 'Y', 'S', 'R', 'X'].includes(lastSymbol)) {
    offset = 1;
  }

  const yearEndIdx = val.length - offset;
  const potentialTwoDigitYear = val.substring(yearEndIdx - 2, yearEndIdx);

  let year = 0;
  let letter = '';
  let number = 0;

  if (!isNaN(Number(potentialTwoDigitYear)) && potentialTwoDigitYear.length === 2) {
    year = Number('20' + potentialTwoDigitYear);
    letter = val.substring(yearEndIdx - 3, yearEndIdx - 2);
    number = Number(val.substring(0, yearEndIdx - 3));
  } else {
    const oneDigitYear = val.substring(yearEndIdx - 1, yearEndIdx);
    year = Number('202' + oneDigitYear);
    letter = val.substring(yearEndIdx - 2, yearEndIdx - 1);
    number = Number(val.substring(0, yearEndIdx - 2));
  }

  return { year, letter, number };
}

export function prepareBoilData(value: string) {
  const parsed = parseBoilValue(value); // Ваша функция парсинга
  return {
    value,
    year: parsed?.year ?? null,
    letter: parsed?.letter ?? null,
    number: parsed?.number ?? null,
  };
}
