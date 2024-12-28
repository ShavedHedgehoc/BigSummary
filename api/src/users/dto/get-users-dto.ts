import { ApiProperty } from "@nestjs/swagger";

interface FetchUsersFilter {
  name: string;
  nameAsc: boolean;
  email: string;
  banned: number[] | [];
  roles: number[] | [];
}

export class GethUsersDto {
  @ApiProperty()
  readonly filter: FetchUsersFilter;
  @ApiProperty()
  readonly page: number;
  @ApiProperty()
  readonly limit: number;
}
