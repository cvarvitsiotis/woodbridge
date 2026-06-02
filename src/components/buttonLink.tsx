import { ButtonRootProps } from "@heroui/react";
import StyledButton from "@/components/styledButton";
import { ReactNode } from "react";

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
  children: ReactNode;
} & ButtonRootProps) {
  return (
    <a href={href} {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}>
      <StyledButton variant={variant} size={size} className={className}>
        {children}
      </StyledButton>
    </a>
  );
}
