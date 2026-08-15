export interface BaseRow {
  readonly code: string;
  readonly marking: string;
}

export class UpdateBaseDto {
  readonly bases: BaseRow[];
}
