import { Link, Button } from "@heroui/react";
import { pages } from "@/config/site";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <p>This page could not found</p>
      <Button as={Link} variant="primary" className="rounded-full" href={pages.home.path}>
        Go back home
      </Button>
    </div>
  );
}
