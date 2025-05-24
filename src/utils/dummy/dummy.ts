
import type { Book, CheckType } from "../types/BookingTypes/bookingTypes.ts";
import type { menuItems } from "../types/UserTypes/userTypes.ts";

export const menuItem:menuItems[] = [
  {
    route: "/dashboard",
    text: "Dashboard",
    icon: "/images/layout-dashboard.png",
  },
  {
    route: "/users",
    text: "UserLists",
    icon: "/images/user (2).png",
  },
  {
    route: "/rooms",
    text: "Rooms",
    icon: "/images/room.png",
  },
  {
    route: "/coupon",
    text: "CouponLists",
    icon: "/images/cupon-lists.png",
  },
  {
    route: "/booking",
    text: "Bookings",
    icon: "/images/history.png",
  },
  {
    route: "/logout",
    text: "Logout",
    icon: "/images/log-out.png",
  },
];




export const bookings:Book[] = [
  {
    id:1,
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Check-In",
    createdAt:"24/5/2000"
  },
  {
    id:2,
    customerName:"KyawKyaw",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:30000,
    totalAmount:30000,
    status:"Check-In",
    createdAt:"24/5/2000"
  },
  {
    id:3,
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Check-In",
    createdAt:"24/5/2000"
  },
  {
    id:4,
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Check-In",
    createdAt:"24/5/2000"
  },
  {
    id:5,
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Check-In",
    createdAt:"24/5/2000"
  },
  {
    id:6,
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Booked",
    createdAt:"24/5/2000"
  },
  {
    id:7,
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Check-In",
    createdAt:"24/5/2000"
  },
  {
    id:8,
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Booked",
    createdAt:"24/5/2000"
  },
  {
    id:9,
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Check-Out",
    createdAt:"24/5/2000"
  },
  {
    id:10,
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Maintance",
    createdAt:"24/5/2000"
  },
]


export const checkTable:CheckType[] = [
  {
    id:"1",
    customerName:"Arkar",
    roomNo:104,
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    status:"Check-Out",
    extraCharges:100,
    createdAt:"24/5/2000"
  }
]