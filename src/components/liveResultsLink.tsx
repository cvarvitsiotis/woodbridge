"use client";

import clsx from "clsx";
import BaseLink from "@/components/baseLink";
import Image, { StaticImageData } from "next/image";
import { Ripple } from "m3-ripple";

import "m3-ripple/ripple.css";

export default function LiveResultsLink({
  url,
  label,
  linkClass,
  labelClass,
  imageSrc,
  imageAspectRatio,
  imageClass,
}: {
  url: string;
  label: string;
  linkClass: string;
  labelClass: string;
  imageSrc: StaticImageData;
  imageAspectRatio: string;
  imageClass?: string;
}) {
  return (
    <BaseLink
      isExternal
      href={url}
      applyBaseLinkStyle={false}
      className={clsx(
        "relative block w-fit overflow-hidden rounded-2xl shadow-lg outline-none no-highlight",
        linkClass,
        "origin-center transform-gpu transition duration-150 ease-in-out will-change-transform motion-reduce:transition-none",
        "hover:opacity-80 focus-visible:status-focused active:scale-95",
      )}
    >
      <Ripple />
      <div className={clsx("border-b py-1 text-center tracking-wide", labelClass)}>{label}</div>
      <div className={clsx("relative mx-3 mt-4 mb-2 h-9 sm:h-10", imageAspectRatio, imageClass)}>
        <Image fill src={imageSrc} quality={100} alt={label} />
      </div>
    </BaseLink>
  );
}
