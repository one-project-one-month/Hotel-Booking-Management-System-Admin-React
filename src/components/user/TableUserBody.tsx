import moment from "moment";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { userBodyProps } from "@/utils/types/UserTypes/userTypes";



const TableUserBody = ({ user, updateUser, deleteUser }: userBodyProps) => {
  return (
    <TableRow key={user.id}>
      <TableCell>
        <div className="w-[80px] h-[80px]  rounded-md shadow-lg mx-auto">
          <img
            src={user.imageUrl}
            alt="user.profile"
            className="w-full h-full rounded-md shadow-lg object-cover"
          />
        </div>
      </TableCell>
      <TableCell className="capitalize text-center">{user.name}</TableCell>
      <TableCell className="text-center">{user.email}</TableCell>
      <TableCell className="text-center">
        {user.phoneNumber || "-"}
      </TableCell>
      <TableCell className="text-center capitalize">{user.role}</TableCell>
      <TableCell className="text-center">{user.points || "0"}</TableCell>
      <TableCell className="text-center">{user.coupon || "0"}</TableCell>
      <TableCell>
        {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="flex gap-3 mt-4">
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer"
          onClick={() => updateUser(user.id)}
        >
          <Edit className="text-blue-500" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer"
          onClick={() => deleteUser(user.id)}
        >
          <Trash className="text-red-500" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableUserBody;
