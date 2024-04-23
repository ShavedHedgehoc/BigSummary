import { ApiProperty } from "@nestjs/swagger";

export class CreateApparatusDto {
  @ApiProperty({ example: "123", description: "Аппарат" })
  readonly value: string;
}
