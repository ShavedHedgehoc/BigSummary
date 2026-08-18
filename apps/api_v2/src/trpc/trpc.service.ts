// import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import * as trpcExpress from '@trpc/server/adapters/express';
// import type { ITrpcContext } from '@repo/trpc';

// // import { JwtService } from '@nestjs/jwt';
// // import { TRegisteredUser } from '@repo/schemas';
// import { WorkstationEmployeeService } from '../employee/workstation.employee.service';
// import { WorkstationConveyorService } from '../conveyor/workstation.conveyor.service';
// import { DashPlantService } from '../plant/dash.plant.service';

// @Injectable()
// export class TrpcService {
//   constructor(
//     @Inject(forwardRef(() => WorkstationEmployeeService))
//     private readonly workstationEmployeeService: WorkstationEmployeeService,
//     @Inject(forwardRef(() => WorkstationConveyorService))
//     private readonly workstationConveyorService: WorkstationConveyorService,
//     @Inject(forwardRef(() => DashPlantService)) private readonly dashPlantService: DashPlantService,
//   ) {}

//   // createContext = async (_opts: trpcExpress.CreateExpressContextOptions): Promise<ITrpcContext> => {
//   createContext = (_opts: trpcExpress.CreateExpressContextOptions): Promise<ITrpcContext> => {
//     const { req, res } = _opts;
//     // let user: TRegisteredUser | null = null;

//     // try {
//     //     const authHeader = req?.headers?.authorization;

//     //     if (authHeader && authHeader.startsWith('Bearer')) {
//     //         const token = authHeader.split(' ')[1];
//     //         const jwtService = new JwtService();
//     //         const payload: TRegisteredUser = await jwtService.verifyAsync(token, {
//     //             secret: 'JWT_ACCESS_SECRET',
//     //         });
//     //         user = payload;
//     //     }
//     // } catch (_error) {
//     //     // console.log(error);
//     // }

//     // return {
//     return Promise.resolve({
//       workstationEmployeeService: this.workstationEmployeeService,
//       workstationConveyorService: this.workstationConveyorService,
//       dashPlantService: this.dashPlantService,
//       // trademarkService: this.trademarkService,
//       // boilService: this.boilService,
//       // authService: this.authService,
//       // cellService: this.cellService,
//       // materialService: this.materailService,
//       // userService: this.userService,
//       // roleService: this.roleService,
//       // lotService: this.lotService,
//       // planService: this.planService,
//       // user: user,
//       req,
//       res,
//     });
//     // };
//   };
// }
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ITrpcContext } from '@repo/trpc';
import type { IncomingMessage, ServerResponse } from 'http';

import { WorkstationEmployeeService } from '../employee/workstation.employee.service';
import { WorkstationConveyorService } from '../conveyor/workstation.conveyor.service';
import { DashPlantService } from '../plant/dash.plant.service';

// Описываем плоский интерфейс опций, который на 100% совместим с любым HTTP-адаптером tRPC
interface CreateContextOptions {
  req: IncomingMessage & { headers?: { authorization?: string } };
  res: ServerResponse;
}

@Injectable()
export class TrpcService {
  private readonly jwtService = new JwtService();

  constructor(
    @Inject(forwardRef(() => WorkstationEmployeeService))
    private readonly workstationEmployeeService: WorkstationEmployeeService,
    @Inject(forwardRef(() => WorkstationConveyorService))
    private readonly workstationConveyorService: WorkstationConveyorService,
    @Inject(forwardRef(() => DashPlantService))
    private readonly dashPlantService: DashPlantService,
  ) { }

  /**
   * Универсальный контекст: безопасно извлекает пользователя, если передан токен.
   * Если токена нет — отдает сервисы с user = null.
   */
  createContext = async (opts: CreateContextOptions): Promise<ITrpcContext> => {
    const { req, res } = opts;
    let user = null;

    const authHeader = req.headers?.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1]; // Берем сам токен после слова Bearer
        user = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
        });
      } catch {
        // Токен невалиден или истёк — оставляем user = null
      }
    }

    return {
      workstationEmployeeService: this.workstationEmployeeService,
      workstationConveyorService: this.workstationConveyorService,
      dashPlantService: this.dashPlantService,
      user,
      req,
      res,
    };
  };
}
