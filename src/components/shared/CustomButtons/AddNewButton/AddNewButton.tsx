import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
  text: string;
}
export default function AddNewButton({ onClick, text }: Props) {
  return (
    <Button className="cursor-pointer" onClick={onClick}>
      <Plus />
      {text}
    </Button>
  );
}
