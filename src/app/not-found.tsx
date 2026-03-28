import { Button } from "@heroui/react";
import { pages } from "@/config/site";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <p>This page could not found</p>
      <a href={pages.home.path}>
        <Button variant="primary" className="rounded-full">
          Go back home
        </Button>
      </a>
    </div>
  );
}
