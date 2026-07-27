import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/queries/projects";
import type { PortfolioProject } from "@/types/project";

export default async function HomePage() {
  const projects =
    await client.fetch<PortfolioProject[]>(PROJECTS_QUERY);

  const featuredProject =
    projects.find((project) => project.featured) ?? projects[0];

  const remainingProjects = featuredProject
    ? projects.filter(
        (project) => project._id !== featuredProject._id,
      )
    : [];

  return (
    <main>
      <Container>
        <section
          className="
            border-b
            border-border
            pb-14
            pt-14
            sm:pb-16
            sm:pt-16
            md:pb-20
            md:pt-20
            lg:pb-24
            lg:pt-24
          "
        >
          <div className="flex items-center gap-4">
            <p
              className="
                text-xs
                uppercase
                tracking-[0.22em]
                text-muted
                md:text-sm
              "
            >
              Creative Retoucher
            </p>

            <span
              aria-hidden="true"
              className="h-px w-12 bg-border"
            />
          </div>

          <h1
            className="
              mt-7
              max-w-[10ch]
              text-[clamp(4rem,15vw,7rem)]
              font-medium
              leading-[0.8]
              tracking-[-0.075em]
              sm:text-[clamp(5rem,13vw,9rem)]
              lg:text-[clamp(6rem,10vw,11rem)]
            "
          >
            Ricardo Oya
          </h1>

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
            <p
              className="
                max-w-3xl
                text-base
                leading-7
                text-muted
                md:text-xl
                md:leading-9
              "
            >
              High-end retouching and image editing for automotive,
              commercial and international projects.
            </p>

            <div className="flex items-center gap-3 md:justify-self-end">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-foreground"
              />

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-muted
                  md:text-sm
                "
              >
                Available for freelance projects
              </p>
            </div>
          </div>
        </section>

        {featuredProject ? (
          <section
            aria-labelledby="featured-project-heading"
            className="py-12 sm:py-14 md:py-16 lg:py-20"
          >
            <div
              className="
                mb-8
                grid
                gap-5
                border-b
                border-border
                pb-6
                sm:grid-cols-[auto_minmax(0,1fr)_auto]
                sm:items-end
                md:mb-10
                md:pb-8
              "
            >
              <p
                className="
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-muted
                  md:text-base
                "
              >
                01
              </p>

              <div className="hidden items-center gap-5 sm:flex">
                <span
                  aria-hidden="true"
                  className="h-px w-12 bg-border"
                />

                <h2
                  id="featured-project-heading"
                  className="
                    text-xl
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    md:text-2xl
                  "
                >
                  Featured Work
                </h2>
              </div>

              <h2
                className="
                  text-2xl
                  font-medium
                  uppercase
                  tracking-[0.1em]
                  sm:hidden
                "
              >
                Featured Work
              </h2>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.17em]
                  text-muted
                  sm:text-right
                  md:text-sm
                "
              >
                {featuredProject.category} · {featuredProject.year}
              </p>
            </div>

            <ProjectCard
              project={featuredProject}
              priority
              variant="featured"
            />
          </section>
        ) : (
          <section className="py-20">
            <p className="text-base text-muted">
              No projects have been published yet.
            </p>
          </section>
        )}

        {remainingProjects.length > 0 && (
          <section
            aria-labelledby="more-work-heading"
            className="
              border-t
              border-border
              pb-20
              pt-12
              sm:pt-14
              md:pb-28
              md:pt-16
            "
          >
            <div
              className="
                grid
                gap-5
                border-b
                border-border
                pb-6
                sm:grid-cols-[auto_minmax(0,1fr)_auto]
                sm:items-end
                md:pb-8
              "
            >
              <p
                className="
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-muted
                  md:text-base
                "
              >
                02
              </p>

              <div className="hidden items-center gap-5 sm:flex">
                <span
                  aria-hidden="true"
                  className="h-px w-12 bg-border"
                />

                <h2
                  id="more-work-heading"
                  className="
                    text-xl
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    md:text-2xl
                  "
                >
                  More Work
                </h2>
              </div>

              <h2
                className="
                  text-2xl
                  font-medium
                  uppercase
                  tracking-[0.1em]
                  sm:hidden
                "
              >
                More Work
              </h2>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.17em]
                  text-muted
                  sm:text-right
                  md:text-sm
                "
              >
                {String(remainingProjects.length).padStart(2, "0")}{" "}
                {remainingProjects.length === 1 ? "project" : "projects"}
              </p>
            </div>

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
              {remainingProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}