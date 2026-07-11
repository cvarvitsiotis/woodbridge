import { ReactNode } from "react";

export default function FileErrorInfo({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <div>
      <p>Error reading file:</p>
      <p className="text-rose-700">{children}</p>
    </div>
  );
}
