import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { ITrpcContext } from '@repo/trpc';

// import { JwtService } from '@nestjs/jwt';
// import { TRegisteredUser } from '@repo/schemas';
import { WorkstationEmployeeService } from '../employee/workstation.employee.service';
import { WorkstationConveyorService } from '../conveyor/workstation.conveyor.service';
import { DashPlantService } from '../plant/dash.plant.service';


@Injectable()
export class TrpcService {
    constructor(
        @Inject(forwardRef(() => WorkstationEmployeeService)) private readonly workstationEmployeeService: WorkstationEmployeeService,
        @Inject(forwardRef(() => WorkstationConveyorService)) private readonly workstationConveyorService: WorkstationConveyorService,
        @Inject(forwardRef(() => DashPlantService)) private readonly dashPlantService: DashPlantService,

    ) { }

    createContext = async (_opts: trpcExpress.CreateExpressContextOptions): Promise<ITrpcContext> => {
        const { req, res } = _opts;
        // let user: TRegisteredUser | null = null;

        // try {
        //     const authHeader = req?.headers?.authorization;

        //     if (authHeader && authHeader.startsWith('Bearer')) {
        //         const token = authHeader.split(' ')[1];
        //         const jwtService = new JwtService();
        //         const payload: TRegisteredUser = await jwtService.verifyAsync(token, {
        //             secret: 'JWT_ACCESS_SECRET',
        //         });
        //         user = payload;
        //     }
        // } catch (_error) {
        //     // console.log(error);
        // }

        return {
            workstationEmployeeService: this.workstationEmployeeService,
            workstationConveyorService: this.workstationConveyorService,
            dashPlantService: this.dashPlantService,
            // trademarkService: this.trademarkService,
            // boilService: this.boilService,
            // authService: this.authService,
            // cellService: this.cellService,
            // materialService: this.materailService,
            // userService: this.userService,
            // roleService: this.roleService,
            // lotService: this.lotService,
            // planService: this.planService,
            // user: user,
            req,
            res,
        };
    };
}