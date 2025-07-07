import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="flex flex-1 justify-center">
      <Spinner label="Loading..." variant="simple" size="lg" />
    </div>
  );
}
