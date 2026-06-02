"use client";

import StyledButton from "@/components/styledButton";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error;
  unstable_retry: () => void;
}) {
  useEffect(
    function () {
      console.error(error);
    },
    [error],
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <p>Something went wrong!</p>
      <StyledButton variant="primary" onPress={() => unstable_retry()}>
        Try again
      </StyledButton>
    </div>
  );
}
