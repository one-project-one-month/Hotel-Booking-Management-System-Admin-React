import { Button } from "@/components/ui/button.tsx";

interface Props {
  handleClickCancel: () => void;
}
export default function CancelButton({ handleClickCancel }: Props) {
  return (
    <Button
      onClick={handleClickCancel}
      variant="outline"
      className="cursor-pointer"
    >
      Cancel
    </Button>
  );
}
