interface IConveyorFilter {
  value: string;
  valueAsc: boolean;
  onlyEmptyBarcode: boolean;
}

export class GetConveyorsDto {
  readonly filter: IConveyorFilter;
  readonly limit: number;
  readonly page: number;
}
