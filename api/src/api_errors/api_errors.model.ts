import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

interface ApiErrorsCreationsAttrs {
  dto: string;
  message: string;
}

@Table({ tableName: "api_errors" })
export default class ApiError extends Model<ApiError, ApiErrorsCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ type: DataType.STRING })
  dto: string;

  @Column({ type: DataType.STRING })
  message: string;
}
