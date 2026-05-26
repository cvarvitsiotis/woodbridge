import { pages } from "@/config/site";
import ButtonLink from "@/components/buttonLink";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <p>This page could not found</p>
      <ButtonLink href={pages.home.path} variant="primary">
        Go back home
      </ButtonLink>
    </div>
  );
}
