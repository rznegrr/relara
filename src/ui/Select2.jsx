"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Select2({ list, label, defaultItem, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultItem?.value || "");

  const handleSelect = (selectedValue) => {
    if (selectedValue !== value) {
      setValue(selectedValue);
      if (onChange) {
        onChange(selectedValue);
      }
    }
    setOpen(false); 
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border-gray-600 bg-transparent"
        >
          {value
            ? list.find((item) => item.id === value)?.name || defaultItem.name
            : defaultItem.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${label}...`} />
          <CommandList>
            <CommandEmpty>No {label} found.</CommandEmpty>
            <CommandGroup>
              {/* default item */}
              <CommandItem
                key="default"
                value={defaultItem.value}
                onSelect={() => handleSelect(defaultItem.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === defaultItem.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {defaultItem.name}
              </CommandItem>
              {/* dynamic items*/}
              {list.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
