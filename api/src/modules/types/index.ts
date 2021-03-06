export type IParams = {
    id?: number,
    first_name: string
    last_name: string,
    age: number;
    email? : string;
    password? : string;
    profile: string
}
 
export type ILoginParams = {
    email: string
    password: string,
}

export type IUser = {
    id: number,
    first_name: string
    last_name: string,
    age: number;
    profile: string
}

export type IFilter = {
    search: string,
    page: number,
    size: number,
}

export type IPaginate = {
    records: Array<IUser>,
    pages: number,
    total: number,
    current: number,
    next: number,
}