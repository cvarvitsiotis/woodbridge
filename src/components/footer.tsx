"use client";

import React from "react";
import { Link } from "@heroui/link";

import { urls } from "@/config/data";
import { pages, siteConfig } from "@/config/site";
import PresentedByAsics from "./presentedByAsics";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import woodbridgeHigh from "@/../public/images/woodbridge-high-solo.png";
import northwoodHigh from "@/../public/images/northwood-high-solo.png";
import { IrvineTimingLogo } from "./icons";
import clsx from "clsx";

function FooterLink({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <Link isExternal href={url} className="text-sm">
      {children}
    </Link>
  );
}

function HostSchool({
  isFirst,
  url,
  name,
  imageWrapperClassName,
  imageSrc,
  imageClassName,
}: {
  isFirst: boolean;
  url: string;
  name: string;
  imageWrapperClassName: string;
  imageSrc: StaticImageData;
  imageClassName: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-0.5 sm:gap-0">
      <p
        className={clsx(
          isFirst ? "basis-full sm:basis-auto" : "hidden",
          "sm:inline",
          "text-center sm:pr-1",
        )}
      >
        {isFirst ? "Hosted by" : "and"}
      </p>
      <FooterLink url={url}>
        <div className={clsx("min-w-20 sm:min-w-0", !isFirst && "pr-1")}>
          <div className={clsx("relative justify-self-end", imageWrapperClassName)}>
            <Image fill src={imageSrc} quality={100} alt={name} className={imageClassName} />
          </div>
        </div>
        <p className="min-w-22 sm:min-w-0">{name}</p>
      </FooterLink>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();

  const isHomePage = pathname === pages.home.path;

  return (
    <footer
      className={clsx(
        "z-10 flex w-full max-w-(--breakpoint-2xl) items-start justify-between p-3 sm:items-end",
        !isHomePage && "pt-20",
      )}
    >
      <div className="flex justify-start sm:basis-1/3">
        <PresentedByAsics isFooter />
      </div>
      <div className="text-sm text-default-600 sm:basis-1/3">
        <HostSchool
          isFirst={true}
          url={urls.schools.woodbridgeHighSchool}
          name={siteConfig.woodbridge}
          imageWrapperClassName="aspect-1143/419 h-6"
          imageSrc={woodbridgeHigh}
          imageClassName="brightness-90"
        />
        <div className="-mt-0.5 sm:mt-0">
          <HostSchool
            isFirst={false}
            url={urls.schools.northwoodHighSchool}
            name={siteConfig.northwood}
            imageWrapperClassName="aspect-582/365 h-7"
            imageSrc={northwoodHigh}
            imageClassName="invert-85"
          />
        </div>
      </div>
      <div className="flex justify-end self-center sm:basis-1/3">
        <FooterLink url={urls.athleticNet.irvineTiming}>
          <IrvineTimingLogo />
        </FooterLink>
      </div>
    </footer>
  );
}
