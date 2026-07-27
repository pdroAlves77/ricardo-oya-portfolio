import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { DisplayTitle } from "./DisplayTitle";
import { LeadText } from "./LeadText";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

type PageHeroProps = {
  label: string;
  title: string;
  description?: ReactNode;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
};

export function PageHero({
  label,
  title,
  description,
  className,
  contentClassName,
  titleClassName,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "pb-16 pt-14 md:pb-24 md:pt-20 lg:pt-24",
        className,
      )}
    >
      <Reveal>
        <SectionLabel className="tracking-[0.22em]">
          {label}
        </SectionLabel>
      </Reveal>

      <div
        className={cn(
          "mt-7 grid gap-12 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-end",
          contentClassName,
        )}
      >
        <Reveal delay={0.08}>
          <DisplayTitle className={titleClassName}>
            {title}
          </DisplayTitle>
        </Reveal>

        {description && (
          <Reveal delay={0.16}>
            {typeof description === "string" ? (
              <LeadText className="max-w-xl">
                {description}
              </LeadText>
            ) : (
              <div className="max-w-xl text-lg leading-8 text-muted md:text-xl md:leading-9">
                {description}
              </div>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}