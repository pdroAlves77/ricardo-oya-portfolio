import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { BeforeAfterSlider } from "@/components/portfolio/BeforeAfterSlider";
import { ProjectNavigation } from "@/components/portfolio/ProjectNavigation";
import { BackLink } from "@/components/ui/BackLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ROUTES } from "@/constants/routes";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries/project-by-slug";
import { PROJECTS_QUERY } from "@/sanity/queries/projects";
import type {
  GalleryLayout,
  PortfolioImage,
  PortfolioProject,
} from "@/types/project";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectNavigationState = {
  previousProject: PortfolioProject | null;
  nextProject: PortfolioProject | null;
};

function getGalleryLayoutClasses(
  layout: GalleryLayout | undefined,
) {
  switch (layout) {
    case "centered":
      return `
        col-span-12
        md:col-start-2
        md:col-span-10
        xl:col-start-3
        xl:col-span-8
      `;

    case "portraitLeft":
      return `
        col-span-12
        md:col-span-6
        xl:col-span-5
      `;

    case "portraitRight":
      return `
        col-span-12
        md:col-start-7
        md:col-span-6
        xl:col-start-8
        xl:col-span-5
      `;

    case "half":
      return `
        col-span-12
        md:col-span-6
      `;

    case "full":
    default:
      return "col-span-12";
  }
}

function getGalleryAspectRatio(
  layout: GalleryLayout | undefined,
) {
  switch (layout) {
    case "portraitLeft":
    case "portraitRight":
    case "half":
      return "aspect-[4/5]";

    case "centered":
      return "aspect-[16/10]";

    case "full":
    default:
      return "aspect-[16/9]";
  }
}

function getGalleryImageSizes(
  layout: GalleryLayout | undefined,
) {
  switch (layout) {
    case "portraitLeft":
    case "portraitRight":
    case "half":
      return "(max-width: 767px) 100vw, 50vw";

    case "centered":
      return "(max-width: 767px) 100vw, 70vw";

    case "full":
    default:
      return "100vw";
  }
}

function getProjectNavigation(
  projects: PortfolioProject[],
  currentProjectId: string,
): ProjectNavigationState {
  if (projects.length <= 1) {
    return {
      previousProject: null,
      nextProject: null,
    };
  }

  const currentIndex = projects.findIndex(
    (project) => project._id === currentProjectId,
  );

  if (currentIndex === -1) {
    return {
      previousProject: null,
      nextProject: null,
    };
  }

  if (projects.length === 2) {
    const otherProject =
      projects[currentIndex === 0 ? 1 : 0] ?? null;

    return {
      previousProject: null,
      nextProject: otherProject,
    };
  }

  const previousIndex =
    currentIndex === 0
      ? projects.length - 1
      : currentIndex - 1;

  const nextIndex =
    currentIndex === projects.length - 1
      ? 0
      : currentIndex + 1;

  return {
    previousProject: projects[previousIndex] ?? null,
    nextProject: projects[nextIndex] ?? null,
  };
}

