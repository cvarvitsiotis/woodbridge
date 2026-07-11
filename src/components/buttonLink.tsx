import { ButtonRootProps } from "@heroui/react";
import StyledButton from "@/components/styledButton";
import { AnchorHTMLAttributes, ReactNode } from "react";

export default function ButtonLink({
  href,
  isExternal = false,
  download,
  variant,
  customVariantColor,
  size,
  className,
  children,
}: {
  isExternal?: boolean;
  customVariantColor?: "ghostPrimary" | "ghostSecondary";
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonRootProps) {
  return (
    <a
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      download={download}
    >
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
