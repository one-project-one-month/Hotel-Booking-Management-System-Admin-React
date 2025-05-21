/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent } from "@/components/ui/card.tsx";
import type { Room } from "@/utils/types/roomTypes/roomTypes.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { Heart, Users } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { ActionDropdown } from "@/components/shared/ActionDropdown/ActionDropdown .tsx";
import { useNavigate } from "react-router-dom";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog/ConfirmDeleteDialog.tsx";
import { SelectorDropDown } from "@/components/shared/SelectorDropDown/SelectorDropDown.tsx";
import {
  badgeBgColors,
  badgeTextColors,
  roomStatusToSelect,
} from "@/utils/dummy/room/roomDummy.ts";

interface Props {
  room: Room;
  rooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
}
export function RoomCard({ room, rooms, setRooms }: Props) {
  const navigate = useNavigate();
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [currentStatus, setCurrenStatus] = useState(room.status);

  const toogleIsFeatured = () => {
    const newRoom = rooms.find((r) => r.id === room.id);
    if (newRoom) {
      newRoom.is_featured = !newRoom.is_featured;

      const newRooms = rooms.map((r) => (r.id === newRoom.id ? newRoom : r));
      setRooms(newRooms);
    }
  };

  const handleClickEdit = () => {
    navigate(`/rooms/update/${room.id}`);
  };

  const handleClickDelete = () => {
    setOpenConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setRooms(rooms.filter((r) => r.id !== room.id));
  };

  const renderOpenButton = (handleClickOpenButton: () => void) => (
    <Badge
      onClick={handleClickOpenButton}
      className={`h-[80%]  px-4 py-1 text-sm cursor-pointer ${
        badgeBgColors[room.status]
      } ${badgeTextColors[room.status]}`}
    >
      {room.status}
    </Badge>
  );

  useEffect(() => {
    if (currentStatus !== room.status) {
      const newRooms = rooms.map((r) =>
        r.id === room.id ? { ...r, status: currentStatus } : r,
      );
      setRooms(newRooms);
    }
  }, [currentStatus]);

  return (
    <Card className="w-full grid grid-cols-[30%_70%] gap-4 mb-3 relative ">
      <ActionDropdown
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
      <CardContent className="relative h-[100%] ">
        <img
          alt={`${room.id},room-image`}
          src={room.img_url}
          className="rounded-2xl object-cover h-[200px] w-full"
        />
        <Heart
          className={`absolute top-2 right-8 cursor-pointer  ${
            room.is_featured ? "text-red-500 " : "text-gray-400 opacity-50"
          }`}
          fill={room.is_featured ? "red" : ""}
          onClick={toogleIsFeatured}
        />
      </CardContent>
      <CardContent className="  grid grid-rows-[30%_40%_30%] h-[100%] pr-10 ">
        <div className="flex justify-between items-center py-2">
          <h1 className="font-medium">
            Room No.{room.room_no} ({room.type})
          </h1>

          <SelectorDropDown
            renderOpenButton={renderOpenButton}
            selected={currentStatus}
            setSelected={setCurrenStatus as Dispatch<SetStateAction<string>>}
            label={"Room Status"}
            options={roomStatusToSelect}
          />
        </div>

        <div>{room.description}</div>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" /> {room.guest_limit} guests{" "}
          </div>
          <span> ${room.price}/night</span>
        </div>
      </CardContent>
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        setOpen={setOpenConfirmDeleteDialog}
        itemName={"room"}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Card>
  );
}
