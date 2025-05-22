import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form.tsx";

import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";

interface Props {
    control: any;

    name: string;
    placeholder: string;
    label: string;
}
export default function TextAreaFormField({
                                              control,
                                              name,

                                              placeholder,
                                              label,
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
                            <Textarea placeholder={placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
