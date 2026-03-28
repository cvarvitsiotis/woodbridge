import { Label, ListBox, Select } from "@heroui/react";
import type { Key } from "@heroui/react";

export default function StyledSelect({
  options,
  onChange,
  selectedKey,
  label,
  className,
}: {
  options: string[];
  onChange: (value: string) => void;
  selectedKey: string;
  label: string;
  className?: string;
}) {
  return (
    <Select
      value={selectedKey}
      onChange={(value: Key | null) => onChange(String(value ?? ""))}
      className={className}
    >
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item key={option} id={option} textValue={option}>
              {option}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
