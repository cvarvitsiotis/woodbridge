import clsx from "clsx";
import { getParagraphStyle } from "@/styles/styles";
import StyledInput from "./styledInput";

export default function PromptAgeGroups({
  ageGroups,
  handlePromptAgeGroupsAction,
}: {
  ageGroups: string;
  handlePromptAgeGroupsAction: (value: string) => void;
}) {
  return (
    <div className={clsx("space-y-4", getParagraphStyle(false, false))}>
      <div className="w-xs pt-2">
        <StyledInput
          label="Age Groups (e.g. 10, 20, ...)"
          value={ageGroups}
          onValueChange={handlePromptAgeGroupsAction}
          includeSearchIcon={false}
          isPrimary={false}
        />
      </div>
    </div>
  );
}
