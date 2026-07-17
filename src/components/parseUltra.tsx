"use client";

import getRawResultsFromUltra from "@/utils/getRawResultsFromUltra";
import useParseUltra from "@/hooks/useParseUltra";
import { useMemo, useState } from "react";
import UltraResultsWrapper from "./ultraResultsWrapper";
import DownloadLIFWrapper from "./downloadLIFWrapper";

export default function ParseUltra() {
  const parseUltraState = useParseUltra();
  const [shouldPromptDownloadLIF, setShouldPromptDownloadLIF] = useState(false);
  const [raceNumber, setRaceNumber] = useState(0);

  function handlePromptUltraAction() {
    handleShouldPromptDownloadLIFAction(false);
  }

  function handleShouldPromptDownloadLIFAction(shouldPromptDownloadLIF: boolean) {
    setShouldPromptDownloadLIF(shouldPromptDownloadLIF);
    handlePromptDownloadLIFAction(0);
  }

  function handlePromptDownloadLIFAction(raceNumber: number) {
    setRaceNumber(raceNumber);
  }

  const { rawResults, rawResultsError } = useMemo(
    function () {
      return getRawResultsFromUltra(
        parseUltraState.fileContent,
        parseUltraState.raceStartTime,
        parseUltraState.runnerResultTime,
        parseUltraState.runnerBib,
      );
    },
    [
      parseUltraState.fileContent,
      parseUltraState.raceStartTime,
      parseUltraState.runnerResultTime,
      parseUltraState.runnerBib,
    ],
  );

  return (
    <div className="space-y-6">
      <UltraResultsWrapper
        parseUltraState={parseUltraState}
        handlePromptUltraAction={handlePromptUltraAction}
        rawResultsError={rawResultsError}
        rawResults={rawResults}
      />

      <DownloadLIFWrapper
        rawResults={rawResults}
        shouldPromptDownloadLIF={shouldPromptDownloadLIF}
        handleShouldPromptDownloadLIFAction={handleShouldPromptDownloadLIFAction}
        raceNumber={raceNumber}
        handlePromptDownloadLIFAction={handlePromptDownloadLIFAction}
      />
    </div>
  );
}
