import Link from "next/link";
import { Signature } from "@/components/signature";

export default function MerciPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#efe7d8] via-[#f7f2ea] to-[#e8dfcf] px-5 py-10 sm:px-6">
      <div className="absolute left-[-160px] top-[80px] h-80 w-80 rounded-full bg-[#315f8c]/10 blur-[110px]" />
      <div className="absolute bottom-[-140px] right-[-100px] h-96 w-96 rounded-full bg-[#c9a86a]/20 blur-[130px]" />

      <section className="relative z-10 w-full max-w-2xl rounded-[30px] border border-white/70 bg-white/85 px-7 py-10 text-center shadow-[0_34px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:rounded-[36px] sm:px-10 sm:py-12 md:px-14 md:py-14">
        <div className="flex flex-col items-center">
          <Signature />

          <div className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a86a] to-transparent" />
        </div>

        <p className="mt-11 text-[12px] font-medium uppercase tracking-[0.46em] text-[#9b8668] sm:text-[13px]">
          Merci
        </p>

        <h1 className="mx-auto mt-5 max-w-xl font-serif text-[33px] leading-[1.08] tracking-[-0.02em] text-[#111827] sm:text-[40px] md:text-[44px]">
          Votre situation a bien été reçue
        </h1>

        <p className="mx-auto mt-6 max-w-md text-[13px] leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
          Les éléments transmis pourront être relus avec attention.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#315f8c] px-8 py-3.5 text-[14px] font-medium text-white shadow-[0_18px_40px_rgba(49,95,140,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#284f76] sm:text-[15px]"
        >
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}
