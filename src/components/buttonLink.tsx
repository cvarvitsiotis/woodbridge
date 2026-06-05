import { ButtonRootProps } from "@heroui/react";
import StyledButton from "@/components/styledButton";
import { ReactNode } from "react";

export default function ButtonLink({
  href,
  isExternal = false,
  variant,
  customVariantColor,
  size,
  className,
  children,
}: {
  href: string;
  isExternal?: boolean;
  customVariantColor?: "ghostPrimary" | "ghostSecondary";
  children: ReactNode;
} & ButtonRootProps) {
  return (
    <a href={href} {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}>
      <StyledButton
        variant={variant}
        customVariantColor={customVariantColor}
        size={size}
        className={className}
      >
        {children}
      </StyledButton>
    </a>
  );
}
