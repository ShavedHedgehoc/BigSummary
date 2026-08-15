interface RecordsFilter {
  readonly boil: string;
  readonly productCode: string;
  readonly marking: string;
  readonly conveyor: string;
  readonly haveRecord: boolean;
  readonly boilAsc: boolean;
  readonly states: number[] | [];
}

export class GetDocByIdDto {
  doc_id: string;
  filter: RecordsFilter;
}
