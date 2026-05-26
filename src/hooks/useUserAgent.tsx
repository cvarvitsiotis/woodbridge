import { useSyncExternalStore } from "react";

function getSnapshot() {
  return typeof navigator === "undefined" ? undefined : navigator.userAgent;
}

function getServerSnapshot() {
  return undefined;
}

function subscribe() {
  return function () {};
}

export function useUserAgent() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
