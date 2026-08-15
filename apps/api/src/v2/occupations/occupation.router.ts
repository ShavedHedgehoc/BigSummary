import { Router, Query, Mutation, Input } from 'nestjs-trpc';
import { z } from 'zod';
// import { CellService } from './cell.service';
// import {
//     GetCellsContainListInputSchema,
//     DeleteCellsContainRecordInputSchema,
//     TGetCellsContainListInput,
//     TDeleteCellsContainRecordInput,
//     TCellsContainListResponse
// } from '@repo/schemas';
import { OccupationService } from './occupation.service';

@Router({ alias: 'occupations' }) // Пространство имен для вызова: trpc.cells...
export class OccupationRouter {
    constructor(private readonly occupationService: OccupationService) { }

    // Запрос на чтение списка
    @Query({


    })
    async getAllOccupations(): Promise<any> {
        return this.occupationService.getAllOccupations();
    }

    //   // Запрос на удаление
    //   @Mutation({ 
    //     input: DeleteCellsContainRecordInputSchema 
    //   })
    //   async deleteCellsContain(@Input() input: TDeleteCellsContainRecordInput): Promise<{ success: boolean }> {
    //     return this.cellService.deleteCellsContain(input);
    //   }
}
