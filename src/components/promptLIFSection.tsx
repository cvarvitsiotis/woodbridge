"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { getParagraphStyle } from "@/styles/styles";
import { Input, Label } from "@heroui/react";
import FileErrorInfo from "./fileErrorInfo";

function PromptLIFWrapper({
  handlePromptLIFAction,
}: {
  handlePromptLIFAction: (lifFileContent: string | null) => void;
}) {
  return (
    <div className="-mt-2">
      <PromptLIF handlePromptLIFAction={handlePromptLIFAction} />
    </div>
  );
}

function PromptLIF({
  handlePromptLIFAction,
}: {
  handlePromptLIFAction: (lifFileContent: string | null) => void;
}) {
  const [fileReadError, setFileReadError] = useState<DOMException | null>();

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    function handleFileLoad(event: ProgressEvent<FileReader>) {
      handlePromptLIFAction((event.target?.result as string) ?? null);
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
    }
  }

  return (
    <div className={clsx("space-y-4", getParagraphStyle(false, false))}>
      <div className="w-xs">
        <Label>LIF</Label>
        <Input
          type="file"
          accept=".lif"
          onChange={handleFileChange}
          className="w-full"
          variant="secondary"
        />
      </div>
      {fileReadError && (
        <FileErrorInfo>
          {fileReadError.name} - {fileReadError.message}
        </FileErrorInfo>
      )}
    </div>
  );
}

export default function PromptLIFSection({
  handlePromptLIFAction,
  rawResultsError,
}: {
  handlePromptLIFAction: (lifFileContent: string | null) => void;
  rawResultsError: string | undefined;
}) {
  return (
    <>
      <PromptLIFWrapper handlePromptLIFAction={handlePromptLIFAction} />
      <FileErrorInfo>{rawResultsError}</FileErrorInfo>
    </>
  );
}
