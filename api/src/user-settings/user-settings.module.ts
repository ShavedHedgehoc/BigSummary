import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import UserSettings from "./user-settings.model";

@Module({
  imports: [SequelizeModule.forFeature([UserSettings])],
})
export class UserSettingsModule {}
