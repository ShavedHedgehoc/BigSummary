import { ApiProperty } from "@nestjs/swagger";

interface IBoilFilter {
  startDate: string;
  endDate: string;
  plants: number[];
}

export class GetDocsDto {
  //   @ApiProperty({ example: "123A4", description: "Варка" })
  @ApiProperty()
  readonly filter: IBoilFilter;
  @ApiProperty()
  readonly limit: number;
  @ApiProperty()
  readonly page: number;
}
