export type RoomTypes = "Deluxe" | "Standard";

export type RoomStatus =
  | "Available"
  | "Booked"
  | "CheckedIn"
  | "CheckOut"
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
  id: string;
  roomNo: number;
  type: RoomTypes;
  price: number;
  status: RoomStatus;
  isFeatured?: boolean;
  details?: RoomDetails;
  imgUrl?: string[];
  guestLimit: number;
}
