export interface Book {
    id:number,
    customerName:string,
    roomNo:number,
    checkIn:string,
    checkOut:string,
    guestCount:number,
    depositAmount:number,
    totalAmount:number,
    status:status
    createdAt:string
}

export type status = "Booked" | "Check-In" | "Check-Out" | "Maintance" | "Available";



export type CheckType = {
    id:string,
    customerName:string;
    roomNo:number,
    checkIn:string,
    checkOut:string,
    extraCharges:number
    status:status
    createdAt:string
}