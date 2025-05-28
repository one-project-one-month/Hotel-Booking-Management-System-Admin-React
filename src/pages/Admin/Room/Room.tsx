import RoomFiltersAndCreateNewButton from "@/components/Room/RoomFiltersAndCreateNewButton/RoomFiltersAndCreateNewButton.tsx";
import { RoomCard } from "@/components/Room/RoomCard/RoomCard.tsx";

import type { Room as TypeOfRoom } from "@/utils/types/roomTypes/roomTypes.ts";
import { useEffect, useState } from "react";

import { dummyRooms } from "@/utils/dummy/room/roomDummy.ts";
import AllOtherRooms from "@/components/Room/AllOtherRooms/AllOtherRooms.tsx";
import FeaturedRooms from "@/components/Room/FeaturedRooms/FeaturedRooms.tsx";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";

const Room = () => {
  const [rooms, setRooms] = useState<TypeOfRoom[]>(dummyRooms);
  const [roomsToBeShown, setRoomsToBeShown] = useState<TypeOfRoom[]>(rooms);
  const [draggingRoom, setDraggingRoom] = useState<TypeOfRoom | null>(null);

  const [featuredRooms, setFeaturedRooms] = useState<TypeOfRoom[]>([]);
  const [allOtherRooms, setAllOtherRooms] = useState<TypeOfRoom[]>([]);

  const handleDragStart = (e: DragStartEvent) => {
    const id = e.active.id;
    const room = rooms.find((room) => room.id === Number(id));
    if (!room) return;
    setDraggingRoom(room);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const roomId = e.active.id;
    const draggedRoom = rooms.find((room) => room.id === Number(roomId));

    if (!draggedRoom || !e.over) return;

    const droppedArea = e.over.id;
    if (droppedArea === "FeaturedRoomsColumn" && !draggedRoom.is_featured) {
      const newRooms = rooms.map((room) =>
        room.id === draggedRoom.id ? { ...room, is_featured: true } : room,
      );
      setRooms(newRooms);

      const newFeaturedRooms = [...featuredRooms, draggedRoom];
      setFeaturedRooms(newFeaturedRooms);

      const newOtherRooms = allOtherRooms.filter(
        (room) => room.id !== draggedRoom.id,
      );
      setAllOtherRooms(newOtherRooms);
    } else if (
      droppedArea === "AllOtherRoomsColumn" &&
      draggedRoom.is_featured
    ) {
      const newRooms = rooms.map((room) =>
        room.id === draggedRoom.id ? { ...room, is_featured: false } : room,
      );
      setRooms(newRooms);

      const newFeaturedRooms = featuredRooms.filter(
        (room) => room.id !== draggedRoom.id,
      );
      setFeaturedRooms(newFeaturedRooms);

      const newAllOtherRooms = [...allOtherRooms, draggedRoom];
      setAllOtherRooms(newAllOtherRooms);
    }
    setDraggingRoom(null);
  };

  useEffect(() => {
    const featuredRooms = roomsToBeShown.filter((room) => room.is_featured);
    setFeaturedRooms(featuredRooms);

    const allOtherRooms = roomsToBeShown.filter((room) => !room.is_featured);
    setAllOtherRooms(allOtherRooms);
  }, [roomsToBeShown]);
  return (
    <div className="h-[calc(100vh-500px)]">
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
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <FeaturedRooms
            rooms={rooms}
            setRooms={setRooms}
            featuredRooms={featuredRooms}
          />
          <AllOtherRooms
            rooms={rooms}
            setRooms={setRooms}
            allOtherRooms={allOtherRooms}
          />

          <DragOverlay>
            {draggingRoom && (
              <RoomCard room={draggingRoom} rooms={[]} setRooms={() => {}} />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Room;
