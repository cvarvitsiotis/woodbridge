import { Alert, AlertVariants } from "@heroui/react";
import clsx from "clsx";
import { ReactNode } from "react";

export default function StyledAlert({
  status,
  title,
  includeIndicator,
  isBaseSize,
  className,
  children,
}: {
  status: AlertVariants["status"];
  title?: string;
  includeIndicator: boolean;
  isBaseSize: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Alert
      status={status}
      className={clsx(
        "rounded-xl border",
        status === "danger" && "border-pink-200 bg-pink-100",
        status === "accent" && "border-blue-200 bg-blue-50",
        status === "warning" && "border-amber-200 bg-amber-50",
        className,
      )}
    >
      {includeIndicator && <Alert.Indicator />}
      <Alert.Content>
        {title && <Alert.Title className={clsx(isBaseSize && "text-base")}>{title}</Alert.Title>}
        <Alert.Description
          className={clsx(
            "font-normal",
            isBaseSize && "text-base",
            status === "danger" && "text-danger-soft-foreground",
            status === "accent" && "text-accent-soft-foreground",
            status === "warning" && "text-warning-soft-foreground",
          )}
        >
          {children}
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
