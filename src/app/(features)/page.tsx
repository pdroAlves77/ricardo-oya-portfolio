import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { Divider } from "@/components/ui/Divider";
import { LeadText } from "@/components/ui/LeadText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SITE_CONFIG } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/queries/projects";
import type { PortfolioProject } from "@/types/project";

export const metadata: Metadata = {
  title: {
    absolute: SITE_CONFIG.title,
  },

  description: SITE_CONFIG.description,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
};

export default async function HomePage() {
  const projects = await client.fetch<
    PortfolioProject[]
  >(
    PROJECTS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["projects"],
      },
    },
  );

  const featuredProject =
    projects.find((project) => project.featured) ??
    projects[0];

  const remainingProjects = featuredProject
    ? projects.filter(
        (project) =>
          project._id !== featuredProject._id,
      )
    : [];

  return (
    <main>
      <Container>
        <section className="pb-14 pt-14 sm:pb-16 sm:pt-16 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <SectionLabel className="tracking-[0.22em]">
                Creative Retoucher
              </SectionLabel>

              <span
                aria-hidden="true"
                className="h-px w-12 bg-border"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <DisplayTitle
              size="large"
              className="mt-7"
            >
              Ricardo Oya
            </DisplayTitle>
          </Reveal>

          <Reveal delay={0.16}>
            <div
              className="
                mt-10
                grid
                gap-7
                md:mt-12
                md:grid-cols-[minmax(0,46rem)_auto]
                md:items-end
                md:justify-between
              "
            >
              <LeadText className="max-w-3xl text-base leading-7 md:text-xl md:leading-9">
                High-end retouching and image editing for
                international projects.
              </LeadText>

              <div className="flex items-center gap-3 md:justify-self-end">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-foreground"
                />

                <SectionLabel className="tracking-[0.18em]">
                  Available for freelance projects
                </SectionLabel>
              </div>
            </div>
          </Reveal>
        </section>

        <Divider />

        {featuredProject ? (
          <section
            aria-labelledby="featured-project-heading"
            className="py-12 sm:py-14 md:py-16 lg:py-20"
          >
            <Reveal>
              <SectionHeader
                id="featured-project-heading"
                number="01"
                title="Featured Work"
                meta={
                  <>
                    {featuredProject.category} ·{" "}
                    {featuredProject.year}
                  </>
                }
                className="mb-8 md:mb-10"
              />
            </Reveal>

            <Reveal
              delay={0.08}
              distance={36}
            >
              <ProjectCard
                project={featuredProject}
                priority
                variant="featured"
              />
            </Reveal>
          </section>
        ) : (
          <section
            aria-labelledby="empty-portfolio-heading"
            className="py-20"
          >
            <h2
              id="empty-portfolio-heading"
              className="text-base font-normal text-muted"
            >
              No projects have been published yet.
            </h2>
          </section>
        )}

        {remainingProjects.length > 0 && (
          <>
            <Divider />

            <section
              aria-labelledby="more-work-heading"
              className="pb-20 pt-12 sm:pt-14 md:pb-28 md:pt-16"
            >
              <Reveal>
                <SectionHeader
                  id="more-work-heading"
                  number="02"
                  title="More Work"
                  meta={
                    <>
                      {String(
                        remainingProjects.length,
                      ).padStart(2, "0")}{" "}
                      {remainingProjects.length === 1
                        ? "project"
                        : "projects"}
                    </>
                  }
                />
              </Reveal>

              <div
                className="
                  mt-10
                  grid
                  grid-cols-1
                  gap-x-5
                  gap-y-14
                  md:mt-14
                  md:grid-cols-2
                  lg:gap-x-6
                  lg:gap-y-20
                  xl:grid-cols-3
                "
              >
                {remainingProjects.map(
                  (project, index) => (
                    <Reveal
                      key={project._id}
                      delay={Math.min(
                        index * 0.06,
                        0.24,
                      )}
                      distance={32}
                    >
                      <ProjectCard
                        project={project}
                      />
                    </Reveal>
                  ),
                )}
              </div>
            </section>
          </>
        )}
      </Container>
    </main>
  );
}