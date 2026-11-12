import { ListBox, Select } from "@heroui/react";
import type { Key } from "@heroui/react";
import DelayedSpinner from "@/components/delayedSpinner";

export default function StyledSelect({
  options,
  onChange,
  selectedKey,
  label,
  selectClassName,
  valueClassName,
  itemClassName,
  isPrimary = true,
  isPending = false,
  disabledKeys,
}: {
  options: string[];
  onChange: (value: string) => void;
  selectedKey: string;
  label?: string;
  selectClassName?: string;
  valueClassName?: string;
  itemClassName?: string;
  isPrimary?: boolean;
  isPending?: boolean;
  disabledKeys?: Iterable<Key>;
}) {
  return (
    <Select
      fullWidth
      value={selectedKey}
      onChange={(value: Key | null) => onChange(String(value ?? ""))}
      className={selectClassName}
      variant={isPrimary ? "primary" : "secondary"}
      disabledKeys={disabledKeys}
    >
      <Select.Trigger className="py-1.5">
        <div className="flex flex-col">
          {label && <div className="text-xs font-medium text-zinc-500">{label}</div>}
          <Select.Value className={valueClassName} />
        </div>
        <Select.Indicator>{isPending && <DelayedSpinner />}</Select.Indicator>
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item key={option} id={option} textValue={option} className={itemClassName}>
              {option}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
