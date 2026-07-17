import { Switch } from "@heroui/react";

export default function PromptTeamsWrapper({
  show,
  shouldPromptTeams,
  handleShouldPromptTeamsAction,
}: {
  show: boolean;
  shouldPromptTeams: boolean;
  handleShouldPromptTeamsAction: (value: boolean) => void;
}) {
  if (!show) return null;
  return (
    <Switch
      isSelected={shouldPromptTeams}
      onChange={handleShouldPromptTeamsAction}
      className="mt-8"
      size="lg"
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <div className="text-lg font-light">Show team results</div>
      </Switch.Content>
    </Switch>
  );
}
