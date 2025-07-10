import { AsicsLogo, KeckLogo } from "@/components/icons";
import { urls } from "@/config/data";
import Image from "next/image";
import martinLawLogo from "@/../public/martin-law-logo.png";
import { Link } from "@heroui/link";
import { fontSerif } from "@/styles/fonts";
import clsx from "clsx";
import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.sponsors.menuLabel,
};

function Sponsor({
  url,
  motto,
  children,
}: {
  url: string;
  motto: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:justify-auto grid items-center justify-center justify-items-start gap-x-10 gap-y-2 pt-12 md:auto-cols-fr md:grid-flow-col">
      <div className="justify-self-center md:justify-self-auto">
        <Link isExternal href={url}>
          {children}
        </Link>
      </div>
      <p className="justify-self-center text-lg font-light md:justify-self-auto">{motto}</p>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        Meet <span className="font-bold">Sponsors</span>
      </h1>
      <p className={clsx("pt-8 text-center text-2xl font-light sm:pt-10", fontSerif.className)}>
        The following are the sponsors that make this great meet possible.
      </p>
      <div className="mx-auto max-w-2xl">
        <Sponsor url={urls.sponsors.asics} motto="Sound Mind, Sound Body">
          <AsicsLogo height="h-16" />
        </Sponsor>
        <Sponsor url={urls.sponsors.keck} motto="Limitless Possibilities">
          <KeckLogo />
        </Sponsor>
        <Sponsor url={urls.sponsors.martinLaw} motto="Dedicated to Representing Employers">
          <Image
            height={40}
            src={martinLawLogo}
            quality={100}
            placeholder="blur"
            alt="Martin Law Logo"
            className="dark:invert"
          />
        </Sponsor>
      </div>
    </>
  );
}
