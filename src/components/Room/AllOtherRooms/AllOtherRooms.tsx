import { House } from "lucide-react";
import { RoomCard } from "@/components/Room/RoomCard/RoomCard.tsx";
import type { Room } from "@/utils/types/roomTypes/roomTypes.ts";
import type { Dispatch, SetStateAction } from "react";
import { useDroppable } from "@dnd-kit/core";
import { clsx } from "clsx";

interface Props {
  rooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
  allOtherRooms: Room[];
}

export default function AllOtherRooms({
  rooms,
  setRooms,
  allOtherRooms,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: "AllOtherRoomsColumn" });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "p-4 transition-all rounded-md",
        isOver ? "bg-blue-50 ring-2 ring-blue-300" : "bg-white",
      )}
    >
      <div className="flex items-center gap-3 mb-5 shadow-lg px-[1rem] pb-[1rem] rounded-md ">
        <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 relative">
          <House className="w-5 h-5 text-blue-500" />
          <span className="absolute -top-1 -right-1 bg-blue-400 text-white text-xs px-1 rounded-full">
            {allOtherRooms.length}
          </span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Standard Rooms
          </h1>
          <p className="text-sm text-gray-500">
            Comfortable accommodations for every need
          </p>
        </div>
      </div>

      <div className="h-[calc(100vh-270px)] overflow-auto overflow-x-hidden px-1">
        {allOtherRooms.length ? (
          allOtherRooms.map((room) => (
            <RoomCard
              room={room}
              key={room.id}
              rooms={rooms}
              setRooms={setRooms}
            />
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
