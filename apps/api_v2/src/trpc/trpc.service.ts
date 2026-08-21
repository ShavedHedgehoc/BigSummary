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

@Injectable()
export class TrpcService {
  private readonly jwtService = new JwtService();
  constructor(
    @Inject(forwardRef(() => WorkstationEmployeeService))
    private readonly workstationEmployeeService: WorkstationEmployeeService,
    @Inject(forwardRef(() => WorkstationConveyorService))
    private readonly workstationConveyorService: WorkstationConveyorService,
    @Inject(forwardRef(() => DashPlantService)) private readonly dashPlantService: DashPlantService,
    @Inject(forwardRef(() => DashTracePlantService)) private readonly dashTracePlantService: DashTracePlantService,
    @Inject(forwardRef(() => DashTraceCanStateService)) private readonly dashTraceCanStateService: DashTraceCanStateService,
    @Inject(forwardRef(() => DashDocService)) private readonly dashDocService: DashDocService,
    @Inject(forwardRef(() => DashBoilService)) private readonly dashBoilService: DashBoilService,
  ) { }

  createContext = async (_opts: trpcExpress.CreateExpressContextOptions): Promise<ITrpcContext> => {
    const { req, res } = _opts;
    let user: TRegisteredUser | null = null;

    try {
      const authHeader = req?.headers?.authorization;

      if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];
        // const jwtService = new JwtService();
        // const payload: TRegisteredUser = await jwtService.verifyAsync(token, {
        //   secret: 'JWT_ACCESS_SECRET',
        // });

        const payload: TRegisteredUser = await this.jwtService.verifyAsync(token, {
          secret: 'JWT_ACCESS_SECRET',
        });
        user = payload;
      }
    } catch (_error) {
      // console.log(error);
    }
    return {
      // return Promise.resolve({
      workstationEmployeeService: this.workstationEmployeeService,
      workstationConveyorService: this.workstationConveyorService,
      dashPlantService: this.dashPlantService,
      dashTracePlantService: this.dashTracePlantService,
      dashTraceCanStateService: this.dashTraceCanStateService,
      dashDocService: this.dashDocService,
      dashBoilService: this.dashBoilService,
      user: user,
      req,
      res,
      // });
    };
  };
}

// import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import type { ITrpcContext } from '@repo/trpc';
// import type { IncomingMessage, ServerResponse } from 'http';

// import { WorkstationEmployeeService } from '../employee/workstation.employee.service';
// import { WorkstationConveyorService } from '../conveyor/workstation.conveyor.service';
// import { DashPlantService } from '../plant/dash.plant.service';

// // Описываем плоский интерфейс опций, который на 100% совместим с любым HTTP-адаптером tRPC
// interface CreateContextOptions {
//   req: IncomingMessage & { headers?: { authorization?: string } };
//   res: ServerResponse;
// }

// @Injectable()
// export class TrpcService {
//   private readonly jwtService = new JwtService();

//   constructor(
//     @Inject(forwardRef(() => WorkstationEmployeeService))
//     private readonly workstationEmployeeService: WorkstationEmployeeService,
//     @Inject(forwardRef(() => WorkstationConveyorService))
//     private readonly workstationConveyorService: WorkstationConveyorService,
//     @Inject(forwardRef(() => DashPlantService))
//     private readonly dashPlantService: DashPlantService,
//   ) { }

//   /**
//    * Универсальный контекст: безопасно извлекает пользователя, если передан токен.
//    * Если токена нет — отдает сервисы с user = null.
//    */
//   createContext = async (opts: CreateContextOptions): Promise<ITrpcContext> => {
//     const { req, res } = opts;
//     let user = null;

//     const authHeader = req.headers?.authorization;
//     if (authHeader?.startsWith('Bearer ')) {
//       try {
//         const token = authHeader.split(' ')[1]; // Берем сам токен после слова Bearer
//         user = await this.jwtService.verifyAsync(token, {
//           secret: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
//         });
//       } catch {
//         // Токен невалиден или истёк — оставляем user = null
//       }
//     }

//     return {
//       workstationEmployeeService: this.workstationEmployeeService,
//       workstationConveyorService: this.workstationConveyorService,
//       dashPlantService: this.dashPlantService,
//       user,
//       req,
//       res,
//     };
//   };
// }

// import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import type { ITrpcContext } from '@repo/trpc';
// import type { IncomingMessage, ServerResponse } from 'http';

// import { WorkstationEmployeeService } from '../employee/workstation.employee.service';
// import { WorkstationConveyorService } from '../conveyor/workstation.conveyor.service';
// import { DashPlantService } from '../plant/dash.plant.service';

// interface CreateContextOptions {
//   req: IncomingMessage & { headers?: { authorization?: string } };
//   res: ServerResponse;
// }

// @Injectable()
// export class TrpcService {
//   private readonly jwtService = new JwtService();

//   constructor(
//     @Inject(forwardRef(() => WorkstationEmployeeService))
//     private readonly workstationEmployeeService: WorkstationEmployeeService,
//     @Inject(forwardRef(() => WorkstationConveyorService))
//     private readonly workstationConveyorService: WorkstationConveyorService,
//     @Inject(forwardRef(() => DashPlantService))
//     private readonly dashPlantService: DashPlantService,
//   ) {}

//   /**
//    * Универсальный контекст: безопасно извлекает пользователя, если передан токен.
//    * Если токена нет — отдает сервисы с user = null.
//    */
//   createContext = async (opts: CreateContextOptions): Promise<ITrpcContext> => {
//     // Явно приводим свойства к их исходным типам при деструктуризации,
//     // чтобы линтер не ругался на unsafe assignment из-за неявных any в сигнатуре адаптеров
//     const req = opts.req as IncomingMessage & { headers?: { authorization?: string } };
//     const res = opts.res as ServerResponse;

//     // let user: Record<string, unknown> | null = null;
//     let user: NonNullable<ITrpcContext['user']> | null = null;

//     const authHeader = req.headers?.authorization;
//     if (authHeader?.startsWith('Bearer ')) {
//       try {
//         const token = authHeader.split(' ')[1];

//         // Результат верификации также явно типизируем, чтобы избежать unsafe assignment
//         // const payload = (await this.jwtService.verifyAsync(token, {
//         //   secret: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
//         // })) as Record<string, unknown>;
//         const payload = (await this.jwtService.verifyAsync(token, {
//           secret: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
//         })) as NonNullable<ITrpcContext['user']>;

//         // user = payload;

//         user = payload;
//       } catch {
//         // Токен невалиден или истёк — оставляем user = null
//       }
//     }

//     return {
//       workstationEmployeeService: this.workstationEmployeeService,
//       workstationConveyorService: this.workstationConveyorService,
//       dashPlantService: this.dashPlantService,
//       user,
//       req,
//       res,
//     };
//   };
// }
