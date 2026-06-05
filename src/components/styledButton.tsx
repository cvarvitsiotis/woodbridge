"use client";

import { ReactNode } from "react";
import { Button, ButtonRootProps } from "@heroui/react";
import clsx from "clsx";
import { Ripple } from "m3-ripple";

import "m3-ripple/ripple.css";

export default function StyledButton({
  variant,
  customVariantColor,
  size,
  onPress,
  className,
  children,
}: {
  customVariantColor?: "ghostPrimary" | "ghostSecondary";
  children: ReactNode;
} & ButtonRootProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={clsx(
        className,
        customVariantColor === "ghostPrimary" && "border-accent text-accent hover:bg-accent",
        customVariantColor === "ghostSecondary" &&
          "border-violet-500 text-violet-500 hover:bg-violet-500",
        (customVariantColor === "ghostPrimary" || customVariantColor === "ghostSecondary") &&
          "border-2 transition duration-200 hover:text-white",
      )}
      onPress={onPress}
    >
      <Ripple />
      {children}
    </Button>
  );
}
