import moment from "moment";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { userBodyProps } from "@/utils/types/UserTypes/userTypes";



const TableUserBody = ({ user, updateUser, deleteUser }: userBodyProps) => {
  return (
    <TableRow key={user._id}>
      <TableCell>
        <div className="w-[70px] h-[70px]  rounded-md shadow-lg mx-auto">
          <img
            src={user.imgUrl}
            alt="user.profile"
            className="w-full h-full rounded-md shadow-lg"
          />
        </div>
      </TableCell>
      <TableCell className="capitalize">{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="text-center">
        {user.phoneNumber ? `0${user.phoneNumber}` : "-"}
      </TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell className="text-center">{user.points}</TableCell>
      <TableCell className="text-center">{user.coupon}</TableCell>
      <TableCell>
        {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="flex gap-3 mt-4">
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer"
          onClick={() => updateUser(user._id)}
        >
          <Edit className="text-blue-500" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer"
          onClick={() => deleteUser(user._id)}
        >
          <Trash className="text-red-500" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableUserBody;
