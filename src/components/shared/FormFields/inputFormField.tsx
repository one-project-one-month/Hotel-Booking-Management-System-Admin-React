import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

interface Props {
    control: any;
    type: string;
    name: string;
    placeholder: string;
    label: string;
    disabled?:boolean
}
export default function InputFormField({
                                           control,
                                           name,
                                           type,
                                            placeholder,
                                           label,
                                           disabled
                                       }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <Label> {label}</Label>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type={type} placeholder={placeholder} {...field} disabled={disabled}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
