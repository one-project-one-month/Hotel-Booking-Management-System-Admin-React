import type { Room } from "@/utils/types/roomTypes/roomTypes.ts";

export const menuItem = [
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
    route: "/cupon",
    text: "CuponLists",
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

export const dummyRooms: Room[] = [
  {
    id: 1,
    room_no: "101",
    type: "Twin",
    price: 45,
    status: "Available",
    is_featured: false,
    description:
      "Cozy room for solo travelers with a desk, Wi-Fi, and hotel amenities. Ideal for business trips or short stays.",
    img_url: "/images/Twin.jpg",
    guest_limit: 1,
  },
  {
    id: 2,
    room_no: "102",
    type: "Single",
    price: 70,
    status: "Booked",
    is_featured: false,
    description:
      "Spacious twin room with two beds, a mini fridge, and private bathroom. Great for friends or colleagues.",
    img_url: "/images/Single.jpg",
    guest_limit: 2,
  },
  {
    id: 3,
    room_no: "103",
    type: "Deluxe",
    price: 120,
    status: "Available",
    is_featured: true,
    description:
      "Deluxe room with queen bed, modern bathroom, minibar, and city view. Designed for comfort and elegance.",
    img_url: "/images/DeluxeRoom.jpg",
    guest_limit: 2,
  },
  {
    id: 4,
    room_no: "104",
    type: "Family",
    price: 160,
    status: "Check In",
    is_featured: true,
    description:
      "Family suite with two bedrooms, a living area, kitchenette, and child-friendly features. Spacious and comfortable.",
    img_url: "/images/Family.jpg",
    guest_limit: 4,
  },
  {
    id: 5,
    room_no: "105",
    type: "Standard",
    price: 60,
    status: "Maintenance",
    is_featured: false,
    description:
      "Standard room under renovation. Will include queen bed, bathroom, and simple furnishings for budget travelers.",
    img_url: "/images/Standard.jpg",
    guest_limit: 2,
  },
  {
    id: 6,
    room_no: "106",
    type: "Deluxe",
    price: 130,
    status: "Check Out",
    is_featured: true,
    description:
      "Premium deluxe room with king bed, balcony, and marble bathroom. Includes work desk and high-speed Wi-Fi.",
    img_url: "/images/DeluxeRoom.jpg",
    guest_limit: 2,
  },
  {
    id: 7,
    room_no: "107",
    type: "Twin",
    price: 75,
    status: "Available",
    is_featured: false,
    description:
      "Bright twin room with comfy beds, reading lamps, and en-suite bathroom. Close to elevator and quiet.",
    img_url: "/images/Twin.jpg",
    guest_limit: 2,
  },
  {
    id: 8,
    room_no: "108",
    type: "Single",
    price: 50,
    status: "Booked",
    is_featured: false,
    description:
      "Single room with workspace, private bathroom, and fast Wi-Fi. Perfect for short work trips or digital nomads.",
    img_url: "/images/Single.jpg",
    guest_limit: 1,
  },
  {
    id: 9,
    room_no: "109",
    type: "Family",
    price: 155,
    status: "Check In",
    is_featured: true,
    description:
      "Family room with queen bed, two singles, and kitchenette. Includes dining area and entertainment for kids.",
    img_url: "/images/Family.jpg",
    guest_limit: 5,
  },
  {
    id: 10,
    room_no: "110",
    type: "Standard",
    price: 65,
    status: "Available",
    is_featured: false,
    description:
      "Affordable room with daily housekeeping, double bed, writing desk, and private bathroom. Clean and peaceful.",
    img_url: "/images/Standard.jpg",
    guest_limit: 2,
  },
  {
    id: 11,
    room_no: "201",
    type: "Single",
    price: 48,
    status: "Check Out",
    is_featured: false,
    description:
      "Minimal single room with ambient lighting, desk, and private bath. Great for quick city stays.",
    img_url: "/images/Single.jpg",
    guest_limit: 1,
  },
  {
    id: 12,
    room_no: "202",
    type: "Twin",
    price: 72,
    status: "Available",
    is_featured: false,
    description:
      "Twin room with plush beds, desk, and Wi-Fi. Ideal for productivity, study, or rest with hotel service.",
    img_url: "/images/Twin.jpg",
    guest_limit: 2,
  },
  {
    id: 13,
    room_no: "203",
    type: "Deluxe",
    price: 125,
    status: "Booked",
    is_featured: true,
    description:
      "Elegant deluxe room with blackout curtains, minibar, and spa-style bathroom. Premium experience for any traveler.",
    img_url: "/images/DeluxeRoom.jpg",
    guest_limit: 2,
  },
  {
    id: 14,
    room_no: "204",
    type: "Family",
    price: 165,
    status: "Maintenance",
    is_featured: true,
    description:
      "Family room under upgrade. Will include kids’ area, tub, game console, and dining space. Stylish and fun.",
    img_url: "/images/Family.jpg",
    guest_limit: 4,
  },
  {
    id: 15,
    room_no: "205",
    type: "Standard",
    price: 62,
    status: "Check In",
    is_featured: false,
    description:
      "Standard room with queen bed, garden view, and desk. Peaceful setting with daily service and essentials.",
    img_url: "/images/Standard.jpg",
    guest_limit: 2,
  },
  {
    id: 16,
    room_no: "206",
    type: "Deluxe",
    price: 128,
    status: "Available",
    is_featured: true,
    description:
      "Modern deluxe room with smart lighting, luxury king bed, and spa-style bath. Includes Netflix and comfy seating.",
    img_url: "/images/DeluxeRoom.jpg",
    guest_limit: 2,
  },
  {
    id: 17,
    room_no: "207",
    type: "Twin",
    price: 74,
    status: "Check Out",
    is_featured: false,
    description:
      "Twin room with nightstands, USB ports, and soft lighting. Clean bathroom with hair dryer. Great for shared stays.",
    img_url: "/images/Twin.jpg",
    guest_limit: 2,
  },
  {
    id: 18,
    room_no: "208",
    type: "Family",
    price: 170,
    status: "Booked",
    is_featured: true,
    description:
      "Family suite with king bed, bunk beds, and Netflix. Kid-safe with play space. Perfect for vacations.",
    img_url: "/images/Family.jpg",
    guest_limit: 5,
  },
  {
    id: 19,
    room_no: "209",
    type: "Single",
    price: 47,
    status: "Available",
    is_featured: false,
    description:
      "Quiet room facing the garden with desk, fridge, and rain shower. Ideal for peaceful rest and reflection.",
    img_url: "/images/Single.jpg",
    guest_limit: 1,
  },
  {
    id: 20,
    room_no: "210",
    type: "Standard",
    price: 64,
    status: "Booked",
    is_featured: false,
    description:
      "Functional room with internet, workstation, and flat-screen TV. Suited for business travelers and city visits.",
    img_url: "/images/Standard.jpg",
    guest_limit: 2,
  },
];

export const roomTypesForFilter = ["All", "Twin", "Single", "Deluxe", "Family"];

export const roomStatusForFilter = [
  "All",
  "Available",
  "Booked",
  "Check In",
  "Check Out",
  "Maintenance",
];

export const guestLimitForFilter = ["All", "1", "2", "3", "4", " 5", "6"];

export const roomTypesToSelect = ["Twin", "Single", "Deluxe", "Family"];

export const roomStatusToSelect = [
  "Available",
  "Booked",
  "Check In",
  "Check Out",
  "Maintenance",
];
export const guestLimitsToSelect = ["1", "2", "3", "4", " 5", "6"];

export const imageUrlsToSelect = [
  "/images/Twin.jpg",
  "/images/Single.jpg",
  "/images/DeluxeRoom.jpg",
  "/images/Family.jpg",
];
