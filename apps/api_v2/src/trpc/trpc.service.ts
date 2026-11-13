import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { ITrpcContext } from '@repo/trpc';
import { JwtService } from '@nestjs/jwt';
import { TRegisteredUser } from '@repo/schemas';
import { WorkstationEmployeeService } from '../main/employee/workstation.employee.service';
import { WorkstationConveyorService } from '../main/conveyor/workstation.conveyor.service';
import { DashPlantService } from '../main/plant/dash.plant.service';
import { DashDocService } from '../main/doc/dash.doc.service';
import { DashBoilService } from '../main/boil/dash.boil.service';
import { DashTracePlantService } from '../trace/plant/dash.plant.service';
import { DashTraceCanStateService } from '../trace/can-state/dash.can-state.service';
import { DashTraceCanService } from '../trace/can/dash.can.service';
import { DashTraceCanRecordService } from '../trace/can-record/dash.can-record.service';
import { HealthService } from '../health/health.service';
import { WorkstationPlantService } from '../main/plant/workstation.plant.service';
import { WorkstationHistoryService } from '../main/history/workstation.history.service';
import { WorkstationRecordService } from '../main/record/workstation.record.service';
import { AuthService } from '../auth/auth.service';
import { ApplicationDocService } from '../main/doc/application.doc.service';
import { ApplicationPlantService } from '../main/plant/application.plant.service';
import { ApplicationHistoryTypeService } from '../main/history-type/application.history-type.service';
import { ApplicationHistoryService } from '../main/history/application.history.service';
import { ApplicationBoilService } from '../main/boil/application.boil.service';
import { ApplicationUserService } from '../main/user/application.user.service';
import { ApplicationRoleService } from '../main/role/application.role.service';
import { ApplicationConveyorService } from '../main/conveyor/application.conveyor.service';
import { ApplicationTracePlantService } from '../trace/plant/application.plant.service';
import { ApplicationTraceCanService } from '../trace/can/application.can.service';
import { ApplicationTraceCanStateService } from '../trace/can-state/application.can-state.service';
import { ApplicationTraceInventoryService } from '../trace/inventory/application.inventory.service';
import { ApplicationTraceBoilService } from '../trace/boil/application.boil.service';
import { ApplicationTraceWeightingService } from '../trace/weighting/application.weighting.service';