function ProjectGalleryImage({
  image,
  projectTitle,
  index,
}: {
  image: PortfolioImage;
  projectTitle: string;
  index: number;
}) {
  const imageUrl = urlFor(image)
    .width(2600)
    .quality(90)
    .fit("max")
    .auto("format")
    .url();

  return (
    <Reveal
      className={getGalleryLayoutClasses(image.layout)}
      delay={Math.min(index * 0.05, 0.2)}
      distance={36}
      amount={0.08}
    >
      <figure
        className={`
          ${getGalleryAspectRatio(image.layout)}
          relative
          overflow-hidden
          bg-border
        `}
      >
        <Image
          src={imageUrl}
          alt={
            image.alt ||
            `${projectTitle}, image ${index + 1}`
          }
          fill
          sizes={getGalleryImageSizes(image.layout)}
          className="
            object-cover
            transition-transform
            duration-700
            ease-[var(--ease-portfolio)]
            hover:scale-[1.01]
          "
        />
      </figure>
    </Reveal>
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await client.fetch<PortfolioProject | null>(
    PROJECT_BY_SLUG_QUERY,
    {
      slug,
    },
  );

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description:
      project.description ||
      `${project.title}, a ${project.category} retouching project by Ricardo Oya.`,
  };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const [project, projects] = await Promise.all([
    client.fetch<PortfolioProject | null>(
      PROJECT_BY_SLUG_QUERY,
      {
        slug,
      },
    ),

    client.fetch<PortfolioProject[]>(PROJECTS_QUERY),
  ]);

  if (!project) {
    notFound();
  }

  const {
    previousProject,
    nextProject,
  } = getProjectNavigation(projects, project._id);

  const coverImageUrl = urlFor(project.coverImage)
    .width(2800)
    .quality(92)
    .fit("max")
    .auto("format")
    .url();

  const hasBeforeAfter = Boolean(
    project.beforeAfter?.before &&
      project.beforeAfter?.after,
  );

  const beforeImageUrl =
    hasBeforeAfter && project.beforeAfter?.before
      ? urlFor(project.beforeAfter.before)
          .width(2800)
          .quality(92)
          .fit("max")
          .auto("format")
          .url()
      : null;

  const afterImageUrl =
    hasBeforeAfter && project.beforeAfter?.after
      ? urlFor(project.beforeAfter.after)
          .width(2800)
          .quality(92)
          .fit("max")
          .auto("format")
          .url()
      : null;

  return (
    <main className="pb-20 md:pb-28">
      <Container className="pt-6 md:pt-8">
        <BackLink
          href={ROUTES.home}
          label="Portfolio"
        />
      </Container>

      <Container>
        <section className="pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20">
          <Reveal>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted sm:text-xs">
              {project.category}
            </p>
          </Reveal>

          <div
            className="
              mt-5
              grid
              gap-10
              lg:grid-cols-[minmax(0,1fr)_20rem]
              lg:items-end
              xl:grid-cols-[minmax(0,1fr)_24rem]
            "
          >
            <Reveal delay={0.08}>
              <h1
                className="
                  max-w-[12ch]
                  whitespace-pre-line
                  text-[clamp(3.75rem,11vw,6.5rem)]
                  font-medium
                  leading-[0.88]
                  tracking-[-0.065em]
                  sm:text-[clamp(5rem,9vw,7.5rem)]
                  lg:text-[clamp(5.5rem,7.5vw,8.5rem)]
                "
              >
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <dl
                className="
                  grid
                  grid-cols-2
                  gap-x-8
                  gap-y-7
                  border-t
                  border-border
                  pt-7
                  text-sm
                  lg:grid-cols-1
                  lg:border-t-0
                  lg:pb-3
                  lg:pt-0
                "
              >
                {project.client && (
                  <div>
                    <dt className="text-[0.68rem] uppercase tracking-[0.17em] text-muted">
                      Client
                    </dt>

                    <dd className="mt-2">
                      {project.client}
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.17em] text-muted">
                    Year
                  </dt>

                  <dd className="mt-2">
                    {project.year}
                  </dd>
                </div>

                {project.services &&
                  project.services.length > 0 && (
                    <div className="col-span-2 lg:col-span-1">
                      <dt className="text-[0.68rem] uppercase tracking-[0.17em] text-muted">
                        Services
                      </dt>

                      <dd className="mt-2 leading-6">
                        {project.services.join(" · ")}
                      </dd>
                    </div>
                  )}
              </dl>
            </Reveal>
          </div>

          {(project.description ||
            (project.credits &&
              project.credits.length > 0)) && (
            <Reveal delay={0.2}>
              <div
                className="
                  mt-12
                  grid
                  gap-10
                  border-t
                  border-border
                  pt-8
                  md:mt-14
                  md:grid-cols-[minmax(0,1fr)_20rem]
                  md:pt-10
                  xl:grid-cols-[minmax(0,1fr)_24rem]
                "
              >
                <div>
                  {project.description && (
                    <p className="max-w-3xl text-base leading-7 text-muted md:text-lg md:leading-8">
                      {project.description}
                    </p>
                  )}
                </div>

                {project.credits &&
                  project.credits.length > 0 && (
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-1">
                      {project.credits.map((credit) => (
                        <div key={credit._key}>
                          <dt className="text-[0.68rem] uppercase tracking-[0.17em] text-muted">
                            {credit.role}
                          </dt>

                          <dd className="mt-2 text-sm leading-relaxed">
                            {credit.name}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
              </div>
            </Reveal>
          )}
        </section>
      </Container>

      <Reveal
        distance={44}
        amount={0.08}
      >
        <section className="mx-auto w-full max-w-[1920px] px-3 md:px-6">
          <div className="relative aspect-[4/3] overflow-hidden bg-border sm:aspect-[16/10] lg:aspect-[16/8.5]">
            <Image
              src={coverImageUrl}
              alt={
                project.coverImage.alt ||
                `Cover image for ${project.title}`
              }
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>
      </Reveal>

      {project.gallery && project.gallery.length > 0 && (
        <section
          aria-label={`${project.title} gallery`}
          className="
            mx-auto
            mt-3
            grid
            w-full
            max-w-[1920px]
            grid-cols-12
            gap-3
            px-3
            md:mt-6
            md:gap-6
            md:px-6
          "
        >
          {project.gallery.map((image, index) => (
            <ProjectGalleryImage
              key={
                image._key ||
                `${project._id}-gallery-${index}`
              }
              image={image}
              projectTitle={project.title}
              index={index}
            />
          ))}
        </section>
      )}

      {beforeImageUrl && afterImageUrl && (
        <Container>
          <section
            aria-labelledby="before-after-heading"
            className="pt-20 md:pt-28"
          >
            <Reveal>
              <SectionHeader
                id="before-after-heading"
                number="01"
                title="Before / After"
                meta="Drag to compare"
                className="mb-8 md:mb-10"
              />
            </Reveal>

            <Reveal
              distance={40}
              amount={0.08}
            >
              <BeforeAfterSlider
                beforeSrc={beforeImageUrl}
                afterSrc={afterImageUrl}
                beforeAlt={
                  project.beforeAfter?.before?.alt ||
                  `Before retouching for ${project.title}`
                }
                afterAlt={
                  project.beforeAfter?.after?.alt ||
                  `After retouching for ${project.title}`
                }
              />
            </Reveal>
          </section>
        </Container>
      )}

      {(previousProject || nextProject) && (
        <Container>
          <Reveal>
            <section className="pt-20 md:pt-28">
              <ProjectNavigation
                previousProject={previousProject}
                nextProject={nextProject}
              />
            </section>
          </Reveal>
        </Container>
      )}

      <Container>
        <Reveal>
          <div className="mt-16 border-t border-border pt-8 md:mt-24 md:pt-10">
            <BackLink
              href={ROUTES.home}
              label="Portfolio"
            />
          </div>
        </Reveal>
      </Container>
    </main>
  );
}