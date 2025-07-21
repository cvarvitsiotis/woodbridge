import { ReactNode } from "react";

export default function PageHeader({ children }: { children: ReactNode }) {
  return (
    <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">{children}</h1>
  );
}
