export interface GetRecordReportFilter {
  readonly boil: string;
  readonly productCode: string;
  readonly marking: string;
  readonly conveyor: string;
  readonly states: number[] | [];
  readonly plants: number[] | [];
  readonly startDate: string;
  readonly endDate: string;
}

export class GetRecordReportDto {
  readonly filter: GetRecordReportFilter;
  readonly page: number;
  readonly limit: number;
}
