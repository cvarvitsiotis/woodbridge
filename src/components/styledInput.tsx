import { Input } from "@heroui/input";
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
    <Input
      isClearable
      placeholder={placeholder}
      startContent={<SearchIcon className="text-default-400" />}
      variant="faded"
      radius="sm"
      value={value}
      onClear={() => onValueChange("")}
      onValueChange={onValueChange}
      className={className}
      classNames={{
        inputWrapper: "min-h-12 h-12 border border-default-300 bg-white",
      }}
    />
  );
}
