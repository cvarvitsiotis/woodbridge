import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex flex-1 justify-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
