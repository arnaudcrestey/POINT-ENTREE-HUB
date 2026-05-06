import Link from "next/link";
import { Signature } from "@/components/signature";

export default function MerciPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#efe7d8] via-[#f7f2ea] to-[#e8dfcf] px-6 py-12">
      <div className="absolute left-[-140px] top-[90px] h-80 w-80 rounded-full bg-[#315f8c]/10 blur-[100px]" />
      <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-[#c9a86a]/20 blur-[120px]" />

      <section className="relative z-10 w-full max-w-2xl rounded-[34px] border border-white/70 bg-white/80 p-8 text-center shadow-[0_34px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-12">
        <div className="flex flex-col items-center">
          <Signature />
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#c9a86a] to-transparent" />
        </div>

        <p className="mt-12 text-[11px] uppercase tracking-[0.32em] text-[#8a7557]">
          Merci
        </p>

        <h1 className="mx-auto mt-5 max-w-xl font-serif text-[34px] leading-[1.08] text-[#111827] md:text-[42px]">
          Votre situation a bien été reçue
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm leading-8 text-slate-600 md:text-[15px]">
          Les éléments transmis pourront être relus avec attention.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-[#315f8c] px-7 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(49,95,140,0.22)] transition duration-300 hover:-translate-y-0.5"
        >
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}
