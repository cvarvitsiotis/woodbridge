import { data } from "@/config/data";
import OfficialResults from "@/components/officialResults";

export default function Page() {
  return <OfficialResults selectedYear={data.pdfResultEndYear} />;
}
