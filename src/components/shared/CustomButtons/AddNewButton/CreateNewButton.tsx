import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}
export default function CreateNewButton({ onClick }: Props) {
  return (
    <Button className="cursor-pointer" variant="secondary" onClick={onClick}>
      <Plus /> Create
    </Button>
  );
}
