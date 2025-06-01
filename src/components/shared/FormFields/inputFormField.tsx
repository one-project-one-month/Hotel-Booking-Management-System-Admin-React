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
    maxLength?:number;
    pattern?:string;
    inputMode?:"numeric";
}
export default function InputFormField({
                                           control,
                                           name,
                                           type,
                                            placeholder,
                                           label,
                                           disabled,
                                           maxLength,
                                           pattern,
                                           inputMode
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
                            <Input type={type} placeholder={placeholder} inputMode={inputMode} maxLength={maxLength} {...field} disabled={disabled} pattern={pattern} className="[&::-webkit-inner-spin-button]:appearance-none"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
