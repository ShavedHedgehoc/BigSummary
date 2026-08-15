import { ApiProperty } from "@nestjs/swagger";

interface UserSettings {
  plant_id: number;
}

export class UpdateUserSettingsDto {
  @ApiProperty({ example: "1", description: "Идентификатор пользователя" })
  readonly user_id: number;
  @ApiProperty({ example: "1", description: "id площадки по умолчанию" })
  readonly user_settings: UserSettings;
}
