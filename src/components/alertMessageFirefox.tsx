import { Alert } from "@heroui/alert";

export default function AlertMessageFirefox() {
  return (
    <div className="mx-auto pt-6">
      <Alert
        hideIconWrapper
        color="danger"
        title={
          <div className="space-y-1">
            <p>Page has not been configured for this browser.</p>
            <p>Please try Safari, Chrome, Edge, etc.</p>
          </div>
        }
        variant="faded"
        radius="sm"
        classNames={{
          base: "p-3",
          title: "text-medium font-normal",
        }}
      />
    </div>
  );
}
