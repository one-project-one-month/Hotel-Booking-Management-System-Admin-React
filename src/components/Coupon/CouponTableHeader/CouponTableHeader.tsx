import { TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

export default function CouponTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px] text-md">No.</TableHead>
        <TableHead className="w-[100px] text-md">Code</TableHead>
        <TableHead className="w-[100px] text-md">User</TableHead>
        <TableHead className="w-[110px] text-md">Discount Price</TableHead>
        <TableHead className="w-[100px] text-md">Expiry Date</TableHead>
        <TableHead className="w-[100px] text-md">IsActive</TableHead>
        <TableHead className="w-[100px] text-md">CreatedAt</TableHead>
        <TableHead className="w-[100px] text-md">IsClaimed</TableHead>
        <TableHead className="w-[100px] text-md">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}
