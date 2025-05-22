
import type { Booking } from "../types/BookingTypes/bookingTypes.ts";
import type { menuItems, User } from "../types/UserTypes/userTypes.ts";

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


export const users:User[] = [
  {
    id:1,
    profile:"https://avatars.githubusercontent.com/u/70505132?v=4",
    name:"arkar",
    email:"arkar@gmail.com",
    phoneNumber:"928388383",
        password:"arkar",
    role:"user",
    points:100,
    coupon:1000,
    createdAt:'24/5/2000'
  },
   {
    id:2,
    profile:"https://avatars.githubusercontent.com/u/70505132?v=4",
    name:"arkar",
    email:"arkar@gmail.com",
    phoneNumber:"928388383",
        password:"arkar",
    role:"user",
    points:100,
    coupon:1000,
    createdAt:'24/5/2000'
  },
   {
    id:3,
    profile:"https://avatars.githubusercontent.com/u/70505132?v=4",
    name:"arkar",
    email:"arkar@gmail.com",
    phoneNumber:"928388383",
        password:"arkar",
    role:"user",
    points:100,
    coupon:1000,
    createdAt:'24/5/2000'
  }, {
    id:4,
    profile:"https://avatars.githubusercontent.com/u/70505132?v=4",
    name:"arkar",
    email:"arkar@gmail.com",
    phoneNumber:"928388383",
        password:"arkar",
    role:"user",
    points:100,
    coupon:1000,
    createdAt:'24/5/2000'
  },
   {
    id:5,
    profile:"https://avatars.githubusercontent.com/u/70505132?v=4",
    name:"arkar",
    email:"arkar@gmail.com",
    phoneNumber:"928388383",
        password:"arkar",
    role:"user",
    points:100,
    coupon:1000,
    createdAt:'24/5/2000'
  },
   {
    id:6,
    profile:"https://avatars.githubusercontent.com/u/70505132?v=4",
    name:"arkar",
    email:"arkar@gmail.com",
    phoneNumber:"928388383",
        password:"arkar",
    role:"user",
    points:100,
    coupon:1000,
    createdAt:'24/5/2000'
  },
   {
    id:7,
    profile:"https://avatars.githubusercontent.com/u/70505132?v=4",
    name:"arkar",
    email:"arkar@gmail.com",
    phoneNumber:"928388383",
        password:"arkar",
    role:"user",
    points:100,
    coupon:1000,
    createdAt:'24/5/2000'
  }, {
    id:8,
    profile:"https://avatars.githubusercontent.com/u/70505132?v=4",
    name:"arkar",
    email:"arkar@gmail.com",
    phoneNumber:"928388383",
        password:"arkar",
    role:"user",
    points:100,
    coupon:1000,
    createdAt:'24/5/2000'
  },
   {
    id:9,
    profile:"https://avatars.githubusercontent.com/u/70505132?v=4",
    name:"arkar",
    email:"arkar@gmail.com",
    phoneNumber:"928388383",
    password:"arkar",
    role:"user",
    points:100,
    coupon:1000,
    createdAt:'24/5/2000'
  }
]


export const bookings:Booking[] = [
  {
    id:1,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Approved",
    createdAt:"24/5/2000"
  },
  {
    id:2,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    id:3,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    id:4,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    id:5,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    id:6,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Cancel",
    createdAt:"24/5/2000"
  },
  {
    id:7,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    id:8,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    id:9,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    id:10,
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Approved",
    createdAt:"24/5/2000"
  },
]