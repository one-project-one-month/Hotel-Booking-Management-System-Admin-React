import TableCheck from "@/components/Booking/TableCheck";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { checkTable } from "@/utils/dummy/dummy";
import ViewBooking from "./ViewBooking";
import { useEffect, useState } from "react";
import ModalBooking from "@/components/Booking/ModalBooking";

const CheckTable = () => {
  const [active, setActive] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const checkId = localStorage.getItem("CheckId");
    if (checkId) {
      setActive(true);
    }
    const updateBooking = localStorage.getItem("updateBooking");
    if (updateBooking) {
      setModal(true);
    }
  }, [active]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-md">Customer Name</TableHead>
            <TableHead className="w-[100px] text-md text-center">
              Room Number
            </TableHead>
            <TableHead className="w-[100px] text-md">Check In</TableHead>
            <TableHead className="w-[100px] text-md">Check Out</TableHead>
            <TableHead className="w-[100px] text-center text-md">
              Extra Charges
            </TableHead>
            <TableHead className="w-[100px] text-md text-center">
              Status
            </TableHead>
            <TableHead className="w-[100px] text-md">CreatedAt</TableHead>

            <TableHead
              className="w-[50px] text-md text-center"
              hidden={active || modal}
            >
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checkTable.map((check) => {
            return <TableCheck check={check} />;
          })}
        </TableBody>
      </Table>
      <div>
        {active && <ViewBooking />}
        {modal && <ModalBooking />}
      </div>
    </>
  );
};

export default CheckTable;
