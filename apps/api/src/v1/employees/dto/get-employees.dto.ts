import { ApiProperty } from "@nestjs/swagger";

export class IEmployeeFilter {
  @ApiProperty({ example: [], description: "ids ролей пользователя" })
  readonly occupations: number[] | [];
  @ApiProperty({ example: "", description: "Фильтр по имени" })
  readonly name: string;
  @ApiProperty({ example: true, description: "По возрастанию имени" })
  readonly nameAsc: boolean;
}

export class GetEmployeesDto {
  readonly filter: IEmployeeFilter;
  @ApiProperty({ example: 1, description: "Страница" })
  readonly page: number;
  @ApiProperty({ example: 10, description: "На странице" })
  readonly limit: number;
}
