import RoomFiltersAndCreateNewButton from "@/components/Room/RoomFiltersAndCreateNewButton/RoomFiltersAndCreateNewButton.tsx";
import { RoomCard } from "@/components/Room/RoomCard/RoomCard.tsx";

import type { Room as TypeOfRoom } from "@/utils/types/roomTypes/roomTypes.ts";
import { useState } from "react";

import { dummyRooms } from "@/utils/dummy/room/roomDummy.ts";
import { BedDouble, Star } from "lucide-react";

const Room = () => {
  const [rooms, setRooms] = useState<TypeOfRoom[]>(dummyRooms);
  const [roomsToBeShown, setRoomsToBeShown] = useState<TypeOfRoom[]>(rooms);

  return (
    <div>
      <div className="rounded-md shadow-lg  p-[1rem] ">
        <div className="flex justify-between  ">
          <h3 className="text-2xl font-semibold">Rooms</h3>
          <RoomFiltersAndCreateNewButton
            rooms={rooms}
            setRoomsToBeShown={setRoomsToBeShown}
          />
        </div>
      </div>

      <div className=" grid grid-cols-2 gap-5  rounded-md  mt-2 ">
        <div className="border-r p-4 overflow-auto">
          <div className="flex items-center gap-3 mb-5 shadow-lg px-[1rem] pb-[1rem] rounded-md ">
            <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-100">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
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
          <div className="h-[70vh] overflow-auto overflow-x-hidden px-1">
            {roomsToBeShown.length ? (
              roomsToBeShown.map((room) => (
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
        <div className="p-4 overflow-auto">
          <div className="flex items-center gap-3 mb-5 shadow-lg px-[1rem] pb-[1rem] rounded-md ">
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
              <BedDouble className="w-5 h-5 text-blue-500" />
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

          <div className="h-[70vh] overflow-auto overflow-x-hidden px-1">
            {roomsToBeShown.length ? (
              roomsToBeShown.map((room) => (
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
      </div>
    </div>
  );
};

export default Room;
