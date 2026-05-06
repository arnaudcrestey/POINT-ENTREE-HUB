"use client";

import { useRouter } from "next/navigation";

export function Signature() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="group inline-flex flex-col items-center justify-center gap-2 text-center outline-none"
      aria-label="Retour accueil"
    >
      <div className="flex flex-col items-center leading-none">
        <span className="font-serif text-[52px] tracking-[-0.08em] text-black/92 transition-opacity duration-300 group-hover:opacity-80">
          AC
        </span>

        <span className="mt-[6px] text-[10px] tracking-[0.32em] text-black/40">
          arnaudcrestey.com
        </span>
      </div>

      <span className="h-px w-16 bg-black/12 transition-all duration-300 group-hover:w-20 group-hover:bg-black/22" />
    </button>
  );
}
