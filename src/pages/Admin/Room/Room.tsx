import RoomFiltersAndAddRoomButton from "@/pages/Admin/Room/components/RoomFiltersAndAddRoomButton/RoomFiltersAndAddRoomButton.tsx";
import { RoomCard } from "@/pages/Admin/Room/components/RoomCard/RoomCard.tsx";

import type { Room as TypeOfRoom } from "@/utils/types/roomTypes/roomTypes.ts";
import { dummyRooms } from "@/utils/dummy.ts";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { LabelOld } from "@/components/ui/label-old.tsx";

const Room = () => {
  const [rooms, setRooms] = useState<TypeOfRoom[]>(dummyRooms);
  const [roomsToBeShown, setRoomsToBeShown] = useState<TypeOfRoom[]>(rooms);

  const handleToggleShowOnlyFeatured = (checked: boolean) => {
    if (checked) {
      const filteredRooms = rooms.filter((room) => room.is_featured);
      setRooms(filteredRooms);
    } else if (!checked) {
      setRooms(dummyRooms);
    }
  };
  return (
    <div className="bg-[#eeedf6] min-h-[100vh]">
      <div className="flex justify-between p-4">
        <span> Room</span>
        <RoomFiltersAndAddRoomButton
          rooms={rooms}
          setRoomsToBeShown={setRoomsToBeShown}
        />
      </div>
      <div className="flex justify-between px-8 pt-4 ">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            className="cursor-pointer"
            onCheckedChange={handleToggleShowOnlyFeatured}
          />
          <LabelOld htmlFor="airplane-mode">Show only featured rooms</LabelOld>
        </div>
        <div>Room count:{roomsToBeShown.length}</div>
      </div>
      <div className="p-4">
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
  );
};

export default Room;
