import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const images = image
    ? image
    : "https://avatars.githubusercontent.com/u/70505132?v=4";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageUpload = (event: any) => {
    const files = event.target.files[0];
    if (files) {
      const url = URL.createObjectURL(files);
      setImage(url);
    }
  };

  const cancelClick = () => {
    navigate("/users");
  };

  return (
    <div className="relative h-[90vh]">
      <h3 className="text-2xl font-semibold">Create User</h3>
      <div className="h-[70vh] px-5 rounded-md mt-10 shadow-lg ">
        <div className="grid grid-cols-3 gap-5 ">
          <div>
            <label htmlFor="Name">Name</label>
            <Input placeholder="Enter Name" className="py-5  mt-2" />
          </div>
          <div>
            <label htmlFor="Email">Email</label>
            <Input placeholder="Enter Email" className="py-5  mt-2" />
          </div>
          <div>
            <label htmlFor="Ph Number">Ph Number</label>
            <Input placeholder="Enter Ph Number" className="py-5  mt-2" />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <Input placeholder="Enter Password" className="py-5 mt-2" />
          </div>
          <div>
            <label htmlFor="Points">Points</label>
            <Input placeholder="Enter Points" className="py-5 mt-2" />
          </div>
          <div>
            <label htmlFor="Cupon">Cupon</label>
            <Input placeholder="Enter Cupon" className="py-5 mt-2" />
          </div>
          <div>
            <Select>
              <label htmlFor="Role">Role</label>
              <SelectTrigger className="w-[100%] py-5 mt-2 cursor-pointer">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="Upload Profile">Upload Profile</label>
            <div className="h-[40px] border-1 rounded-md px-2 py-1 text-center mt-2.5 cursor-pointer">
              <label htmlFor="upload" className="cursor-pointer">
                Profile Upload
              </label>
              <Input
                type="file"
                id="upload"
                className="mt-3 cursor-pointer"
                hidden
                placeholder="upload Profile"
                accept=".png,.jpeg,.svg"
                onChange={imageUpload}
              />
            </div>
          </div>
          <div className="w-[180px] h-[180px] shadow-lg rounded-md mx-auto mt-4">
            <img
              src={images}
              alt="profile_img"
              className="w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-[35%] flex gap-10">
        <Button
          variant="outline"
          className="bg-red-600 text-white w-[150px] py-5 cursor-pointer hover:bg-red-500 hover:text-white"
          onClick={cancelClick}
        >
          Cancel
        </Button>
        <Button className="bg-green-600 w-[150px] py-5 cursor-pointer hover:bg-green-500">
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateUser;
