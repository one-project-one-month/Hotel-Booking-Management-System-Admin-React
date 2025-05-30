import { Star } from "lucide-react";
import { RoomCard } from "@/components/Room/RoomCard/RoomCard.tsx";
import type { Room } from "@/utils/types/roomTypes/roomTypes.ts";
import { useDroppable } from "@dnd-kit/core";

import { clsx } from "clsx";

interface Props {
  rooms: Room[];
  featuredRooms: Room[];
}

export default function FeaturedRooms({ rooms, featuredRooms }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: "FeaturedRoomsColumn" });

  console.log("is over is", isOver);
  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "p-4 border-r transition-all rounded-md",
        isOver ? "bg-yellow-50 ring-2 ring-yellow-300" : "bg-white",
      )}
    >
      <div className="flex items-center gap-3 mb-5 shadow-lg px-[1rem] pb-[1rem] rounded-md ">
        <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-100 relative">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs px-1.5 rounded-full">
            {featuredRooms.length}
          </span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Featured Rooms
          </h1>
          <p className="text-sm text-gray-500">
            Premium selections with special amenities
          </p>
        </div>
      </div>
      <div className="h-[calc(100vh-270px)] overflow-auto overflow-x-hidden px-1">
        {featuredRooms.length ? (
          featuredRooms.map((room) => (
            <RoomCard room={room} key={room.id} rooms={rooms} />
          ))
        ) : (
          <div className="flex w-full h-[250px] justify-center items-center ">
            <h1 className="font-bold">No rooms found</h1>
          </div>
        )}
      </div>
    </div>
  );
}
