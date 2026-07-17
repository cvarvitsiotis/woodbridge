import { RawResult } from "@/types";
import PromptDownloadLIFSection from "./promptDownloadLIFSection";

export default function DownloadLIFWrapper({
  rawResults,
  shouldPromptDownloadLIF,
  handleShouldPromptDownloadLIFAction,
  raceNumber,
  handlePromptDownloadLIFAction,
}: {
  rawResults: RawResult[] | undefined;
  shouldPromptDownloadLIF: boolean;
  handleShouldPromptDownloadLIFAction: (value: boolean) => void;
  raceNumber: number;
  handlePromptDownloadLIFAction: (value: number) => void;
}) {
  return (
    <>
      <PromptDownloadLIFSection
        rawResults={rawResults}
        shouldPromptDownloadLIF={shouldPromptDownloadLIF}
        handleShouldPromptDownloadLIFAction={handleShouldPromptDownloadLIFAction}
        raceNumber={raceNumber}
        handlePromptDownloadLIFAction={handlePromptDownloadLIFAction}
      />
    </>
  );
}
