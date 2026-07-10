"use client";

import clsx from "clsx";
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { getParagraphStyle } from "@/styles/styles";
import { Input, Label } from "@heroui/react";

function ErrorInfo({ children }: { children: ReactNode }) {
  return (
    <div>
      <p>Error reading file:</p>
      <p className="text-rose-700">{children}</p>
    </div>
  );
}

export default function PromptIndividuals({
  handlePromptIndividualsAction,
}: {
  handlePromptIndividualsAction: (individualsFileContent: string | ArrayBuffer | null) => void;
}) {
  const [fileReadError, setFileReadError] = useState<DOMException | null>();

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    function handleFileLoad(event: ProgressEvent<FileReader>) {
      handlePromptIndividualsAction(event.target?.result ?? null);
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
        <ErrorInfo>
          {fileReadError.name} - {fileReadError.message}
        </ErrorInfo>
      )}
    </div>
  );
}
