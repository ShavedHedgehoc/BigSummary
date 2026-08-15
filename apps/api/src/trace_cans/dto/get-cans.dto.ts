interface FetchCansFilter {
  can: string;
  states: number[] | [];
  volumes: number[] | [];
  plants: number[] | [];
  transit: boolean;
}

export class GetCansDto {
  readonly filter: FetchCansFilter;
}
