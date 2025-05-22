export type RoomTypes = "Single" | "Twin" | "Deluxe" | "Family" | "Standard";

export type RoomStatus =
    | "Available"
    | "Booked"
    | "Check In"
    | "Check Out"
    | "Maintenance";

export type GuestLimit = 1 | 2 | 3 | 4 | 5 | 6;
export type GuestLimitStr = "1" | "2" | "3" | "4" | "5" | "6";

export interface RoomDetails {
  bedSize: string;
  title: string;
  description: string;
  amenities: string[];
}

export interface Room {
  id: number;
  room_no: string;
  type: RoomTypes;
  price: number;
  status: RoomStatus;
  is_featured: boolean;
  details: RoomDetails;
  img_url: string;
  guest_limit: GuestLimit;
}
