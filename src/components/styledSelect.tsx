import { Select, SelectItem } from "@heroui/select";
import { SelectSlots, SlotsToClasses } from "@heroui/theme";

export default function StyledSelect({
  options,
  onChange,
  selectedKey,
  label,
  labelPlacement,
  size,
  className,
  classNames,
}: {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedKey: string;
  label: string;
  labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  className?: string;
  classNames?: SlotsToClasses<SelectSlots>;
}) {
  return (
    <Select
      selectedKeys={[selectedKey]}
      size={size ?? "sm"}
      onChange={onChange}
      label={label}
      labelPlacement={labelPlacement ?? "inside"}
      variant="faded"
      className={className}
      classNames={{
        trigger: "border border-default-300",
        ...classNames,
      }}
    >
      {options.map((option) => (
        <SelectItem key={option}>{option}</SelectItem>
      ))}
    </Select>
  );
}
