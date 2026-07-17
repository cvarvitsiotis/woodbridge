import PromptLIFSection from "./promptLIFSection";

export default function LIFResultsWrapper({
  handlePromptLIFAction,
  rawResultsError,
}: {
  handlePromptLIFAction: (lifFileContent: string | null) => void;
  rawResultsError: string | undefined;
}) {
  return (
    <PromptLIFSection
      handlePromptLIFAction={handlePromptLIFAction}
      rawResultsError={rawResultsError}
    />
  );
}
