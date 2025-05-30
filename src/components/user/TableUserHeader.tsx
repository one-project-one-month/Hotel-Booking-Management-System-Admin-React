import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TableUserHeader = () => {


  const tables = ["Profile","Name","Email","Phone Number","Role","Points","Coupon","CreatedAt","Action"]

  
  return (
    <TableHeader>
      <TableRow>
        {
          tables.map((table)=>{
            return (
              <TableHead className="w-[150px] text-md text-center" key={table}>{table}</TableHead>
            )
          })
        }
      </TableRow>
    </TableHeader>
  );
};

export default TableUserHeader;
