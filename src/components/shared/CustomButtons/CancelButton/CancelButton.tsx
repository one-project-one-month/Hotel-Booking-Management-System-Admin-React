import { Button } from "@/components/ui/button.tsx";

interface Props {
  handleClickCancel: () => void;
}
export default function CancelButton({ handleClickCancel }: Props) {
  return (
    <Button
      variant="outline"
      className="bg-red-600 text-white w-[150px] py-5 cursor-pointer hover:bg-red-500 hover:text-white"
      onClick={handleClickCancel}
    >
      Cancel
    </Button>
  );
}
