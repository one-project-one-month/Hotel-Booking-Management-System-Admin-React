import { TableHead, TableRow, TableHeader } from "@/components/ui/table";

const TableHeaders = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[150px] text-md">Customer Name</TableHead>
        <TableHead className="w-[100px] text-md text-center">
          Room Number
        </TableHead>
        <TableHead className="w-[100px] text-md text-center">
          Check_In
        </TableHead>
        <TableHead className="w-[100px] text-md text-center">
          Check_Out
        </TableHead>
        <TableHead className="w-[100px] text-center text-md">
          Guest Count
        </TableHead>
        <TableHead className="w-[100px] text-md">Deposit Amount</TableHead>
        <TableHead className="w-[100px] text-md">Total Amount</TableHead>
        <TableHead className="w-[100px] text-md text-center">Status</TableHead>
        <TableHead className="w-[100px] text-md text-center">
          CreatedAt
        </TableHead>
        <TableHead className="w-[100px] text-md text-center">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TableHeaders;
