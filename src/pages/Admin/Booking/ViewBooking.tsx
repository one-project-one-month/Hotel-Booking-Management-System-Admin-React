import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "react-router-dom"

const ViewBooking = () => {
  const {id} = useParams();
  console.log(id)

  return (
   <div>
      <div className="shadow-lg mt-8 h-[65vh] rounded-md p-2 px-[60px] w-[40%] mx-auto">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-3xl font-semibold">Hotel Receipt</h3>
          <div className="flex p-4 gap-2 items-center">
            <h3 className="flex gap-2">BookingNo: <p className="font-semibold">INV-000001</p></h3> |
            <h3 className="flex gap-2">Date: <p className="font-semibold">15/5/2025</p></h3>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Guest Details:</h3>
          <h3 className="flex gap-3">Name: <p className="font-semibold">Arkar</p></h3>
          <h3 className="flex gap-3">Contact Number: <p className="font-semibold">09123456789</p></h3>
          <div className="flex gap-2 items-center">
            <h3 className="flex gap-2">CheckIn: <p className="font-semibold">1:00AM</p></h3> |
            <h3 className="flex gap-2">CheckOut: <p className="font-semibold">3:00PM</p></h3>
          </div>
          <h3  className="flex gap-3">Guest Count: <p className="font-semibold">4</p></h3>
        </div>
        <div className="h-[220px] overflow-auto w-[100%]">
          <Table className="mt-4 border-2">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Room Number</TableHead>
                <TableHead className="text-right">Unique Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">102</TableCell>
                <TableCell className="text-right">20000</TableCell>
                <TableCell className="text-center">3</TableCell>
                <TableCell className="text-right">60000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center">102</TableCell>
                <TableCell className="text-right">20000</TableCell>
                <TableCell className="text-center">3</TableCell>
                <TableCell className="text-right">60000</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Deposit Amount</TableCell>
                  <TableCell className="text-right">10000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Total</TableCell>
                  <TableCell className="text-right">50000</TableCell>
                </TableRow>
              </TableFooter>
          </Table>
        </div>
        <div className="mt-8 ml-[65px] flex justify-end w-[100%]">
          <Button className="w-[150px] cursor-pointer">Print Invoice</Button>
        </div>
      </div>
   </div>
  )
}

export default ViewBooking
