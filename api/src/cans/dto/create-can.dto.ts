import { ApiProperty } from "@nestjs/swagger";

export class CreateCanDto {
  @ApiProperty({ example: "125", description: "Емкость" })
  readonly value: string;
}
