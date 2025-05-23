export interface Username  {
    _id:string,
    name:string,
    email:string,
    phoneNumber:string,
    points:number,
    coupon:number,
    role:string,
    createdAt:string;
    imgUrl:string;
}

export interface menuItems {
    route:string,
    text:string,
    icon:string
}