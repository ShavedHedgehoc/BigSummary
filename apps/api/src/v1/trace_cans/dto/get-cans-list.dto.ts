interface FetchCansListFilter {
  value: string;
  valueAsc: boolean;
  onlyEmptyBarcode: boolean;
  plants: number[] | [];
}

export class GetCansListDto {
  readonly filter: FetchCansListFilter;
  readonly page: number;
  readonly limit: number;
}
