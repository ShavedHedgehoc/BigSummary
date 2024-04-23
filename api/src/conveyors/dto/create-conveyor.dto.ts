import { ApiProperty } from "@nestjs/swagger";

export class CreateConveyorDto {
  @ApiProperty({ example: "111", description: "Конвейер" })
  readonly value: string;
}
