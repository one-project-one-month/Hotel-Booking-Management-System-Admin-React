import { useNavigate, useParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import SelectFormField from "@/components/shared/FormFields/selectFormField.tsx";

import CancelButton from "@/components/shared/CustomButtons/CancelButton/CancelButton.tsx";
import { type ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { CircleX } from "lucide-react";
import SubmitButton from "@/components/shared/CustomButtons/SubmitButton/SubmitButton.tsx";
import { Input } from "@/components/ui/input.tsx";
import TextAreaFormField from "@/components/shared/FormFields/textareaFormField.tsx";
import { roomTypesToSelect } from "@/utils/dummy/room/roomDummy.ts";
import { Label } from "@/components/ui/label.tsx";
import { useRoom, useRoomById } from "@/hooks/useRooms.ts";
import type {
  Room,
  RoomDetails,
  RoomTypes,
} from "@/utils/types/roomTypes/roomTypes.ts";

const updateRoomFormSchema = z.object({
  id: z.string().min(1, { message: "Room Id is missing" }),
  roomNo: z.string().min(1, { message: "Room No. is required" }),
  roomType: z.string().min(1, { message: "Room Type is required" }),
  roomStatus: z.string().min(1, { message: "Room Status is required" }),
  guestLimit: z.string().min(1, { message: "Guest Limit is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  images: z
    .array(z.string().min(1))
    .min(1, { message: "At least one image is required" }),
});

const UpdateRoom = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingImg, setUploadingImg] = useState(false);
  const { getAllRoomsQuery } = useRoom();
  const { data: rooms } = getAllRoomsQuery;

  const roomToBeUpdated = rooms?.find((room) => room.id === id);

  const description = roomToBeUpdated?.details
    ? JSON.parse(roomToBeUpdated?.details as unknown as string).description
    : "";

  const form = useForm<z.infer<typeof updateRoomFormSchema>>({
    resolver: zodResolver(updateRoomFormSchema),
    mode: "all",
    defaultValues: {
      id: roomToBeUpdated?.id,
      roomNo: roomToBeUpdated?.roomNo.toString(),
      roomType: roomToBeUpdated?.type,
      roomStatus: roomToBeUpdated?.status,
      guestLimit: roomToBeUpdated?.guestLimit.toString(),
      price: roomToBeUpdated?.price.toString(),
      description: description,
      images: imageUrls,
    },
  });

  const { patchRoomMutation } = useRoomById({ id: id as string });

  const onSubmit = async (formData: z.infer<typeof updateRoomFormSchema>) => {
    console.log(formData);

    const patchedRoom: Partial<Room> = {
      id: roomToBeUpdated?.id,
      roomNo: Number(formData.roomNo),
      type: formData.roomType as RoomTypes,
      price: Number(formData.price),
      status: roomToBeUpdated?.status,
      isFeatured: roomToBeUpdated?.isFeatured,
      details: {
        ...(roomToBeUpdated?.details as RoomDetails),
        description: formData.description,
      },
      imgUrl: formData.images,
      guestLimit: Number(formData.guestLimit),
    };
    try {
      const res = await patchRoomMutation.mutateAsync(patchedRoom);

      if (res) {
        form.reset({});
        setImageUrls([]);
        toast(`Room No ${roomToBeUpdated?.roomNo} is updated successfully`, {
          position: "top-center",
          style: {
            backgroundColor: "#228B22",
            color: "white",
            border: "none",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
          },
        });
        navigate("/rooms");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error.response.data.message}`, {
        position: "top-center",
        style: {
          backgroundColor: "red",
          color: "white",
          border: "none",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
        },
      });
    }
  };
  const handleClickCancel = () => {
    navigate("/rooms");
  };
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (imageUrls.length >= 4) {
      return toast.error("You can only upload 4 images for a room");
    }

    const file = e.target.files && e.target.files[0];
    if (file) {
      setUploadingImg(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "hotel-image");
      data.append("cloud_name", "dwcdqx2tm");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwcdqx2tm/image/upload",
        {
          method: "POST",
          body: data,
        },
      );
      setUploadingImg(false);
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      const uploadImageUrl = await res.json();
      setImageUrls((prev) => [...prev, uploadImageUrl.url]);
    }
  };

  const handleRemoveImage = (url: string) => {
    const newImageUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(newImageUrls);
  };
  useEffect(() => {
    if (roomToBeUpdated?.imgUrl) {
      const imageUrls = JSON.parse(
        roomToBeUpdated?.imgUrl as unknown as string,
      );
      setImageUrls(imageUrls);
    }
  }, [roomToBeUpdated?.imgUrl]);

  useEffect(() => {
    form.setValue("images", imageUrls, { shouldValidate: true });
  }, [form, imageUrls]);

  return (
    <div className=" h-[90vh]">
      <h3 className="text-2xl font-semibold">Update Room</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="h-[70vh] overflow-y-auto px-5  rounded-md mt-5 shadow-lg ">
            <div className="grid grid-cols-3 gap-5">
              <InputFormField
                control={form.control}
                name={"roomNo"}
                type="number"
                placeholder={"Enter Room No"}
                label={"Room No"}
              />

              <SelectFormField
                control={form.control}
                name={"roomType"}
                label={"Room Type"}
                options={roomTypesToSelect}
                placeholder={"Select Room Type"}
              />
              <InputFormField
                control={form.control}
                name={"price"}
                type={"number"}
                placeholder={"Enter Price"}
                label={"Price"}
              />
              <InputFormField
                control={form.control}
                name={"guestLimit"}
                type={"number"}
                label={"Guest Limit"}
                placeholder={"Select guest limit"}
              />
              <TextAreaFormField
                control={form.control}
                name={"description"}
                placeholder={"Enter Description"}
                label={"Description"}
              />

              <div>
                <Label htmlFor="Upload Profile "> Images</Label>
                <div className="h-[40px] border-1 rounded-md px-2 py-1 text-center mt-2.5 cursor-pointer">
                  <label htmlFor="uploadImages" className="cursor-pointer">
                    Upload Images
                  </label>
                  <Input
                    type="file"
                    id="uploadImages"
                    className="mt-3 cursor-pointer"
                    hidden
                    placeholder="Upload Images"
                    accept=".png,.jpeg,.svg"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div className="col-span-3 grid grid-cols-4  gap-5  ">
                {imageUrls.length ? (
                  imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <CircleX
                        onClick={() => handleRemoveImage(url)}
                        className="cursor-pointer absolute top-1 right-1   hover:text-red-500  transition"
                      />

                      <img
                        src={url}
                        alt={`profile_img${index}`}
                        className="rounded-2xl object-cover  aspect-video overflow-hidden  w-full"
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}

                {uploadingImg && (
                  <div className="rounded-2xl aspect-video w-full animate-pulse bg-muted flex items-center justify-center col-span-1">
                    <span className="text-sm text-muted-foreground">
                      Uploading image...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center mt-4">
            <CancelButton handleClickCancel={handleClickCancel} />
            <SubmitButton
              text={"Update"}
              pendingText={"Updating"}
              isPending={patchRoomMutation.isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateRoom;
