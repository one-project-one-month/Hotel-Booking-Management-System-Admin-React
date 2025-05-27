export interface LoginUser {
    email:string;
    name:string;
    password:string;
    imgUrl:string;
    phoneNumber:string
}

export interface CreateUser{
    email:string
    name:string
    imgUrl:string
    phoneNumber:string
    points:number
    coupon:number
    role:string
}

export interface IdPrpos{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any
}