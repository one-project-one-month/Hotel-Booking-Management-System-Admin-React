import type { ChangeEvent } from "react";

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

export interface userBodyProps {
    updateUser :(id:string) => void;
    deleteUser : (id:string) => void;
    user:Username
}


export interface userInputProps {
    userChange:(event:ChangeEvent<HTMLInputElement>) =>void;
    createUser: () =>void;
}
