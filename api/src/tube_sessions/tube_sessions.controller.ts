import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TubeSessionsService } from "./tube_sessions.service";
import { TubeSessionsLogoutDto } from "./dto/tube-sessions-logout.dto";
import { TubeSessionsLoginDto } from "./dto/tube-sessions-login.dto";

@Controller("tube-sessions")
export class TubeSessionsController {
  constructor(private tubeSessionService: TubeSessionsService) {}

  @Get("/:conveyor_name")
  getSessionByConveyorId(@Param("conveyor_name") conveyor_name: string) {
    return this.tubeSessionService.getLastActiveSessionByConveyorId(conveyor_name);
  }

  @Post("/logout")
  logout(@Body() dto: TubeSessionsLogoutDto) {
    return this.tubeSessionService.logout(dto);
  }

  @Post("/login")
  login(@Body() dto: TubeSessionsLoginDto) {
    return this.tubeSessionService.login(dto);
  }
}
