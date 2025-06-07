import { TableHead, TableRow, TableHeader } from "@/components/ui/table";



const TableHeaders = () => {
  

  const tables = ["Customer Name","Room Number", "Check-In", "Check-Out","Guest Count","Deposit Amount","Extra Charge","Total Amount","Status","CreatedAt","Action"]

  return (
    <TableHeader>
      <TableRow>
        {
          tables.map((table)=>{
            return (
              <TableHead className="w-[200px] text-md text-center text-nowrap" key={table}>{table}</TableHead>
            )
          })
        }
      </TableRow>
    </TableHeader>
  );
};

export default TableHeaders;
