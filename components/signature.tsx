"use client";

export function Signature() {
  return (
    <a
      href="https://www.arnaudcrestey.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex flex-col items-center justify-center leading-none no-underline"
    >
      <span className="font-serif text-[64px] tracking-[-0.14em] text-black">
        AC
      </span>

      <span className="mt-1 font-serif text-[18px] text-black/90">
        arnaudcrestey.com
      </span>

      <span className="mt-4 block h-px w-16 bg-[#d8c8ad] transition-all duration-300 group-hover:w-20" />
    </a>
  );
}
