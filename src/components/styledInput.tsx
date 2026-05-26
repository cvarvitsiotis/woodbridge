import { CloseButton, InputGroup, Label, TextField } from "@heroui/react";
import { SearchIcon } from "@/components/icons";
import clsx from "clsx";

export default function StyledInput({
  value,
  placeholder,
  label,
  textFieldClassName,
  onValueChange,
  isPrimary = true,
  includeSearchIcon = true,
  isDisabled,
  fillVertically,
}: {
  value: string;
  placeholder?: string;
  label?: string;
  textFieldClassName?: string;
  onValueChange: (value: string) => void;
  isPrimary?: boolean;
  includeSearchIcon?: boolean;
  isDisabled?: boolean;
  fillVertically?: boolean;
}) {
  return (
    <TextField
      fullWidth
      isDisabled={isDisabled}
      variant={isPrimary ? "primary" : "secondary"}
      className={textFieldClassName}
    >
      {label && <Label>{label}</Label>}
      <InputGroup className={clsx(fillVertically && "h-full")}>
        {includeSearchIcon && (
          <InputGroup.Prefix>
            <SearchIcon className="text-zinc-400" />
          </InputGroup.Prefix>
        )}
        <InputGroup.Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
        {value && (
          <InputGroup.Suffix>
            <CloseButton
              className={clsx(!isPrimary && "size-4 bg-gray-400 text-gray-100 hover:bg-gray-500")}
              onPress={() => onValueChange("")}
            />
          </InputGroup.Suffix>
        )}
      </InputGroup>
    </TextField>
  );
}
