"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  options: string[];
  renderOpenButton: (handleClickOpenButton: () => void) => React.JSX.Element;
}
export function SelectorDropDown({
  selected,
  setSelected,
  renderOpenButton,
  label,
  options,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpenButton = () => {
    setOpen(true);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {renderOpenButton(handleClickOpenButton)}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
          {options.map((option, index) => (
            <DropdownMenuRadioItem value={option} key={index}>
              {option}
            </DropdownMenuRadioItem>
          ))}
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
