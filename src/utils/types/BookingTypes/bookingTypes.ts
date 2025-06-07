import type { ChangeEvent } from "react";

export interface Book {
    id:string,
    user:{
        name:string
    }
    room:{
        roomNo:number
    },
    checkInOut:{
        extra_charge:string
    },
    checkIn:string,
    checkOut:string,
    guestCount:number,
    checkInOutId:string,
    depositAmount:number,
    totalAmount:number,
    status:status
    createdAt:string
}

export type status = "pending" | "approved" ;



export type CheckType = {
    bookingId:string,
    // customerName:string;
    // roomNo:number,
    checkIn:string,
    checkOut:string,
    extraCharges:number
    status:string
    createdAt:string,
}

export interface BookingProps {
    bookingChange:(e:ChangeEvent<HTMLInputElement>) => void;
}

// export interface DropDownProps {
//   CheckIn?: () => void;
//   status?: string;
//   CheckOutClick?:() =>void;
//   viewBooking?:() => void;
//   updateBooking?:() => void;
//   viewHistory?:() => void;
// }

export interface bookingProps{
    booking:Book
}

export interface checkProps {
    check:CheckType
}

export interface bookingFilter {
    user:{
        name:string
    }
    room:{
        roomNo:number
    },
    depositAmount:number,
}