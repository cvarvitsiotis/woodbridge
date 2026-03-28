"use client";

import { Button } from "@heroui/react";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(
    function () {
      console.error(error);
    },
    [error],
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <p>Something went wrong!</p>
      <Button variant="primary" className="rounded-full" onPress={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
