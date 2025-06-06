/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent } from "@/components/ui/card.tsx";
import type { Room } from "@/utils/types/roomTypes/roomTypes.ts";
import { Badge } from "@/components/ui/badge.tsx";
import {BedDouble, DollarSign, Loader2, Users} from "lucide-react";
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
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils.ts";
import { useRoomById } from "@/hooks/useRooms.ts";
import { toast } from "sonner";
import {errorToastStyle, successToastStyle} from "@/utils/dummy/Toast/toast.ts";

interface Props {
  room: Room;
  rooms: Room[];
}
export function RoomCard({ room }: Props) {
  const navigate = useNavigate();
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [currentStatus, setCurrenStatus] = useState(room.status);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: room.id,
  });

  const { deleteRoomMutation, patchRoomStatusMutation } = useRoomById({
    id: room.id,
  });

  const roomImageUrl = room.imgUrl
    ? JSON.parse(room.imgUrl as unknown as string)[0]
    : "/DeluxeRoom.jpg";

  const parsedDetails = room.details
    ? JSON.parse(room.details as unknown as string)
    : "";
  const handleClickEdit = () => {
    navigate(`/rooms/update/${room.id}`);
  };

  const handleClickDelete = () => {
    setOpenConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    // setRooms(rooms.filter((r) => r.id !== room.id));

    try {
      const res = await deleteRoomMutation.mutateAsync();

      if (res) {
        setOpenConfirmDeleteDialog(false);
        toast(`Room No ${room.roomNo} is deleted successfully`, successToastStyle);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error.response.data.message}`, errorToastStyle);
    }
  };

  const navigateDetailPage = () => {
    navigate(`/rooms/details/${room.id}`);
  };

  const renderOpenButton = (handleClickOpenButton: () => void) => (
    <Badge
      onClick={handleClickOpenButton}
      className={`absolute top-9 right-9 z-10 cursor-pointer text-xs font-semibold px-3 py-1 rounded-full opacity-75 hover:opacity-100 transition-all duration-100  ${
        badgeBgColors[room.status]
      } ${badgeTextColors[room.status]}`}
    >
      {patchRoomStatusMutation.isPending? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> updating...</>:room.status}
    </Badge>
  );

  useEffect(() => {
    const updateStatus = async () => {
      if (currentStatus !== room.status) {
        try {
          const res = await patchRoomStatusMutation.mutateAsync(currentStatus);

          if (res) {
            toast("Room status is updated successfully", successToastStyle);
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast(`${error.response.data.message}`, errorToastStyle);
        }

        // const newRooms = rooms.map((r) =>
        //   r.id === room.id ? { ...r, status: currentStatus } : r,
        // );
        // setRooms(newRooms);
      }
    };

    updateStatus();
  }, [currentStatus]);

  if (!room) return null;
  return (
    <Card
      onDoubleClick={navigateDetailPage}
      className={cn(
        " mb-4 relative  shadow-md cursor-pointer  transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl overflow-hidden",
        isDragging ? "opacity-30 scale-95" : "opacity-100",
      )}
    >
      <ActionDropdown
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
        handleClickDetails={navigateDetailPage}
      />
      <CardContent
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing grid grid-cols-[40%_60%] items-center  relative"
      >
        <div className="py-1  flex flex-col justify-between h-full">
          <div>
            <h1 className="font-medium text-lg">Room No.{room.roomNo}</h1>
            <h1 className="font-medium -mt-2">({room.type})</h1>
          </div>
          <div className="flex items-center  text-gray-600">
            <BedDouble className="w-4 h-4 mr-2" /> {parsedDetails.bedSize} bed
          </div>
          <div className="flex items-center  text-gray-600">
            <Users className="w-4 h-4 mr-2" /> {room.guestLimit} guests
          </div>
          <div className="flex items-center ">
            <DollarSign className="w-4 h-4 mr-2" /> {room.price}/night
          </div>
        </div>
        <div className="relative">
          <img
            alt={`${room.id},room-image`}
            src={roomImageUrl}
            className="rounded-2xl object-cover h-[150px] w-full shadow-sm"
          />
        </div>
      </CardContent>

      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        setOpen={setOpenConfirmDeleteDialog}
        itemName={"room"}
        handleConfirmDelete={handleConfirmDelete}
        isPending={deleteRoomMutation.isPending}
      />

      <SelectorDropDown
        renderOpenButton={renderOpenButton}
        selected={currentStatus}
        setSelected={setCurrenStatus as Dispatch<SetStateAction<string>>}
        label={"Room Status"}
        options={roomStatusToSelect}
      />
    </Card>
  );
}
