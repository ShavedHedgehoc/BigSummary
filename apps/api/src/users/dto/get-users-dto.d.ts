interface FetchUsersFilter {
    name: string;
    nameAsc: boolean;
    email: string;
    banned: number[] | [];
    roles: number[] | [];
}
export declare class GethUsersDto {
    readonly filter: FetchUsersFilter;
    readonly page: number;
    readonly limit: number;
}
export {};
