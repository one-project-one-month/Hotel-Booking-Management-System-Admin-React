import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";

interface Props {
  handleImageUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<string | number | undefined>;
}
export default function ImageUploadField({ handleImageUpload }: Props) {
  return (
    <div>
      <Label htmlFor="Upload Profile "> Images</Label>
      <div className="h-[40px] border-1 rounded-md px-2 py-1 mt-2.5 text-center cursor-pointer">
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
  );
}
