import { Router, Query, Mutation, Input } from 'nestjs-trpc';
import { z } from 'zod';
import { EmployeeService } from './employee.service';
// import { getEmployeeByBarcodeSchema, TGetEmployeeByBarcode } from "@repo/schemas"

// move to dto?
const getEmployeeByBarcodeSchema = z.object({
    barcode: z.string().default(''),
});
type TGetEmployeeByBarcode = z.infer<typeof getEmployeeByBarcodeSchema>;



// Схема для вложенного объекта occupations
const occupationSchema = z.object({
    id: z.number().int(),
    value: z.string(),
    description: z.string(),
});

// Основная схема для ответа (root)
export const employeeOutputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    barcode: z.string(),
    occupationId: z.number().int(),

    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    occupations: occupationSchema.nullable().optional(),
});

// Выводим TypeScript тип из схемы для использования в коде
export type TEmployeeOutput = z.infer<typeof employeeOutputSchema>;



@Router({ alias: 'employee.workstation' })
export class WorkstationEmployeeRouter {
    constructor(private readonly employeeService: EmployeeService) { }
    @Query({
        input: getEmployeeByBarcodeSchema,
        output: employeeOutputSchema
    })
    async getEmployeeByBarcode(@Input() input: TGetEmployeeByBarcode): Promise<TEmployeeOutput> {
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