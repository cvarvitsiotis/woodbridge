"use client";

import { Card } from "@heroui/react";
import clsx from "clsx";
import BaseLink from "@/components/baseLink";
import Image, { StaticImageData } from "next/image";
import { Ripple } from "m3-ripple";

export default function LiveResultsLink({
  url,
  label,
  imageSrc,
  imageAspectRatio,
  imageClass,
}: {
  url: string;
  label: string;
  imageSrc: StaticImageData;
  imageAspectRatio: string;
  imageClass?: string;
}) {
  return (
    <>
      <BaseLink isExternal href={url} applyBaseLinkStyle={false}>
        <Card
          className={clsx(
            "w-fit overflow-hidden rounded-2xl p-0 shadow-md",
            "font-medium tracking-wide text-blue-800",
            "border border-blue-800/20",
            "bg-blue-800/35 transition duration-200 hover:opacity-80",
          )}
        >
          <div>
            <Ripple />
            <div className="border-b border-blue-800/20 py-1 text-center">{label}</div>
            <div className={clsx("relative m-3 h-10", imageAspectRatio, imageClass)}>
              <Image fill src={imageSrc} quality={100} alt={label} />
            </div>
          </div>
        </Card>
      </BaseLink>
    </>
  );
}
