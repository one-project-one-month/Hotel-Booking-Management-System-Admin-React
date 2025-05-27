import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { userInputProps } from "@/utils/types/UserTypes/userTypes";



const UserInput = ({userChange,createUser}:userInputProps) => {
  return (
    <div className="flex justify-between items-center rounded-md shadow-lg h-[60px] px-[1rem]">
        <h3 className="text-2xl font-semibold">User Listings</h3>
        <div>
          <Input
            placeholder="Search User"
            className="w-[500px]"
            onChange={userChange}
          />
        </div>
        <div className="flex gap-5">
          <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={createUser}
          >
            <Plus /> Create
          </Button>
          <Button size="icon" className="cursor-pointer" variant="secondary">
            <Filter />
          </Button>
        </div>
      </div>
  )
}

export default UserInput
