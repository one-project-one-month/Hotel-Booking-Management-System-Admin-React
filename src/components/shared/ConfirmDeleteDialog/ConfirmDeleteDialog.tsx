import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Dispatch, SetStateAction } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  itemName: string;
  handleConfirmDelete: () => void;
  isPending: boolean;
}
export function ConfirmDeleteDialog({
  open,
  setOpen,
  itemName,
  handleConfirmDelete,
  isPending,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this{" "}
            {itemName}
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={handleConfirmDelete}
            className="cursor-pointer w-[100px] bg-red-600 text-white hover:bg-red-700  "
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
