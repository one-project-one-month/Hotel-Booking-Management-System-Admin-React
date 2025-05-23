export interface Booking {
    id:number,
    customerName:string,
    roomNo:string,
    checkIn:string,
    checkOut:string,
    guestCount:number,
    depositAmount:number,
    totalAmount:number,
    status:status
    createdAt:string
}

export type status = "Booked" | "Check-In" | "Check-Out" | "Maintance" | "Available";



