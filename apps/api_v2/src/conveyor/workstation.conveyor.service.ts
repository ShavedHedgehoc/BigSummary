import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { IWorkstationConveyorService } from '@repo/trpc';
import { TRPCError } from '@trpc/server'; // 1. Импортируем нативные ошибки tRPC
import {
    TWorkstationConveyorByBarcodeOutput,
    TGetWorkstationConveyorByBarcodeInput,
} from '@repo/schemas';

@Injectable()
export class WorkstationConveyorService implements IWorkstationConveyorService {
    async getConveyorByBarcode(
        input: TGetWorkstationConveyorByBarcodeInput
    ): Promise<TWorkstationConveyorByBarcodeOutput> {
        const { barcode } = input;

        const conveyor = await pgPrisma.conveyors.findFirst({
            where: { barcode }

        });

        if (!conveyor) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: `Конвейер со штрихкодом ${barcode} не найден`,
            });
        }

        return conveyor;
    }
}