@Injectable()
export class TrpcService {
  private readonly jwtService = new JwtService();
  constructor(
    @Inject(forwardRef(() => HealthService))
    private readonly healthService: HealthService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => ApplicationTraceInventoryService))
    private readonly applicationTraceInventoryService: ApplicationTraceInventoryService,
    @Inject(forwardRef(() => ApplicationTraceWeightingService))
    private readonly applicationTraceWeightingService: ApplicationTraceWeightingService,
    @Inject(forwardRef(() => ApplicationTraceBoilService))
    private readonly applicationTraceBoilService: ApplicationTraceBoilService,
    @Inject(forwardRef(() => ApplicationTraceCanService))
    private readonly applicationTraceCanService: ApplicationTraceCanService,
    @Inject(forwardRef(() => ApplicationTraceCanStateService))
    private readonly applicationTraceCanStateService: ApplicationTraceCanStateService,
    @Inject(forwardRef(() => ApplicationTracePlantService))
    private readonly applicationTracePlantService: ApplicationTracePlantService,
    @Inject(forwardRef(() => ApplicationConveyorService))
    private readonly applicationConveyorService: ApplicationConveyorService,
    @Inject(forwardRef(() => ApplicationBoilService))
    private readonly applicationBoilService: ApplicationBoilService,
    @Inject(forwardRef(() => ApplicationDocService))
    private readonly applicationDocService: ApplicationDocService,
    @Inject(forwardRef(() => ApplicationHistoryService))
    private readonly applicationHistoryService: ApplicationHistoryService,
    @Inject(forwardRef(() => ApplicationHistoryTypeService))
    private readonly applicationHistoryTypeService: ApplicationHistoryTypeService,
    @Inject(forwardRef(() => ApplicationPlantService))
    private readonly applicationPlantService: ApplicationPlantService,
    @Inject(forwardRef(() => ApplicationRoleService))
    private readonly applicationRoleService: ApplicationRoleService,
    @Inject(forwardRef(() => ApplicationUserService))
    private readonly applicationUserService: ApplicationUserService,
    @Inject(forwardRef(() => WorkstationEmployeeService))
    private readonly workstationEmployeeService: WorkstationEmployeeService,
    @Inject(forwardRef(() => WorkstationHistoryService))
    private readonly workstationHistoryService: WorkstationHistoryService,
    @Inject(forwardRef(() => WorkstationRecordService))
    private readonly workstationRecordService: WorkstationRecordService,
    @Inject(forwardRef(() => WorkstationConveyorService))
    private readonly workstationConveyorService: WorkstationConveyorService,
    @Inject(forwardRef(() => WorkstationPlantService))
    private readonly workstationPlantService: WorkstationPlantService,
    @Inject(forwardRef(() => DashPlantService)) private readonly dashPlantService: DashPlantService,
    @Inject(forwardRef(() => DashTracePlantService))
    private readonly dashTracePlantService: DashTracePlantService,
    @Inject(forwardRef(() => DashTraceCanStateService))
    private readonly dashTraceCanStateService: DashTraceCanStateService,
    @Inject(forwardRef(() => DashTraceCanRecordService))
    private readonly dashTraceCanRecordService: DashTraceCanRecordService,
    @Inject(forwardRef(() => DashTraceCanService))
    private readonly dashTraceCanService: DashTraceCanService,
    @Inject(forwardRef(() => DashDocService)) private readonly dashDocService: DashDocService,
    @Inject(forwardRef(() => DashBoilService)) private readonly dashBoilService: DashBoilService,
  ) {}

  createContext = async (_opts: trpcExpress.CreateExpressContextOptions): Promise<ITrpcContext> => {
    const { req, res } = _opts;
    let user: TRegisteredUser | null = null;
    try {
      const cookiesObj = req.cookies as Record<string, string> | undefined;
      let token: string | undefined = cookiesObj?.['accessToken'];

      const cookieHeader = req.headers.cookie;
      if (!token && typeof cookieHeader === 'string') {
        const cookies = Object.fromEntries(
          cookieHeader.split('; ').map((c) => {
            const parts = c.split('=');
            return [parts[0], parts.slice(1).join('=')];
          }),
        );
        token = cookies['accessToken'];
      }

      if (token) {
        const payload: TRegisteredUser = await this.jwtService.verifyAsync(token, {
          secret: 'JWT_ACCESS_SECRET',
        });
        user = payload;
      }
    } catch (_error) {
      //empty
    }
    return {
      healthService: this.healthService,
      authService: this.authService,
      applicationTraceInventoryService: this.applicationTraceInventoryService,
      applicationTraceWeightingService: this.applicationTraceWeightingService,
      applicationTraceCanStateService: this.applicationTraceCanStateService,
      applicationTracePlantService: this.applicationTracePlantService,
      applicationTraceCanService: this.applicationTraceCanService,
      applicationTraceBoilService: this.applicationTraceBoilService,
      applicationBoilService: this.applicationBoilService,
      applicationConveyorService: this.applicationConveyorService,
      applicationDocService: this.applicationDocService,
      applicationHistoryService: this.applicationHistoryService,
      applicationHistoryTypeService: this.applicationHistoryTypeService,
      applicationRoleService: this.applicationRoleService,
      applicationPlantService: this.applicationPlantService,
      applicationUserService: this.applicationUserService,
      workstationEmployeeService: this.workstationEmployeeService,
      workstationHistoryService: this.workstationHistoryService,
      workstationConveyorService: this.workstationConveyorService,
      workstationPlantService: this.workstationPlantService,
      workstationRecordService: this.workstationRecordService,
      dashPlantService: this.dashPlantService,
      dashTracePlantService: this.dashTracePlantService,
      dashTraceCanStateService: this.dashTraceCanStateService,
      dashTraceCanRecordService: this.dashTraceCanRecordService,
      dashTraceCanService: this.dashTraceCanService,
      dashDocService: this.dashDocService,
      dashBoilService: this.dashBoilService,
      user: user,
      req,
      res,
    };
  };
}
