// import TableCheck from "@/components/Booking/TableCheck";
// import {
//   Table,
//   TableBody,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useParams } from "react-router-dom";
// import { useCheckInMutate } from "@/hooks/useCheckIn";
// import CustomLoading from "@/components/shared/Loading/Loading";
// import useCheckOut from "@/hooks/useCheckOut";
// import ViewBooking from "./ViewBooking";
// import ModalBooking from "@/components/Booking/ModalBooking";

// const CheckTable = () => {
//   const { id } = useParams();

//   const { getIdquery } = useCheckInMutate({ id: id as string });

//   const { data, isLoading } = getIdquery;

//   const { active, modal } = useCheckOut();

//   const tableHeader = [
//     "Customer Name",
//     "Room Number",
//     "Check-In",
//     "Check-Out",
//     "Extra Charges",
//     "Status",
//     "CreatedAt",
//     "Action",
//   ];

//   const tables = [
//     "Customer Name",
//     "Room Number",
//     "Check-In",
//     "Check-Out",
//     "Extra Charges",
//     "Status",
//     "CreatedAt",
//   ];

//   if (isLoading) {
//     return <CustomLoading />;
//   }

//   return (
//     <>
//       <Table>
//         <TableHeader>
//           {active || modal ? (
//             <TableRow>
//               {tables.map((table) => {
//                 return (
//                   <TableHead
//                     className="w-[100px] text-md text-center"
//                     key={table}
//                   >
//                     {table}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ) : (
//             <TableRow>
//               {tableHeader.map((table) => {
//                 return (
//                   <TableHead
//                     className="w-[100px] text-md text-center"
//                     key={table}
//                   >
//                     {table}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           )}
//         </TableHeader>
//         <TableBody>
//           <TableCheck check={data?.data} />
//         </TableBody>
//       </Table>
//       {active && <ViewBooking />}
//       {modal && <ModalBooking />}
//     </>
//   );
// };

// export default CheckTable;
