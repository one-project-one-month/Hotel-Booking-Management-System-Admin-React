export interface User  {
    id:number,
    name:string,
    email:string,
    password:string,
    phoneNumber:string,
    points:number,
    coupon:number,
    role:string,
    profile:string,
    createdAt:string
}

export interface menuItems {
    route:string,
    text:string,
    icon:string
}