"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Option = { label: string; value: string | number };


interface ISelectProps {
  placeholder: string;
  options: Option[];
  selectedOptions: (string | number)[];
  setSelectedOptions:Dispatch<SetStateAction<(string | number)[]>>;
}
const MultiSelect = ({
  placeholder,
  options: values,
  selectedOptions: selectedItems,
  setSelectedOptions,
}: ISelectProps) => {

  const handleSelectChange = (value: string | number) => {
    setSelectedOptions((prev) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      
      if (!prevArray.includes(value)) {
        return [...prevArray, value];
      }
      
      return prevArray.filter((item) => item !== value);
    });
  };
  
  const isOptionSelected = (value: string | number): boolean => {
    return selectedItems.includes(value) ? true : false;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
          >
            <div>{placeholder}</div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 max-h-[350px] overflow-y-auto"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {values.map((value: ISelectProps["options"][0], index: number) => {
            return (
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                key={index}
                checked={isOptionSelected(value.value)}
                onCheckedChange={() => handleSelectChange(value.value)}
              >
                {value.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiSelect;