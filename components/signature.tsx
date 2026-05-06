"use client";

import { useRouter } from "next/navigation";

export function Signature() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      aria-label="Retour vers arnaudcrestey.com"
      className="group inline-flex flex-col items-center justify-center leading-none outline-none"
    >
      <span className="font-serif text-[64px] tracking-[-0.08em] text-black transition-opacity duration-300 group-hover:opacity-80">
        AC
      </span>

      <span className="mt-2 font-serif text-[18px] text-black/90 transition-opacity duration-300 group-hover:opacity-75">
        arnaudcrestey.com
      </span>

      <span className="mt-4 h-px w-16 bg-[#d8c8ad] transition-all duration-300 group-hover:w-20 group-hover:bg-[#cdb892]" />
    </button>
  );
}
