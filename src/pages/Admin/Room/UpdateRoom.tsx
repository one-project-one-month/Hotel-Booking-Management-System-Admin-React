import { useNavigate, useParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import SelectFormField from "@/components/shared/FormFields/selectFormField.tsx";

import CancelButton from "@/components/shared/CustomButtons/CancelButton/CancelButton.tsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SubmitButton from "@/components/shared/CustomButtons/SubmitButton/SubmitButton.tsx";

import TextAreaFormField from "@/components/shared/FormFields/textareaFormField.tsx";
import {
  createRoomToUpdateFromFormData,
  handleImageUploadForRoom,
  handleRemoveImageForRoom,
  roomTypesToSelect,
  updateRoomFormSchema,
} from "@/utils/dummy/room/roomDummy.ts";

import { useRoom, useRoomById } from "@/hooks/useRooms.ts";
import type { Room } from "@/utils/types/roomTypes/roomTypes.ts";
import {
  errorToastStyle,
  successToastStyle,
} from "@/utils/dummy/Toast/toast.ts";
import ImageUploadField from "@/components/shared/ImageUploadField/ImageUploadField.tsx";
import RoomImagesPreviewForForm from "@/components/Room/RoomImagesPreviewForForm/RoomImagesPreviewForForm.tsx";

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

    const patchedRoom: Partial<Room> = createRoomToUpdateFromFormData(
      formData,
      roomToBeUpdated as Room,
    );
    try {
      const res = await patchRoomMutation.mutateAsync(patchedRoom);

      if (res) {
        form.reset({});
        setImageUrls([]);
        toast(
          `Room No ${roomToBeUpdated?.roomNo} is updated successfully`,
          successToastStyle,
        );
        navigate("/rooms");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error.response.data.message}`, errorToastStyle);
    }
  };
  const handleClickCancel = () => {
    navigate("/rooms");
  };

  const handleImageUpload = handleImageUploadForRoom({
    imageUrls,
    setImageUrls,
    setUploadingImg,
  });

  const handleRemoveImage = handleRemoveImageForRoom({
    imageUrls,
    setImageUrls,
  });

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

              <ImageUploadField handleImageUpload={handleImageUpload} />

              <RoomImagesPreviewForForm
                imageUrls={imageUrls}
                uploadingImg={uploadingImg}
                handleRemoveImage={handleRemoveImage}
              />
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
