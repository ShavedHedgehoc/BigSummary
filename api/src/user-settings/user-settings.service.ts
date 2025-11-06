import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import UserSettings from "./user-settings.model";
import { UpdateUserSettingsDto } from "./dto/update-user-settings.dto";

@Injectable()
export class UserSettingsService {
  constructor(@InjectModel(UserSettings) private userSettingsService: typeof UserSettings) {}

  async upsertUserSetttings(dto: UpdateUserSettingsDto) {
    const [settings, _] = await this.userSettingsService.upsert({ ...dto, ...dto.user_settings });
    return settings;
  }

  async deleteUserSetttingsByUserId(user_id: number) {
    const existsUserSettings = await this.userSettingsService.findOne({ where: { user_id: user_id } });
    if (existsUserSettings) {
      await existsUserSettings.destroy();
    }
  }
}
