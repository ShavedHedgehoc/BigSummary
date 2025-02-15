import { ApiProperty } from "@nestjs/swagger";

export class CreateRecordDto {
  //   @ApiProperty({ example: "Колпино", description: "Наименование площадки" })
  @ApiProperty({ example: "", description: "" })
  readonly doc_id: number;
  @ApiProperty({ example: "", description: "" })
  readonly code1C: string;
  @ApiProperty({ example: "", description: "" })
  readonly product: string;
  @ApiProperty({ example: "", description: "" })
  readonly serie: string;
  @ApiProperty({ example: "", description: "" })
  // readonly boil: string;
  readonly batch: string;
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
  @ApiProperty({ example: "", description: "" })
  readonly boil1: string;
  @ApiProperty({ example: "", description: "" })
  readonly boil2: string;
}
