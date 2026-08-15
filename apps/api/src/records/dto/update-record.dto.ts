import { ApiProperty } from "@nestjs/swagger";

export class UpdateRecordDto {
  @ApiProperty({ example: "", description: "" })
  readonly id: number;
  @ApiProperty({ example: "", description: "" })
  readonly apparatus: string;
  @ApiProperty({ example: "", description: "" })
  readonly can: string;
  @ApiProperty({ example: "", description: "" })
  readonly conveyor: string;
  @ApiProperty({ example: "", description: "" })
  readonly plan: string;
  @ApiProperty({ example: "", description: "" })
  readonly note: string;
}
