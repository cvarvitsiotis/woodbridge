import { PressEvent, Switch } from "@heroui/react";
import StyledInput from "./styledInput";
import StyledButton from "./styledButton";

function ShouldPromptAgeGroups({
  show,
  shouldPromptAgeGroups,
  handleShouldPromptAgeGroupsAction,
}: {
  show: boolean;
  shouldPromptAgeGroups: boolean;
  handleShouldPromptAgeGroupsAction: (value: boolean) => void;
}) {
  if (!show) return null;
  return (
    <Switch
      isSelected={shouldPromptAgeGroups}
      onChange={handleShouldPromptAgeGroupsAction}
      className="mt-8"
      size="lg"
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <div className="text-lg font-light">Show age group results</div>
      </Switch.Content>
    </Switch>
  );
}

function PromptAgeGroups({
  show,
  ageGroups,
  handlePromptAgeGroupsAction,
  handlePromptAgeGroupsSubmissionAction,
}: {
  show: boolean;
  ageGroups: string;
  handlePromptAgeGroupsAction: (value: string) => void;
  handlePromptAgeGroupsSubmissionAction: (e: PressEvent) => void;
}) {
  if (!show) return null;
  return (
    <div className="flex items-end gap-2 space-y-4 pt-2">
      <StyledInput
        label="Age Groups (e.g. 10, 20, ...)"
        value={ageGroups}
        onValueChange={handlePromptAgeGroupsAction}
        includeSearchIcon={false}
        isPrimary={false}
        textFieldClassName="w-xs"
      />
      <StyledButton onPress={handlePromptAgeGroupsSubmissionAction} className="mb-4">
        Submit
      </StyledButton>
    </div>
  );
}

export default function PromptAgeGroupsSection({
  show,
  shouldPromptAgeGroups,
  handleShouldPromptAgeGroupsAction,
  ageGroups,
  handlePromptAgeGroupsAction,
  handlePromptAgeGroupsSubmissionAction,
}: {
  show: boolean;
  shouldPromptAgeGroups: boolean;
  handleShouldPromptAgeGroupsAction: (value: boolean) => void;
  ageGroups: string;
  handlePromptAgeGroupsAction: (value: string) => void;
  handlePromptAgeGroupsSubmissionAction: (e: PressEvent) => void;
}) {
  return (
    <>
      <ShouldPromptAgeGroups
        show={show}
        shouldPromptAgeGroups={shouldPromptAgeGroups}
        handleShouldPromptAgeGroupsAction={handleShouldPromptAgeGroupsAction}
      />
      <PromptAgeGroups
        show={shouldPromptAgeGroups}
        ageGroups={ageGroups}
        handlePromptAgeGroupsAction={handlePromptAgeGroupsAction}
        handlePromptAgeGroupsSubmissionAction={handlePromptAgeGroupsSubmissionAction}
      />
    </>
  );
}
