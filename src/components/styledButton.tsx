"use client";

import { ReactNode } from "react";
import { Button, ButtonRootProps } from "@heroui/react";
import { Ripple } from "m3-ripple";

import "m3-ripple/ripple.css";

export default function StyledButton({
  variant,
  size,
  onPress,
  className,
  children,
}: {
  children: ReactNode;
} & ButtonRootProps) {
  return (
    <Button variant={variant} size={size} className={className} onPress={onPress}>
      <Ripple />
      {children}
    </Button>
  );
}
