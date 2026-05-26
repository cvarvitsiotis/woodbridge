import { Button, ButtonRootProps } from "@heroui/react";

export default function ButtonLink({
  href,
  isExternal = false,
  variant,
  size,
  className,
  children,
}: {
  href: string;
  isExternal?: boolean;
} & ButtonRootProps) {
  return (
    <a href={href} {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}>
      <Button variant={variant} size={size} className={className}>
        {children}
      </Button>
    </a>
  );
}
