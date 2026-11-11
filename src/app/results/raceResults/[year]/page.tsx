import { resultYears } from "@/config/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return resultYears.map((year) => ({ year: String(year) }));
}

export default function Page() {
  return null;
}
