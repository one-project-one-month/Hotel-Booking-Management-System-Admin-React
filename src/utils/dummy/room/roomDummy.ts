import type { Room, RoomStatus } from "@/utils/types/roomTypes/roomTypes.ts";

export const dummyRooms: Room[] = [
    {
        id: 1,
        room_no: "101",
        type: "Twin",
        price: 45,
        status: "Available",
        is_featured: false,
        img_url: "/images/Twin.jpg",
        guest_limit: 1,
        details: {
            bedSize: "Single",
            title: "Cozy Twin Room for Solo Travelers",
            description:
                "Cozy room for solo travelers with a desk, Wi-Fi, and hotel amenities. Ideal for business trips or short stays.",
            amenities: [
                "Free Wi-Fi",
                "Desk",
                "Hotel amenities",
                "Air conditioning",
                "Private bathroom",
            ],
        },
    },
    {
        id: 2,
        room_no: "102",
        type: "Single",
        price: 70,
        status: "Booked",
        is_featured: false,
        img_url: "/images/Single.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Single",
            title: "Spacious Twin Room with Private Bathroom",
            description:
                "Spacious twin room with two beds, a mini fridge, and private bathroom. Great for friends or colleagues.",
            amenities: [
                "Mini fridge",
                "Two beds",
                "Private bathroom",
                "Free Wi-Fi",
                "Air conditioning",
            ],
        },
    },
    {
        id: 3,
        room_no: "103",
        type: "Deluxe",
        price: 120,
        status: "Available",
        is_featured: true,
        img_url: "/images/DeluxeRoom.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Queen",
            title: "Elegant Deluxe Room with City View",
            description:
                "Deluxe room with queen bed, modern bathroom, minibar, and city view. Designed for comfort and elegance.",
            amenities: [
                "Modern bathroom",
                "Minibar",
                "City view",
                "Queen bed",
                "Free Wi-Fi",
            ],
        },
    },
    {
        id: 4,
        room_no: "104",
        type: "Family",
        price: 160,
        status: "Check In",
        is_featured: true,
        img_url: "/images/Family.jpg",
        guest_limit: 4,
        details: {
            bedSize: "Multiple",
            title: "Spacious Family Suite with Kitchenette",
            description:
                "Family suite with two bedrooms, a living area, kitchenette, and child-friendly features. Spacious and comfortable.",
            amenities: [
                "Two bedrooms",
                "Living area",
                "Kitchenette",
                "Child-friendly features",
                "Wi-Fi",
            ],
        },
    },
    {
        id: 5,
        room_no: "105",
        type: "Standard",
        price: 60,
        status: "Maintenance",
        is_featured: false,
        img_url: "/images/Standard.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Queen",
            title: "Standard Room Under Renovation",
            description:
                "Standard room under renovation. Will include queen bed, bathroom, and simple furnishings for budget travelers.",
            amenities: [
                "Queen bed",
                "Bathroom",
                "Simple furnishings",
                "Budget friendly",
            ],
        },
    },
    {
        id: 6,
        room_no: "106",
        type: "Deluxe",
        price: 130,
        status: "Check Out",
        is_featured: true,
        img_url: "/images/DeluxeRoom.jpg",
        guest_limit: 2,
        details: {
            bedSize: "King",
            title: "Premium Deluxe Room with Balcony",
            description:
                "Premium deluxe room with king bed, balcony, and marble bathroom. Includes work desk and high-speed Wi-Fi.",
            amenities: [
                "King bed",
                "Balcony",
                "Marble bathroom",
                "Work desk",
                "High-speed Wi-Fi",
            ],
        },
    },
    {
        id: 7,
        room_no: "107",
        type: "Twin",
        price: 75,
        status: "Available",
        is_featured: false,
        img_url: "/images/Twin.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Twin",
            title: "Bright Twin Room with En-suite Bathroom",
            description:
                "Bright twin room with comfy beds, reading lamps, and en-suite bathroom. Close to elevator and quiet.",
            amenities: [
                "Comfy beds",
                "Reading lamps",
                "En-suite bathroom",
                "Quiet location",
                "Near elevator",
            ],
        },
    },
    {
        id: 8,
        room_no: "108",
        type: "Single",
        price: 50,
        status: "Booked",
        is_featured: false,
        img_url: "/images/Single.jpg",
        guest_limit: 1,
        details: {
            bedSize: "Single",
            title: "Single Room for Digital Nomads",
            description:
                "Single room with workspace, private bathroom, and fast Wi-Fi. Perfect for short work trips or digital nomads.",
            amenities: [
                "Workspace",
                "Private bathroom",
                "Fast Wi-Fi",
                "Air conditioning",
            ],
        },
    },
    {
        id: 9,
        room_no: "109",
        type: "Family",
        price: 155,
        status: "Check In",
        is_featured: true,
        img_url: "/images/Family.jpg",
        guest_limit: 5,
        details: {
            bedSize: "Multiple",
            title: "Family Room with Kitchenette & Dining",
            description:
                "Family room with queen bed, two singles, and kitchenette. Includes dining area and entertainment for kids.",
            amenities: [
                "Queen bed",
                "Two single beds",
                "Kitchenette",
                "Dining area",
                "Kids entertainment",
            ],
        },
    },
    {
        id: 10,
        room_no: "110",
        type: "Standard",
        price: 65,
        status: "Available",
        is_featured: false,
        img_url: "/images/Standard.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Double",
            title: "Affordable Standard Room",
            description:
                "Affordable room with daily housekeeping, double bed, writing desk, and private bathroom. Clean and peaceful.",
            amenities: [
                "Daily housekeeping",
                "Double bed",
                "Writing desk",
                "Private bathroom",
            ],
        },
    },
    {
        id: 11,
        room_no: "201",
        type: "Single",
        price: 48,
        status: "Check Out",
        is_featured: false,
        img_url: "/images/Single.jpg",
        guest_limit: 1,
        details: {
            bedSize: "Single",
            title: "Minimalist Single Room",
            description:
                "Minimal single room with ambient lighting, desk, and private bath. Great for quick city stays.",
            amenities: [
                "Ambient lighting",
                "Desk",
                "Private bath",
                "Wi-Fi",
                "Air conditioning",
            ],
        },
    },
    {
        id: 12,
        room_no: "202",
        type: "Twin",
        price: 72,
        status: "Available",
        is_featured: false,
        img_url: "/images/Twin.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Twin",
            title: "Twin Room for Work or Rest",
            description:
                "Twin room with plush beds, desk, and Wi-Fi. Ideal for productivity, study, or rest with hotel service.",
            amenities: ["Plush beds", "Desk", "Wi-Fi", "Hotel service"],
        },
    },
    {
        id: 13,
        room_no: "203",
        type: "Deluxe",
        price: 125,
        status: "Booked",
        is_featured: true,
        img_url: "/images/DeluxeRoom.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Queen",
            title: "Elegant Deluxe Room with Spa Bath",
            description:
                "Elegant deluxe room with blackout curtains, minibar, and spa-style bathroom. Premium experience for any traveler.",
            amenities: [
                "Blackout curtains",
                "Minibar",
                "Spa-style bathroom",
                "Queen bed",
            ],
        },
    },
    {
        id: 14,
        room_no: "204",
        type: "Family",
        price: 165,
        status: "Maintenance",
        is_featured: true,
        img_url: "/images/Family.jpg",
        guest_limit: 4,
        details: {
            bedSize: "Multiple",
            title: "Upgraded Family Room (Coming Soon)",
            description:
                "Family room under upgrade. Will include kids’ area, tub, game console, and dining space. Stylish and fun.",
            amenities: [
                "Kids’ area",
                "Tub",
                "Game console",
                "Dining space",
                "Spacious design",
            ],
        },
    },
    {
        id: 15,
        room_no: "205",
        type: "Standard",
        price: 62,
        status: "Check In",
        is_featured: false,
        img_url: "/images/Standard.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Queen",
            title: "Peaceful Standard Room with Garden View",
            description:
                "Standard room with queen bed, garden view, and desk. Peaceful setting with daily service and essentials.",
            amenities: ["Queen bed", "Garden view", "Desk", "Daily service"],
        },
    },
    {
        id: 16,
        room_no: "206",
        type: "Deluxe",
        price: 128,
        status: "Available",
        is_featured: true,
        img_url: "/images/DeluxeRoom.jpg",
        guest_limit: 2,
        details: {
            bedSize: "King",
            title: "Modern Deluxe Room with Smart Features",
            description:
                "Modern deluxe room with smart lighting, luxury king bed, and spa-style bath. Includes Netflix and comfy seating.",
            amenities: [
                "Smart lighting",
                "Luxury king bed",
                "Spa-style bath",
                "Netflix",
                "Comfy seating",
            ],
        },
    },
    {
        id: 17,
        room_no: "207",
        type: "Twin",
        price: 74,
        status: "Check Out",
        is_featured: false,
        img_url: "/images/Twin.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Twin",
            title: "Clean Twin Room with USB Ports",
            description:
                "Twin room with nightstands, USB ports, and soft lighting. Clean bathroom with hair dryer. Great for shared stays.",
            amenities: [
                "Nightstands",
                "USB ports",
                "Soft lighting",
                "Hair dryer",
                "Clean bathroom",
            ],
        },
    },
    {
        id: 18,
        room_no: "208",
        type: "Family",
        price: 170,
        status: "Booked",
        is_featured: true,
        img_url: "/images/Family.jpg",
        guest_limit: 5,
        details: {
            bedSize: "King & Bunk Beds",
            title: "Family Suite with Kid-friendly Features",
            description:
                "Family suite with king bed, bunk beds, and Netflix. Kid-safe with play space. Perfect for vacations.",
            amenities: [
                "King bed",
                "Bunk beds",
                "Netflix",
                "Play space",
                "Family-friendly",
            ],
        },
    },
    {
        id: 19,
        room_no: "209",
        type: "Single",
        price: 47,
        status: "Available",
        is_featured: false,
        img_url: "/images/Single.jpg",
        guest_limit: 1,
        details: {
            bedSize: "Single",
            title: "Quiet Single Room Facing the Garden",
            description:
                "Quiet room facing the garden with desk, fridge, and rain shower. Ideal for peaceful rest and reflection.",
            amenities: [
                "Desk",
                "Fridge",
                "Rain shower",
                "Garden view",
                "Quiet location",
            ],
        },
    },
    {
        id: 20,
        room_no: "210",
        type: "Standard",
        price: 64,
        status: "Booked",
        is_featured: false,
        img_url: "/images/Standard.jpg",
        guest_limit: 2,
        details: {
            bedSize: "Double",
            title: "Functional Standard Room for Business",
            description:
                "Functional room with internet, workstation, and flat-screen TV. Suited for business travelers and city visits.",
            amenities: [
                "Internet",
                "Workstation",
                "Flat-screen TV",
                "Business-friendly",
            ],
        },
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

export const badgeBgColors: { [key in RoomStatus]: string } = {
    Available: "bg-green-100",
    Booked: "bg-red-100",
    "Check In": "bg-amber-100",
    "Check Out": "bg-blue-100",
    Maintenance: "bg-gray-200",
};

export const badgeTextColors: { [key in RoomStatus]: string } = {
    Available: "text-green-700",
    Booked: "text-red-700",
    "Check In": "text-amber-700",
    "Check Out": "text-blue-700",
    Maintenance: "text-gray-700",
};
