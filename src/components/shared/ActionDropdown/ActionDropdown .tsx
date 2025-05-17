import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

interface Props {
  handleClickEdit: () => void;
  handleClickDelete: () => void;
}

export function ActionDropdown({ handleClickEdit, handleClickDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical
          className="cursor-pointer absolute top-2 right-1 "
          size={24}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[25]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleClickEdit}
          >
            Edit
            <DropdownMenuShortcut>
              <Pencil size={36} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className=" cursor-pointer text-red-600 hover:text-red-700 bg-transparent hover:bg-red-100 focus:bg-red-100 focus:text-red-700"
            onClick={handleClickDelete}
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2
                size={20}
                className="text-red-600 group-hover:text-red-700"
              />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
