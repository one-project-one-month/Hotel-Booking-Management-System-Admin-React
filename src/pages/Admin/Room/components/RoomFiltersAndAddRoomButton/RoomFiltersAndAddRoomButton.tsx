import FilterDropdown from "@/components/shared/FilterDropdown/FilterDropdown.tsx";

import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input.tsx";

import type {
  GuestLimitStr,
  Room,
  RoomStatus,
  RoomTypes,
} from "@/utils/types/roomTypes/roomTypes.ts";
import {
  guestLimitForFilter,
  roomStatusForFilter,
  roomTypesForFilter,
} from "@/utils/dummy.ts";

import { useNavigate } from "react-router-dom";
import AddNewButton from "@/components/shared/CustomButtons/AddNewButton/AddNewButton.tsx";

interface Props {
  rooms: Room[];
  setRoomsToBeShown: Dispatch<SetStateAction<Room[]>>;
}

export default function RoomFiltersAndAddRoomButton({
  rooms,
  setRoomsToBeShown,
}: Props) {
  const navigate = useNavigate();

  const [selectedRoomType, setSelectedRoomType] = useState<"All" | RoomTypes>(
    "All",
  );
  const [selectedStatus, setSelectedStatus] = useState<"All" | RoomStatus>(
    "All",
  );
  const [selectedLimit, setSelectedLimit] = useState<"All" | GuestLimitStr>(
    "All",
  );

  const [searchedRooms, setSearchRooms] = useState(rooms);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredRooms =
      searchValue.length > 0
        ? rooms.filter((room) => {
            return (
              room.room_no.toLowerCase().includes(searchValue.toLowerCase()) ||
              room.description.toLowerCase().includes(searchValue.toLowerCase())
            );
          })
        : rooms;
    setSearchRooms(filteredRooms);
    setRoomsToBeShown(filteredRooms);
  };

  useEffect(() => {
    setSearchRooms(rooms);
  }, [rooms]);

  useEffect(() => {
    const roomsByRoomType =
      selectedRoomType === "All"
        ? searchedRooms
        : searchedRooms.filter((room) => room.type === selectedRoomType);
    const roomsByStatus =
      selectedStatus === "All"
        ? roomsByRoomType
        : roomsByRoomType.filter((room) => room.status === selectedStatus);
    const roomsByGuestLimit =
      selectedLimit === "All"
        ? roomsByStatus
        : roomsByStatus.filter(
            (room) => room.guest_limit === Number(selectedLimit),
          );
    setRoomsToBeShown(roomsByGuestLimit);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomType, selectedStatus, selectedLimit, searchedRooms]);

  return (
    <div className="flex gap-4 items-start ">
      <div className="relative w-full max-w-md flex items-center ">
        <Search className="absolute left-3  text-muted-foreground w-4 h-4" />
        <Input
          type="search"
          placeholder="Search by Room No or description "
          className="pl-10 rounded-full border-[#d4d2e2] min-w-[300px]"
          onChange={handleSearch}
        />
      </div>
      <FilterDropdown
        label="RoomType"
        selected={selectedRoomType}
        setSelected={setSelectedRoomType as Dispatch<SetStateAction<string>>}
        options={roomTypesForFilter}
      />
      <FilterDropdown
        label="Status"
        selected={selectedStatus}
        setSelected={setSelectedStatus as Dispatch<SetStateAction<string>>}
        options={roomStatusForFilter}
      />
      <FilterDropdown
        label="GuestLimit"
        selected={selectedLimit}
        setSelected={setSelectedLimit as Dispatch<SetStateAction<string>>}
        options={guestLimitForFilter}
      />
      <AddNewButton
        onClick={() => {
          navigate("/rooms/create");
        }}
        text={"Add Room"}
      />
    </div>
  );
}
