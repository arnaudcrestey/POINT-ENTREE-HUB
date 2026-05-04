import Link from "next/link";
import { Signature } from "@/components/signature";

export default function HomePage() {
  return (
    <main className="min-h-screen grid-background px-6 py-16 md:px-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col justify-center gap-8">
        <Signature />
        <section className="surface p-8 md:p-12">
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">Point d&apos;entrée stratégique</h1>
          <p className="mt-5 max-w-2xl text-black/70">
            Une lecture rapide pour identifier la direction la plus juste entre structuration, compréhension et valorisation.
          </p>
          <Link
            href="/start"
            className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm text-white transition hover:bg-black"
          >
            Commencer
          </Link>
        </section>
      </div>
    </main>
  );
}
