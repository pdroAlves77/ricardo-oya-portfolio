import { Container } from "@/components/layout/Container";

export default function Home() {
  return (
    <main>
      <Container className="flex min-h-screen flex-col justify-center py-16">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-black/60">
          Digital Retoucher
        </p>

        <h1 className="max-w-5xl text-6xl font-medium tracking-[-0.06em] sm:text-7xl lg:text-9xl">
          Ricardo Oya
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/65">
          High-end retouching, compositing and visual finishing for automotive,
          lifestyle and commercial imagery.
        </p>
      </Container>
    </main>
  );
}