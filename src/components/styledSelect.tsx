import { ListBox, Select } from "@heroui/react";
import type { Key } from "@heroui/react";

export default function StyledSelect({
  options,
  onChange,
  selectedKey,
  label,
  selectClassName,
  valueClassName,
  isPrimary = true,
}: {
  options: string[];
  onChange: (value: string) => void;
  selectedKey: string;
  label?: string;
  selectClassName?: string;
  valueClassName?: string;
  isPrimary?: boolean;
}) {
  return (
    <Select
      fullWidth
      value={selectedKey}
      onChange={(value: Key | null) => onChange(String(value ?? ""))}
      className={selectClassName}
      variant={isPrimary ? "primary" : "secondary"}
    >
      <Select.Trigger className="py-1.5">
        <div className="flex flex-col">
          {label && <div className="text-xs font-medium text-zinc-500">{label}</div>}
          <Select.Value className={valueClassName} />
        </div>
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
