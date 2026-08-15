import { Router, Query, Mutation, Input } from 'nestjs-trpc';
import { z } from 'zod';
import { EmployeeService } from './employee.service';
import { getEmployeeByBarcodeSchema, TGetEmployeeByBarcode } from "@repo/schemas"






@Router({ alias: 'employee.workstation' })
export class WorkstationEmployeeRouter {
    constructor(private readonly employeeService: EmployeeService) { }
    @Query({
        input: getEmployeeByBarcodeSchema
    })
    async getEmployeeByBarcode(@Input() input: TGetEmployeeByBarcode): Promise<any> {
        return this.employeeService.getEmployeeByBarcode(input.barcode);
    }

    //   // Запрос на удаление
    //   @Mutation({ 
    //     input: DeleteCellsContainRecordInputSchema 
    //   })
    //   async deleteCellsContain(@Input() input: TDeleteCellsContainRecordInput): Promise<{ success: boolean }> {
    //     return this.cellService.deleteCellsContain(input);
    //   }
}
