import { useEffect, useState } from "react";

export function useUserAgent() {
  const [userAgent, setUserAgent] = useState<string>("");

  useEffect(function () {
    if (navigator === undefined) return;
    setUserAgent(navigator.userAgent);
  }, []);

  return userAgent;
}
