import { ApiProperty } from '@nestjs/swagger';

export class TaskRow {
    @ApiProperty({ description: 'Дата сводки', example: '2026-06-05T00:00:00.000Z', nullable: true })
    date!: Date | null;

    @ApiProperty({ description: 'ID записи', example: 142 })
    record_id!: number;

    @ApiProperty({ description: 'Конвейера', example: '101', nullable: true })
    conveyor_name!: string | null;

    @ApiProperty({ description: 'Код 1С', example: '000123', nullable: true })
    code_1C!: string | null;

    @ApiProperty({ description: 'Артикул', example: 'OTM.32', nullable: true })
    marking!: string | null;

    @ApiProperty({ description: 'Партия', example: '1234B26', nullable: true })
    boil_value!: string | null;

    @ApiProperty({ description: 'План', example: 1500 })
    plan!: number;

    @ApiProperty({ description: 'Статус', example: "product_finished", nullable: true })
    state!: string | null;

    @ApiProperty({ description: 'Описание статуса', example: 'Фасовка завершена', nullable: true })
    state_description!: string | null;

    @ApiProperty({ description: 'Площадка', example: 'Пискаревка', nullable: true })
    plant!: string | null;
}


export type TasksResponse = TaskRow[];