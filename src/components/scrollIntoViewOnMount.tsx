"use client";

import { ReactNode, useEffect, useRef } from "react";

export default function ScrollIntoViewOnMount({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return <div ref={ref}>{children}</div>;
}
