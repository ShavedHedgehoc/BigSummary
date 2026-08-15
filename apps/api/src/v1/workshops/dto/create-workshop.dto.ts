import { ApiProperty } from "@nestjs/swagger";

export class CreateWorkshopDto {
  @ApiProperty({ example: "1й цех", description: "Цех" })
  readonly value: string;
}
