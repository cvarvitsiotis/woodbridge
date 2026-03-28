import { Alert } from "@heroui/react";

export default function AlertMessageFirefox() {
  return (
    <div className="mx-auto pt-6">
      <Alert className="rounded-sm p-3">
        <Alert.Content>
          <Alert.Title className="text-medium font-normal">
            <div className="space-y-1">
              <p>Page has not been configured for this browser.</p>
              <p>Please try Safari, Chrome, Edge, etc.</p>
            </div>
          </Alert.Title>
        </Alert.Content>
      </Alert>
    </div>
  );
}
