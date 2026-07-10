"use client";

import clsx from "clsx";
import { ChangeEvent, ReactNode, useState } from "react";
import { getParagraphStyle } from "@/styles/styles";
import { Input, Label, Radio, RadioGroup } from "@heroui/react";
import StyledInput from "./styledInput";
import { ParseUltraStateType } from "@/types";

const AnchorTypes = {
  RaceStartTime: "1",
  RunnerResultTime: "2",
};

function AnchorTypeRadio({ value, label }: { value: string; label: string }) {
  return (
    <Radio value={value} className="mt-0">
      <Radio.Content>
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <div className="text-lg font-light">{label}</div>
      </Radio.Content>
    </Radio>
  );
}

function AnchorTypeRadioGroup({
  anchorType,
  handleAnchorTypeChange,
}: {
  anchorType: string;
  handleAnchorTypeChange: (value: string) => void;
}) {
  return (
    <RadioGroup value={anchorType} onChange={handleAnchorTypeChange} className="pl-4">
      <AnchorTypeRadio value={AnchorTypes.RaceStartTime} label="Race start time" />
      <AnchorTypeRadio
        value={AnchorTypes.RunnerResultTime}
        label="Particular athlete's result time"
      />
    </RadioGroup>
  );
}

function ErrorInfo({ children }: { children: ReactNode }) {
  return (
    <div>
      <p>Error reading file:</p>
      <p className="text-rose-700">{children}</p>
    </div>
  );
}

export default function PromptUltra({
  raceStartTime,
  setRaceStartTime,
  runnerResultTime,
  setRunnerResultTime,
  runnerBib,
  setRunnerBib,
  setFileContent,
  handlePromptUltraAction,
}: ParseUltraStateType & {
  handlePromptUltraAction?: () => void;
}) {
  const [anchorType, setAnchorType] = useState("");
  const [fileReadError, setFileReadError] = useState<DOMException | null>();
  const [isDisabled, setIsDisabled] = useState(false);

  function handleAnchorTypeChange(value: string) {
    setAnchorType(value);
    if (value === AnchorTypes.RaceStartTime) {
      setRunnerResultTime("");
      setRunnerBib("");
    } else {
      setRaceStartTime("");
    }
    setFileContent("");
    setIsDisabled(false);
    handlePromptUltraAction?.();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    function handleFileLoad(event: ProgressEvent<FileReader>) {
      setFileContent(event.target?.result ?? null);
      setIsDisabled(true);
    }

    function handleFileError(event: ProgressEvent<FileReader>) {
      setFileReadError(event.target?.error);
    }

    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = handleFileLoad;
      reader.onerror = handleFileError;
      reader.readAsText(file);
      handlePromptUltraAction?.();
    }
  }

  return (
    <div className={clsx("space-y-4", getParagraphStyle(false, false))}>
      <div className="space-y-2">
        <p>
          We need to convert the Ultra data from time of day to result time. To do so, we need an
          anchor point.
        </p>
        <p>Pick the one that you know most-accurately:</p>
        <AnchorTypeRadioGroup
          anchorType={anchorType}
          handleAnchorTypeChange={handleAnchorTypeChange}
        />
        <div className="w-xs space-y-2 pt-2">
          <div className="space-y-2">
            {anchorType === AnchorTypes.RaceStartTime && (
              <StyledInput
                label="Start Time (HH:mm:ss.fff)"
                value={raceStartTime}
                onValueChange={setRaceStartTime}
                includeSearchIcon={false}
                isPrimary={false}
                isDisabled={isDisabled}
              />
            )}
            {anchorType === AnchorTypes.RunnerResultTime && (
              <div className="space-y-2">
                <StyledInput
                  label="Result Time (HH:mm:ss.fff)"
                  value={runnerResultTime}
                  onValueChange={setRunnerResultTime}
                  includeSearchIcon={false}
                  isPrimary={false}
                  isDisabled={isDisabled}
                />
                <StyledInput
                  label="Bib Number"
                  value={runnerBib}
                  onValueChange={setRunnerBib}
                  includeSearchIcon={false}
                  isPrimary={false}
                  isDisabled={isDisabled}
                />
              </div>
            )}
          </div>
          {anchorType && (raceStartTime || (runnerResultTime && runnerBib)) && (
            <div>
              <Label>Ultra File</Label>
              <Input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="w-full"
                variant="secondary"
              />
            </div>
          )}
        </div>
      </div>
      {fileReadError && (
        <ErrorInfo>
          {fileReadError.name} - {fileReadError.message}
        </ErrorInfo>
      )}
    </div>
  );
}
