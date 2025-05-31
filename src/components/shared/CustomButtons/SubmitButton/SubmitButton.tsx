import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";

interface Props {
  text: string;
  isPending: boolean;
  pendingText: string;
}
export default function SubmitButton({ text, isPending, pendingText }: Props) {
  return (
    <Button
      disabled={isPending}
      type="submit"
      className="bg-green-600 w-[150px] py-5 cursor-pointer hover:bg-green-500"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {pendingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
