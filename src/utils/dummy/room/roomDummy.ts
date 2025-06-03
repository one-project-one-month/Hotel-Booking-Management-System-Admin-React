import { z } from "zod";
import type {
  Room,
  RoomDetails,
  RoomTypes,
} from "@/utils/types/roomTypes/roomTypes.ts";
import type { ChangeEvent } from "react";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/dummy/Toast/toast.ts";

export const roomTypesForFilter = ["All", "Standard", "Deluxe"];
export const roomStatusForFilter = [
  "All",
  "Available",
  "Booked",
  "CheckedIn",
  "CheckOut",
  "Maintenance",
];
export const guestLimitForFilter = ["All", "1", "2", "3", "4", " 5", "6"];

export const roomTypesToSelect = ["Standard", "Deluxe"];
export const roomStatusToSelect = [
  "Available",
  "Booked",
  "CheckedIn",
  "CheckOut",
  "Maintenance",
];

export const badgeBgColors = {
  Available: "bg-green-100",
  Booked: "bg-red-100",
  CheckedIn: "bg-amber-100",
  CheckOut: "bg-blue-100",
  Maintenance: "bg-gray-200",
};
export const badgeTextColors = {
  Available: "text-green-700",
  Booked: "text-red-700",
  CheckedIn: "text-amber-700",
  CheckOut: "text-blue-700",
  Maintenance: "text-gray-700",
};

export const createRoomFormSchema = z.object({
  roomNo: z.string().min(1, { message: "Room No. is required" }),
  roomType: z.string().min(1, { message: "Room Type is required" }),
  guestLimit: z.string().min(1, { message: "Guest Limit is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  images: z
    .array(z.string().min(1))
    .min(1, { message: "At least one image is required" }),
});

export const updateRoomFormSchema = createRoomFormSchema.extend({
  id: z.string().min(1, { message: "Room Id is missing" }),
  roomStatus: z.string().min(1, { message: "Room Status is required" }),
});

export const createRoomFromFormData = (
  formData: z.infer<typeof createRoomFormSchema>,
): Partial<Room> => {
  return {
    roomNo: Number(formData.roomNo),
    type: formData.roomType as RoomTypes,
    price: Number(formData.price),
    status: "Available",
    isFeatured: false,
    details: {
      bedSize: "King",
      title: "Deluxe King Room with Scenic Farm Views",
      description: formData.description,
      amenities: [
        "King-sized bed",
        "2-layer windproof curtains",
        "Overlooking rice fields and farm plots",
        "Private outdoor dining table",
        "Shared bathroom and shower",
        "Towels and toiletries provided",
        "Access to swings and hiking trail",
        "Cook your own veggies with provided tools",
        "Optional home-cooked meals",
      ],
    },
    imgUrl: formData.images,
    guestLimit: Number(formData.guestLimit),
  };
};

export const createRoomToUpdateFromFormData = (
  formData: z.infer<typeof updateRoomFormSchema>,
  roomToBeUpdated: Room,
): Partial<Room> => {
  return {
    id: roomToBeUpdated?.id,
    roomNo: Number(formData.roomNo),
    type: formData.roomType as RoomTypes,
    price: Number(formData.price),
    status: roomToBeUpdated?.status,
    isFeatured: roomToBeUpdated?.isFeatured,
    details: {
      ...(roomToBeUpdated?.details as RoomDetails),
      description: formData.description,
    },
    imgUrl: formData.images,
    guestLimit: Number(formData.guestLimit),
  };
};

interface ImageUploadProps {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setUploadingImg: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleImageUploadForRoom = ({
  imageUrls,
  setImageUrls,
  setUploadingImg,
}: ImageUploadProps) => {
  return async (e: ChangeEvent<HTMLInputElement>) => {
    if (imageUrls.length >= 4) {
      return toast.error(
        "You can only upload 4 images for a room",
        errorToastStyle,
      );
    }

    const file = e.target.files && e.target.files[0];
    if (file) {
      setUploadingImg(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "hotel-image");
      data.append("cloud_name", "dwcdqx2tm");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwcdqx2tm/image/upload",
        {
          method: "POST",
          body: data,
        },
      );
      setUploadingImg(false);
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      const uploadImageUrl = await res.json();
      setImageUrls((prev) => [...prev, uploadImageUrl.url]);
    }
  };
};

interface RemoveImageProps {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}
export const handleRemoveImageForRoom = ({
  imageUrls,
  setImageUrls,
}: RemoveImageProps) => {
  return (url: string) => {
    const newImageUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(newImageUrls);
  };
};
