import { ApiProperty } from "@nestjs/swagger";

export class CreateRecordDto {
  //   @ApiProperty({ example: "Колпино", description: "Наименование площадки" })
  @ApiProperty({ example: "", description: "" })
  readonly docId: number;
  @ApiProperty({ example: "", description: "" })
  readonly code1C: string;
  @ApiProperty({ example: "", description: "" })
  readonly product: string;
  @ApiProperty({ example: "", description: "" })
  readonly serie: string;
  @ApiProperty({ example: "", description: "" })
  readonly boil: string;
  @ApiProperty({ example: "", description: "" })
  readonly apparatus: string;
  @ApiProperty({ example: "", description: "" })
  readonly can: string;
  @ApiProperty({ example: "", description: "" })
  readonly conveyor: string;
  @ApiProperty({ example: "", description: "" })
  readonly plan: number;
  @ApiProperty({ example: "", description: "" })
  readonly bbf: string;
  @ApiProperty({ example: "", description: "" })
  readonly note: string;
  @ApiProperty({ example: "", description: "" })
  readonly workshop: string;
}
