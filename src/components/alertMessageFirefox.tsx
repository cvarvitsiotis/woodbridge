import { Alert } from "@heroui/react";

export default function AlertMessageFirefox() {
  return (
    <div className="mx-auto pt-6">
      <Alert status="danger" className="py-2">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title className="text-base">
            Page has not been configured for this browser.
          </Alert.Title>
          <Alert.Description className="text-base font-normal">
            Please try Safari, Chrome, Edge, etc.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </div>
  );
}
