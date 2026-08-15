import { Router, Query, Mutation, Input } from 'nestjs-trpc';
import { EmployeeService } from './employee.service';
import { getWorkstationEmployeeByBarcodeSchema, TGetWorkstationEmployeeByBarcodeInput, TWorkstationEmployeeByBarcodeOutput, workstationEmployeeByBarcodeOutputSchema } from '@repo/schemas';





@Router({ alias: 'employeeWorkstation' })
export class WorkstationEmployeeRouter {
    constructor(private readonly employeeService: EmployeeService) { }
    @Query({
        input: getWorkstationEmployeeByBarcodeSchema,
        output: workstationEmployeeByBarcodeOutputSchema
    })
    async getEmployeeByBarcode(@Input() input: TGetWorkstationEmployeeByBarcodeInput): Promise<TWorkstationEmployeeByBarcodeOutput> {
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