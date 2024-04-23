import { ApiProperty } from "@nestjs/swagger";

export class CreateBoilDto {
  @ApiProperty({ example: "123A4", description: "Варка" })
  readonly value: string;
}
