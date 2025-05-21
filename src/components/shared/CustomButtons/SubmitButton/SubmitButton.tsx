import { Button } from "@/components/ui/button.tsx";

interface Props {
  text: string;
}
export default function SubmitButton({ text }: Props) {
  return (
    <Button
      type="submit"
      className="bg-green-600 w-[150px] py-5 cursor-pointer hover:bg-green-500"
    >
      {text}
    </Button>
  );
}
