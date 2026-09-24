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
import { ApplicationBoilService } from 'src/main/boil/application.boil.service';

@Injectable()
export class TrpcService {
  private readonly jwtService = new JwtService();
  constructor(
    @Inject(forwardRef(() => HealthService))
    private readonly healthService: HealthService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
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
    // let user: TRegisteredUser | null = null;
    // const req = _opts.req as trpcExpress.CreateExpressContextOptions['req'];
    // const res = _opts.res;
    let user: TRegisteredUser | null = null;

    // try {
    //   let token = req?.cookies?.accessToken;
    //   if (!token && req?.headers?.cookie) {
    //     const cookies = Object.fromEntries(
    //       req.headers.cookie.split('; ').map((c: string) => c.split('=')),
    //     );
    //     token = cookies['accessToken'];
    //   }
    //   if (token) {
    //     const payload: TRegisteredUser = await this.jwtService.verifyAsync(token, {
    //       secret: 'JWT_ACCESS_SECRET',
    //     });
    //     user = payload;
    //   }
    // } catch (_error) {
    //   //empty
    // }
    try {
      // Используем опциональную цепочку и приведение типов для cookies
      const cookiesObj = req.cookies as Record<string, string> | undefined;
      let token: string | undefined = cookiesObj?.['accessToken'];

      // Проверяем заголовки, если куки не распарсились автоматически
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
      applicationBoilService: this.applicationBoilService,
      applicationDocService: this.applicationDocService,
      applicationHistoryService: this.applicationHistoryService,
      applicationHistoryTypeService: this.applicationHistoryTypeService,
      applicationPlantService: this.applicationPlantService,
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
