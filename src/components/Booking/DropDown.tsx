import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropDownProps } from "@/utils/types/BookingTypes/bookingTypes";

const DropDown = ({
  CheckIn,
  status,
  viewBooking,
  CheckOutClick,
  updateBooking,
  viewHistory,
}: DropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical size={24} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {status === "pending" && (
            <>
              <DropdownMenuItem
                className="cursor-pointer text-green-600 hover:text-green-700 bg-transparent hover:bg-green-100 focus:bg-green-100 focus:text-green-700"
                onClick={CheckIn}
              >
                CheckIn
              </DropdownMenuItem>
            </>
          )}
          {status === "Check-In" && (
            <DropdownMenuItem
              className="cursor-pointer text-orange-600 hover:text-orange-700 bg-transparent hover:bg-orange-100 focus:bg-orange-100 focus:text-orange-700"
              onClick={CheckOutClick}
            >
              CheckOut
            </DropdownMenuItem>
          )}

          {status === "Check-In" && (
            <DropdownMenuItem
              className="cursor-pointer text-purple-600 hover:text-purple-700 bg-transparent hover:bg-purple-100 focus:bg-purple-100 focus:text-purple-700"
              onClick={updateBooking}
            >
              Update Booking Room
            </DropdownMenuItem>
          )}

          {status === "Check-Out" && (
            <DropdownMenuItem
              className="cursor-pointer text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-100 focus:bg-blue-100 focus:text-blue-700"
              onClick={viewBooking}
            >
              Create Invoice
            </DropdownMenuItem>
          )}

          {status === "approved" && (
            <DropdownMenuItem
              className="cursor-pointer text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-100 focus:bg-blue-100 focus:text-blue-700"
              onClick={viewHistory}
            >
              View Invoice
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
