import { ParseUltraStateType } from "@/types";
import { useState } from "react";

export default function useParseUltra(): ParseUltraStateType {
  const [raceStartTime, setRaceStartTime] = useState("");
  const [runnerResultTime, setRunnerResultTime] = useState("");
  const [runnerBib, setRunnerBib] = useState("");
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);

  return {
    raceStartTime,
    setRaceStartTime,

    runnerResultTime,
    setRunnerResultTime,

    runnerBib,
    setRunnerBib,

    fileContent,
    setFileContent,
  };
}
