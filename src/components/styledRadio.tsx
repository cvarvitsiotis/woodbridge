import { Description, Radio } from "@heroui/react";
import clsx from "clsx";

export default function StyledRadio({
  value,
  title,
  description,
}: {
  value: string;
  title: string;
  description?: string;
}) {
  return (
    <Radio value={value}>
      <Radio.Content
        className={clsx(
          "flex max-w-xs items-start justify-between gap-4 rounded-xl border border-transparent bg-surface-tertiary px-5 py-2 transition-all",
          "data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
        )}
      >
        <div className="space-y-1">
          <div>{title}</div>
          {description && <Description>{description}</Description>}
        </div>
        <Radio.Control className="size-5">
          <Radio.Indicator />
        </Radio.Control>
      </Radio.Content>
    </Radio>
  );
}
