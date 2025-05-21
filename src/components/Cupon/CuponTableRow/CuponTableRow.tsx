import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { UpdateCuponFormDialog } from "@/components/Cupon/UpdateCuponFormDialog/UpdateCuponFormDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Trash } from "lucide-react";
import type { Cupon } from "@/utils/types/cuponTypes/cuponType.ts";
import { type Dispatch, type SetStateAction, useState } from "react";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog/ConfirmDeleteDialog.tsx";
import { cupons } from "@/utils/dummy/cupon/cuponDummy.ts";

interface Props {
  cupon: Cupon;
  index: number;
  setCuponsToBeShown: Dispatch<SetStateAction<Cupon[]>>;
}
export default function CuponTableRow({
  cupon,
  index,
  setCuponsToBeShown,
}: Props) {
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const handleClickDelete = () => {
    setOpenConfirmDeleteDialog(true);
  };
  const handleConfirmDeleteCupon = () => {
    const newCupons = cupons.filter((c) => c.id !== cupon.id);
    setCuponsToBeShown(newCupons);
  };
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{cupon.code}</TableCell>
      <TableCell>${cupon.discount_pct}</TableCell>
      <TableCell>{cupon.expiry_date}</TableCell>
      <TableCell>{cupon.is_active ? "True" : "False"}</TableCell>
      <TableCell>{cupon.created_at}</TableCell>
      <TableCell>{cupon.is_claimed ? "True" : "False"}</TableCell>

      <TableCell className="flex gap-3 mt-4">
        <UpdateCuponFormDialog cuponId={cupon.id} />
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer"
          onClick={handleClickDelete}
        >
          <Trash className="text-red-500" />
        </Button>
      </TableCell>
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        setOpen={setOpenConfirmDeleteDialog}
        itemName={"cupon"}
        handleConfirmDelete={handleConfirmDeleteCupon}
      />
    </TableRow>
  );
}
