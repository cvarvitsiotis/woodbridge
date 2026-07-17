"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { getParagraphStyle } from "@/styles/styles";
import { Input, Label } from "@heroui/react";
import FileErrorInfo from "./fileErrorInfo";

function PromptIndividualsWrapper({
  show,
  handlePromptIndividualsAction,
}: {
  show: boolean;
  handlePromptIndividualsAction: (individualsFileContent: string | null) => void;
}) {
  if (!show) return null;
  return (
    <div className="-mt-2">
      <PromptIndividuals handlePromptIndividualsAction={handlePromptIndividualsAction} />
    </div>
  );
}

function PromptIndividuals({
  handlePromptIndividualsAction,
}: {
  handlePromptIndividualsAction: (individualsFileContent: string | null) => void;
}) {
  const [fileReadError, setFileReadError] = useState<DOMException | null>();

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    function handleFileLoad(event: ProgressEvent<FileReader>) {
      handlePromptIndividualsAction((event.target?.result as string) ?? null);
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
        <Label>Individuals</Label>
        <Input
          type="file"
          accept=".csv"
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

export default function PromptIndividualsSection({
  show,
  handlePromptIndividualsAction,
  individualsError,
}: {
  show: boolean;
  handlePromptIndividualsAction: (individualsFileContent: string | null) => void;
  individualsError: string | undefined;
}) {
  return (
    <>
      <PromptIndividualsWrapper
        show={show}
        handlePromptIndividualsAction={handlePromptIndividualsAction}
      />
      <FileErrorInfo>{individualsError}</FileErrorInfo>
    </>
  );
}
