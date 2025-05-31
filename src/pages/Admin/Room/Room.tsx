import RoomFiltersAndCreateNewButton from "@/components/Room/RoomFiltersAndCreateNewButton/RoomFiltersAndCreateNewButton.tsx";
import { RoomCard } from "@/components/Room/RoomCard/RoomCard.tsx";

import type { Room as TypeOfRoom } from "@/utils/types/roomTypes/roomTypes.ts";
import { useEffect, useState } from "react";
import AllOtherRooms from "@/components/Room/AllOtherRooms/AllOtherRooms.tsx";
import FeaturedRooms from "@/components/Room/FeaturedRooms/FeaturedRooms.tsx";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useRoom } from "@/hooks/useRooms";
import { toast } from "sonner";
import CustomLoading from "@/components/shared/Loading/Loading.tsx";

const Room = () => {
  // const [rooms, setRooms] = useState<TypeOfRoom[]>(dummyRooms);

  const { getAllRoomsQuery, patchIsFeaturedMutation } = useRoom();
  const { isLoading, data: rooms } = getAllRoomsQuery;

  const [roomsToBeShown, setRoomsToBeShown] = useState<TypeOfRoom[]>(
    rooms ?? [],
  );
  const [draggingRoom, setDraggingRoom] = useState<TypeOfRoom | null>(null);

  const [featuredRooms, setFeaturedRooms] = useState<TypeOfRoom[]>([]);
  const [allOtherRooms, setAllOtherRooms] = useState<TypeOfRoom[]>([]);

  const handleDragStart = (e: DragStartEvent) => {
    const id = e.active.id;
    const room = rooms?.find((room) => room.id === id);
    if (!room) return;
    setDraggingRoom(room);
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    const roomId = e.active.id;

    console.log("roomId", roomId);
    const draggedRoom = rooms?.find((room) => room.id === roomId);

    if (!draggedRoom || !e.over) return;

    const droppedArea = e.over.id;
    if (droppedArea === "FeaturedRoomsColumn" && !draggedRoom.isFeatured) {
      const newFeaturedRooms = [...featuredRooms, draggedRoom];
      setFeaturedRooms(newFeaturedRooms);

      const newOtherRooms = allOtherRooms.filter(
        (room) => room.id !== draggedRoom.id,
      );
      setAllOtherRooms(newOtherRooms);

      try {
        const res = await patchIsFeaturedMutation.mutateAsync({
          id: roomId as string,
          isFeatured: true,
        });

        if (res) {
          toast(`Room No ${draggingRoom?.roomNo} is moved to  FeaturedRooms`, {
            position: "top-center",
            style: {
              backgroundColor: "#228B22",
              color: "white",
              border: "none",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
            },
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(`${error.response.data.message}`, {
          position: "top-center",
          style: {
            backgroundColor: "red",
            color: "white",
            border: "none",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
          },
        });
      }
    } else if (
      droppedArea === "AllOtherRoomsColumn" &&
      draggedRoom.isFeatured
    ) {
      const newFeaturedRooms = featuredRooms.filter(
        (room) => room.id !== draggedRoom.id,
      );
      setFeaturedRooms(newFeaturedRooms);

      const newAllOtherRooms = [...allOtherRooms, draggedRoom];
      setAllOtherRooms(newAllOtherRooms);

      try {
        const res = await patchIsFeaturedMutation.mutateAsync({
          id: roomId as string,
          isFeatured: false,
        });

        if (res) {
          toast(`Room No ${draggingRoom?.roomNo} is moved to   AllOtherRooms`, {
            position: "top-center",
            style: {
              backgroundColor: "#228B22",
              color: "white",
              border: "none",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
            },
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(`${error.response.data.message}`, {
          position: "top-center",
          style: {
            backgroundColor: "red",
            color: "white",
            border: "none",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
          },
        });
      }
    }
    setDraggingRoom(null);
  };

  useEffect(() => {
    const featuredRooms = roomsToBeShown.filter((room) => room.isFeatured);
    setFeaturedRooms(featuredRooms);

    const allOtherRooms = roomsToBeShown.filter((room) => !room.isFeatured);
    setAllOtherRooms(allOtherRooms);
  }, [roomsToBeShown]);

  if (isLoading) return <CustomLoading />;

  return (
    <div className="h-[calc(100vh-500px)]">
      <div className="rounded-md shadow-lg  p-[1rem] ">
        <div className="flex justify-between  ">
          <h3 className="text-2xl font-semibold">Rooms</h3>
          <RoomFiltersAndCreateNewButton
            rooms={rooms ?? []}
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
          <FeaturedRooms rooms={rooms ?? []} featuredRooms={featuredRooms} />
          <AllOtherRooms rooms={rooms ?? []} allOtherRooms={allOtherRooms} />

          <DragOverlay>
            {draggingRoom && (
              <RoomCard room={draggingRoom as TypeOfRoom} rooms={[]} />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Room;
