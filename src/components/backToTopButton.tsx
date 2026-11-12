"use client";

import StyledButton from "@/components/styledButton";
import { ChevronDown } from "@/components/icons";

export default function BackToTopButton() {
  return (
    <div className="sticky bottom-4 z-30 mt-4 ml-auto flex w-fit sm:bottom-6">
      <StyledButton
        isIconOnly
        variant="primary"
        aria-label="Back to top"
        className="shadow-lg shadow-black/25"
        size="lg"
        onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronDown fill="currentColor" strokeWidth={3} className="rotate-180" />
      </StyledButton>
    </div>
  );
}
