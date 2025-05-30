import { useNavigate, useParams } from "react-router-dom";
import {
  badgeBgColors,
  badgeTextColors,
} from "@/utils/dummy/room/roomDummy.ts";

import {
  ArrowBigLeft,
  BedDouble,
  DollarSign,
  House,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useRoom } from "@/hooks/useRooms.ts";
import type { RoomDetails as TypeOfRoomDetails } from "@/utils/types/roomTypes/roomTypes.ts";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getAllRoomsQuery } = useRoom();
  const { data: rooms } = getAllRoomsQuery;

  const room = rooms?.find((room) => room.id === id);

  const navigateToRooms = () => {
    navigate("/rooms");
  };

  if (!room) return null;

  const images: string[] = room.imgUrl
    ? JSON.parse(room.imgUrl as unknown as string)
    : [];
  const parsedDetails: TypeOfRoomDetails = JSON.parse(
    room.details as unknown as string,
  );
  console.log("parse details", parsedDetails);
  console.log("parse details", parsedDetails.description);
  console.log("parse details", parsedDetails.amenities);

  console.log("typeof parsedDetails", typeof parsedDetails);
  console.log("parsedDetails keys", Object.keys(parsedDetails));
  console.log("parsedDetails.description", parsedDetails["description"]);
  console.log("parsedDetails.amenities", parsedDetails["amenities"]);

  return (
    <div className="h-[calc(100vh-80px)]   max-w-6xl mx-auto p-6 relative">
      <div className="flex justify-between items-center mb-4 mt-5">
        <div className=" flex items-center gap-3   px-[1rem] pb-[1rem] rounded-md ">
          {room?.isFeatured ? (
            <div className="p-2  rounded-lg bg-yellow-50 border border-yellow-100">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />{" "}
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
              <House className="w-5 h-5 text-blue-500" />
            </div>
          )}

          <div>
            <h1 className="text-2xl font-semibold text-gray-800 ">
              Room No.{room?.roomNo}{" "}
              <span className="text-gray-600">({room?.type} Room)</span>
            </h1>
            <p className="text-sm text-gray-500">{room?.details?.title}</p>
          </div>
        </div>

        <div>
          <Badge
            className={` text-lg font-semibold px-3 py-1 rounded-full  ${
              badgeBgColors[room.status]
            } ${badgeTextColors[room.status]}`}
          >
            {room.status}
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {images.length &&
          images.map((img, index) => (
            <div
              key={index}
              className="relative aspect-video overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={img}
                alt={`roomImage-${index}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />

              {index == 0 && (
                <Badge className="absolute bottom-1 left-1 bg-black/60 text-white text-xs  rounded-xl">
                  Featured Image
                </Badge>
              )}
            </div>
          ))}
      </div>

      <div className="h-[47vh] overflow-y-scroll bg-gray-50 rounded-xl p-6 mb-8 shadow-sm ">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <BedDouble className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Bed Size</p>
              <p className="font-medium">{parsedDetails.bedSize}</p>
            </div>
          </div>

          <div className="flex  items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Guest Limit</p>
              <p className="font-medium">{room.guestLimit} guests</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">${room.price}/night</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {parsedDetails?.description}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
            {parsedDetails.amenities?.map((amenity, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1 rounded-lg"
              >
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        className="cursor-pointer absolute top-0 left-0 transform -translate-x-4 -translate-y-1"
        onClick={navigateToRooms}
      >
        <ArrowBigLeft />
        Back
      </Button>
    </div>
  );
}
