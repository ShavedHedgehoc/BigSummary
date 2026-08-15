import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserSettingsService } from "./user-settings.service";
import UserSettings from "./user-settings.model";

@Module({
  providers: [UserSettingsService],
  imports: [SequelizeModule.forFeature([UserSettings])],
  exports: [UserSettingsService],
})
export class UserSettingsModule {}
