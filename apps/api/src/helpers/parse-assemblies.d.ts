export interface parsedAssembly {
    code: string;
    name: string;
    post: string;
}
export declare function parseAssemblies(value: string): parsedAssembly[] | [];
