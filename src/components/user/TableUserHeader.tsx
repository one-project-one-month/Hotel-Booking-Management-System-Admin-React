import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TableUserHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px] text-center text-md">Profile</TableHead>
        <TableHead className="w-[100px] text-md">Name</TableHead>
        <TableHead className="w-[100px] text-md">Email</TableHead>
        <TableHead className="w-[100px] text-md text-center">
          Ph Number
        </TableHead>
        <TableHead className="w-[100px] text-md">Role</TableHead>
        <TableHead className="w-[100px] text-md text-center">Points</TableHead>
        <TableHead className="w-[100px] text-md text-center">Coupon</TableHead>
        <TableHead className="w-[100px] text-md">CreatedAt</TableHead>
        <TableHead className="w-[100px] text-md">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TableUserHeader;
