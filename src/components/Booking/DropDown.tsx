import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  CheckIn?: () => void;
  Maintance?: () => void;
  CheckOut?: () => void;
  status?: string;
  active?: boolean;
  viewBooking?:() => void;
  updateBooking?:() => void;
}

const DropDown = ({ CheckIn, Maintance, CheckOut, status, active,viewBooking,updateBooking }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical size={24} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {status === "Booked" && (
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
              onClick={CheckOut}
            >
              CheckOut
            </DropdownMenuItem>
          )}
          {status === "Check-Out" && !active && (
            <>
              <DropdownMenuItem
                className="cursor-pointer text-red-600 hover:text-red-700 bg-transparent hover:bg-red-100 focus:bg-red-100 focus:text-red-700"
                onClick={Maintance}
              >
                Maintance
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-100 focus:bg-blue-100 focus:text-blue-700">
                Availabe
              </DropdownMenuItem>
            </>
          )}
          {status === "Maintance" && (
            <DropdownMenuItem
              className="cursor-pointer text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-100 focus:bg-blue-100 focus:text-blue-700"
              onClick={Maintance}
            >
              Availabe
            </DropdownMenuItem>
          )}

          {active && (
            <>
            {
              status !== 'Check-Out' && (
                   <DropdownMenuItem
                className="cursor-pointer text-purple-600 hover:text-purple-700 bg-transparent hover:bg-purple-100 focus:bg-purple-100 focus:text-purple-700"
                onClick={updateBooking}
              >
                Update Booking Room
              </DropdownMenuItem>
              )
            }
           
              <DropdownMenuItem
                className="cursor-pointer text-blue-600 hover:text-blue-700 bg-transparent hover:bg-blue-100 focus:bg-blue-100 focus:text-blue-700"
                onClick={viewBooking}
              >
                View Invoice
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
