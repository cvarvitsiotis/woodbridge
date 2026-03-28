import { CloseButton, InputGroup } from "@heroui/react";
import { SearchIcon } from "./icons";

export default function StyledInput({
  value,
  placeholder,
  className,
  onValueChange,
}: {
  value: string;
  placeholder: string;
  className?: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <InputGroup className={className}>
      <InputGroup.Prefix>
        <SearchIcon className="text-default-400" />
      </InputGroup.Prefix>
      <InputGroup.Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
      {value && (
        <InputGroup.Suffix>
          <CloseButton aria-label="Clear" onPress={() => onValueChange("")} />
        </InputGroup.Suffix>
      )}
    </InputGroup>
  );
}
