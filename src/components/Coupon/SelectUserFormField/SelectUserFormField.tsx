import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.ts";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Props {
  control: any;
  name: string;
  label: string;
  users: any[];
  placeholder: string;
}

export default function SelectUserFormField({
  control,
  name,
  label,
  users,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Label> {label}</Label>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? users.find((user) => user.id.toString() === field.value)
                          ?.name
                      : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search user" className="h-9 " />
                  <CommandList>
                    <CommandEmpty>No user found.</CommandEmpty>

                    <CommandGroup>
                      {users.length &&
                        users.map((user) => (
                          <CommandItem
                            value={user.name}
                            key={user.id}
                            onSelect={() => {
                              field.onChange(user.id.toString());
                              // form.setValue("userId", user.id.toString());
                            }}
                          >
                            {user.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                user.id.toString() === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
