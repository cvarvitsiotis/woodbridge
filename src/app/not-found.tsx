import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { pages } from "@/config/site";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <p>This page could not found</p>
      <Button as={Link} color="primary" radius="full" variant="solid" href={pages.home.path}>
        Go back home
      </Button>
    </div>
  );
}
