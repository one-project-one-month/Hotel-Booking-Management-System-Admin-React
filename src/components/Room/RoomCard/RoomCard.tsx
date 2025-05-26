/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent } from "@/components/ui/card.tsx";
import type { Room } from "@/utils/types/roomTypes/roomTypes.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { BedDouble, DollarSign, Users } from "lucide-react";
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

  const handleClickEdit = () => {
    navigate(`/rooms/update/${room.id}`);
  };

  const handleClickDelete = () => {
    setOpenConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setRooms(rooms.filter((r) => r.id !== room.id));
  };

  const navigateDetailPage = () => {
    navigate(`/rooms/details/${room.id}`);
  };

  const renderOpenButton = (handleClickOpenButton: () => void) => (
    <Badge
      onClick={handleClickOpenButton}
      className={`absolute top-3 right-3 z-10 cursor-pointer text-xs font-semibold px-3 py-1 rounded-full opacity-75 hover:opacity-100 transition-all duration-200  ${
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
    <Card
      onDoubleClick={navigateDetailPage}
      className=" mb-4 relative cursor-pointer shadow-md  transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl overflow-hidden"
    >
      <ActionDropdown
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
      <CardContent className="  grid grid-cols-[40%_60%] items-center  relative">
        <div className="py-1 flex flex-col justify-between h-full">
          <div>
            <h1 className="font-medium text-lg">Room No.{room.room_no}</h1>
            <h1 className="font-medium">({room.type})</h1>
          </div>
          <div className="flex items-center  text-gray-600">
            <BedDouble className="w-4 h-4 mr-2" /> {room.details.bedSize} bed
          </div>
          <div className="flex items-center  text-gray-600">
            <Users className="w-4 h-4 mr-2" /> {room.guest_limit} guests
          </div>
          <div className="flex items-center ">
            <DollarSign className="w-4 h-4 mr-2" /> {room.price}/night
          </div>
        </div>
        <div className="relative">
          <img
            alt={`${room.id},room-image`}
            src={room.img_url}
            className="rounded-2xl object-cover max-h-[150px] w-full shadow-sm"
          />

          <SelectorDropDown
            renderOpenButton={renderOpenButton}
            selected={currentStatus}
            setSelected={setCurrenStatus as Dispatch<SetStateAction<string>>}
            label={"Room Status"}
            options={roomStatusToSelect}
          />
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
