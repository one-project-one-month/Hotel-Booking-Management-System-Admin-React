import { CircleX } from "lucide-react";

interface Props {
  imageUrls: string[];
  uploadingImg: boolean;
  handleRemoveImage: (url: string) => void;
}
export default function RoomImagesPreviewForForm({
  imageUrls,
  uploadingImg,
  handleRemoveImage,
}: Props) {
  return (
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
  );
}
