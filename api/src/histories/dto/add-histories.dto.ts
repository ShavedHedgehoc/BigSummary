import { ApiProperty } from "@nestjs/swagger";

export class AddHistoriesDto {
  @ApiProperty({ example: "123B4", description: "Номер варки" })
  readonly boil: string;
  @ApiProperty({ example: "064290", description: "Код продукта" })
  readonly code: string | null;
  @ApiProperty({ example: "base_check", description: "Тип записи" })
  readonly historyType: string;
  @ApiProperty({ example: "1", description: "id пользователя" })
  readonly userId: number;
  @ApiProperty({ example: "1", description: "id пользователя рабочей станции" })
  readonly employeeId: number;
  @ApiProperty({ example: "Комментарий к записи", description: "Комментарий к записи" })
  readonly note: string;
}

export class AddHistoryDirectDto {
  readonly record_id: number;
  readonly historyType: string;
  readonly userId: number;
  readonly employeeId: number;
  readonly note: string;
}

export class AddHistoryDtoNew {
  readonly record_id: number;
  readonly boil_value: string;
  readonly historyType: string;
  readonly userId: number;
  readonly employeeId: number;
  readonly note: string;
  readonly code: string;
  readonly base_code: string;
  readonly history_note: string;
  readonly plant_id: number;
}
