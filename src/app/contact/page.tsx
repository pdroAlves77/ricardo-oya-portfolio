import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/ui/BackLink";
import { ROUTES } from "@/constants/routes";

export default function ContactPage() {
  return (
    <main>
      <Container className="py-10 md:py-14">

        <BackLink
          href={ROUTES.home}
          label="Home"
        />

        <section className="mt-16">

          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Contact
          </p>

          <h1 className="mt-6 text-[clamp(3.5rem,9vw,8rem)] font-medium tracking-[-0.07em] leading-[0.9]">
            Contact
          </h1>

          <p className="mt-8 max-w-xl text-muted leading-relaxed">
            Available for freelance projects,
            commercial work and creative collaborations.
          </p>

        </section>
      </Container>
    </main>
  );
}