import { ApiProperty } from "@nestjs/swagger";

interface IBoilFilter {
  startDate: string;
  endDate: string;
  plants: number[];
}

export class GetDocsDto {
  //   @ApiProperty({ example: "123A4", description: "Варка" })
  readonly filter: IBoilFilter;
  readonly limit: number;
  readonly page: number;
}
