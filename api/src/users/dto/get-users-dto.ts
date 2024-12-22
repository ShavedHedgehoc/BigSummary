interface FetchUsersFilter {
  name: string;
  nameAsc: boolean;
  email: string;
  banned: number[] | [];
  roles: number[] | [];
}

export interface GethUsersDto {
  filter: FetchUsersFilter;
  page: number;
  limit: number;
}
