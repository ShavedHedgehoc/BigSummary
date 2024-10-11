import { ApiProperty } from "@nestjs/swagger";

interface IBoilFilter {
  baseCode: string;
  boil: string;
  marking: string;
  haveRecord: boolean;
}

export class GetBoilsDto {
  //   @ApiProperty({ example: "123A4", description: "Варка" })
  readonly filter: IBoilFilter;
  readonly limit: number;
  readonly page: number;
}