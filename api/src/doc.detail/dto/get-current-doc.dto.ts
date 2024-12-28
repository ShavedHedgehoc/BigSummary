interface RecordsFilter {
  readonly boil: string;
  readonly productCode: string;
  readonly marking: string;
  readonly conveyor: string;
  readonly haveRecord: boolean;
  readonly boilAsc: boolean;
  readonly states: number[] | [];
  readonly plant: number | null;
}

export class GetCurrentDocDto {
  filter: RecordsFilter;
}
