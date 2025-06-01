import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import SelectFormField from "@/components/shared/FormFields/selectFormField.tsx";

import { useNavigate } from "react-router-dom";
import CancelButton from "@/components/shared/CustomButtons/CancelButton/CancelButton.tsx";
import SubmitButton from "@/components/shared/CustomButtons/SubmitButton/SubmitButton.tsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TextAreaFormField from "@/components/shared/FormFields/textareaFormField.tsx";
import {
  createRoomFormSchema,
  createRoomFromFormData,
  handleImageUploadForRoom,
  handleRemoveImageForRoom,
  roomTypesToSelect,
} from "@/utils/dummy/room/roomDummy.ts";
import type { Room } from "@/utils/types/roomTypes/roomTypes.ts";
import { useRoom } from "@/hooks/useRooms.ts";
import {
  errorToastStyle,
  successToastStyle,
} from "@/utils/dummy/Toast/toast.ts";
import ImageUploadField from "@/components/shared/ImageUploadField/ImageUploadField.tsx";
import RoomImagesPreviewForForm from "@/components/Room/RoomImagesPreviewForForm/RoomImagesPreviewForForm.tsx";

export default function CreateRoom() {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingImg, setUploadingImg] = useState(false);

  const { createRoomMutation } = useRoom();

  const form = useForm<z.infer<typeof createRoomFormSchema>>({
    resolver: zodResolver(createRoomFormSchema),
    mode: "onChange",
    defaultValues: {
      roomNo: "",
      roomType: "",
      guestLimit: "",
      price: "",
      description: "",
      images: [],
    },
  });

  const onSubmit = async (formData: z.infer<typeof createRoomFormSchema>) => {
    const newRoom: Partial<Room> = createRoomFromFormData(formData);
    try {
      const res = await createRoomMutation.mutateAsync(newRoom);
      if (res) {
        form.reset({});
        setImageUrls([]);
        toast("Room is created successfully", successToastStyle);
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
    form.setValue("images", imageUrls, { shouldValidate: true });
  }, [imageUrls]);

  return (
    <div className=" h-[90vh]">
      <h3 className="text-2xl font-semibold">Create Room</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="min-h-[65vh] px-5  rounded-md mt-10 shadow-lg ">
            <div className="grid grid-cols-3 gap-5">
              <InputFormField
                control={form.control}
                name={"roomNo"}
                placeholder={"Enter Room No"}
                label={"Room No"}
                type="number"
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
                placeholder={"Enter guest limit"}
                label={"Guest Limit"}
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
              text={"Create"}
              isPending={createRoomMutation.isPending}
              pendingText={"Creating"}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
