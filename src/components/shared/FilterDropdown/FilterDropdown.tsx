"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  label: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
}

export default function FilterDropdown({
  label,
  selected,
  setSelected,
  options,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button variant="outline">
            {selected} {open ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-20">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
            {options.map((option, index) => (
              <DropdownMenuRadioItem
                key={index}
                value={option}
                className="cursor-pointer"
              >
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="text-sm">{label}</span>
    </div>
  );
}
