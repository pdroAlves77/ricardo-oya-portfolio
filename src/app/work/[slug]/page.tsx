import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/ui/BackLink";
import { ROUTES } from "@/constants/routes";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries/project-by-slug";
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
    <figure
      className={`
        ${getGalleryLayoutClasses(image.layout)}
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
        className="object-cover"
      />
    </figure>
  );
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = await client.fetch<PortfolioProject | null>(
    PROJECT_BY_SLUG_QUERY,
    {
      slug,
    },
  );

  if (!project) {
    notFound();
  }

  const coverImageUrl = urlFor(project.coverImage)
    .width(2800)
    .quality(92)
    .fit("max")
    .auto("format")
    .url();

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
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted sm:text-xs">
            {project.category}
          </p>

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
            <h1
              className="
                max-w-[10ch]
                text-[clamp(3.75rem,13vw,6.5rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.075em]
                sm:text-[clamp(5rem,11vw,8rem)]
                lg:text-[clamp(6rem,8vw,9.5rem)]
              "
            >
              {project.title}
            </h1>

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
          </div>

          {(project.description ||
            (project.credits &&
              project.credits.length > 0)) && (
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
          )}
        </section>
      </Container>

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

      <Container>
        <div className="mt-16 border-t border-border pt-8 md:mt-24 md:pt-10">
          <BackLink
            href={ROUTES.home}
            label="Portfolio"
          />
        </div>
      </Container>
    </main>
  );
}