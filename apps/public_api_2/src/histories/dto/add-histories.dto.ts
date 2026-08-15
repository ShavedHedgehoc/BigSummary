export class AddHistoryDto {
  readonly record_id: number;
  readonly boil_id: number | null;
  readonly historyTypeId: number;
  readonly userId: number | null;
  readonly employeeId: number | null;
  readonly note: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
